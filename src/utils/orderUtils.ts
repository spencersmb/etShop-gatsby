import { ICartState } from '@et/types/Cart'
import { IProducts } from '@et/types/Products'
import { IUserState } from '@et/types/User'
import { IBillingWc, IStripeFormData } from '@et/types/WC_Order'
import { wcCreateOrderLineItems } from '@utils/cartUtils'
import { displayCurrency } from '@utils/priceUtils'

export function wc_createBilling (user: IUserState, formData: IStripeFormData): IBillingWc {
	return {
		email: user ? user.email : formData.email,
		first_name: user ? user.firstName : formData.firstName,
		last_name: user ? user.lastName : formData.lastName
	}
}

export function wc_createOrder (cart: ICartState, billing: IBillingWc, products: IProducts) {
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