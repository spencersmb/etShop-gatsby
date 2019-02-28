import { IOrderDetails } from '@et/types/WC_Order'
import { createHeaders } from '@utils/orderUtils'
import fetched from 'isomorphic-unfetch'

// payment token used if Stripe
interface IFinalOrder extends IOrderDetails {
	payment_token?: string
}

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

	static submitStripeOrder (orderData: IFinalOrder): Promise<Response> {
		console.log('order to submit', orderData)
		// TODO: secret addon from .env
		const url: string = `${process.env.DB}/wp-json/${process.env.ROUTE}/orders`
		const headerOptions = createHeaders()
		const options: any = {
			body: JSON.stringify(orderData),
			...(headerOptions && { headers: headerOptions }),
			method: 'POST',
			mode: 'cors'
		}

		return fetched(
			url,
			options
		)
	}
}