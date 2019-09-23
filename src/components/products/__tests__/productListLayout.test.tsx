import { ProductKey, testProducts } from '@redux/reduxTestUtils'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import ProductsListLayout from '../productsListLayout'
import { StaticQuery } from 'gatsby'

beforeEach(() => {
	// @ts-ignore
	StaticQuery.mockImplementationOnce((mock: any) =>
		mock.render({
			allWcProduct: {
				edges: [
					{
						node: {
							...testProducts[ProductKey.Honeymoon]
						}
					},
					{
						node: {
							...testProducts[ProductKey.WatercolorStd]
						}
					},
					{
						node: {
							...testProducts[ProductKey.WatercolorExt]
						}
					}
				]
			}
		})
	)
})
afterEach(cleanup)

describe('Product List Layout', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<ProductsListLayout filter=''/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct items', () => {
		const modalRender = render(<ProductsListLayout filter=''/>)
		const list = modalRender.getByTestId('productList')
		expect(list.children.length).toEqual(2)
	})

	it('Should render filter correct items', () => {
		const modalRender = render(<ProductsListLayout filter='fonts'/>)
		const list = modalRender.getByTestId('productList')
		expect(list.children.length).toEqual(1)
	})

})
