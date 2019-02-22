import initialState from '@redux/reducers/initialState'
import { ProductKey, testCartWithItem } from '@redux/reduxTestUtils'
import { checkCartForProduct, totalItemsInCart } from '@utils/cartUtils'
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

})