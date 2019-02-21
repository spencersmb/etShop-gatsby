import { Actions } from '@et/types/Actions'
import { ICartItem, ICartItemWithKey, ILocalStorageCart } from '@et/types/Cart'
import { CartActionTypes } from '@et/types/Enums'
import { IProduct, IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { emptyLocalStorageCart, updateLocalStorageCart } from '@utils/cartUtils'
import { Action, Dispatch } from 'redux'

/*
* * Tested!
 Create cart item to be added to cart
 - Check for extended boolean (used when viewing the cart for dropdown select)
 - Check bulk pricing

 Afterwards
 - Dispatch 2nd event to update the Cart Total
 - Dispatch Price updater
 - Save cart to localStorage
 */
export type IAddProductAction = (
	product: IProduct,
	cartItems: { [id: string]: ICartItem },
	slug: string,
	qty: number,
	price: string
) => any
export const addProductToCart: IAddProductAction =
	(
		product: IProduct,
		cartItems: ICartItemWithKey,
		slug: string,
		qty: number,
		price: string
	) =>
		(dispatch: Dispatch<Action>, getState: () => IState) => {

			dispatch(
				{
					type: CartActionTypes.ADD_TO_CART,
					payload: {
						item: {
							[slug]: {
								extended: product.license.type !== 'standard',
								id: product.product_id,
								name: product.name,
								price,
								qty,
								slug: product.slug
							}
						}
					}
				}
			)

			// After item added - re-calc totalItems
			dispatch(updateCartTotal())

			dispatch(updateCartPrice())

			const newState: IState = getState()
			updateLocalStorageCart(newState.cart)
		}

/*
* * Tested!
*/
export const emptyCart = (): Actions => {
	emptyLocalStorageCart()
	return {
		type: CartActionTypes.EMPTY_CART
	}
}

/*
* * Tested!
*/
export const cartToggle = (): Actions => {
	return {
		type: CartActionTypes.CART_TOGGLE
	}
}

/*
* * Tested!
Calc total items in cart using QTY after ADD_TO_CART Action completes
*/
export const updateCartTotal = (): Actions => {
	return {
		type: CartActionTypes.UPDATE_CART_TOTAL
	}
}

/*
* * Tested!
*/
export const updateCartPrice = (): Actions => {
	return {
		type: CartActionTypes.UPDATE_CART_PRICE
	}
}

/*
* * Tested!
 Used to Initialize the cart from localStorage on Page Refresh
 */
export const updateCartState = (cartData: ILocalStorageCart): Actions => {
	return {
		type: CartActionTypes.UPDATE_CART_STATE,
		payload: {
			cart: cartData
		}
	}
}

/*
* * Tested!
*/
export const cartLoadedComplete = (): Actions => {
	return {
		type: CartActionTypes.LOAD_CART_COMPLETE
	}
}