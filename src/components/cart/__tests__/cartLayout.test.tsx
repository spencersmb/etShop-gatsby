import React from 'react'
import { connect } from 'react-redux'
import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import { combineReducers } from 'redux'
import { cartReducer } from '@redux/reducers/cartReducer'
import { productReducer } from '@redux/reducers/productReducer'
import { renderWithRedux, testCartEmpty, testCartWithItem } from '@redux/reduxTestUtils'
import { IState } from '@et/types/State'
import { CartLayout } from '../cartLayout'

afterEach(cleanup)
const props = {
	emptyCart: jest.fn(),
	cartToggle: jest.fn(),
	poseRef: React.createRef(),
	changeCheckout: jest.fn()
}

const Connected = connect((state: IState) => {
		return {
			...state,
			cart: {
				...testCartWithItem,
				isOpen: true
			}
		}
	}
)(CartLayout)

describe('Cart Layout', () => {

	it('Should render Back Btn and call toggle cart on click', () => {
		const modalRender = renderWithRedux(<Connected {...props}/>, combineReducers({
			products: productReducer,
			cart: cartReducer
		}))
		const btn = modalRender.getByTestId('close-btn')
		btn.click()
		expect(props.cartToggle).toHaveBeenCalledTimes(1)
	})

	it('Should render proceed to checkout Btn and toggle cart on click', () => {
		const modalRender = renderWithRedux(<Connected {...props}/>, combineReducers({
			products: productReducer,
			cart: cartReducer
		}))
		const btn = modalRender.getByTestId('checkout')
		btn.click()
		expect(props.cartToggle).toHaveBeenCalledTimes(1)
	})

})
