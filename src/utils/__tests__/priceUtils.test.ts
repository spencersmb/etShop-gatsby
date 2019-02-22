import { ICouponCode } from '@et/types/Cart'
import { calcBulkDiscount, calcBulkPriceDiscount, calcCouponDiscount, displayCurrency } from '@utils/priceUtils'
import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('Price Utility helpers', () => {

	it('Should calculate a discounted price based on qty', () => {
		const discount = calcBulkDiscount('20')
		expect(discount).toEqual('18')
	})

	it('Should check if bulkPrice is enabled and return correct price', () => {
		const noDiscount = calcBulkPriceDiscount(false, '20')
		const discount = calcBulkPriceDiscount(true, '20')

		expect(noDiscount).toEqual('20')
		expect(discount).toEqual('18')
	})

	it('Should display a price with dollar sign for string or number type', () => {
		const numberType = displayCurrency(12.5)
		const stringType = displayCurrency('12.5')

		expect(numberType).toEqual('$12.50')
		expect(stringType).toEqual('$12.50')
	})

	it('Should return a number instead of a fixed string for calcCouponDiscount', () => {
		const fixed: ICouponCode = {
			code: 'free-test',
			discount: '12.54',
			loading: false,
			product_ids: [],
			submitted: true,
			type: 'fixed_cart',
			valid: true
		}
		const discount = calcCouponDiscount(fixed, 20)

		expect(discount).toEqual(12.54)
	})

	it('Should return a percentage instead of a string for calcCouponDiscount', () => {
		const fixed: ICouponCode = {
			code: '3rd-test',
			discount: '33.00',
			loading: false,
			product_ids: [],
			submitted: true,
			type: 'percent',
			valid: true
		}
		const discount = calcCouponDiscount(fixed, 20)

		expect(discount).toEqual(6.6)
	})

})