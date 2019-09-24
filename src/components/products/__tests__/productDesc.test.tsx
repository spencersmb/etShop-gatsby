import ProductDescription from '@components/products/modules/productDesc'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const propsDefault = {
	intro_title: 'product intro title',
	intro_description: 'intro desc'
}
describe('Product Description', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(
				<ProductDescription {...propsDefault}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct title', () => {
		const modalRender = render(<ProductDescription {...propsDefault}/>)
		expect(modalRender.getByTestId('title').innerHTML).toEqual(propsDefault.intro_title)
	})
	it('Should render correct description', () => {
		const modalRender = render(<ProductDescription {...propsDefault}/>)
		expect(modalRender.getByTestId('desc').innerHTML).toEqual(propsDefault.intro_description)
	})
})
