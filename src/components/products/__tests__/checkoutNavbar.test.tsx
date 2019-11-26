import Login, { LoginModal } from '@components/modals/login'
import CheckoutNavBar from '@components/products/modules/checkoutNavBar'
import ProductDescription from '@components/products/modules/productDesc'
import { LicenseEnum } from '@et/types/Cart'
import { IModalState } from '@et/types/Modal'
import { addProductToCart, cartToggle as cartToggleAction } from '@redux/actions/cartActions'
import { cartReducer } from '@redux/reducers/cartReducer'
import { modalReducer } from '@redux/reducers/modalReducer'
import { ProductKey, renderWithRedux, testCartEmpty, testProducts } from '@redux/reduxTestUtils'
import React from 'react'
import { connect } from 'react-redux'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import { bindActionCreators } from 'redux'

afterEach(cleanup)

const propsDefault = {
	featuredImage: testProducts[ProductKey.WatercolorStd].featuredImage,
	handleDialChange: jest.fn(),
	handleAddToCartState: jest.fn(),
	handleLicenseChange: jest.fn(),
	licenses: testProducts[ProductKey.WatercolorStd].product_licenses,
	payWhatYouWant: false,
	onPwywChange: jest.fn(),
	inView: false,
	bulkDiscount: false,
	numberOfLicenses: 1,
	selectedProduct: testProducts[ProductKey.WatercolorStd],
	slug: testProducts[ProductKey.WatercolorStd].slug,
	inCart: false,
	selectedLicense: LicenseEnum.standard,
	title: testProducts[ProductKey.WatercolorStd].name,
	price: testProducts[ProductKey.WatercolorStd].price,
	total: '$12.00'
}
const redux = {
	cart: {
		...testCartEmpty
	},
	addToCart: jest.fn(),
	cartToggle: jest.fn()
}
const Connected = connect((state: IModalState) => {
		return {
			...state,
			...redux
		}
	}
)(CheckoutNavBar)
describe('Checkout Navbar Description', () => {

	it('Should have correct number of select options', () => {
		const modalRender = renderWithRedux(<Connected {...propsDefault}/>, cartReducer)
		expect(modalRender.getByTestId('license_select').children.length).toEqual(2)
	})
	it('Should have correct product name', () => {
		const modalRender = renderWithRedux(<Connected {...propsDefault}/>, cartReducer)
		expect(modalRender.getByTestId('title').innerHTML).toEqual(testProducts[ProductKey.WatercolorStd].name)
	})
	it('Should have show license input with correct number', () => {
		const modalRender = renderWithRedux(<Connected {...propsDefault}/>, cartReducer)
		expect(modalRender.getByTestId('numberDial')).toHaveProperty('value', '1')
	})
	it('Should have Add To Cart Btn', () => {
		const modalRender = renderWithRedux(<Connected {...propsDefault}/>, cartReducer)
		expect(modalRender.getByTestId('addToCart')).toBeTruthy()
	})
	it('Should have correct total', () => {
		const modalRender = renderWithRedux(<Connected {...propsDefault}/>, cartReducer)
		expect(modalRender.getByTestId('total').innerHTML).toEqual('$12.00')
	})
})
