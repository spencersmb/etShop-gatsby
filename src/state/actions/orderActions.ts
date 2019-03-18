import { CheckoutApi } from '@api/checkoutApi'
import { OrderActionTypes, PaginationTypes } from '@et/types/Enums'
import { IPaypalSuccessOrder } from '@et/types/Paypal'
import { IState } from '@et/types/State'
import { IOrderDetails, IOrderResponse } from '@et/types/WC_Order'
import { addItemAfterOrder, clearFirstPage } from '@redux/actions/paginationActions'
import { statusCheck } from '@utils/apiUtils'
import { Action, Dispatch } from 'redux'

/**
 * * Tested
 */
export type ICreateOrderAction = (orderData: IOrderDetails, stripeToken?: stripe.Token) => Promise<IOrderResponse>
export const createOrder = (orderData: IOrderDetails, stripeToken?: stripe.Token) => async (dispatch: Dispatch<Action>, getState: any): Promise<IOrderResponse> => {
	dispatch({
		type: OrderActionTypes.SUBMIT_ORDER
	})

	let completeOrder
	if (orderData.payment_method === 'stripe' && stripeToken) {
		completeOrder = {
			payment_token: stripeToken.id,
			...orderData
		}
	} else {
		completeOrder = { ...orderData }
	}

	const request: Response = await CheckoutApi.submitStripeOrder(completeOrder)

	await statusCheck(request, dispatch)

	const json: IOrderResponse = await request.json()

	// if an order was made
	// clear all pages

	const state: IState = getState()
	if (state.pagination.pages[1]) {
		// dispatch(clearFirstPage())
		dispatch(addItemAfterOrder(json))
	}

	// return order
	return json
}

/**
 * * Tested
 */
export type IProcessPaypalOrderAction = (paypalOrderData: IPaypalSuccessOrder) => Promise<IOrderResponse>
export const processPaypalOrder = (paypalOrderData: IPaypalSuccessOrder) => async (dispatch: Dispatch<Action>): Promise<IOrderResponse> => {

	const request: Response = await CheckoutApi.processPaypalOrder(paypalOrderData)
	await statusCheck(request, dispatch)
	const json: IOrderResponse = await request.json()

	dispatch({
		type: OrderActionTypes.COMPLETE_PAYPAL_ORDER_SUCCESS
	})

	// return order
	return json
}