import SubmitButton from '@components/buttons/submitButton'
import GuestBilling from '@components/stripe/guestBilling'
import { ICartState } from '@et/types/Cart'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import { IBillingWc, IOrderResponse, IStripeGuestForm } from '@et/types/WC_Order'
import { colors } from '@styles/global/colors'
import {
	CheckoutFormLabel,
	CreditCardFormWrapper,
	GuestBillingContainer,
	StripeCardWrapper
} from '@styles/modules/checkout'
import { wc_createBilling, wc_createOrder } from '@utils/orderUtils'
import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { reduxForm, InjectedFormProps, reset } from 'redux-form'
import { CardElement } from 'react-stripe-elements'

interface IPropsPublic {
	stripCheckoutSubmit: (formData: any) => Promise<IOrderResponse | null>
	onSuccess: (completedOrder: IOrderResponse) => void
	onFail: () => void
}

interface IProps {
	cart: ICartState
	products: IProducts
	user: IUserState
}

interface IReduxActions {
	resetReduxForms: (form: string) => void;
}

type AllProps = IProps & IPropsPublic & IReduxActions

export function StripeCheckoutForm (props: AllProps & InjectedFormProps<IStripeGuestForm, AllProps>) {
	const stripeElement = useRef(null)
	const { submitting, invalid, valid, pristine, cart, handleSubmit, stripCheckoutSubmit, user, products, submitSucceeded } = props
	const [ccValid, setccValid] = useState(false)

	/**
	 * * Stripe Checkout Process
	 * ? 1. Create the Order Object structure that WC will read via 'wc_createOrder'
	 * ? 2. Send the Order to Stripe payment gateway to approve a token and then to WordPress DB
	 * ? 3. If it's successful, clear Redux form and send result (successful order response) to
	 * ? parents success function handler
	 * @param formData
	 */
	async function submit (formData: IStripeGuestForm): Promise<any> {
		// create billing depending on if user is logged in
		// get user data or return data from forms
		const billing: IBillingWc = wc_createBilling(user, formData)

		// Create wc_order type and send to wordpress db
		// result should be a successful order
		const result: IOrderResponse | null = await stripCheckoutSubmit(wc_createOrder(cart, billing, products))

		if (result) {
			// clear form
			props.reset()
			// controll success from parent
			props.onSuccess(result)
		} else {
			props.onFail()
		}

	}

	function onCreditCardChange (e: stripe.elements.ElementChangeResponse) {
		if (e.complete && !ccValid) {
			setccValid(true)
		} else if (!e.complete && ccValid) {
			setccValid(false)
		}
	}

	// console.log('inValid', invalid)
	// console.log('valid && pristine', valid && pristine)
	// console.log('cart.totalPrice === 0', cart.totalPrice === 0)
	// console.log('ccValid', ccValid)

	return (
		<form onSubmit={handleSubmit(submit)} style={{
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		}}>
				{!user &&
        <GuestBillingContainer>
          <CheckoutFormLabel>
            Billing
          </CheckoutFormLabel>
          <GuestBilling/>
        </GuestBillingContainer>
				}

				<StripeCardWrapper>
					<CheckoutFormLabel>
						PAYMENT
					</CheckoutFormLabel>
					<CreditCardFormWrapper>
						<CardElement
							onReady={(element: any) => stripeElement.current = element}
							onChange={onCreditCardChange}
						/>
					</CreditCardFormWrapper>
					<SubmitButton
						textColor={'#fff'}
						buttonText={'Purchase'}
						backgroundColor={colors.teal.i500}
						spinnerColor={colors.teal.i500}
						submitting={submitting}
						invalid={user ? cart.totalPrice === 0 || !ccValid : invalid || valid && pristine || cart.totalPrice === 0 || !ccValid}
					/>
				</StripeCardWrapper>
			</form>
	)
}

export const RegisterStripeForm = reduxForm<IStripeGuestForm, AllProps>({
	destroyOnUnmount: false, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'stripeForm'
})(StripeCheckoutForm)

const mapStateToProps = (state: IState): any => {
	return {
		cart: state.cart,
		products: state.products,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		resetReduxForms: bindActionCreators(reset, dispatch)
	}
}

export default connect<IProps, IReduxActions, IPropsPublic, IState>(mapStateToProps, mapDispatchToProps)(RegisterStripeForm)
