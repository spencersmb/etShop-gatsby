import Receipt from '@components/modals/receipt'
import PaypalButton from '@components/paypal/paypalButton'
import PaypalDisabledBtn from '@components/paypal/paypalDisabledBtn'
import paypalProvider from '@components/paypal/paypalProvider'
import GuestBilling from '@components/stripe/guestBilling'
import { ICartState } from '@et/types/Cart'
import { IPaypalPaymentData, IPaypalSuccessOrder } from '@et/types/Paypal'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import { IOrderDetails, IOrderResponse, IStripeGuestForm } from '@et/types/WC_Order'
import { cartToggle, emptyCart } from '@redux/actions/cartActions'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import {
	createOrder as createOrderAction,
	IProcessPaypalOrderAction,
	processPaypalOrder as processPaypalOrderAction
} from '@redux/actions/orderActions'
import { colors } from '@styles/global/colors'
import {
	CheckoutFormLabel, GuestBillingContainer,
	InputSpinner,
	PaypalButtonPoseWrapper,
	PaypalFormContainer,
	PaypalSpinner
} from '@styles/modules/checkout'
import { tagUserInConvertKit, wc_createBilling, wcCreateOrderLineItems } from '@utils/orderUtils'
import { getPaypalFormatItems } from '@utils/paypalUtils'
import { displayCurrency } from '@utils/priceUtils'
import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { reduxForm, InjectedFormProps, reset, formValueSelector } from 'redux-form'
import styled from 'styled-components'

interface IPublicProps {
	cart: ICartState
	products: IProducts
	user: IUserState
}

interface IReduxState {
	formProps: {
		firstName: string
		lastName: string
		email: string
	}
}

interface IReduxActions {
	resetReduxForms: (form: string) => void
	createOrder: (orderDetails: IOrderDetails, tokenId?: string) => Promise<IOrderResponse>
	closeCart: () => void
	emptyCart: () => void
	showModal: IShowModalAction
	processPaypalOrder: IProcessPaypalOrderAction
}

type AllProps = IReduxActions & IPublicProps & IReduxState

export function PaypalCheckoutForm (props: AllProps & InjectedFormProps<IStripeGuestForm, AllProps>) {
	const { submitting, invalid, valid, pristine, cart, formProps, user, products, processPaypalOrder } = props
	const [manualSubmitting, setManualSubmitting] = useState(false)
	const { PaypalButtonLoader } = paypalProvider()

	// 1.
	async function createOrder (data: any, actions: any): Promise<any> {
		// console.log('payment', actions.payment)
		// console.log('payment data', data)
		const currency = 'USD'
		// console.log('total', cart.totalPrice)
		setManualSubmitting(true)

		return actions.order.create({
			purchase_units: [{
				amount: {
					currency_code: currency,
					value: cart.totalPrice,
					breakdown: {
						item_total: { value: cart.totalPrice, currency_code: currency }
					}
				},
				invoice_id: Math.random().toString(36).substring(14),
				items: getPaypalFormatItems(cart, products),
				soft_descriptor: 'Digital Purchase', // appears on CC statement
				description: 'Paypal payment for digital products on shop.every-Tuesday.com' // 127 characters
			}],
			application_context: {
				brand_name: 'Every-Tuesday',
				shipping_preference: 'NO_SHIPPING',
				user_action: 'PAY_NOW'
			}
		})

	}

	// 2a.
	async function onApproval (data: any, actions: any): Promise<any> {
		console.log('onApprove', data)
		// console.log('onApprove actions', actions)

		try {
			// 2b.
			const myOrder = await createWcOrder()
			console.log('myOrder', myOrder)

			if (!myOrder || myOrder && myOrder.code !== 200) {
				setManualSubmitting(false)
				actions.restart()
				onError('order create error')
				return
			}

			// Complete Transaction over PAYPALS server example
			return actions.order.capture().then(async (paymentData: IPaypalPaymentData) => {
				console.log('paymentData', paymentData)

				// const paypalResponse: IPaypalSuccessOrder =
				// console.log('paypalResponse sent to WC', paypalResponse)

				// Go back to server with Paypal approval and finish order
				// send if paypal approved or not so we can complete or delete order
				const result: IOrderResponse = await processPaypalOrder({
					first_name: paymentData.payer.name.given_name,
					last_name: paymentData.payer.name.surname,
					paypal_email: paymentData.payer.email_address,
					paid: true,
					payment_id: paymentData.id, // undefined do we need?
					payment_method: 'paypal_express',
					payment_token: 'null', // null do we need?
					paypal_transaction_id: paymentData.purchase_units[0].payments.captures[0].id,
					wc_order_id: myOrder.order.order_id
				})
				// console.log('result', result)

				if (result) {
					// clear form
					// controll success from parent

					const { order } = result
					setManualSubmitting(false)
					props.showModal({
						modal: Receipt,
						options: {
							closeModal: true,
							hasBackground: false,
							data: order
						}
					})
					props.closeCart()
					props.emptyCart()
					props.reset()
					await tagUserInConvertKit({
						email: order.email,
						firstName: order.first_name
					}, order.downloads.products)

				} else {
					setManualSubmitting(false)
					actions.restart()
					onError('order process error')
				}

			}).catch((e: Error) => {
				setManualSubmitting(false)
				console.error('paypal success error', e)
			})

		} catch (e) {
			setManualSubmitting(false)
			actions.restart()
			onError('order create error')
		}

	}

	// 2b. When the order is authed, create the order on our DB - set to pending
	async function createWcOrder (): Promise<IOrderResponse> {
		const billing = wc_createBilling(user, formProps)
		return props.createOrder({
			billing,
			cardType: 'Paypal',
			coupon_code: cart.coupon.valid ? cart.coupon.code : null,
			customer_user_agent: billing.email,
			line_items: wcCreateOrderLineItems(cart.items, products),
			payment_method: 'paypal_express',
			payment_method_title: 'Paypal Express',
			prices_include_tax: true,
			set_paid: false,
			total: displayCurrency(cart.totalPrice).substring(1),
			total_tax: displayCurrency(cart.totalPrice).substring(1)
		})
	}

	// this gets fired so far ...beacuse an error creating an order on our server
	// not sure where else to call this
	function onError (error: any) {
		console.error('Erroneous payment OR failed to load script!', error)
	}

	function onCancel (data: any) {
		setManualSubmitting(false)
		console.log('Cancelled payment!', data)
	}

	// function completePaypalPurchase () {}
	const Button = useMemo(() => <PaypalButton
		client={
			{
				production: process.env.GATSBY_PAYPAL_KEY || '',
				sandbox: process.env.GATSBY_PAYPAL_TEST_KEY || ''
			}
		}
		submitting={manualSubmitting}
		invalid={invalid}
		PaypalCheckoutButton={PaypalButtonLoader}
		createOrder={createOrder}
		onApprove={onApproval}
		onCancel={onCancel}
		onError={onError}
	/>, [PaypalButtonLoader, invalid, cart.totalPrice])

	return (
		<PaypalFormContainer>
			{!user && <GuestBillingContainer>
        <CheckoutFormLabel>
          Billing
        </CheckoutFormLabel>
        <GuestBilling/>
      </GuestBillingContainer>}
			{manualSubmitting && <PaypalOverlay>
        <div className={`innerSpinner`}>
          <InputSpinner submitting={true} spinnerColor={colors.teal.i500}>
            <svg className='spinner' viewBox='0 0 50 50'>
              <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='6'/>
            </svg>
          </InputSpinner>
        </div>
      </PaypalOverlay>}
			{/*{manualSubmitting && <PaypalSpinner>*/}
			{/*  <InputSpinner submitting={true} spinnerColor={'#009cde'}>*/}
			{/*    <svg className='spinner' viewBox='0 0 50 50'>*/}
			{/*      <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='6'/>*/}
			{/*    </svg>*/}
			{/*  </InputSpinner>*/}
			{/*</PaypalSpinner>}*/}
			<PaypalButtonPoseWrapper pose={manualSubmitting ? 'hide' : 'show'}>
				{Button}
			</PaypalButtonPoseWrapper>
		</PaypalFormContainer>
	)
}

export const RegisterPaypalForm = reduxForm<IStripeGuestForm, AllProps>({
	destroyOnUnmount: false, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'paypalForm'
})(PaypalCheckoutForm)

const selector = formValueSelector('paypalForm')
const mapStateToProps = (state: IState) => {
	return {
		formProps: selector(state, 'email', 'firstName', 'lastName')
	}
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
	return {
		resetReduxForms: bindActionCreators(reset, dispatch),
		processPaypalOrder: bindActionCreators(processPaypalOrderAction, dispatch),
		createOrder: bindActionCreators(createOrderAction, dispatch),
		emptyCart: bindActionCreators(emptyCart, dispatch),
		closeCart: bindActionCreators(cartToggle, dispatch),
		showModal: bindActionCreators(showModal, dispatch)
	}
}

const PaypalOverlay = styled.div`
	position:absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(51, 63, 79, 0.69);
	
	.innerSpinner{
		position:relative;
		height: 100%;
		
		${InputSpinner}{
			height: 62px;
			width: 62px;
			left: 50%;
			top:50%;
			transform: translate(-50%,-50%);
		}
	}
`
// export default connect<{}, IReduxActions, IPublicProps, IState>(null, mapDispatchToProps)(RegisterPaypalForm)
export default React.memo(connect<IReduxState, IReduxActions, IPublicProps, IState>(mapStateToProps, mapDispatchToProps)(RegisterPaypalForm), (prev: IPublicProps, next: IPublicProps): boolean => {
	return !(prev.cart.totalPrice !== next.cart.totalPrice || prev.cart.coupon.valid !== prev.cart.coupon.valid || prev.user !== next.user)
})
