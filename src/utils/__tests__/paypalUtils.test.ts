import {
	coupons,
	ProductKey,
	testCartWithFreeItem,
	testCartWithMultiples,
	testCartWithMultiplesFixedCartCoupon, testCartWithMultiplesFixedCartCouponWithFREEITEM,
	testCartWithMultiplesFixedSingleItemCoupon, testCartWithMultiplesPercentageSingleItemCoupon,
	testCartWithMultiplesPercentCartCoupon,
	testProducts
} from '@redux/reduxTestUtils'
import { calcCartDiscountPerItem, getPaypalFormatItems, numberOfFreeItemsInCart } from '@utils/paypalUtils'
import { displayCurrency } from '@utils/priceUtils'
import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('Paypal Utils Tests', () => {

	it('Should have zero free items in the cart', () => {
		const freeItems = numberOfFreeItemsInCart(testCartWithMultiples.items)
		expect(freeItems).toEqual(0)
	})

	it('Should have 1 free item in cart', () => {
		const freeItems = numberOfFreeItemsInCart(testCartWithFreeItem.items)
		expect(freeItems).toEqual(1)
	})

	it('Should calc discount per item for fixed coupon equally', () => {
		const discount = calcCartDiscountPerItem(testCartWithMultiples.totalPrice, testCartWithMultiples.totalItems, coupons.fixedCart)
		expect(discount).toEqual(6.27)
	})

	// convert to decimal *
	// discount = total * percent
	// discount / totalItems - return discount off each item
	it('Should calc discount per item for percentage-cart equally', () => {
		const discount = calcCartDiscountPerItem(testCartWithMultiples.totalPrice, testCartWithMultiples.totalItems, coupons.percentCart)
		expect(discount).toEqual(4.29)
	})
	it('Should return correct paypal structured object', () => {
		const items = getPaypalFormatItems(testCartWithMultiples, testProducts)
		const item1 = testCartWithMultiples.items[ProductKey.WatercolorStd]
		const item2 = testCartWithMultiples.items[ProductKey.Skinnyjeans]
		const result = [
			{
				currency: 'USD',
				name: item1.name,
				unit_amount: {
					value: displayCurrency(item1.price).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item1.qty,
				sku: testProducts[item1.slug].sku,
				category: 'DIGITAL_GOODS'
			},
			{
				currency: 'USD',
				name: item2.name,
				// description: 'item desc',
				unit_amount: {
					value: displayCurrency(item2.price).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item2.qty,
				sku: testProducts[item2.slug].sku,
				category: 'DIGITAL_GOODS'
			}
		]
		expect(items).toEqual(result)
	})
	it('Should return correct paypal structured object: Fixed_Cart Coupon', () => {
		const items = getPaypalFormatItems(testCartWithMultiplesFixedCartCoupon, testProducts)
		const item1 = testCartWithMultiplesFixedCartCoupon.items[ProductKey.WatercolorStd]
		const item2 = testCartWithMultiplesFixedCartCoupon.items[ProductKey.Skinnyjeans]
		const result = [
			{
				currency: 'USD',
				name: item1.name,
				unit_amount: {
					value: displayCurrency(9.73).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item1.qty,
				sku: testProducts[item1.slug].sku,
				category: 'DIGITAL_GOODS'
			},
			{
				currency: 'USD',
				name: item2.name,
				unit_amount: {
					value: displayCurrency(3.72).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item2.qty,
				sku: testProducts[item2.slug].sku,
				category: 'DIGITAL_GOODS'
			}
		]
		expect(items).toEqual(result)
	})
	it('Should return correct paypal structured object: Percentage_Cart Coupon', () => {
		const items = getPaypalFormatItems(testCartWithMultiplesPercentCartCoupon, testProducts)
		const item1 = testCartWithMultiplesPercentCartCoupon.items[ProductKey.WatercolorStd]
		const item2 = testCartWithMultiplesPercentCartCoupon.items[ProductKey.Skinnyjeans]

		// item1 price = 16
		// item2 price = 13 on sale 9.99

		const result = [
			{
				currency: 'USD',
				name: item1.name,
				unit_amount: {
					value: displayCurrency(10.72).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item1.qty,
				sku: testProducts[item1.slug].sku,
				category: 'DIGITAL_GOODS'
			},
			{
				currency: 'USD',
				name: item2.name,
				unit_amount: {
					value: displayCurrency(6.69).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item2.qty,
				sku: testProducts[item2.slug].sku,
				category: 'DIGITAL_GOODS'
			}
		]
		expect(items).toEqual(result)
	})
	it('Should return correct paypal structured object: Fixed Item Coupon', () => {
		const items = getPaypalFormatItems(testCartWithMultiplesFixedSingleItemCoupon, testProducts)
		const item1 = testCartWithMultiplesFixedSingleItemCoupon.items[ProductKey.WatercolorStd]
		const item2 = testCartWithMultiplesFixedSingleItemCoupon.items[ProductKey.Skinnyjeans]
		const result = [
			{
				currency: 'USD',
				name: item1.name,
				unit_amount: {
					value: displayCurrency(3.46).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item1.qty,
				sku: testProducts[item1.slug].sku,
				category: 'DIGITAL_GOODS'
			},
			{
				currency: 'USD',
				name: item2.name,
				unit_amount: {
					value: displayCurrency(9.99).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item2.qty,
				sku: testProducts[item2.slug].sku,
				category: 'DIGITAL_GOODS'
			}
		]
		expect(items).toEqual(result)
	})
	it('Should return correct paypal structured object: Percent Item Coupon', () => {
		const items = getPaypalFormatItems(testCartWithMultiplesPercentageSingleItemCoupon, testProducts)
		const item1 = testCartWithMultiplesPercentageSingleItemCoupon.items[ProductKey.WatercolorStd]
		const item2 = testCartWithMultiplesPercentageSingleItemCoupon.items[ProductKey.Skinnyjeans]
		const result = [
			{
				currency: 'USD',
				name: item1.name,
				unit_amount: {
					value: displayCurrency(10.72).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item1.qty,
				sku: testProducts[item1.slug].sku,
				category: 'DIGITAL_GOODS'
			},
			{
				currency: 'USD',
				name: item2.name,
				unit_amount: {
					value: displayCurrency(9.99).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item2.qty,
				sku: testProducts[item2.slug].sku,
				category: 'DIGITAL_GOODS'
			}
		]
		expect(items).toEqual(result)
	})
	it('Should return correct paypal structured object: PWYW in items', () => {
		const items = getPaypalFormatItems(testCartWithMultiplesFixedCartCouponWithFREEITEM, testProducts)
		const item1 = testCartWithMultiplesFixedCartCouponWithFREEITEM.items[ProductKey.WatercolorStd]
		const item2 = testCartWithMultiplesFixedCartCouponWithFREEITEM.items[ProductKey.Skinnyjeans]
		const item3 = testCartWithMultiplesFixedCartCouponWithFREEITEM.items[ProductKey.Honeymoon]
		const result = [
			{
				currency: 'USD',
				name: item1.name,
				unit_amount: {
					value: displayCurrency(9.73).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item1.qty,
				sku: testProducts[item1.slug].sku,
				category: 'DIGITAL_GOODS'
			},
			{
				currency: 'USD',
				name: item2.name,
				unit_amount: {
					value: displayCurrency(3.72).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item2.qty,
				sku: testProducts[item2.slug].sku,
				category: 'DIGITAL_GOODS'
			},
			{
				currency: 'USD',
				name: item3.name,
				unit_amount: {
					value: displayCurrency(0).substring(1), // $4.00 example
					currency_code: 'USD'
				},
				quantity: item3.qty,
				sku: testProducts[item3.slug].sku,
				category: 'DIGITAL_GOODS'
			}
		]
		expect(items).toEqual(result)
	})

})
