import { CheckoutApi } from '@api/checkoutApi'
import { OrderActionTypes, PaginationTypes } from '@et/types/Enums'
import { IPaypalSuccessOrder } from '@et/types/Paypal'
import { IState } from '@et/types/State'
import { IOrderDetails, IOrderResponse } from '@et/types/WC_Order'
import { addItemAfterOrder, clearPagination } from '@redux/actions/paginationActions'
import { statusCheck } from '@utils/apiUtils'
import { Action, Dispatch } from 'redux'

/**
 * * Tested
 */
export type ICreateOrderAction = (orderData: IOrderDetails, stripeSourceToken?: string) => Promise<IOrderResponse>
export const createOrder = (orderData: IOrderDetails, stripeSourceToken?: string) => async (dispatch: Dispatch<Action>, getState: any): Promise<IOrderResponse> => {
	dispatch({
		type: OrderActionTypes.SUBMIT_ORDER
	})

	let completeOrder
	if (orderData.payment_method === 'stripe' && stripeSourceToken) {
		completeOrder = {
			payment_token: stripeSourceToken,
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
	if (state.pagination.pages[1] && orderData.payment_method === 'stripe') {
		// dispatch(clearPagination())
		dispatch(addItemAfterOrder(json))
	}

	// return order
	return json
}

/**
 * * Tested
 */
export type IProcessPaypalOrderAction = (paypalOrderData: IPaypalSuccessOrder) => Promise<IOrderResponse>
export const processPaypalOrder = (paypalOrderData: IPaypalSuccessOrder) => async (dispatch: Dispatch<Action>, getState: any): Promise<IOrderResponse> => {

	const request: Response = await CheckoutApi.processPaypalOrder(paypalOrderData)
	await statusCheck(request, dispatch)
	const json: IOrderResponse = await request.json()

	dispatch({
		type: OrderActionTypes.COMPLETE_PAYPAL_ORDER_SUCCESS
	})

	const state: IState = getState()
	if (state.pagination.pages[1]) {
		// dispatch(clearPagination())
		dispatch(addItemAfterOrder(json))
	}

	// return order
	return json
}
