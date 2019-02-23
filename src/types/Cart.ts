import { IProduct, IProducts } from '@et/types/Products'

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
	qty: number | string,
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
	itemSlug: string,
	extended: boolean,
	products: IProducts,
	currentCartItem: ICartItem,
	bulkDiscount: boolean
}