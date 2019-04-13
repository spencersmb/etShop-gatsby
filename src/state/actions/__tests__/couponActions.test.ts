import { CouponActionTypes } from '@et/types/Enums'
import { loadCouponInvalid, loadCouponSuccess, submitCoupon } from '@redux/actions/couponActions'
import { coupons } from '@redux/reduxTestUtils'
import { cleanup } from 'react-testing-library'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import initialState from '@redux/reducers/initialState'

const dataBase: string = process.env.GATSBY_DB || 'http://shopeverytuesday.local'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
afterEach(cleanup)
describe('Cart Action tests', () => {

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

	it('Should have submit coupon response', () => {
		const store = mockStore(initialState)
		store.dispatch(submitCoupon())
		const getActions = store.getActions()
		const expectedActions =
			{
				type: CouponActionTypes.SUBMIT_COUPON
			}

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual([expectedActions])
	})
})