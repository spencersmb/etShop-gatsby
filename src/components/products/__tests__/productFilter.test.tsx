import ProductFilter from '@components/products/productFilter'
import React from 'react'
import renderer from 'react-test-renderer'
import { render } from 'react-testing-library'

const props = {
	handleClick: jest.fn(),
	filter: ''
}

describe('product Filter', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(
				<ProductFilter {...props}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should handleClick correctly', () => {
		const modalRender = render(<ProductFilter {...props} filter=''/>)
		const button = modalRender.getAllByTestId('filterItems')[0]
		button.click()
		expect(props.handleClick).toHaveBeenCalledTimes(1)
		expect(props.handleClick).toHaveBeenCalledWith('fonts')
	})
})