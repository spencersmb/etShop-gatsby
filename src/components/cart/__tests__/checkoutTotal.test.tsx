import { CheckoutTotal } from '@components/cart/checkout/checkoutTotal'
import { testCartWithItem } from '@redux/reduxTestUtils'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const props = {
	cart: testCartWithItem,
	showCouponInput: false,
	setShowCouponInput: jest.fn()
}
describe('Checkout Total', () => {

	it('Should render header', () => {
		const modalRender = render(<CheckoutTotal {...props}/>)
		expect(modalRender.getByText('Order Summery')).toBeTruthy()
	})

	it('Should render correct Total', () => {
		const modalRender = render(<CheckoutTotal {...props}/>)
		expect(modalRender.getByTestId('orderTotal').innerHTML).toEqual('<span class="orderTotal__name">Total</span>$12')
	})

})
