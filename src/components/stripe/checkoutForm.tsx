import GuestBilling from '@components/stripe/guestBilling'
import { ICartState } from '@et/types/Cart'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import { IBillingWc, IOrderResponse } from '@et/types/WC_Order'
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

export function StripeCheckoutForm (props: AllProps & InjectedFormProps<{}, AllProps>) {
	const stripeElement = useRef(null)
	const { submitting, invalid, valid, pristine, cart, handleSubmit, stripCheckoutSubmit, user, products } = props
	const [ccValid, setccValid] = useState(false)

	async function submit (formData: any) {

		// form logic here

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

	return (
		<div>
			<form onSubmit={handleSubmit(submit)}>
				{!user && <GuestBilling/>}
				<CardElement
					onReady={(element: any) => stripeElement.current = element}
					onChange={onCreditCardChange}
				/>
				<div>
					{submitting && <div>Spinner</div>}
					{!submitting && <button
            disabled={user ? cart.totalPrice === 0 || !ccValid : invalid || valid && pristine || cart.totalPrice === 0 || !ccValid}
          >Purchase</button>}
				</div>

			</form>
		</div>
	)
}

export const RegisterStripeForm = reduxForm<{}, AllProps>({
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
