import { coupons, testCartWithMultiples } from '@redux/reduxTestUtils'
import { getCartTotal } from '@utils/cartUtils'
import { matchString } from '@utils/genUtils'
import { cleanup } from 'react-testing-library'

afterEach(cleanup)

describe('General Utils', () => {
	it('Should return true or false matching a regex string', () => {
		const matchRegex = matchString('http://siteurl.com/v1/jwt-auth/', 'jwt-auth')
		const matchNoRegex = matchString('http://siteurl.com/v1/wp-json/', 'jwt-auth')
		expect(matchRegex).toEqual(true)
		expect(matchNoRegex).toEqual(false)
	})
	it('Coupon Fixed-Cart: Should return correct total.', () => {
		const total = getCartTotal(testCartWithMultiples.items, coupons.fixedCart)
		const result = { 'discountedTotal': 13.45, 'total': 25.99 }
		expect(total).toEqual(result)
	})
	it('Coupon Percent-Cart: Should return correct total.', () => {
		const total = getCartTotal(testCartWithMultiples.items, coupons.percentCart)
		const result = { 'discountedTotal': 17.41, 'total': 25.99 }
		expect(total).toEqual(result)
	})
	it('Coupon Percent-SingleItem: Should return correct total.', () => {
		const total = getCartTotal(testCartWithMultiples.items, coupons.percentItem)
		// single item 10.72 + 9.99
		const result = { 'discountedTotal': 20.71, 'total': 25.99 }
		expect(total).toEqual(result)
	})
	it('Coupon Fixed-SingleItem: Should return correct total.', () => {
		const total = getCartTotal(testCartWithMultiples.items, coupons.fixedProduct)
		const result = { 'discountedTotal': 13.45, 'total': 25.99 }
		expect(total).toEqual(result)
	})
})
