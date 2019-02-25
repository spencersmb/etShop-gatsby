import config from '../../gatsby-config'
import fetched from 'isomorphic-unfetch'
export class CheckoutApi {
	static checkCoupon(couponCode: string): Promise<Response> {
		const url: string = `${config.siteMetadata.db}/wp-json/${config.siteMetadata.route}/getCoupon/${couponCode}`

		return fetched(
			url,
			{
				headers: {
					'Content-Type': 'application/json',
					'accept': 'application/json',
				},
				method: 'GET',
				mode: 'cors'
			}
		)
	}
}