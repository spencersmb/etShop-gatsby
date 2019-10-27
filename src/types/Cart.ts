import { IProduct, IProducts } from '@et/types/Products'


export interface ICouponApiResponse {
	code: number,
	data: {
		coupon: ICouponRaw
	}
}

export interface ICouponRaw {
	id: number,
	code: string,
	amount: string,
	discount_type: string,
	product_ids: number[],
	excluded_product_ids: number [],
}

export interface ICouponState {
	valid: boolean;
	loading: boolean;
	code: string;
	discount: string;
	type: string;
	product_ids: number[],
	submitted: boolean
}

export interface ICartState {
	coupon: ICouponState,
	paymentType: string,
	totalItems: number,
	totalPrice: number,
	originalPrice: number,
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

export interface IChangeQty {
	cartItem: ICartItem,
	regularPrice: string,
	bulkDiscount: boolean,
	key: string
}

export interface IChangeLicenseData {
	cartItemIndex: string,
	extended: boolean,
	products: IProducts,
	currentCartItem: ICartItem,
	bulkDiscount: boolean
}

export interface ITotalItem {
	regularPrice: number,
	discountedPrice: number
}

export interface ITotal {
	total: number,
	discountedTotal: number
}
