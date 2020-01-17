import { IPaypalSuccessOrder } from '@et/types/Paypal'
import { IOrderDetails } from '@et/types/WC_Order'
import { createHeaders } from '@utils/orderUtils'
import fetched from 'isomorphic-unfetch'

// payment token used if Stripe
interface IFinalOrder extends IOrderDetails {
	payment_token?: string
}

export class CheckoutApi {
	static checkCoupon (couponCode: string): Promise<Response> {
		// const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/getCoupon/${couponCode}`
		// wp-json/et-shop/v1/order/getCoupon
		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/order/getCoupon/${couponCode}`

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
		).then(res => res.json())
	}

	static checkEmail (email: string): Promise<{ data: { emailTaken: boolean } }> {
		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/login/checkEmail?email=${email}`

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
		).then(res => res.json())
	}

	static submitStripeOrder (orderData: IFinalOrder): Promise<Response> {
		console.log('order submitted', orderData)

		// TODO: secret addon from .env
		// const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/orders`
		// et-shop/v1/order/createOrder
		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/order/createOrder`
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

	static processPaypalOrder (orderData: IPaypalSuccessOrder): Promise<Response> {
		// const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/paypalOrder`
		// wp-json/et-shop/v1/order/paypalOrder
		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/order/paypalOrder`
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

	static submitConvertKitUser (url: string, formData: any): Promise<any> {
		return fetched(
			url,
			{
				body: formData,
				method: 'POST'
			}
		)
	}
}
