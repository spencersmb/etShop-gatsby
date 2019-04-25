import ProductListItem from '@components/products/productListItem'
import CheckoutTab from '@components/tabs/checkoutTab'
import { IProduct } from '@et/types/Products'
import { ProductKey, testProducts } from '@redux/reduxTestUtils'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const props: IProduct = testProducts[ProductKey.WatercolorStd]
describe('Product ListItem Tests', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<ProductListItem {...props}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render an img component', () => {
		const modalRender = render(<ProductListItem {...props}/>)
		const img = modalRender.getByAltText('alt')
		expect(img).toBeDefined()
	})
	it('Should render correct title', () => {
		const modalRender = render(<ProductListItem {...props}/>)
		expect(modalRender.getByText(props.name).innerHTML).toEqual(props.name)
	})
	it('Should render correct sub header', () => {
		const modalRender = render(<ProductListItem {...props}/>)
		expect(modalRender.getByText(props.sub_header).innerHTML).toEqual(props.sub_header)
	})
	it('Should render correct price', () => {
		const modalRender = render(<ProductListItem {...props}/>)
		expect(modalRender.getByText('$' + props.price).innerHTML).toEqual('$' + props.price)
	})

})