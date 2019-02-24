import initialState from '@redux/reducers/initialState'
import { ProductKey, testCartWithItem, testCartWithItemAndCoupon, testProducts } from '@redux/reduxTestUtils'
import { checkCartForProduct, checkForCoupon, isPWYWItemInCart, totalItemsInCart } from '@utils/cartUtils'
import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('Cart Helper Utils', () => {

	it('Should return correct array checkCartForProduct()', () => {

		const noItems = checkCartForProduct(initialState.cart, ProductKey.WatercolorStd)
		const hasItems = checkCartForProduct(testCartWithItem, ProductKey.WatercolorStd)

		expect(noItems).toEqual([])
		expect(hasItems).toEqual([
			ProductKey.WatercolorStd
		])
	})

	it('Should return length of items in cart', () => {
		const itemsInCart = totalItemsInCart(testCartWithItem.items)
		expect(itemsInCart).toEqual(1)
	})

	it('Should check the id of a product and return an array with item if found', () => {
		const foundItem = checkForCoupon(testCartWithItemAndCoupon.coupon.product_ids, testProducts[ProductKey.WatercolorStd].product_id)
		const notFound = checkForCoupon(testCartWithItemAndCoupon.coupon.product_ids, testProducts[ProductKey.WatercolorExt].product_id)

		expect(foundItem).toBe(true)
		expect(notFound).toBe(false)
	})

	it('Should return false if a PWYW item is in the cart', () => {
		expect(isPWYWItemInCart(testCartWithItem.items, testProducts)).toEqual(false)
	})

	it('Should return true if a PWYW item is in the cart', () => {
		const hasPwyw = { ...testCartWithItem }
		hasPwyw.items[ProductKey.Honeymoon] = {
			extended: false,
			id: testProducts[ProductKey.Honeymoon].product_id,
			name: testProducts[ProductKey.Honeymoon].name,
			price: testProducts[ProductKey.Honeymoon].price,
			qty: 1,
			slug: testProducts[ProductKey.Honeymoon].slug
		}

		expect(isPWYWItemInCart(hasPwyw.items, testProducts)).toEqual(true)
	})

})