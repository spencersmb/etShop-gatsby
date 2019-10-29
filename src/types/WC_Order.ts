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
	cardType: string,
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
	bulkDiscount: boolean
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
	order: IReceipt
}

export interface IOrderDownload {
	exp_date: number;
	products: IOrderDownloadItem[]
}

export interface IOrderDownloadItem {
	url: string
	id: number
	name: string
	filename: string
}

export interface IRefund {
	total_refunded: string
	reason: string
}

export interface IReceipt {
	id: number
	total: string
	date: string
	status: string
	transactionId: string
	refund?: IRefund
	payment_type: string
	order_id: string
	email: string
	date_completed: string
	totals: string
	subtotal: string
	cardType: null | string
	discounts: string // 0 if no discount
	discounts_reverse: number; // 0 if no discount
	coupon_used: string[] // will have one item if used
	downloads: IOrderDownload
}
