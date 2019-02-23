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
			const updateTotalPrice = getCartTotal(state.items, state.coupon)

			return {
				...state,
				totalPrice: updateTotalPrice // es6 destructure totalItems: totalItems
			}

		/*
		* * Tested!
		*/
		case CartActionTypes.UPDATE_CART_STATE:
			const totalPrice = getCartTotal({ ...action.payload.cart.items }, state.coupon)
			return {
				...state,
				items: {
					...action.payload.cart.items
				},
				totalItems: Object.keys(action.payload.cart.items).length,
				totalPrice
			}

		/*
		* * Tested!
		*/
		case CartActionTypes.LOAD_CART_COMPLETE:
			return {
				...state,
				loaded: true
			}

		// CART ITEM SPECIFIC

		case CartActionTypes.REMOVE_ITEM:

			// Loop over all items in cart
			const newItems = Object.keys(state.items).reduce((obj, key) => {

				// if the id's don't match
				// add it back into the obj
				if (key !== action.payload.id) {
					obj[key] = state.items[key]
					return obj
				}
				return obj

			}, {})

			// Return all items but the one that
			// was to be removed
			return {
				...state,
				items: newItems
			}

		case CartActionTypes.UPDATE_CART_QTY:
			const updateItem = {
				[action.payload.slug]: {
					...state.items[action.payload.slug],
					price: action.payload.price,
					qty: action.payload.qty
				}
			}
			return {
				...state,
				items: { ...state.items, ...updateItem }
			}

		case CartActionTypes.UPDATE_CART_LICENSE:
			return {
				...state,
				items: { ...state.items, ...action.payload.item }
			}

		default:
			return state
	}
}