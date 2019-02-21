import React from 'react'
import { connect } from 'react-redux'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import { combineReducers } from 'redux'
import { cartReducer } from '../../../state/reducers/cartReducer'
import { productReducer } from '../../../state/reducers/productReducer'
import { renderWithRedux, testCartEmpty } from '../../../state/reduxTestUtils'
import { IState } from '../../../types/State'
import { MyShoppingCart } from '../cartStore'

afterEach(cleanup)

const props = {
	cart: testCartEmpty,
	updateCartState: jest.fn(),
	cartLoaded: jest.fn()
}

const propsShowCart = {
	updateCartState: jest.fn(),
	cartLoaded: jest.fn()
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
		expect(props.cartLoaded).toHaveBeenCalledTimes(1)
	})

	it('Should render cart', () => {
		const modalRender = renderWithRedux(<Connected {...propsShowCart}/>, combineReducers({
			products: productReducer,
			cart: cartReducer
		}))
		expect(modalRender.getByTestId('cart-wrapper')).toBeTruthy()
	})

})