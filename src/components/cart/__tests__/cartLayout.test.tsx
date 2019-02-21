import React from 'react'
import { connect } from 'react-redux'
import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import { combineReducers } from 'redux'
import { cartReducer } from '../../../state/reducers/cartReducer'
import { productReducer } from '../../../state/reducers/productReducer'
import { renderWithRedux, testCartEmpty } from '../../../state/reduxTestUtils'
import { IState } from '../../../types/State'
import { CartLayout } from '../cartLayout'

afterEach(cleanup)
const props = {
	emptyCart: jest.fn(),
	cartToggle: jest.fn(),
	poseRef: React.createRef()
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
)(CartLayout)

describe('Cart Layout', () => {

	it('Should render Close Btn and call toggle cart on click', () => {
		const modalRender = renderWithRedux(<Connected {...props}/>, combineReducers({
			products: productReducer,
			cart: cartReducer
		}))
		const btn = modalRender.getByTestId('close-btn')
		btn.click()
		expect(btn.innerHTML).toEqual('Close')
		expect(btn).toBeTruthy()
		expect(props.cartToggle).toHaveBeenCalledTimes(1)
	})

	it('Should render Empty Cart Btn and call empty cart on click', () => {
		const modalRender = renderWithRedux(<Connected {...props}/>, combineReducers({
			products: productReducer,
			cart: cartReducer
		}))
		const btn = modalRender.getByTestId('empty-cart-btn')
		btn.click()
		expect(btn.innerHTML).toEqual('Empty Cart')
		expect(btn).toBeTruthy()
		expect(props.emptyCart).toHaveBeenCalledTimes(1)
	})

})