import { Actions } from '@et/types/Actions'
import { ICartState } from '@et/types/Cart'
import { CartActionTypes } from '@et/types/Enums'
import initialState from '@redux/reducers/initialState'
import { Reducer } from 'redux'

export const cartReducer: Reducer<ICartState> = (state: ICartState = initialState.cart, action: Actions): ICartState => {
	switch (action.type) {

		case CartActionTypes.CART_TOGGLE:
			return {
				...state,
				isOpen: !state.isOpen
			}

		case CartActionTypes.ADD_TO_CART:

			return {
				...state,
				items: {
					...state.items,
					...action.payload.item // <-- new Item
				}
			}

		default:
			return state
	}
}