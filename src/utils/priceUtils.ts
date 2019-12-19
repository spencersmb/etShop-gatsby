import { ICouponState } from '@et/types/Cart'
import { IProduct } from '@et/types/Products'
import _ from 'lodash'
import { CartPricingConfig } from '@components/cart/cartStatics'

/*
* * Tested!
Convert a decimal number and display it as a percent number
* @param {number} percent
*/
export const displayPercent = (percent: number) => {
	return _.round(percent * 100, 2)
}
/*
 * * Tested!
 Check and return a discounted price based on qty set in config
 *
 *
 * @param {number | string} total
 * @return {number}
*/
export const chooseDiscountPercentage = (total: number | string): number => {
	if (total > 100) {
		return CartPricingConfig.discountTier3
	}
	if (total > 50) {
		return CartPricingConfig.discountTier2
	}
	if (total > 9) {
		return CartPricingConfig.discountTier1
	}
	return 0
}

/*
* * Tested!
Check and return the discounted price based on qty selected
*
*
* @param {string} price
* @param {number} total
* @return {string}
*/
export const calcBulkDiscount = (price: string, total: number): string => {
	// convert to Number
	const strToNum = parseFloat(price)

	// percent in config
	const percent = chooseDiscountPercentage(total)

	// price * percentage subtracted from total price
	return (strToNum - (percent * strToNum)).toString()
}

/**
 * * Tested!
 * Check for bulk pricing and return the new price if true.
 *
 *
 * @param {boolean} bulkDiscount
 * @param {string | number} price
 * @param {string} total
 * @return {string} Convert the result to readable USD string with dollar sign
 */
export function calcBulkPriceDiscount (bulkDiscount: boolean, price: string, total: number = 1): string {

	return bulkDiscount
		? calcBulkDiscount(price, total)
		: price
}

/**
 * * Tested!
 * Calculates the Dollar Total of price passed in.
 *
 *
 * @param {string | number} price
 * @param {boolean} doubleZeros
 * @return {string} Convert the result to readable USD string with dollar sign
 */
export const displayCurrency = (price: string | number, doubleZeros: boolean = false): string => {
	if (!price) {
		return '0'
	}

	let hasDecimal = 0
	let newPrice = '$0.00'
	if (typeof price === 'number') {
		const convertedPrice: string = price.toString()
		hasDecimal = convertedPrice.indexOf('.')
		newPrice = price.toLocaleString('en-US', {
			currency: 'USD',
			maximumFractionDigits: 2,
			minimumFractionDigits: 2,
			style: 'currency'
		})

	} else {
		hasDecimal = price.indexOf('.')
		newPrice = parseFloat(price).toLocaleString('en-US', {
			currency: 'USD',
			maximumFractionDigits: 2,
			minimumFractionDigits: 2,
			style: 'currency'
		})
	}

	if (hasDecimal > 0 || doubleZeros) {
		return newPrice
	} else {
		return newPrice.slice(0, -3)
	}

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
 * @param {ICouponState} coupon
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

/**
 * * Tested!
 * convert price to a formatted number depending on qty passed in.
 * If Qty is a string it means the input is blank, so the total should
 * reflect that.
 *
 *
 * @param {string} price
 * @param {number | string} qty
 * @return {string} qty
 */
export function calcTotalQtyPrice (price: string, qty: number | string): string {
	if (typeof qty === 'string') {
		return '$0.00'
	}
	const productPrice: number = parseFloat(price)
	return displayCurrency(_.round(productPrice * qty, 2))
}

export function calcItemTotal (total: string, qty: string) {

	const totalNumber = parseFloat(total)
	const qtyNumber = parseInt(qty, 10)

	return displayCurrency(totalNumber / qtyNumber, true)
}
