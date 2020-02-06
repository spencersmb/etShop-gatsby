import { Actions } from '@et/types/Actions'
import { ICartItem, ICartItemWithKey, IChangeLicenseData, IChangeQty, ILocalStorageCart } from '@et/types/Cart'
import { CartActionTypes } from '@et/types/Enums'
import { IProduct, IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { checkCartForItemMatchingCoupon, emptyLocalStorageCart, updateLocalStorageCart } from '@utils/cartUtils'
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
	// cartItems: { [id: string]: ICartItem },
	slug: string,
	qty: number,
	price: string,
	bulkDiscount: boolean,
	selectedLicense: string
) => any
export const addProductToCart: IAddProductAction =
	(
		product: IProduct,
		// cartItems: ICartItemWithKey,
		slug: string,
		qty: number,
		price: string,
		bulkDiscount: boolean,
		selectedLicense: string
	) =>
		(dispatch: Dispatch<Action>, getState: () => IState) => {

			dispatch(
				{
					type: CartActionTypes.ADD_TO_CART,
					payload: {
						item: {
							[slug]: {
								licenseType: selectedLicense,
								// extended: product.license.type !== 'standard',
								id: product.product_id,
								name: product.name,
								price,
								qty,
								slug: product.slug,
								bulkDiscount
							}
						}
					}
				}
			)
			dispatch(refreshCart())

			const newState: IState = getState()
			updateLocalStorageCart(newState.cart)
		}
export const refreshCart = (): Actions => {
	return {
		type: CartActionTypes.REFRESH_CART
	}
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

	dispatch(refreshCart())

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

		dispatch(refreshCart())

		const newState: IState = getState()
		updateLocalStorageCart(newState.cart)

	}

/*
* * Tested!
*/
export const changeCheckoutType = (type: string): Actions => {
	return {
		payload: type,
		type: CartActionTypes.CHANGE_CHECKOUT_TYPE
	}
}

/*
* * Tested!
* Checks for:
* * Case 1:  100% off coupon
* 	Cart price is 0 and a coupon was added with product restrictions
* 	Check if its a match for the item in the cart and if that item is not PWYW
* 	set paymentType to be PWYW
*
* * Case 2: Coupon entered but item is not a match, but item is already PWYW
* 	Cart price is 0 and a coupon was added with product restrictions,
* 	but the item is not a match - check if the item is a PWYW item.
* 	If it is PWYW item then set paymentType to PWYW. This scenario happens
* 	when cart had more than one item in it + coupon and the paid item was
* 	removed leaving ony the free item left.
*
* * Case 3: Total is 0 and no coupon restrictions
* 	Make sure to set paymentType as PWYW. This happens when an item is free,
* 	coupon is applied and doesn't have item restrictions. This coupon can be
* 	ignored and change paymentType
*
* * Case 4: Change back to paid paymentType
*
*/
export const calcCheckoutType = (type: string) =>
	(dispatch: Dispatch<Action>, getState: () => IState) => {
		const { cart } = getState()
		const cartItems = cart.items
		const cartItemKeys = Object.keys(cartItems)
		const { totalPrice, coupon } = cart

		if (cartItemKeys.length === 0) {
			return
		}

		if (totalPrice === 0 && coupon.product_ids.length > 0) {
			const isFound = checkCartForItemMatchingCoupon(coupon.product_ids, cartItems)
			const firstItem: ICartItem = cartItems[cartItemKeys[0]]
			const isItemPwyw = firstItem.price === '0'

			// if the item in the cart is paid but the coupon is for 100% off
			//  change the type to PWYW so the server knows its free
			if (isFound && !isItemPwyw) {
				// console.log('100% off')
				dispatch(changeCheckoutType('pwyw'))
				return
			}

			// if the item is not found in possible coupon added but is a free item
			// it still should change to PWYW
			if (!isFound && isItemPwyw) {
				// console.log('has coupon in DB but not used, but item is free')
				dispatch(changeCheckoutType('pwyw'))
				return
			}
		}

		// if the total === 0 and there is a coupon but it has no exclusions
		// make it PWYW
		if (totalPrice === 0 && coupon.product_ids.length === 0) {
			dispatch(changeCheckoutType('pwyw'))
			return
		}

		// if we switch back, set it to the key that was last selected
		if (totalPrice !== 0 && cart.paymentType === 'pwyw') {
			dispatch(changeCheckoutType(type))
		}
	}
