import { ICartItem, ICartItemWithKey, ICartState, ICouponState } from '@et/types/Cart'
import { IPaypalItem } from '@et/types/Paypal'
import { IProducts } from '@et/types/Products'
import { checkForCoupon } from '@utils/cartUtils'
import { calcCouponDiscount, displayCurrency } from '@utils/priceUtils'
import _ from 'lodash'

/**
 * * Tested
 * Create array of items details in cart specifically for Paypal Purchases.
 *
 * How it works:
 * Get all the Keys of the Items in the cart and put them in an array.
 * Loop over each item, get its qty, and then match the slug of that item with
 * the item in the products state object to get the price of that item.
 * Multiply them and add it to the total using a reducer.
 *
 * PWYW:
 * check to see if items are in cart and total === 0
 * if they do skip coupon checks
 * check to see if items are in cart and total !== 0, but one item is free
 * Look if the items price is zero so we don't add coupon to PWYW item
 * => totalItems - numberOfFreeItemsInCart(cart.items)
 *
 *
 * @param {ICartItem} cart - cart ::Object::
 * @param {IProducts} products All products in Redux State.
 * @return {IPaypalItem[] | []} The result of all items in the cart
 */

export const getPaypalFormatItems = (cart: ICartState, products: IProducts): IPaypalItem[] => {
	const cartItemKeys = Object.keys(cart.items)
	const cartWide = cart.coupon.product_ids.length === 0

	// no products found
	if (cartItemKeys.length < 1) {
		return []
	}

	// 1. subtract free items from paid items so we calculate discount to paid items evenly
	const cartItemsMinusFreeItems: number = cart.totalItems - numberOfFreeItemsInCart(cart.items)

	// 2. Calc discount per item that we need to subtract when we loop through each product
	const fixedDiscount = calcCartDiscountPerItem(cart.originalPrice, cartItemsMinusFreeItems, cart.coupon)

	return cartItemKeys.map((item: string, index: number) => {
		const cartItem: ICartItem = cart.items[item]
		const price = cart.coupon.valid
			? calcItemPrice(cartItem, cart, cartWide, index, cart.coupon.type, fixedDiscount)
			: parseFloat(cartItem.price)
		return {
			currency: 'USD',
			name: cartItem.name,
			unit_amount: {
				value: displayCurrency(price).substring(1), // $4.00 example
				currency_code: 'USD'
			},
			quantity: cartItem.qty,
			sku: products[item].sku,
			category: 'DIGITAL_GOODS'
		}
	})
}

function calcItemPrice (item: ICartItem, cart: ICartState, cartWide: boolean, itemIndex: number, type: string, fixedDiscount: number) {
	// Check if coupon is for the item
	const couponMatch = !cartWide ? checkForCoupon(cart.coupon.product_ids, item.id) : null
	const price = parseFloat(item.price)
	const freeItem = item.price === '0'

	if (freeItem) {
		return price
	}

	if (!cartWide && couponMatch && !freeItem) {
		return price - calcCouponDiscount(cart.coupon, price)
	}

	// Fixed CartWide
	if (cartWide && type !== 'percent') {
		return price - (fixedDiscount / item.qty)
	}

	if (cartWide && type === 'percent') {
		return price - (price * (parseInt(cart.coupon.discount, 10) / 100))
	}

	return price

}

/**
 * * Tested
 * Returns the number of free items in the cart
 *
 * How it works:
 * Loop over cartItem keys array and filter out any items that don't have a price of 0
 * Then return the length of that array
 *
 *
 * @param {ICartItemWithKey} cartItems
 * @return number
 */
export const numberOfFreeItemsInCart = (cartItems: ICartItemWithKey): number => {
	const itemKeys = Object.keys(cartItems)
	return itemKeys.filter(key => {
		// console.log('cartItems[key].price', parseFloat(cartItems[key].price).toFixed(2))
		const convertedPrice = parseFloat(cartItems[key].price).toFixed(2)
		return convertedPrice === '0.00'
	}).length
}

/**
 * * Tested
 * Calculate Discount of coupon for percentage or fixed price for Cart.
 *
 * How it works:
 * If percent based, (percent * total) / totalItems = discount off each item
 *
 * If Fixed_price - then the returned number is the discount per item.
 *
 *
 * @param {number} cartTotalPrice
 * @param {number} totalItems
 * @param  {ICouponState} coupon
 * @return number
 */
export const calcCartDiscountPerItem = (cartTotalPrice: number, totalItems: number, coupon: ICouponState): number => {
// return the discount off each item
	switch (coupon.type) {
		case 'percent':

			const percent = (parseInt(coupon.discount, 10) / 100)
			// console.log('percent', percent)
			// console.log('(percent * cartTotalPrice)', (percent * cartTotalPrice))
			// console.log('totalItems', totalItems)
			// console.log('resutls', (percent * cartTotalPrice) / totalItems)

			return _.round((percent * cartTotalPrice) / totalItems, 2)

		default :
			const couponDiscount: number = parseFloat(coupon.discount)
			return parseFloat((couponDiscount / totalItems).toFixed(2))
	}
}
