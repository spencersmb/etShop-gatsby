import { ICartItemWithKey, ICartState } from '@et/types/Cart'
import { IProducts } from '@et/types/Products'
import { IAuthResponse, IUserState } from '@et/types/User'
import { IBillingWc, IOrderDetails, IGuestFormData, IWcOrderItem } from '@et/types/WC_Order'
import { displayCurrency } from '@utils/priceUtils'

/**
 * * Tested
 * Create Billing structure for WC
 * Takes in user and formData. If user is logged in return user credentials
 * Else return the guest data entered in the form
 *
 * @param {IUserState} user
 * @param {IGuestFormData} formData
 * @return IBillingWc
 */
export function wc_createBilling (user: IUserState, formData: IGuestFormData): IBillingWc {
	return {
		email: user ? user.email : formData.email,
		first_name: user ? user.firstName : formData.firstName,
		last_name: user ? user.lastName : formData.lastName
	}
}

/**
 * * Tested
 * Create Order structure for WC
 * Takes in the cart, billing, and all products to return an object ready to submit as
 * an order to WC
 *
 * @param {ICartState} cart
 * @param {IBillingWc} billing
 * @param {IProducts} products
 * @return IOrderDetails
 */
export function wc_createOrder (cart: ICartState, billing: IBillingWc, products: IProducts): IOrderDetails {
	return {
		billing,
		coupon_code: cart.coupon.valid ? cart.coupon.code : null,
		customer_user_agent: billing.email,
		line_items: wcCreateOrderLineItems(cart.items, products),
		payment_method: cart.paymentType,
		payment_method_title: `Credit Card (${cart.paymentType})`,
		prices_include_tax: true,
		set_paid: false,
		total: displayCurrency(cart.totalPrice).substring(1), // 12.00 - string
		total_tax: displayCurrency(cart.totalPrice).substring(1)
	}
}

/**
 * * Tested
 * Create line item specifically for Stripe + WC backend DB
 *
 * @param {ICartState} cartItems - Cart Object from Redux Store
 * @param {IProducts} products - Products from Redux Store
 * @return {IWcOrderItem[]} array - Item-key we ware looking for
 */
export const wcCreateOrderLineItems = (cartItems: ICartItemWithKey, products: IProducts): IWcOrderItem[] => {
	const keys = Object.keys(cartItems)
	return keys.map((key: string) => ({
		name: cartItems[key].name,
		price: cartItems[key].price,
		product_id: cartItems[key].id,
		pwyw: {
			enabled: products[cartItems[key].slug].pwyw ? cartItems[key].price !== '0.00' : false,
			price: cartItems[key].price
		},
		quantity: typeof cartItems[key].qty === 'number' ? cartItems[key].qty : 0
	}))
}

/**
 * * Tested
 * Create Headers for API calls
 * If token is found in localstorage pass that along with the headers
 *
 * @return {Object}
 */
export const createHeaders = () => {
	const token: string | null = getTokenFromLocalStorage()

	if (token) {
		return {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			'Authorization': `Bearer ${token}`
		}
	}
	return {
		'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
	}
}

/**
 * getTokenLocalStorage()
 * - Get JWT from localstorage
 *
 */
export const getTokenFromLocalStorage = (): string | null => {
	// @ts-ignore
	if (!process.browser) {
		return null
	}
	const user: string | null = window.localStorage.getItem('et-shop-user')

	if (user) {
		const decoded: IAuthResponse = JSON.parse(user)
		return decoded.token
	}
	return null
}