import { Actions } from '@et/types/Actions'
import { ICartItem, ICartItemWithKey, IChangeLicenseData, IChangeQty, ILocalStorageCart } from '@et/types/Cart'
import { CartActionTypes } from '@et/types/Enums'
import { IProduct, IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { emptyLocalStorageCart, updateLocalStorageCart } from '@utils/cartUtils'
import { calcBulkPriceDiscount } from '@utils/priceUtils'
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

// CART ITEM SPECIFIC

/*
* * Tested!
 Dispatch event to remove the item clicked by user
 After - dispatch updateCartTotal and Price
 */
export const removeProductFromCart = (slug: string) => (dispatch: Dispatch<Action>, getState: () => IState) => {

	dispatch({
		payload: {
			id: slug
		},
		type: CartActionTypes.REMOVE_ITEM
	})

	// After item added - re-calc totalItems
	dispatch(updateCartTotal())

	dispatch(updateCartPrice())

	const newState: IState = getState()
	updateLocalStorageCart(newState.cart)
}

/*
* * Tested!
 Dispatch event to update the item qty and possibly price
 After - dispatch updateCartTotal and Price
 */
export const updateCartItemQty = ({ key, cartItem, bulkDiscount, regularPrice }: IChangeQty) =>
	(dispatch: Dispatch<Action>, getState: () => IState) => {

		dispatch(
			{
				payload: {
					price: bulkDiscount
						? calcBulkPriceDiscount(true, regularPrice)
						: regularPrice,
					qty: cartItem.qty,
					slug: key
				},
				type: CartActionTypes.UPDATE_CART_QTY
			}
		)

		// then update total
		dispatch(updateCartTotal())

		// then update price
		dispatch(updateCartPrice())

		const newState: IState = getState()
		updateLocalStorageCart(newState.cart)

	}

/*
* * Tested!
Dispatch event to changeLicenseType
After - dispatch Price
*/
export const changeLicenseType = ({ cartItemIndex, extended, products, currentCartItem, bulkDiscount }: IChangeLicenseData) =>
	(dispatch: Dispatch<Action>, getState: () => IState) => {

		// take item slug
		// find the item in our products list
		// if extended get the extended Item details
		// if standard get the standard Item details
		// update cart with new object (price slug, id, qty)
		// then update cart price

		const product = products[cartItemIndex]
		const standardItem: IProduct = products[cartItemIndex]
		const extendedItem: boolean | IProduct = product.license.extendedItem ? products[product.license.extendedItem.slug] : false
		// look up price of extended item based off its slug

		const standardPriceLookup = bulkDiscount
			? calcBulkPriceDiscount(bulkDiscount, products[cartItemIndex].price)
			: products[cartItemIndex].price

		const extendedItemPriceLookup = (bulkDiscount && extendedItem)
			? calcBulkPriceDiscount(bulkDiscount, products[extendedItem.slug].price)
			: (extendedItem ? products[extendedItem.slug].price : standardItem.price)

		dispatch(
			{
				payload: {
					item: {
						[cartItemIndex]: {
							extended,
							id: (extended && extendedItem) ? extendedItem.product_id : standardItem.product_id,
							name: (extended && extendedItem) ? extendedItem.name : standardItem.name,
							price: (extended && extendedItem) ? extendedItemPriceLookup : standardPriceLookup,
							qty: currentCartItem.qty,
							slug: (extended && extendedItem) ? extendedItem.slug : cartItemIndex
						}
					}
				},
				type: CartActionTypes.UPDATE_CART_LICENSE
			}
		)

		// then update price
		dispatch(updateCartPrice())

		const newState: IState = getState()
		updateLocalStorageCart(newState.cart)

	}


export const changeCheckoutType = (type: string): Actions => {
	return {
		payload: type,
		type: CartActionTypes.CHANGE_CHECKOUT_TYPE
	}
}