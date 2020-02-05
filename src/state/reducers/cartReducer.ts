import { Actions } from '@et/types/Actions'
import { ICartState, ICouponRaw, ITotal } from '@et/types/Cart'
import { CartActionTypes, CouponActionTypes } from '@et/types/Enums'
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
				coupon: {
					code: '',
					discount: '',
					loading: false,
					product_ids: [],
					submitted: true,
					type: '',
					valid: false
				},
				items: {},
				totalItems: 0,
				totalPrice: 0,
				originalPrice: 0
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

		case CartActionTypes.REFRESH_CART:
			// calc total items here so we dont use getState in Action creater
			const calcTotalItems = totalItemsInCart(state.items)
			const calcTotalPrice: ITotal = getCartTotal(state.items, state.coupon)
			return {
				...state,
				totalItems: calcTotalItems,
				totalPrice: calcTotalPrice.discountedTotal,
				originalPrice: calcTotalPrice.total // available if a coupon is added
			}

		/*
		* * Tested!
		*/
		case CartActionTypes.UPDATE_CART_PRICE:

			// calc total items here so we dont use getState in Action creater
			const updateTotalPrice: ITotal = getCartTotal(state.items, state.coupon)

			return {
				...state,
				totalPrice: updateTotalPrice.discountedTotal, // es6 destructure
				// totalItems: totalItems
				originalPrice: updateTotalPrice.total // used if a coupon is added
			}

		/*
		* * Tested!
		*/
		case CartActionTypes.UPDATE_CART_STATE:
			const totalPrice: ITotal = getCartTotal({ ...action.payload.cart.items }, state.coupon)
			return {
				...state,
				items: {
					...action.payload.cart.items
				},
				totalItems: Object.keys(action.payload.cart.items).length,
				totalPrice: totalPrice.discountedTotal, // es6 destructure totalItems: totalItems
				originalPrice: totalPrice.total
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

		/*
		* * Tested!
		*/
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

		/*
		* * Tested!
		*/
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

		/*
		* * Tested!
		*/
		case CartActionTypes.UPDATE_CART_LICENSE:
			return {
				...state,
				items: { ...state.items, ...action.payload.item }
			}

		/*
		* * Tested!
		*/
		case CartActionTypes.CHANGE_CHECKOUT_TYPE:
			return {
				...state,
				paymentType: action.payload
			}

		/*
		* * Tested!
		*/
		case CouponActionTypes.SUBMIT_COUPON:
			return {
				...state,
				coupon: {
					...state.coupon,
					loading: true
				}
			}

		/*
		* * Tested!
		*/
		case CouponActionTypes.SUBMIT_COUPON_SUCCESS:
			const coupon: ICouponRaw = action.payload.coupon
			return {
				...state,
				coupon: {
					code: coupon.code,
					discount: coupon.amount,
					loading: false,
					product_ids: coupon.product_ids,
					submitted: true,
					type: coupon.discount_type,
					valid: true
				}
			}

		/*
		* * Tested!
		*/
		case CouponActionTypes.SUBMIT_COUPON_INVALID:
			return {
				...state,
				coupon: {
					code: '',
					discount: '',
					loading: false,
					product_ids: [],
					submitted: true,
					type: '',
					valid: false
				}
			}

		default:
			return state
	}
}
