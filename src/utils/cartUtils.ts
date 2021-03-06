import {
	ICartItem,
	ICartItemWithKey,
	ICartState,
	ICouponState,
	ILocalStorageCart,
	ITotal,
	ITotalItem, LicenseEnum
} from '@et/types/Cart'
import { IProduct, IProducts } from '@et/types/Products'
import { calcCouponDiscount } from '@utils/priceUtils'
import _ from 'lodash'

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
 * * Tested ALL COUPONS
 * Calculates the Dollar Total of all items in the cart.
 *
 * * Coupon - Fixed_cart - Calculator Tested ( Fixed price discount )
 * * Coupon - Percentage(single item) - Calculator Tested
 * * Coupon - Percentage Cart - Calculator Tested
 * * Coupon - Fixed Item cost - Calculator Tested
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
 * @param {ICouponCode} coupon Coupon in Redux State.
 * @return {number} The result of adding each item in the cart
 */
export const getCartTotal = (items: ICartItemWithKey, coupon: ICouponState): ITotal => {

	// 1.a
	// Create array with Item keys to reduce them to one number total
	const itemKeysArray: string[] = Object.keys(items)

	// 1.b
	// Check if the coupon should be applied to the cart total
	// If there are no items in the productId's array then it applies to the cart
	const couponIsForCart: boolean = coupon.valid && coupon.product_ids.length === 0

	// 2.
	// reduce over each item checking for coupons

	const totalPriceItems: ITotalItem = itemKeysArray.reduce((total: ITotalItem, slug: string) => {

		// 2.a
		// convert String product price to a number to do calculations on it
		const product: ICartItem = items[slug]

		const productPrice: number = parseFloat(product.price)
		let discountedPrice: number = parseFloat(product.price)
		// Ts check because we told interfaces it could be string or number,
		// but coded it so that qty should never get to this point as a string
		const qty: number = product.qty

		// 2.b
		// check if coupon applies to a product
		const couponFound: boolean = checkForCoupon(coupon.product_ids, product.id)
		// console.log('product', product.name)

		// console.log('original price', productPrice) // log price before change check

		// 2.c
		// Check for individual coupon and re-calculate price
		if (!couponIsForCart && couponFound && coupon.valid) {
			discountedPrice = productPrice - calcCouponDiscount(coupon, productPrice)

			// Error checking for coupon
			// console.log('calcCouponDiscount(coupon, productPrice)', calcCouponDiscount(coupon, productPrice))
			//
			// console.log('productPrice', productPrice)
			// console.log('discountedPrice', discountedPrice)
			// console.log('coupon Found for ID:', product.id)
		}

		// 2.d
		// If the qty is greater than one, the coupon does not apply to every item,
		// only the first item gets discounted.
		// Check quantity
		if (qty > 1 && (!couponIsForCart && couponFound && coupon.valid)) {

			// store the current discounted price ( coupon was applied in step 2.c )
			const singleSaleItem = discountedPrice

			// store the original product price with no discount applied
			const priceOfAllOtherItems = parseFloat(product.price)

			// Take the total number of items and subtract 1 from it.
			// This will be the one that gets the discount
			// Then total up all the others like normal
			const totalNormalPricedItems = (qty - 1) * priceOfAllOtherItems

			// the single discount item + the totaled up regular priced items
			// then add them to the grand total
			// return total + (totalNormalPricedItems + singleSaleItem)
			return {
				regularPrice: total.regularPrice + (productPrice * qty),
				discountedPrice: total.discountedPrice + (totalNormalPricedItems + singleSaleItem)
			}

		}

		// Finally return the current total + (product * its quantity)
		// console.log('product total', {
		// 	regularPrice: total.regularPrice + (productPrice * qty),
		// 	discountedPrice: total.discountedPrice + (discountedPrice * qty)
		// })

		return {
			regularPrice: total.regularPrice + (productPrice * qty),
			discountedPrice: total.discountedPrice + (discountedPrice * qty)
		}
	}, {
		regularPrice: 0,
		discountedPrice: 0
	})
	// console.log('totalPriceItems', totalPriceItems)

	// 3.
	// Calculate grand total
	// - first check if the coupon is for the cart
	// - 2nd check if the total of the items is greater than 0
	// - If its zero - its free and don't apply any coupons.
	// 3.a |
	// If The total is greater than 0 and there is a coupon for the cart
	// calculate the discount off, subtract it from the total and return that value

	const totalWithDiscount: number = couponIsForCart && totalPriceItems.regularPrice > 0
		? totalPriceItems.regularPrice - calcCouponDiscount(coupon, totalPriceItems.regularPrice)
		: totalPriceItems.discountedPrice

	// console.log('total', {
	// 	total: _.round(totalPriceItems.regularPrice, 2),
	// 	discountedTotal: totalWithDiscount < 0 ? 0 : _.round(totalWithDiscount, 2)
	// })

	// 4.
	//
	// check for negative number and return 0 if that's the case
	// else round the total to string of 2 decimal places return that number

	// return totalWithDiscount < 0 ? 0 : _.round(totalWithDiscount, 2)
	// return totalWithDiscount < 0 ? 0 : parseFloat(totalWithDiscount.toFixed(2))
	return {
		total: _.round(totalPriceItems.regularPrice, 2),
		discountedTotal: totalWithDiscount < 0 ? 0 : _.round(totalWithDiscount, 2)
	}

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

/**
 * * Tested!
 * Check if a product id matches any ids in the coupon array
 *
 * How it works:
 * Filter over the array and return 0 or 1 if something is found, then convert that to a boolean
 *
 * @param {number[]} couponIds
 * @param {number} needleId
 * @return boolean
 */
export const checkForCoupon = (couponIds: number[], needleId: number): boolean => {
	return !!couponIds.filter(id => (id === needleId)).length
}

/**
 * Check if any of the product ids in the cart match any ids in the coupon array
 *
 * How it works:
 * Filter over the array and return 0 or 1 if something is found, then convert that to a boolean
 *
 * @param {number[]} couponIds
 * @param {IProducts} cartProducts
 * @return boolean
 */
export const checkCartForItemMatchingCoupon = (couponIds: number[], cartProducts: ICartItemWithKey) => {
	const productsKeys = Object.keys(cartProducts)
	return !!productsKeys.filter(key => {
		const product: ICartItem = cartProducts[key]
		return checkForCoupon(couponIds, product.id)
	}).length
}

/**
 * * Tested!
 * Check if any of the product in the cart are PWYW enabled
 *
 * How it works:
 * Filter over the array and return the key of the item that's enabled
 * Return a boolean checking if the array has a length or not
 *
 * @param {ICartItemWithKey} cartItems
 * @param {IProducts} products
 * @return boolean
 */
export function isPWYWItemInCart (cartItems: ICartItemWithKey, products: IProducts) {

	const productsKeys = Object.keys(products)
	const itemFound = productsKeys.filter(key => {

		// if the cart has an item & that item has pwyw enabled
		// return the key
		if (cartItems[key] && products[key].pwyw) {
			return key
		}
	})

	return itemFound.length > 0
}

export function getIndexFromLicenseType (type: LicenseEnum) {
	switch (type) {
		case LicenseEnum.extended:
			return 1
		case LicenseEnum.server:
			return 2
		default:
			return 0
	}
}
