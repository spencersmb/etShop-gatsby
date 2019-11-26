import {
	ProductKey,
	testCartWithItemAndCoupon,
	testCartWithMultiples,
	testGuest,
	testProducts,
	testUser
} from '@redux/reduxTestUtils'
import { createHeaders, wc_createBilling, wc_createOrder, wcCreateOrderLineItems } from '@utils/orderUtils'
import { displayCurrency } from '@utils/priceUtils'
import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('Order Utility Tests', () => {

	it('Should return guest billing data', () => {
		const billing = wc_createBilling(null, testGuest)
		const result = {
			email: testGuest.email,
			first_name: testGuest.firstName,
			last_name: testGuest.lastName
		}
		expect(billing).toEqual(result)
	})

	it('Should return logged in user billing data', () => {
		const billing = wc_createBilling(testUser, testGuest)
		const result = {
			email: testUser.email,
			first_name: testUser.firstName,
			last_name: testUser.lastName
		}
		expect(billing).toEqual(result)
	})

	it('Should return an Order ready for WC with no coupon', () => {
		const billing = wc_createBilling(null, testGuest)
		const order = wc_createOrder(testCartWithMultiples, billing, testProducts)
		const result = {
			cardType: 'Stripe',
			billing,
			coupon_code: null,
			customer_user_agent: billing.email,
			line_items: wcCreateOrderLineItems(testCartWithMultiples.items, testProducts),
			payment_method: testCartWithMultiples.paymentType,
			payment_method_title: `Credit Card (${testCartWithMultiples.paymentType})`,
			prices_include_tax: true,
			set_paid: false,
			total: displayCurrency(testCartWithMultiples.totalPrice).substring(1), // 12.00 - string
			total_tax: displayCurrency(testCartWithMultiples.totalPrice).substring(1)
		}
		expect(order).toEqual(result)
	})

	it('Should return an Order ready for WC with coupon', () => {
		const billing = wc_createBilling(null, testGuest)
		const order = wc_createOrder(testCartWithItemAndCoupon, billing, testProducts)
		const result = {
			cardType: 'Stripe',
			billing,
			coupon_code: testCartWithItemAndCoupon.coupon.code,
			customer_user_agent: billing.email,
			line_items: wcCreateOrderLineItems(testCartWithItemAndCoupon.items, testProducts),
			payment_method: testCartWithItemAndCoupon.paymentType,
			payment_method_title: `Credit Card (${testCartWithItemAndCoupon.paymentType})`,
			prices_include_tax: true,
			set_paid: false,
			total: displayCurrency(testCartWithItemAndCoupon.totalPrice).substring(1), // 12.00 - string
			total_tax: displayCurrency(testCartWithItemAndCoupon.totalPrice).substring(1)
		}
		expect(order).toEqual(result)
	})

	it('Should return an array of products as a line items for WC', () => {
		const lineItems = wcCreateOrderLineItems(testCartWithMultiples.items, testProducts)
		const item1 = testCartWithMultiples.items[ProductKey.WatercolorStd]
		const item2 = testCartWithMultiples.items[ProductKey.Skinnyjeans]
		const result = [
			{
				product_id: item1.id,
				name: item1.name,
				price: item1.price,
				pwyw: {
					enabled: false,
					price: '16'
				},
				quantity: item1.qty,
				bulkDiscount: false
			},
			{
				product_id: item2.id,
				name: item2.name,
				price: item2.price,
				bulkDiscount: false,
				pwyw: {
					enabled: false,
					price: '9.99'
				},
				quantity: item2.qty
			}
		]
		expect(lineItems).toEqual(result)
	})

	it('Should return correct headers', () => {
		const headers = createHeaders()
		const result = {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
		}
		expect(headers).toEqual(result)
	})

})
