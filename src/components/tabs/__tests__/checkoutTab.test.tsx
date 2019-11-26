import CheckoutTab from '@components/tabs/checkoutTab'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const props = {
	paymentType: 'stripe',
	handleClick: jest.fn(),
	selected: true
}
describe('Checkout Tab', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<CheckoutTab {...props}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct type', () => {
		const modalRender = render(<CheckoutTab {...props}/>)
		expect(modalRender.getByTestId('tab-stripe').children[0].innerHTML).toBeDefined()
	})

	it('Should call handleClick', () => {
		const modalRender = render(<CheckoutTab {...props}/>)
		const btn = modalRender.getByTestId('tab-stripe')
		btn.click()
		expect(props.handleClick).toHaveBeenCalledTimes(1)
		expect(props.handleClick).toHaveBeenCalledWith('stripe')
	})

})
