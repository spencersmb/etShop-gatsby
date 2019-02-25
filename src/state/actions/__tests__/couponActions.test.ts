import { CartActionTypes, CouponActionTypes } from '@et/types/Enums'
import nock from 'nock'
import { loadCouponInvalid, loadCouponSuccess, submitCouponCode } from '@redux/actions/couponActions'
import { coupons } from '@redux/reduxTestUtils'
import { cleanup } from 'react-testing-library'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import initialState from '@redux/reducers/initialState'
import config from '../../../../gatsby-config'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
afterEach(cleanup)
describe('Cart Action tests', () => {

	it('Should have 3 types SUBMIT_COUPON, COUPON_SUCCESS & UPDATE_CART_PRICE', () => {
		const store = mockStore(initialState)
		const bodyData = {
			...coupons.rawValidFixedCart
		}
		const actionResponse = [
			{
				type: CouponActionTypes.SUBMIT_COUPON
			},
			{
				payload: {
					coupon: coupons.rawValidFixedCart.data.coupon
				},
				type: CouponActionTypes.SUBMIT_COUPON_SUCCESS
			},
			{
				type: CartActionTypes.UPDATE_CART_PRICE
			}
		]
		nock(config.siteMetadata.db)
			.defaultReplyHeaders({
				'Content-Type': 'application/json'
			})
			.get(`/wp-json/et-shop/getCoupon/free-test`)
			.reply(200, bodyData)

		// @ts-ignore
		return store.dispatch(submitCouponCode('free-test'))
			.then(() => {
				const expectedActions = store.getActions()

				expect(expectedActions.length).toBe(3)
				expect(expectedActions).toEqual(actionResponse)
			})
	})

	it('Should have correct valid coupon response and payload', () => {
		const store = mockStore(initialState)
		store.dispatch(loadCouponSuccess(coupons.rawValidFixedCart.data.coupon))
		const getActions = store.getActions()
		const expectedActions =
			{
				payload: {
					coupon: coupons.rawValidFixedCart.data.coupon
				},
				type: CouponActionTypes.SUBMIT_COUPON_SUCCESS
			}

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual([expectedActions])
	})

	it('Should have correct invalid coupon response', () => {
		const store = mockStore(initialState)
		store.dispatch(loadCouponInvalid())
		const getActions = store.getActions()
		const expectedActions =
			{
				type: CouponActionTypes.SUBMIT_COUPON_INVALID
			}

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual([expectedActions])
	})
})