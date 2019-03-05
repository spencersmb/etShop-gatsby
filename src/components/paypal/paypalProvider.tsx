import PaypalButton from '@components/paypal/paypalButton'
import {
	IPaymentResponse,
	IPaypalComplete,
	IPaypalItem,
	IPaypalPaymentData,
	IPaypalSuccessOrder
} from '@et/types/Paypal'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { IOrderDetails, IOrderResponse } from '@et/types/WC_Order'
import { CustomWindow } from '@et/types/Winodw'
import { createOrder as createOrderAction } from '@redux/actions/orderActions'
import { wcCreateOrderLineItems } from '@utils/orderUtils'
import { getPaypalFormatItems } from '@utils/paypalUtils'
import { displayCurrency } from '@utils/priceUtils'
import React, { useEffect, useLayoutEffect, useMemo, useReducer, useRef } from 'react'
import { ICartState } from '@et/types/Cart'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'

interface IPaypalDriver {
	driver? (name: any, obj: any): React.ComponentType<any>
}

interface IPaypalButton {
	Button: React.ComponentType<any> & IPaypalDriver | {}
}

interface ILocalState {
	PaypalButtonLoader: null | IPaypalButton,
	Paypal: null | CustomWindow;
}

interface IReduxState {
	cart: ICartState;
	products: IProducts
}

interface IReduxActions {
	createOrder: (orderDetails: IOrderDetails, tokenId?: string) => Promise<IOrderResponse>;
}

interface IPropsPublic {
	clearForm: () => void
	emailProps: {
		email: string,
		valid: boolean
	}
}

declare let window: CustomWindow

export function paypalProvider () {
	const [state, setState] = useReducer((originalState: any, newState: any):ILocalState => ({ ...originalState, ...newState }), {
		Paypal: null,
		PaypalButtonLoader: null
	})
	const { Paypal, PaypalButtonLoader } = state
	let scriptTag = null

	useEffect(() => {
		console.log('mount paypal provider')

		if (window.paypal) {
			// const paypal = require('paypal-checkout')
			console.log('paypal already loaded')

			setState({
				Paypal: window.paypal,
				PaypalButtonLoader: window.paypal.Buttons.driver('react', { React, ReactDOM })
			})

		} else {
			scriptTag = document.querySelector('#paypal-js')
			if (scriptTag) {
				scriptTag.addEventListener('load', loadPaypal)
			}
		}
	}, [])

	function loadPaypal () {
		setState({
			Paypal: window.paypal,
			PaypalButtonLoader: window.paypal.Buttons.driver('react', { React, ReactDOM })
		})
	}

	return {
		Paypal,
		PaypalButtonLoader
	}
}

export default paypalProvider
//
// export function PayPalProviderOLD (props: IReduxState & IReduxActions & IPropsPublic) {
// 	const [state, setState] = useReducer((originalState: any, newState: any):ILocalState => ({ ...originalState, ...newState }), {
// 		Paypal: null,
// 		PaypalButtonLoader: null
// 	})
// 	const { Paypal, PaypalButtonLoader } = state
// 	let scriptTag = null
// 	const { cart, emailProps, products } = props
//
// 	useEffect(() => {
// 		console.log('mount paypal provider')
//
// 		if (window.paypal) {
// 			// const paypal = require('paypal-checkout')
// 			console.log('paypal already loaded')
//
// 			setState({
// 				Paypal: window.paypal,
// 				PaypalButtonLoader: window.paypal.Buttons.driver('react', { React, ReactDOM })
// 			})
//
// 		} else {
// 			scriptTag = document.querySelector('#paypal-js')
// 			if (scriptTag) {
// 				scriptTag.addEventListener('load', loadPaypal)
// 			}
// 		}
// 	}, [])
//
// 	function loadPaypal () {
// 		setState({
// 			Paypal: window.paypal,
// 			PaypalButtonLoader: window.paypal.Buttons.driver('react', { React, ReactDOM })
// 		})
// 	}
//
// 	// 1.
// 	async function createOrder (data: any, actions: any): Promise<any> {
// 		// console.log('payment', actions.payment)
// 		// console.log('payment data', data)
// 		const total = cart.totalPrice
// 		const currency = 'USD'
// 		const paypalCartItems = getPaypalFormatItems(cart, products)
// 		console.log('paypalCartItems', paypalCartItems)
// 		console.log('total', total)
//
// 		return actions.order.create({
// 			purchase_units: [{
// 				amount: {
// 					currency_code: currency,
// 					value: total,
// 					breakdown: {
// 						item_total: { value: total, currency_code: currency }
// 					}
// 				},
// 				invoice_id: Math.random().toString(36).substring(14),
// 				items: paypalCartItems,
// 				soft_descriptor: 'shop.every-Tuesday.com', // appears on CC statement
// 				description: 'Paypal payment for digital products on shop.every-Tuesday.com' // 127 characters
// 			}],
// 			application_context: {
// 				brand_name: 'Every-Tuesday',
// 				shipping_preference: 'NO_SHIPPING',
// 				user_action: 'PAY_NOW'
// 			}
// 		})
//
// 	}
//
// 	// 2a.
// 	async function onApproval (data: any, actions: any): Promise<any> {
// 		console.log('onApprove', data)
// 		console.log('onApprove actions', actions)
//
// 		try {
// 			// 2b.
// 			const myOrder = await createWcOrder()
// 			if (!myOrder || myOrder && myOrder.code !== 200) {
// 				actions.restart()
// 				onError('order create error')
// 				return
// 			}
//
// 			// Complete Transaction over PAYPALS server example
// 			return actions.order.capture().then(async (paymentData: IPaypalPaymentData) => {
// 				console.log('paymentData', paymentData)
//
// 				const paypalResponse: IPaypalSuccessOrder = {
// 					first_name: paymentData.payer.name.given_name,
// 					last_name: paymentData.payer.name.surname,
// 					paypal_email: paymentData.payer.email_address,
// 					paid: true,
// 					payment_id: data.orderId, // undefined do we need?
// 					payment_method: 'paypal_express',
// 					payment_token: 'null', // null do we need?
// 					paypal_transaction_id: paymentData.purchase_units[0].payments.captures[0].id,
// 					wc_order_id: myOrder.order.order_id
// 				}
// 				console.log('paypalResponse sent to WC', paypalResponse)
//
// 				// Go back to server with Paypal approval and finish order
// 				// send if paypal approved or not so we can complete or delete order
// 				// const result = await this.props.processPaypalOrder(paypalResponse)
// 				// console.log('result', result)
// 				props.clearForm()
//
// 			}).catch((e: Error) => {
// 				console.error('paypal success error', e)
// 			})
//
// 		} catch (e) {
// 			actions.restart()
// 			onError('order create error')
// 		}
//
// 	}
//
// 	// 2b. When the order is authed, create the order on our DB - set to pending
// 	async function createWcOrder (): Promise<IOrderResponse> {
// 		const myOrderData: IOrderDetails = {
// 			billing:
// 				{
// 					email: emailProps.email, // email they used with paypal
// 					first_name: emailProps.email
// 				},
// 			coupon_code: cart.coupon.valid ? cart.coupon.code : null,
// 			customer_user_agent: emailProps.email,
// 			line_items: wcCreateOrderLineItems(cart.items, products),
// 			payment_method: 'paypal_express',
// 			payment_method_title: 'Paypal Express',
// 			prices_include_tax: true,
// 			set_paid: false,
// 			total: displayCurrency(cart.totalPrice).substring(1),
// 			total_tax: displayCurrency(cart.totalPrice).substring(1)
// 		}
//
// 		return props.createOrder(myOrderData)
// 	}
//
// 	// this gets fired so far ...beacuse an error creating an order on our server
// 	// not sure where else to call this
// 	function onError (error: any) {
// 		console.log('Erroneous payment OR failed to load script!', error)
// 	}
//
// 	function onCancel (data: any) {
// 		console.log('Cancelled payment!', data)
// 	}
//
// 	const Button = useMemo(() => <PaypalButton
// 		client={
// 			{
// 				production: process.env.PAYPAL_TEST_KEY || '',
// 				sandbox: process.env.PAYPAL_TEST_KEY || ''
// 			}
// 		}
// 		PaypalCheckouButton={PaypalButtonLoader}
// 		createOrder={createOrder}
// 		onApprove={onApproval}
// 		onCancel={onCancel}
// 		onError={onError}
// 	/>, [Paypal])
// 	return (
// 		<div>
// 			{!emailProps.valid && <div>disable paypal btn fake</div>}
// 			{Paypal && Button}
// 		</div>
// 	)
// }
//
//
// const mapStateToProps = (state: IState): any => {
// 	return {
// 		cart: state.cart,
// 		products: state.products
// 	}
// }
//
// const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
// 	return {
// 		createOrder: bindActionCreators(createOrderAction, dispatch)
// 		// processPaypalOrder: bindActionCreators(processPaypalOrder, dispatch)
// 	}
// }
// export default connect<IReduxState, IReduxActions, IPropsPublic, IState>(mapStateToProps, mapDispatchToProps)(PayPalProviderOLD)
