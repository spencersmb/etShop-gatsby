import Receipt from '@components/modals/receipt'
import RegisterStripeForm from '@components/stripe/checkoutForm'
import { CK_Tag_Enums } from '@et/types/Enums'
import { IOrderDetails, IOrderResponse } from '@et/types/WC_Order'
import { cartToggle, emptyCart } from '@redux/actions/cartActions'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import { createOrder, ICreateOrderAction } from '@redux/actions/orderActions'
import { tagUserInConvertKit } from '@utils/orderUtils'
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

		if (!props.stripe) {
			console.error('stripe not loaded')
			toastr.error('Stripe error', 'Stripe is not available. Please try again.')
			return null
		}

		const stripeCalcTotal = parseInt(order.total, 10) * 100
		const ownerInfo = {
			owner: {
				name: `${order.billing.first_name} ${order.billing.last_name}`,
				email: `${order.billing.email}`
			}
		}
		const card = {
			type: 'card',
			amount: stripeCalcTotal,
			currency: 'USD',
			statement_descriptor: 'ET Shop',
			usage: 'single_use'
		}
		const sourceOrder = {
			source_order: {
				items: order.line_items.map(item => {
					return {
						amount: parseInt(item.price, 10) * 100,
						currency: 'USD',
						description: item.name,
						parent: item.product_id,
						quantity: item.quantity,
						type: 'sku'
					}
				})
			}
		}

		const result: stripe.SourceResponse = await props.stripe.createSource(
			// @ts-ignore
			{ ...card, ...ownerInfo, ...sourceOrder }
		)
		console.log('result', result)
		if (!result) {
			console.error('source null:', result)
			return null
		}

		if (result.error) {
			console.error('stripe error:', result.error.message)
			return null
		}

		if (result.source && result.source.status !== 'chargeable') {
			console.error('source status:', result.source.status)
			return null
		}

		if (result.source) {
			return sendOrderToBackend(result.source.id, {
				...order,
				'cardType': result.source.card ? result.source.card.brand : 'CreditCard'
			})
		}

		return null

	}

	async function sendOrderToBackend (sourceID: string, orderData: IOrderDetails): Promise<IOrderResponse | null> {
		try {
			// send order to DB
			// returns us back the order object
			return await props.wc_createOrder(orderData, sourceID)

		} catch (e) {
			console.error('DB error', e)
			return null
		}
	}

	async function onSuccess (completedOrder: IOrderResponse) {
		console.log('completedOrder', completedOrder)
		const { order } = completedOrder
		props.showModal({
			modal: Receipt,
			options: {
				closeModal: true,
				hasBackground: false,
				data: order
			}
		})
		props.emptyCart()
		setTimeout(() => {
			props.closeCart()
		}, 1000)
		await tagUserInConvertKit({
			email: order.email,
			firstName: order.first_name
		}, order.downloads.products)

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
export default injectStripe(connect<{}, IReduxActions, {}>(null, mapDispatchToProps)(StripeCheckout))
