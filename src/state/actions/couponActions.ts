import { CheckoutApi } from '@api/checkoutApi'
import { Actions } from '@et/types/Actions'
import { ICouponApiResponse, ICouponRaw } from '@et/types/Cart'
import { CouponActionTypes } from '@et/types/Enums'
import { updateCartPrice } from '@redux/actions/cartActions'
import { statusCheck } from '@utils/apiUtils'
import { Action, Dispatch } from 'redux'

/*
* * Tested!
	Coupon Flow:
	1. Get coupon from server and store in cart.couponCode
	2. When viewing cart - line items in cart Calculate coupon price on the fly
		check if cart has a valid coupon - and then calculate the discount
		{this.hasCoupon() && <div>Item discount: -{this.calcDiscount()}</div>}
	3. Calc coupon discount for cart Total in the UpdateCartPrice Reducer using a utils function called getCartTotal
		 - check if the coupon is for a single product or cart.
		 - For single products when we loop through to calc total, we check if the ids match the coupon 'allowed products'
		 - For cart, we apply the discount after all the products have been added up
	 4. Coupon is not saved in localstorage so users who refresh page must re-enter coupon
 */
export const submitCouponCode = (couponCode: string) => async (dispatch: Dispatch<Action>): Promise<any> => {

	// dispatch valid coupon to get added to cart
	dispatch({
		type: CouponActionTypes.SUBMIT_COUPON
	})

	try {
		const response: Response = await CheckoutApi.checkCoupon(couponCode)

		await statusCheck(response, dispatch)

		const body: ICouponApiResponse = await response.json()

		// Check if coupon was valid or not
		if (body.code === 400) {
			dispatch(loadCouponInvalid())
		} else {
			dispatch(loadCouponSuccess(body.data.coupon))
			dispatch(updateCartPrice())
		}

	} catch (e) {
		dispatch(loadCouponInvalid())
		console.error('coupon code')
	}
}

/*
* * Tested!
*/
export type ICouponSuccessAction = (coupon: ICouponRaw) => Actions
export const loadCouponSuccess = (coupon: ICouponRaw) => {
	return {
		payload: {
			coupon
		},
		type: CouponActionTypes.SUBMIT_COUPON_SUCCESS
	}
}

/*
* * Tested!
*/
export const loadCouponInvalid = () => {
	return {
		type: CouponActionTypes.SUBMIT_COUPON_INVALID
	}
}

export const submitCoupon = () => {
	return {
		type: CouponActionTypes.SUBMIT_COUPON
	}
}