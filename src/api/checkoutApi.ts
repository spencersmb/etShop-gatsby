import fetched from 'isomorphic-unfetch'

export class CheckoutApi {
	static checkCoupon (couponCode: string): Promise<Response> {
		const url: string = `${process.env.DB}/wp-json/${process.env.ROUTE}/getCoupon/${couponCode}`

		return fetched(
			url,
			{
				headers: {
					'Content-Type': 'application/json',
					'accept': 'application/json'
				},
				method: 'GET',
				mode: 'cors'
			}
		)
	}
}