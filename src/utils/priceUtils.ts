import config from '../../gatsby-config'
/*
Return a new price based on qty selected
*/
export const calcPriceBasedOnQty = (qty: number | string, price: string): string => {
	if (typeof qty === 'number' && qty > config.siteMetadata.pricing.minQuantity) {
		const strToNum = parseInt(price, 10)
		const percent = config.siteMetadata.pricing.discount
		return (strToNum - (percent * strToNum)).toString()
	} else {
		return price
	}
}