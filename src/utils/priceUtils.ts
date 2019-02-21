import { ICouponCode } from '@et/types/Cart'
import config from '../../gatsby-config'

/*
Check and return a discounted price based on qty set in config
*/
export const calcPriceBasedOnQty = (qty: number | string, price: string): string => {
	if (typeof qty === 'number' && qty > config.siteMetadata.pricing.minQuantity) {
		// convert to Number
		const strToNum = parseInt(price, 10)

		// percent in config
		const percent = config.siteMetadata.pricing.discount

		// price * percentage subtracted from total price
		return (strToNum - (percent * strToNum)).toString()
	} else {
		return price
	}
}

/**
 * Check for bulk pricing and return the new price if true.
 *
 *
 * @param {boolean} bulkDiscount
 * @param {string | number} licenseQty
 * @param {string} price
 * @return {string} Convert the result to readable USD string with dollar sign
 */
export function calcBulkPriceDiscount (bulkDiscount: boolean, licenseQty: string | number, price: string): string {
	return bulkDiscount
		? calcPriceBasedOnQty(licenseQty, price)
		: price
}

/**
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
 * Return the discount off we should expect per total passed in.
 *
 * How it works:
 * For percentage we return the amount off the number passed in, otherwise
 * we just return the coupon amount off.
 *
 * @param {ICouponCode} couponData
 * @param {number} total
 * @return number
 */
export const calcDiscount = (couponData: ICouponCode, total: number): number => {
	switch (couponData.type) {

		case 'percent':
			const percentage = (parseInt(couponData.discount, 10) / 100)
			// console.log('discount percentage off', total * percentage)
			return total * percentage
		case 'fixed_product':
		case 'fixed_cart':
			// console.log('discount fixed cart', parseFloat(couponData.discount))
			return parseFloat(couponData.discount)

		default:
			return parseFloat(couponData.discount)
	}
}

/**
 * Calculates the Dollar Total of price passed in.
 *
 *
 * @param {object} total - Cart Final number total
 * @return {string} Convert the result to readable USD string
 */
export const convertTotalUSD = (total: number): string => {
	return total.toLocaleString('en-US', {
		currency: 'USD',
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		style: 'currency'
	})
}


