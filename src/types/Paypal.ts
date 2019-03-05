
interface IPaypalPayer {
	name:{
		given_name: string
		surname: string
	},
	email_address: string
	payment_method: string;
	status: string
}

interface IPaypalTransactionItem {
	name: string;
	sku: string;
	price: string;
	currency: string;
	quantity: number;
}

interface IPaypalTransactionResources {
	sale: {
		amount: {
			total: string;
			currency: string;
		},
		id: string;
	}
}

interface IPaypalTransaction {
	payments:{
		captures: [{id: string}]
	},
	amount: {
		total: string,
		currency: string,
		details: any,
		item_list: IPaypalTransactionItem[]
	},
	related_resources: IPaypalTransactionResources[]
}
export interface IPaypalPaymentData {
	cart: string,
	id: string,
	intent: string,
	payer: IPaypalPayer,
	state: string,
	purchase_units: IPaypalTransaction[]
}

export interface IPaypalComplete {
	cancelled: boolean;
	paid: boolean;
	payerID: string;
	paymentData: IPaypalPaymentData,
	paymentToken: string;
	payment_id: string;
	transactionId: string;
	wc_order_id: string;
	email: string;
	id: string;
}

export interface IPaypalSuccessOrder {
	first_name: string,
	last_name: string,
	paid: boolean,
	payment_id: string,
	payment_method: string,
	payment_token: string,
	paypal_email: string,
	paypal_transaction_id: string,
	wc_order_id: string,
}

export interface IPaypalItem {
	name: string,
	unit_amount: {
		value: string,
		currency_code: string
	},
	quantity: number | string,
	// description: string,
	sku: string
	category: string
}

export interface IPaymentResponse {
	cancelled: boolean;
	paid: boolean;
	payerID: string;
	paymentData: any;
	payment_id: string;
	paymentToken: string;
	transactionId: string;
	wc_order_id: string;
	id: string;
	email: string;
}
