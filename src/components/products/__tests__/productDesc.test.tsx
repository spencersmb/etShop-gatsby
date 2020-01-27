import ProductDescription from '@components/products/modules/productDesc'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup, wait
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const propsDefault = {
	instructions: 'instructions',
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

	it('Should render correct description', () => {
		const modalRender = render(<ProductDescription {...propsDefault}/>)
		expect(modalRender.getByTestId('desc').innerHTML).toEqual(propsDefault.intro_description)
	})

	it('Should render 2 Nav items', () => {
		const modalRender = render(<ProductDescription {...propsDefault}/>)
		expect(modalRender.getByTestId('productNav').children.length).toEqual(2)
	})

	it('Should not render instructions content first', () => {
		const modalRender = render(<ProductDescription {...propsDefault}/>)
		expect(modalRender.queryAllByTestId('instructions').length).toEqual(0)
	})

	it('Should render instructions content', async () => {
		const modalRender = render(<ProductDescription {...propsDefault}/>)
		const navBtn = modalRender.getByTestId('install-nav-item')
		navBtn.click()
		await wait(() => {
			expect(modalRender.getByTestId('instructions').innerHTML).toEqual(propsDefault.instructions)
		})
	})
})
