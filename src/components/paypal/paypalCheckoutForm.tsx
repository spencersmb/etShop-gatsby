import Receipt from '@components/modals/receipt'
import PaypalButton from '@components/paypal/paypalButton'
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
import { wc_createBilling, wcCreateOrderLineItems } from '@utils/orderUtils'
import { getPaypalFormatItems } from '@utils/paypalUtils'
import { displayCurrency } from '@utils/priceUtils'
import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { reduxForm, InjectedFormProps, reset, formValueSelector } from 'redux-form'

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
	const { PaypalButtonLoader } = paypalProvider()

	// 1.
	async function createOrder (data: any, actions: any): Promise<any> {
		// console.log('payment', actions.payment)
		// console.log('payment data', data)
		const currency = 'USD'
		// console.log('total', cart.totalPrice)

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
			if (!myOrder || myOrder && myOrder.code !== 200) {
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
					props.showModal({
						modal: Receipt,
						options: {
							closeModal: true,
							hasBackground: false,
							data: {
								type: 'Stripe',
								orderId: order.order_id,
								date: order.date,
								email: order.email,
								downloads: order.downloads,
								total: order.total
							}
						}
					})
					props.emptyCart()
					props.reset()
					setTimeout(() => {
						props.closeCart()
					}, 500)

				} else {
					actions.restart()
					onError('order process error')
				}

			}).catch((e: Error) => {
				console.error('paypal success error', e)
			})

		} catch (e) {
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
		console.log('Erroneous payment OR failed to load script!', error)
	}

	function onCancel (data: any) {
		console.log('Cancelled payment!', data)
	}

	// function completePaypalPurchase () {}
	const Button = useMemo(() => <PaypalButton
		client={
			{
				production: process.env.PAYPAL_TEST_KEY || '',
				sandbox: process.env.PAYPAL_TEST_KEY || ''
			}
		}
		invalid={invalid && pristine}
		PaypalCheckoutButton={PaypalButtonLoader}
		createOrder={createOrder}
		onApprove={onApproval}
		onCancel={onCancel}
		onError={onError}
	/>, [PaypalButtonLoader, invalid, cart.totalPrice])

	console.log('render form', props.formProps)

	return (
		<div>
			<div>
				<h3>paypal checkout</h3>
				{!user && <GuestBilling/>}

				{Button}

			</div>
		</div>
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

// export default connect<{}, IReduxActions, IPublicProps, IState>(null, mapDispatchToProps)(RegisterPaypalForm)
export default React.memo(connect<IReduxState, IReduxActions, IPublicProps, IState>(mapStateToProps, mapDispatchToProps)(RegisterPaypalForm), (prev: IPublicProps, next: IPublicProps): boolean => {
	return !(prev.cart.totalPrice !== next.cart.totalPrice || prev.cart.coupon.valid !== prev.cart.coupon.valid)
})
