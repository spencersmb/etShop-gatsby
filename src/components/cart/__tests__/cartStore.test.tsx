import React from 'react'
import { connect } from 'react-redux'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import { combineReducers } from 'redux'
import { cartReducer } from '@redux/reducers/cartReducer'
import { productReducer } from '@redux/reducers/productReducer'
import { renderWithRedux, testCartEmpty } from '@redux/reduxTestUtils'
import { IState } from '@et/types/State'
import { MyShoppingCart } from '../cartStore'

afterEach(cleanup)

const props = {
	cartIsOpen: false,
	updateCartState: jest.fn(),
	cartLoadedComplete: jest.fn()
}

const propsShowCart = {
	cartIsOpen: true,
	updateCartState: jest.fn(),
	cartLoadedComplete: jest.fn()
}

const Connected = connect((state: IState) => {
		return {
			...state,
			cart: {
				...testCartEmpty,
				isOpen: true
			}
		}
	}
)(MyShoppingCart)

describe('Cart Store Wrapper', () => {

	it('Should render no cart', () => {
		const modalRender = render(<MyShoppingCart {...props}/>)
		expect(modalRender.baseElement.children.length).toEqual(1)
	})

	it('Should call load cart complete', () => {
		// calls one time based on the first test above
		expect(props.cartLoadedComplete).toHaveBeenCalledTimes(1)
	})

	it('Should render cart', () => {
		const modalRender = renderWithRedux(<Connected {...propsShowCart}/>, combineReducers({
			products: productReducer,
			cart: cartReducer
		}))
		expect(modalRender.getByTestId('cart-wrapper')).toBeTruthy()
	})

})