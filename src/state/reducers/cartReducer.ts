import { Actions } from '@et/types/Actions'
import { ICartState } from '@et/types/Cart'
import { CartActionTypes } from '@et/types/Enums'
import initialState from '@redux/reducers/initialState'
import { getCartTotal, totalItemsInCart } from '@utils/cartUtils'
import { Reducer } from 'redux'

export const cartReducer: Reducer<ICartState> = (state: ICartState = initialState.cart, action: Actions): ICartState => {
	switch (action.type) {

		/*
		* * Tested!
		*/
		case CartActionTypes.CART_TOGGLE:
			return {
				...state,
				isOpen: !state.isOpen
			}

		/*
		* * Tested!
		*/
		case CartActionTypes.ADD_TO_CART:

			return {
				...state,
				items: {
					...state.items,
					...action.payload.item // <-- new Item
				}
			}

		/*
		* * Tested!
		*/
		case CartActionTypes.EMPTY_CART:

			return {
				...state,
				items: {},
				totalItems: 0,
				totalPrice: 0
			}

		/*
		* * Tested!
		*/
		case CartActionTypes.UPDATE_CART_TOTAL:
			// calc total items here so we dont use getState in Action creater
			const totalItems = totalItemsInCart(state.items)
			return {
				...state,
				totalItems // es6 destructure totalItems: totalItems
			}

		/*
		* * Tested!
		*/
		case CartActionTypes.UPDATE_CART_PRICE:

			// calc total items here so we dont use getState in Action creater
			const updateTotalPrice = getCartTotal(state.items, state.couponCode)

			return {
				...state,
				totalPrice: updateTotalPrice // es6 destructure totalItems: totalItems
			}

		/*
		* * Tested!
		*/
		case CartActionTypes.UPDATE_CART_STATE:
			const totalPrice = getCartTotal({ ...action.payload.cart.items }, state.couponCode)
			return {
				...state,
				items: {
					...action.payload.cart.items
				},
				totalItems: Object.keys(action.payload.cart.items).length,
				totalPrice
			}

		case CartActionTypes.LOAD_CART_COMPLETE:
			return {
				...state,
				loaded: true
			}

		default:
			return state
	}
}