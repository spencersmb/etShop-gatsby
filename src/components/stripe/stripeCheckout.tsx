import Receipt from '@components/modals/receipt'
import RegisterStripeForm from '@components/stripe/checkoutForm'
import { IOrderDetails, IOrderResponse } from '@et/types/WC_Order'
import { cartToggle, emptyCart } from '@redux/actions/cartActions'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import { createOrder, ICreateOrderAction } from '@redux/actions/orderActions'
import React from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { injectStripe, ReactStripeElements } from 'react-stripe-elements'
import { Action, bindActionCreators, Dispatch } from 'redux'

interface IReduxActions {
	wc_createOrder: ICreateOrderAction,
	closeCart: () => void
	emptyCart: () => void
	showModal: IShowModalAction
}

export function StripeCheckout (props: IReduxActions & ReactStripeElements.InjectedStripeProps) {

	async function stripCheckoutSubmit (order: IOrderDetails): Promise<IOrderResponse | null> {
		console.log('order submitted', order)

		if (!props.stripe) {
			console.error('stripe not loaded')
			toastr.error('Stripe error', 'Stripe is not available. Please try again.')
			return null
		}

		const result: stripe.TokenResponse = await props.stripe.createToken(
			{
				name: `${order.billing.first_name} ${order.billing.last_name}`
			}
		)

		if (!result) {
			return null
		} else if (result.error) {
			// this.props.hideLoadingBar()
			// this.setState({
			// 	userSubmitting: false
			// })
			console.error('error handler:', result.error.message)
			return null

			// 3. Success Token created
		} else if (result.token) {
			// 2. Submit form to server
			console.log('result from stripe', result.token)

			// send approved order to DB
			return sendOrderToBackend(result.token, order)
		} else {
			return null
		}
	}

	async function sendOrderToBackend (token: stripe.Token, orderData: IOrderDetails): Promise<IOrderResponse | null> {
		try {
			// send order to DB
			// returns us back the order object
			return await props.wc_createOrder(orderData, token)

		} catch (e) {
			console.error('DB error', e)
			return null
		}
	}

	function onSuccess (completedOrder: IOrderResponse) {
		// toastr.success('Enjoy', 'Purchase successful')
		props.emptyCart()
		props.closeCart()
		console.log('completedOrder', completedOrder)
		const { order } = completedOrder
		// open receipt modal
		props.showModal({
			modal: Receipt,
			options: {
				closeOutsideModal: true,
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

	}

	function onFail () {
		// toaster
		console.error('Failed order')
	}

	return (
		<RegisterStripeForm
			onSuccess={onSuccess}
			onFail={onFail}
			stripCheckoutSubmit={stripCheckoutSubmit}/>
	)
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
	return {
		wc_createOrder: bindActionCreators(createOrder, dispatch),
		emptyCart: bindActionCreators(emptyCart, dispatch),
		closeCart: bindActionCreators(cartToggle, dispatch),
		showModal: bindActionCreators(showModal, dispatch)
	}
}
export default injectStripe(connect(null, mapDispatchToProps)(StripeCheckout))