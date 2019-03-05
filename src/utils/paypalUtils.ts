import { ICartItem, ICartItemWithKey, ICartState, ICouponState } from '@et/types/Cart'
import { IPaypalItem } from '@et/types/Paypal'
import { IProducts } from '@et/types/Products'
import { checkForCoupon } from '@utils/cartUtils'
import { calcCouponDiscount, displayCurrency } from '@utils/priceUtils'

/**
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
	console.log('recalc paypal items')

	const cartItems = cart.items
	const cartItemKeys = Object.keys(cartItems)
	const hasCoupon = cart.coupon.valid
	const productOnlyCoupon = !!cart.coupon.product_ids.length
	let couponDiscount: number = 0

	// no products found
	if (cartItemKeys.length < 1) {
		return []
	}

	/**
	 *
	 * * Cart Wide discount check
	 * * If cart wide discount, calc disc per item
	 * ? Tested Fixed Cart
	 * ? Tested Percent Cart
	 * ? Tested Fixed Item price
	 * ? Tested Percent Item price
	 * Fixed Cart Example:
	 * if the coupon discount is for fixed 12.00 off and two items in cart
	 * 12 / 2 = 6 ( discount per item that we subtract )
	 *
	 * Percent off example
	 * total is $20 * 10% = $2 / number of items
	 * final discount of two items is $1 off each item
	 */
	if (!productOnlyCoupon && cart.totalPrice !== 0) {
		// console.log('Cart Coupon')

		// 1. subtract free items from paid items so we calculate discount to paid items evenly
		const cartItemsMinusFreeItems: number = cart.totalItems - numberOfFreeItemsInCart(cart.items)

		// 2. Calc discount per item that we need to subtract when we loop through each product
		couponDiscount = calcCartDiscountPerItem(cart.totalPrice, cartItemsMinusFreeItems, cart.coupon)

	}

	// map over each item to create the right price and structure for paypal
	return cartItemKeys.map((item: string) => {
		const cartItem: ICartItem = cartItems[item]
		const qty: number = typeof cartItem.qty === 'string' ? 0 : cartItem.qty
		// convert to number for calculations
		let price: number = parseFloat(cartItem.price)
		let discountedPrice: number = price

		// check if the coupon is for this specific item
		const couponMatch = productOnlyCoupon ? checkForCoupon(cart.coupon.product_ids, cartItem.id) : null

		// if valid coupon and the product was found in the coupon productId array
		if (hasCoupon && couponMatch) {
			// console.log('paypal item id', cartItem.id)
			// console.log('origina price of paypal item', price)

			// calc the discount off the item
			// check if the qty is 1 or greater
			// if greater than 1, apply to only the first item
			discountedPrice = price - calcCouponDiscount(cart.coupon, price)

			if (qty > 1 && (productOnlyCoupon && couponMatch && hasCoupon)) {

				// store the current discounted price ( coupon was applied in step 2.c )
				// discountedPrice = productPrice - calcCouponDiscount(coupon, productPrice)
				const singleSaleItem: number = discountedPrice

				// store the original product price with no discount applied
				// const priceOfAllOtherItems: number = price

				// Take the total number of items and subtract 1 from it.
				// This will be the one that gets the discount
				// Then total up all the others like normal
				const totalNormalPricedItems = (qty - 1) * price
				const total = totalNormalPricedItems + singleSaleItem
				price = total / qty

				// 2 items
				// 5.00 each
				// discount $2
				// first way 3.00 each / total of $6 - coupon should be for one item
				// all other items price is $5 + $3 = 8 / 2 = $4 each
			} else {
				price = discountedPrice
			}
			// console.log('newPrice product only coupon', price)

			// check if there is a coupon
			// if there is a cart -wide discount
			// and if the items price is not zero so we dont add coupon to PWYW item
		} else if (hasCoupon && couponDiscount && price !== 0) {
			// console.log('Total discount off each item', couponDiscount)

			// 1. Percentage Base
			//    if type is percent we must return the new price of the item by
			// 		(itemOriginalPrice - (price * percent)) = new item price for percentage based cart coupons
			if (cart.coupon.type === 'percent') {
				const discountOffEachItem = (price * couponDiscount)
				// console.log('price of original Item', price)
				// console.log('percent discount off item', discountOffEachItem)

				price = price - discountOffEachItem
				// price = parseFloat(((price - discountOffEachItem)).toFixed(2))
				// console.log('percent discount new price of each item', price)

			} else {
				// 2. Fixed_price Base
				//    if type is fixed we must subtract price - coupondiscount
				// 		(itemOriginalPrice - discountOffEachItem) = new item price for percentage based cart coupons
				price = price - couponDiscount
				// console.log('new price of each item fixed cart', price)
			}
		}

		// discount message
		// product only? ** $12 discount **
		// cart wide? ** $6 discount off total purchase **

		return {
			currency: 'USD',
			name: cartItem.name,
			// description: 'item desc',
			unit_amount: {
				value: displayCurrency(price).substring(1), // $4.00 example
				currency_code: 'USD'
			},
			quantity: cartItem.qty,
			sku: products[item].id.toString(),
			category: 'DIGITAL_GOODS'
		}
	})
}

export const numberOfFreeItemsInCart = (cartItems: ICartItemWithKey): number => {
	const itemKeys = Object.keys(cartItems)
	return itemKeys.filter(key => {
		// console.log('cartItems[key].price', parseFloat(cartItems[key].price).toFixed(2))
		const convertedPrice = parseFloat(cartItems[key].price).toFixed(2)
		return convertedPrice === '0.00'
	}).length
}

/**
 * Calculate Discount of coupon for percentage or fixed price.
 *
 * How it works:
 * If percent based, we only calculate the discount off the total cart and then use that for
 * each individual item to calculate its own price because its not an even distribution between products.
 *
 * If Fixed_price - then the returned number is the discount per item.
 *
 *
 * @param {number} cartTotalPrice
 * @param {number} totalItems
 * @param  {ICouponCode} coupon
 * @return number
 */
const calcCartDiscountPerItem = (cartTotalPrice: number, totalItems: number, coupon: ICouponState): number => {
// return the discount off each item
	switch (coupon.type) {
		case 'percent':

			// console.log('percent', parseFloat((cartTotalPrice / totalItems).toFixed(2)))
			// return parseFloat((cartTotalPrice / totalItems).toFixed(2))// discount off cart total
			// console.log('discount percentage off', total * percentage)
			return (parseInt(coupon.discount, 10) / 100)
		default :
			const couponDiscount: number = parseFloat(coupon.discount)

			// switch to _.round?
			return parseFloat((couponDiscount / totalItems).toFixed(2))
	}
}