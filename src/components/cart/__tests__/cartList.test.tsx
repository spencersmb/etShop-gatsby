import { CartList } from '@components/cart/cartList'
import { IState } from '@et/types/State'
import { cartReducer } from '@redux/reducers/cartReducer'
import { productReducer } from '@redux/reducers/productReducer'
import { renderWithRedux, testCartEmpty, testCartWithMultiples, testProducts } from '@redux/reduxTestUtils'
import React from 'react'
import { connect } from 'react-redux'
import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import { combineReducers } from 'redux'

afterEach(cleanup)

const Connected = connect((state: IState) => {
		return {
			...state
		}
	}
)(CartList)
describe('Cart List of items', () => {

	it('Should render correct number of items', () => {
		const modalRender = renderWithRedux(
			<Connected/>,
			combineReducers({
				products: productReducer,
				cart: cartReducer
			}),
			{
				state: {
					cart: {
						...testCartWithMultiples
					},
					products: {
						...testProducts
					}
				}
			})
		const items = modalRender.queryAllByTestId('cartItem')
		expect(items.length).toEqual(testCartWithMultiples.totalItems)
	})

	it('Should show empty cart', () => {
		const modalRender = renderWithRedux(
			<Connected/>,
			combineReducers({
				products: productReducer,
				cart: cartReducer
			}),
			{
				state: {
					cart: {
						...testCartEmpty
					},
					products: {
						...testProducts
					}
				}
			})
		expect(modalRender.getByText('Your cart is empty')).toBeTruthy()
	})

})
