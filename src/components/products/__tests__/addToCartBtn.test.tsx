import { AddToCartBtn } from '@components/products/addToCartBtn'
import { ProductKey, testCartEmpty, testProducts } from '@redux/reduxTestUtils'
import { calcTotalQtyPrice } from '@utils/priceUtils'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const propsDefault = {
	handleAddToCartState: jest.fn(),
	isInCart: false,
	slug: ProductKey.WatercolorStd,
	selectedProduct: testProducts[ProductKey.WatercolorStd],
	licenseQty: 0,
	price: testProducts[ProductKey.WatercolorStd].price,
	cart: testCartEmpty,
	addToCart: jest.fn(),
	cartToggle: jest.fn(),
	total: calcTotalQtyPrice(testProducts[ProductKey.WatercolorStd].price, 1)
}

const propsCheckout = {
	handleAddToCartState: jest.fn(),
	isInCart: true,
	slug: ProductKey.WatercolorStd,
	selectedProduct: testProducts[ProductKey.WatercolorStd],
	licenseQty: 1,
	price: testProducts[ProductKey.WatercolorStd].price,
	cart: testCartEmpty,
	addToCart: jest.fn(),
	cartToggle: jest.fn(),
	total: calcTotalQtyPrice(testProducts[ProductKey.WatercolorStd].price, 1)

}

describe('AddToCart Button', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<AddToCartBtn {...propsDefault}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render Add To Cart text', () => {
		const modalRender = render(<AddToCartBtn {...propsDefault}/>)
		expect(modalRender.getByTestId('addToCart').innerHTML).toEqual('I want this <span>$16.00</span>')
	})

	it('Should call not be able call addToCart Action', () => {
		// we have licenses set to 0 by default
		const modalRender = render(<AddToCartBtn {...propsDefault}/>)
		const btn = modalRender.getByTestId('addToCart')
		btn.click()
		expect(propsDefault.addToCart).toHaveBeenCalledTimes(0)
	})

	it('Should call addToCart Action', () => {
		const enabled = {
			...propsDefault,
			licenseQty: 1
		}
		const modalRender = render(<AddToCartBtn {...enabled}/>)
		const btn = modalRender.getByTestId('addToCart')
		btn.click()
		expect(propsDefault.addToCart).toHaveBeenCalledTimes(1)
	})

	it('Should render disabled warning', () => {
		const modalRender = render(<AddToCartBtn {...propsDefault}/>)
		expect(modalRender.getByTestId('warning').innerHTML).toEqual('Must have at least one computer license selected')
	})

	it('Should render checkout button', () => {
		const modalRender = render(<AddToCartBtn {...propsCheckout}/>)
		expect(modalRender.getByTestId('checkout').innerHTML).toEqual('Checkout')
	})

	it('Should call cartToggle Action', () => {
		const modalRender = render(<AddToCartBtn {...propsCheckout}/>)
		const btn = modalRender.getByTestId('checkout')
		btn.click()
		expect(propsCheckout.cartToggle).toHaveBeenCalledTimes(1)
	})

})
