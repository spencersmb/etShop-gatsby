import { ICartState } from '@et/types/Cart'
import { CartActionTypes } from '@et/types/Enums'
import { IState } from '@et/types/State'
import { cartReducer } from '@redux/reducers/cartReducer'
import initialState from '@redux/reducers/initialState'
import { ProductKey, testCartWithItem } from '@redux/reduxTestUtils'
import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('Cart Reducer', () => {

	it('should return the initial state', () => {
		const action = {
			type: 'Fake_ACTION'
		}
		const reducer = cartReducer(initialState.cart, action)
		expect(reducer).toEqual(initialState.cart)
	})

	it('should reduce an action with the type CART_TOGGLE', () => {

		const reducer = cartReducer(initialState.cart, {
			type: CartActionTypes.CART_TOGGLE
		})

		const result = {
			...initialState.cart,
			isOpen: true
		}

		expect(reducer).toEqual(result)
	})

	it('should react to an action with the type ADD_TO_CART', () => {
		// should add total items to 1 and double the price
		const state: IState = initialState
		const updatedItem = {
			...testCartWithItem.items[ProductKey.WatercolorStd],
			qty: 1
		}
		const reducer = cartReducer(state.cart, {
			payload: {
				item: {
					[ProductKey.WatercolorStd]: updatedItem
				}
			},
			type: CartActionTypes.ADD_TO_CART
		})

		// manually check a resulting state object
		const resultAddToCart: ICartState = state.cart
		resultAddToCart.items[ProductKey.WatercolorStd] = updatedItem

		expect(reducer).toEqual(resultAddToCart)
	})

	it('should react to an action with the type EMPTY_CART', () => {

		const state: IState = initialState
		state.cart.items = testCartWithItem.items
		const reducer = cartReducer(state.cart, {
			type: CartActionTypes.EMPTY_CART
		})
		const result: ICartState = state.cart
		result.totalPrice = 0
		result.totalItems = 0
		result.items = {}

		expect(reducer).toEqual(result)
	})

	it('should react to an action with the type UPDATE_CART_TOTAL', () => {

		const state: IState = initialState
		state.cart.items = testCartWithItem.items

		const reducer = cartReducer(state.cart, {
			type: CartActionTypes.UPDATE_CART_TOTAL
		})
		const result: ICartState = state.cart
		result.totalItems = 1

		expect(reducer).toEqual(result)
	})

	it('should react to an action with the type UPDATE_CART_PRICE', () => {

		const state: IState = initialState
		state.cart.items = testCartWithItem.items

		const reducer = cartReducer(state.cart, {
			type: CartActionTypes.UPDATE_CART_PRICE
		})
		const result: ICartState = state.cart
		result.totalPrice = 16

		expect(reducer).toEqual(result)
	})

	it('should react to an action with the type UPDATE_CART_STATE', () => {
		const state: IState = initialState
		const reducer = cartReducer(state.cart, {
			payload: {
				cart: testCartWithItem
			},
			type: CartActionTypes.UPDATE_CART_STATE
		})
		const result: ICartState = state.cart
		result.items = testCartWithItem.items
		result.totalPrice = 16
		result.totalItems = 1

		expect(reducer).toEqual(result)
	})

	it('should react to an action with the type LOAD_CART_COMPLETE', () => {
		const state: IState = initialState
		const reducer = cartReducer(state.cart, {
			type: CartActionTypes.LOAD_CART_COMPLETE
		})
		const result: ICartState = state.cart
		result.loaded = true

		expect(reducer).toEqual(result)
	})

})