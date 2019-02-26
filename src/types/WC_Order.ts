interface ILineItems {
	product_id: number,
	name: string,
	quantity: number,
	price: string
}

export interface IOrderDetails {
	payment_method: string,
	payment_method_title: string,
	set_paid: boolean,
	total: string,
	total_tax: string,
	prices_include_tax: boolean,
	customer_user_agent: string,
	billing:
		{
			first_name: string,
			last_name?: string,
			email: string
		},
	line_items: ILineItems[],
	paypal?: {
		paid: boolean
		cancelled: boolean
		payerID: string
		paymentID: string
		paymentToken: string
	}
	coupon_code: null | string
}

export interface IWcOrderItem {
	product_id: number
	name: string,
	price: string,
	pwyw: {
		enabled: boolean,
		price: string,
	},
	quantity: number | string
}

export interface IStripeFormData {
	email: string,
	firstName: string
	lastName: string
}

export interface IBillingWc {
	email: string
	first_name: string
	last_name: string
}