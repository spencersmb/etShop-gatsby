import RegisterStripeForm from '@components/stripe/checkoutForm'
import { ICartState } from '@et/types/Cart'
import { IProducts } from '@et/types/Products'
import { IUserState } from '@et/types/User'
import { IOrderDetails } from '@et/types/WC_Order'

import React from 'react'
import { toastr } from 'react-redux-toastr'
import { injectStripe, ReactStripeElements } from 'react-stripe-elements'

export function StripeCheckout (props: ReactStripeElements.InjectedStripeProps) {

	async function stripCheckoutSubmit (order: IOrderDetails): Promise<boolean> {
		console.log('order', order)

		if (!props.stripe) {
			console.error('stripe not loaded')
			toastr.error('Stripe error', 'Stripe is not available. Please try again.')
			return false
		}

		const result: stripe.TokenResponse = await props.stripe.createToken(
			{
				name: `${order.billing.first_name} ${order.billing.last_name}`
			}
		)
		if (!result) {
			return false
		} else if (result.error) {
			// this.props.hideLoadingBar()
			// this.setState({
			// 	userSubmitting: false
			// })
			console.error('error handler:', result.error.message)
			return false
		}

		// 3. Success Token created
		if (result.token) {
			// 2. Submit form to server
			console.log('result from stripe', result.token)

			// send approved order to DB
			// await this.stripeTokenHandler(result.token, myOrderData)
			return true
		}

		return false

	}

	function onSuccess () {
		// close Cart
		// Open Receipt modal?

	}

	function onFail () {
		// toaster
	}

	return (
		<RegisterStripeForm
			onSuccess={onSuccess}
			onFail={onFail}
			stripCheckoutSubmit={stripCheckoutSubmit}/>
	)
}

export default injectStripe(StripeCheckout)