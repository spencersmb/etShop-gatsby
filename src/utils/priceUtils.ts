import config from '../../gatsby-config'
/*
Return a new price based on qty selected 
*/
export const calcPriceBasedOnQty = (qty: number | string, price: string): string => {
	if (typeof qty === 'number' && qty > config.siteMetadata.pricing.minQuantity) {
		const strToNum = parseInt(price, 10)
		console.log('strToNum', strToNum)
		
		const percent = config.siteMetadata.pricing.discount
		return (strToNum - (percent * strToNum)).toString()
	} else {
		return price
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