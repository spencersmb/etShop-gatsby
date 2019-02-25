import { CheckoutTotal } from '@components/cart/checkout/checkoutTotal'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const props = {
	cartTotal: 12
}
describe('Checkout Total', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<CheckoutTotal {...props}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render header', () => {
		const modalRender = render(<CheckoutTotal {...props}/>)
		expect(modalRender.getByText('Order Summery Title')).toBeTruthy()
	})

	it('Should render correct Total', () => {
		const modalRender = render(<CheckoutTotal {...props}/>)
		expect(modalRender.getByTestId('orderTotal').innerHTML).toEqual('Order Total: $12.00')
	})

})