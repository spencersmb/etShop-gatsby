import { CartPricingConfig } from '@components/cart/cartStatics'
import { ICouponRaw, ICouponState } from '@et/types/Cart'
import { ProductKey, testProducts } from '@redux/reduxTestUtils'
import {
	calcBulkDiscount,
	calcBulkPriceDiscount,
	calcCouponDiscount, calcTotalQtyPrice, chooseDiscountPercentage,
	displayCurrency, displayPercent,
	getPrice
} from '@utils/priceUtils'
import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('Price Utility helpers', () => {

	it('calcBulkDiscount: Should calculate a correct TIER discount price based on qty', () => {
		const discount = calcBulkDiscount('20', 1)
		expect(discount).toEqual('20')

		const discountTier1 = calcBulkDiscount('20', 12)
		expect(discountTier1).toEqual('18')

		const discountTier2 = calcBulkDiscount('20', 55)
		expect(discountTier2).toEqual('16')

		const discountTier3 = calcBulkDiscount('20', 105)
		expect(discountTier3).toEqual('14')
	})

	it('calcBulkPriceDiscount: Should check if bulkPrice is enabled and return correct price', () => {
		const noDiscount = calcBulkPriceDiscount(false, '20')
		const discount = calcBulkPriceDiscount(true, '20', 12)

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
		const fixed: ICouponState = {
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
		const fixed: ICouponState = {
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

	it('Should return Sale Price if on sale, or regular price if not', () => {
		const onSale = getPrice(testProducts[ProductKey.Skinnyjeans])
		const noSale = getPrice(testProducts[ProductKey.WatercolorStd])

		expect(onSale).toEqual(testProducts[ProductKey.Skinnyjeans].sale_price)
		expect(noSale).toEqual(testProducts[ProductKey.WatercolorStd].price)

	})

	it('chooseDiscountPercentage: Should choose a correct TIER discount price based on qty', () => {
		const noDiscount = chooseDiscountPercentage(1)
		expect(noDiscount).toEqual(0)

		const discountTier1 = chooseDiscountPercentage(12)
		expect(discountTier1).toEqual(CartPricingConfig.discountTier1)

		const discountTier2 = chooseDiscountPercentage(55)
		expect(discountTier2).toEqual(CartPricingConfig.discountTier2)

		const discountTier3 = chooseDiscountPercentage(105)
		expect(discountTier3).toEqual(CartPricingConfig.discountTier3)
	})

	it('displayPercent: Should convert a decimal number and display it as a percent number', () => {
		const noDiscount = displayPercent(.55)
		expect(noDiscount).toEqual(55)
	})

	it('calcTotalQtyPrice: Should display a formatted price or $0.00 if string found', () => {
		const basicPrice = calcTotalQtyPrice('10.55', 2)
		expect(basicPrice).toEqual('$21.10')

		const noPrice = calcTotalQtyPrice('10.55', '0')
		expect(noPrice).toEqual('$0.00')
	})
})
