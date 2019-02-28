import { CheckoutApi } from '@api/checkoutApi'
import { OrderActionTypes } from '@et/types/Enums'
import { IOrderDetails, IOrderResponse } from '@et/types/WC_Order'
import { statusCheck } from '@utils/apiUtils'
import { Action, Dispatch } from 'redux'

export type ICreateOrderAction = (orderData: IOrderDetails, stripeToken?: stripe.Token) => Promise<IOrderResponse>
export const createOrder = (orderData: IOrderDetails, stripeToken?: stripe.Token) => async (dispatch: Dispatch<Action>): Promise<IOrderResponse> => {
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

	dispatch({
		type: OrderActionTypes.ORDER_SUCCESS
	})
	// return order
	return json
}