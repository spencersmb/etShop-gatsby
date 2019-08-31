import { ICouponState } from '@et/types/Cart'
import { IProduct } from '@et/types/Products'
import _ from 'lodash'
import { CartPricingConfig } from '@components/cart/cartStatics'

export const displayPercent = (percent: number) => {
	return percent * 100
}
/*
* * Tested!
Check and return a discounted price based on qty set in config
*/
export const calcBulkDiscount = (price: string): string => {
	// convert to Number
	const strToNum = parseFloat(price)

	// percent in config
	const percent = CartPricingConfig.bulkDiscount

	// price * percentage subtracted from total price
	return (strToNum - (percent * strToNum)).toString()
}

/**
 * * Tested!
 * Check for bulk pricing and return the new price if true.
 *
 *
 * @param {boolean} bulkDiscount
 * @param {string | number} licenseQty
 * @param {string} price
 * @return {string} Convert the result to readable USD string with dollar sign
 */
export function calcBulkPriceDiscount (bulkDiscount: boolean, price: string): string {
	return bulkDiscount
		? calcBulkDiscount(price)
		: price
}

/**
 * * Tested!
 * Calculates the Dollar Total of price passed in.
 *
 *
 * @param {string | number} price
 * @return {string} Convert the result to readable USD string with dollar sign
 */
export const displayCurrency = (price: string | number): string => {
	if (typeof price === 'number') {
		return price.toLocaleString('en-US', {
			currency: 'USD',
			maximumFractionDigits: 2,
			minimumFractionDigits: 2,
			style: 'currency'
		})
	}
	return parseFloat(price).toLocaleString('en-US', {
		currency: 'USD',
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		style: 'currency'
	})

}

/**
 * * Tested!
 * Return the discount off we should expect per total passed in. Convert the string to number or
 * convert the percentage to a readable number
 *
 * How it works:
 * For percentage we return the amount off the number passed in, otherwise
 * we just return the coupon amount off.
 *
 * @param {ICouponCode} coupon
 * @param {number} total
 * @return number
 */
export const calcCouponDiscount = (coupon: ICouponState, total: number): number => {
	switch (coupon.type) {

		case 'percent':
			const percentage = (parseInt(coupon.discount, 10) / 100)
			// console.log('discount percentage off', total * percentage)
			return _.round((total * percentage), 2)
		case 'fixed_product':
		case 'fixed_cart':
			// console.log('discount fixed cart', parseFloat(coupon.discount))
			return parseFloat(coupon.discount)

		default:
			return parseFloat(coupon.discount)
	}
}

/**
 * * Tested!
 * Returns the sale price if onSale or regular price if not.
 *
 *
 * @param {IProduct} product
 * @return {string} Price
 */
// incorporate bulk?
export function getPrice (product: IProduct) {
	return product.on_sale ? product.sale_price : product.price
}

export function calcTotalQtyPrice (price: string, qty: number | string): string {
	if (typeof qty === 'string') {
		return '$0.00'
	}
	const productPrice: number = parseFloat(price)
	return displayCurrency(_.round(productPrice * qty, 2))
}
