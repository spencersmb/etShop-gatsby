import { Actions } from '@et/types/Actions'
import { ICartItem, ICartItemWithKey } from '@et/types/Cart'
import { CartActionTypes } from '@et/types/Enums'
import { IProduct } from '@et/types/Products'
import { IState } from '@et/types/State'
import { Action, Dispatch } from 'redux'

export const cartToggle = (): Actions => {
	return {
		type: CartActionTypes.CART_TOGGLE
	}
}

/*
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

			// Extended
			// if true = standard item
			// if false = extended item

			dispatch(
				{
					payload: {
						item: {
							[slug]: {
								extended: !product.license.hasExtendedLicense,
								id: product.product_id,
								name: product.name,
								price,
								qty,
								slug: product.slug
							}
						}
					},
					type: CartActionTypes.ADD_TO_CART
				}
			)

			// After item added - re-calc totalItems
			// dispatch(updateCartTotal())

			// dispatch(updateCartPrice())

			// const newState: IState = getState()
			// updateLocalStorageCart(newState.cart)
		}