import { ICartState } from '@et/types/Cart'

/**
 * Check Redux cart for a particular item we pass in
 *
 * How it works;
 * Filter - Return empty array if nothing found, else return array with matching item
 *
 * @param {ICartState} cart - Cart Object from Redux Store
 * @param {string} slug - Item-key we ware looking for
 */
export const checkCartForProduct = (cart: ICartState, slug: string): string[] => {
	const cartKeys = Object.keys(cart.items)
	return cartKeys.filter(key => key === slug)
}