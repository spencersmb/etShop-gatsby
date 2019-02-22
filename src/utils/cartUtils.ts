import { ICartItem, ICartItemWithKey, ICartState, ICouponCode, ILocalStorageCart } from '@et/types/Cart'
import { calcCouponDiscount } from '@utils/priceUtils'

/**
 * * Tested!
 * Check Redux cart for a particular item we pass in
 *
 * How it works;
 * Filter - Return empty array if nothing found, else return array with matching item
 *
 * @param {ICartState} cart - Cart Object from Redux Store
 * @param {string} slug - Item-key we ware looking for
 */
export const checkCartForProduct = (cart: ICartState, slug: string): string[] => {
	return Object.keys(cart.items).filter(key => key === slug)
}

/**
 * * Tested!
 * Calculates the Total number of items added to the cart.
 *
 * How it works:
 * Get all the Keys of the Items in the cart and put them in an array and
 * count how many unique items are in the cart.
 *
 * @param {ICartItem} items All Items in the cart ::Object::
 * @return {number} The result of adding all the items and their Qty in the cart together
 */
export const totalItemsInCart = (items: { [id: string]: ICartItem }): number => {
	return Object.keys(items).length
}

/**
 * Calculates the Dollar Total of all items in the cart.
 *
 * How it works:
 * Get all the Keys of the Items in the cart and put them in an array.
 * Loop over each item, get its qty, and then match the slug of that item with
 * the item in the products state object to get the price of that item.
 * Multiply them and add it to the total using a reducer.
 *
 * Lastly check if we need to apply a coupon to the total
 *
 *
 * @param {ICartItem} items All Items in the cart ::Object::
 * @param {ICouponCode} couponCode Coupon in Redux State.
 * @return {number} The result of adding each item in the cart
 */
export const getCartTotal = (items: ICartItemWithKey, couponCode: ICouponCode): number => {

	const itemKeysArray: string[] = Object.keys(items)
	const totalPriceItems = itemKeysArray.reduce((total, slug: string) => {

		// item
		const qty: number = items[slug].qty
		// let productPrice: number = parseInt(items[slug].price, 10)
		const productPrice: number = parseFloat(items[slug].price)

		// check if coupon applies to a product
		// const couponFound: boolean = checkForCoupon(couponCode.product_ids, items[slug].id)

		// CHECK FOR COUPON ANd CALC PRICE
		// console.log('original price', productPrice)

		// if (couponFound) {
		// 	// console.log('couponFound for', items[slug].id)
		// 	// console.log('couponFound', couponFound)
		// 	productPrice = productPrice - calcDiscount(couponCode, productPrice)
		// }

		// CHECK FOR QTY and only give discount to the first item
		// if (qty > 1) {
		// 	const singleSaleItem = productPrice // 0
		// 	const priceOfAllOtherItems = parseFloat(items[slug].price)
		// 	const totalNormalPricedItems = (qty - 1) * priceOfAllOtherItems
		//
		// 	return total + (totalNormalPricedItems + singleSaleItem)
		//
		// }

		// console.log('new price', productPrice)
		return total + (productPrice * qty)
	}, 0)

	const couponIsForCart = couponCode.valid && couponCode.product_ids.length === 0
	const totalWithDiscount = couponIsForCart && totalPriceItems > 0
		? totalPriceItems - calcCouponDiscount(couponCode, totalPriceItems)
		: totalPriceItems

	// check for negative number
	return totalWithDiscount < 0 ? 0 : parseFloat(totalWithDiscount.toFixed(2))
}

/**
 * Get Items from Local Storage.
 *
 * @return {ILocalStorageCart} Return what is found in local storage
 */
export const getLocalStorageCart = (): ILocalStorageCart => {
	const value: string | null = localStorage.getItem('et_shop_cart')

	if (value) {
		return JSON.parse(value)
	}

	return {
		items: {}
	}
}

/**
 * Update LocalStorage
 *
 * How it works;
 * Filter out possibly sensitive data like discount code and paymentType
 *
 * @param {ICartState} updatedCart - New Cart Object from Redux Store
 */
export const updateLocalStorageCart = (updatedCart: ICartState) => {

	const allowedKeys = ['items']
	const filteredObject = Object.keys(updatedCart)
		.filter(key => allowedKeys.includes(key))
		.reduce((obj, key) => {
			obj[key] = updatedCart[key]
			return obj
		}, {})

	localStorage.setItem('et_shop_cart', JSON.stringify(filteredObject))
}

/**
 * Empty Items from Local Storage.
 *
 */
export const emptyLocalStorageCart = (): void => {
	localStorage.removeItem('et_shop_cart')
}
