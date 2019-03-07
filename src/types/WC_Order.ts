export interface IStripeGuestForm {
	email: string,
	firstName: string,
	lastName: string
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
	line_items: IWcOrderItem[],
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

export interface IGuestFormData {
	email: string,
	firstName: string
	lastName: string
}

export interface IBillingWc {
	email: string
	first_name: string
	last_name: string
}

export interface IOrderResponse {
	code: number,
	message: string,
	order: {
		order_id: string;
		email: string;
		date: string;
		downloads: IOderDownloadItem[],
		total: string
	}
}

export interface IOderDownloadItem {
	download_url: string,
	product_id: number,
	product_name: string,
	product_url: string,
	order_id: number,
	downloads_remaining: string,
	access_expires: null
}