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
							id: '367dd45d-e237-591c-9da7-c29d657da816',
							name: 'Honeymoon',
							slug: 'honeymoon',
							date_created_gmt: '2018-10-10T14:47:44',
							images: []
						}
					},
					{
						node: {
							id: '202eca74-fc90-56e7-8269-b59f18a19194',
							name: 'Watercolor texture kit Vol. 1',
							slug: 'watercolor-texture-kit-vol-1',
							date_created_gmt: '2018-09-25T20:35:51',
							images: [
								{
									id: 13,
									fullSize: {
										url: 'http://shopeverytuesday.local/wp-content/uploads/2018/06/seamless-watercolor-patterns-preview.jpg'
									},
									localFile: {
										size: 88519,
										name: 'seamless-watercolor-patterns-preview',
										id: 'c8aeed2f-ab4f-5478-adad-c12d6e4e57f3',
										childImageSharp: {
											fluid: {
												sizes: '(max-width: 1000px) 100vw, 1000px',
												src: '/static/a5ca9e682952d79588dee87feeec37a5/1a92f/seamless-watercolor-patterns-preview.jpg',
												presentationHeight: 509,
												presentationWidth: 1000
											},
											fixed: {
												width: 300,
												height: 153,
												src: '/static/a5ca9e682952d79588dee87feeec37a5/ec435/seamless-watercolor-patterns-preview.jpg'
											}
										}
									}
								}
							]
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
				<ProductsListLayout/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct items', () => {
		const modalRender = render(<ProductsListLayout/>)
		const list = modalRender.getByTestId('productList')
		expect(list.children.length).toEqual(2)
	})

})