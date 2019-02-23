import { ICouponCode } from '@et/types/Cart'
import config from '../../gatsby-config'
import _ from 'lodash'

/*
* * Tested!
Check and return a discounted price based on qty set in config
*/
export const calcBulkDiscount = (price: string): string => {
	// convert to Number
	const strToNum = parseInt(price, 10)

	// percent in config
	const percent = config.siteMetadata.pricing.discount

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
export const calcCouponDiscount = (coupon: ICouponCode, total: number): number => {
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



