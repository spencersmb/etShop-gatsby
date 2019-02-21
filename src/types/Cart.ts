export interface ICouponCode {
	valid: boolean;
	loading: boolean;
	code: string;
	discount: string;
	type: string;
	product_ids: number[],
	submitted: boolean
}

export interface ICartState {
	couponCode: ICouponCode,
	paymentType: string,
	totalItems: number,
	totalPrice: number,
	loaded: boolean,
	isOpen: boolean,
	items: {
		[id: string]: ICartItem
	}
}

export interface ICartItem {
	extended: boolean
	id: number,
	name: string,
	price: string,
	qty: number,
	slug: string
}

export interface ICartItemWithKey {
	[id: string]: ICartItem
}

export interface ILocalStorageCart {
	items: {
		[id: string]: ICartItem
	}
}