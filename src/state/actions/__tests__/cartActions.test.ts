/* eslint-disable no-unused-vars */
import { Actions } from '@et/types/Actions'
import { CartActionTypes } from '@et/types/Enums'
import { IProduct } from '@et/types/Products'
import {
	addProductToCart, cartLoadedComplete,
	cartToggle, changeCheckoutType, changeLicenseType,
	emptyCart, removeProductFromCart, updateCartItemQty,
	updateCartPrice,
	updateCartState,
	updateCartTotal
} from '@redux/actions/cartActions'
import {
	singleProduct,
	standardItemAddToCart,
	testCartEmpty,
	ProductKey,
	testProducts,
	testCartWithItem
} from '@redux/reduxTestUtils'
import { cleanup } from 'react-testing-library'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import initialState from '@redux/reducers/initialState'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
afterEach(cleanup)
describe('Cart Action tests', () => {

	it('Should have 3 types ADD_TO_CART, UPDATE_CART_TOTAL & UPDATE_CART_PRICE', () => {
		const store = mockStore(initialState)
		store.dispatch(addProductToCart(
			singleProduct,
			testCartEmpty.items,
			singleProduct.slug,
			1,
			singleProduct.price))
		const getActions = store.getActions()
		const expectedActions = [
			{
				type: CartActionTypes.ADD_TO_CART,
				payload: {
					item: {
						...standardItemAddToCart
					}
				}
			},
			{
				type: CartActionTypes.UPDATE_CART_TOTAL
			},
			{
				type: CartActionTypes.UPDATE_CART_PRICE
			}
		]

		expect(getActions.length).toBe(3)
		expect(getActions).toEqual(expectedActions)
	})

	// test for add extended product with empty cart
	it('Should have extended type ADD_TO_CART + correct default price', () => {
		const store = mockStore(initialState)

		const product: IProduct = testProducts[ProductKey.WatercolorExt]
		const productKey = testProducts[ProductKey.WatercolorStd].slug
		const cartItems = testCartEmpty.items
		const action = addProductToCart(product, cartItems, productKey, 1, product.price)

		// @ts-ignore
		store.dispatch(action)
		const getActions = store.getActions()
		const expectedActions: Actions[] =
			[
				{
					payload: {
						item: {
							[productKey]: {
								extended: true,
								id: product.product_id,
								name: product.name,
								price: product.price,
								qty: 1,
								slug: product.slug
							}
						}
					},
					type: CartActionTypes.ADD_TO_CART
				},
				{
					type: CartActionTypes.UPDATE_CART_TOTAL
				},
				{
					type: CartActionTypes.UPDATE_CART_PRICE
				}
			]

		expect(getActions.length).toBe(3)
		expect(getActions).toEqual(expectedActions)

	})

	it('Should have type UPDATE_CART_TOTAL', () => {

		const store = mockStore(initialState)
		// @ts-ignore
		store.dispatch(updateCartTotal())
		const getActions = store.getActions()
		const expectedActions =
			{
				type: CartActionTypes.UPDATE_CART_TOTAL
			}

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual([expectedActions])

	})

	it('Should have type UPDATE_CART_PRICE', () => {

		const store = mockStore(initialState)
		// @ts-ignore
		store.dispatch(updateCartPrice())
		const getActions = store.getActions()
		const expectedActions =
			{
				type: CartActionTypes.UPDATE_CART_PRICE
			}

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual([expectedActions])

	})

	it('Should have type EMPTY_CART', () => {

		const store = mockStore(initialState)
		// @ts-ignore
		store.dispatch(emptyCart())
		const getActions = store.getActions()
		const expectedActions =
			{
				type: CartActionTypes.EMPTY_CART
			}

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual([expectedActions])
	})

	it('Should have type CART_TOGGLE', () => {

		const store = mockStore(initialState)
		// @ts-ignore
		store.dispatch(cartToggle())
		const getActions = store.getActions()
		const expectedActions =
			{
				type: CartActionTypes.CART_TOGGLE
			}

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual([expectedActions])
	})

	it('Should have type LOAD_CART_COMPLETE', () => {

		const store = mockStore(initialState)
		store.dispatch(cartLoadedComplete())
		const getActions = store.getActions()
		const expectedActions =
			{
				type: CartActionTypes.LOAD_CART_COMPLETE
			}

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual([expectedActions])
	})

	it('Should have type UPDATE_CART_STATE + correct payload', () => {

		const store = mockStore(initialState)
		const cartData = {
			items: {
				...testCartWithItem.items
			},
			totalItems: testCartWithItem.totalItems
		}
		store.dispatch(updateCartState(cartData))
		const getActions = store.getActions()
		const expectedActions: Actions =
			{
				payload: {
					cart: cartData
				},
				type: CartActionTypes.UPDATE_CART_STATE
			}

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual([expectedActions])

	})

	it('Should have type REMOVE_ITEM + correct payload', () => {
		const stateWithCartItem = initialState
		stateWithCartItem.cart = testCartWithItem
		const store = mockStore(stateWithCartItem)

		// @ts-ignore
		store.dispatch(removeProductFromCart(ProductKey.WatercolorStd))
		const getActions = store.getActions()
		const expectedActions: Actions[] = [
			{
				payload: {
					id: ProductKey.WatercolorStd
				},
				type: CartActionTypes.REMOVE_ITEM
			},
			{
				type: CartActionTypes.UPDATE_CART_TOTAL
			},
			{
				type: CartActionTypes.UPDATE_CART_PRICE
			}
		]

		expect(getActions.length).toBe(3)
		expect(getActions).toEqual(expectedActions)

	})

	it('Should have type updateCartItemQty + correct payload', () => {
		const stateWithCartItem = initialState
		stateWithCartItem.cart = testCartWithItem
		const store = mockStore(stateWithCartItem)
		const item = testProducts[ProductKey.WatercolorStd]

		// @ts-ignore
		store.dispatch(updateCartItemQty({
			key: ProductKey.WatercolorStd,
			cartItem: testCartWithItem.items[ProductKey.WatercolorStd],
			bulkDiscount: false,
			regularPrice: testCartWithItem.items[ProductKey.WatercolorStd].price
		}))
		const getActions = store.getActions()
		const expectedActions: Actions[] = [
			{
				payload: {
					price: item.price,
					qty: 1,
					slug: ProductKey.WatercolorStd
				},
				type: CartActionTypes.UPDATE_CART_QTY
			},
			{
				type: CartActionTypes.UPDATE_CART_TOTAL
			},
			{
				type: CartActionTypes.UPDATE_CART_PRICE
			}
		]

		expect(getActions.length).toBe(3)
		expect(getActions).toEqual(expectedActions)

	})

	it('Should have type changeLicenseType + correct payload', () => {
		const stateWithCartItem = initialState
		stateWithCartItem.cart = testCartWithItem
		const store = mockStore(stateWithCartItem)
		const extendedItem = testProducts[ProductKey.WatercolorExt]

		// @ts-ignore
		store.dispatch(changeLicenseType({
			currentCartItem: stateWithCartItem.cart.items[ProductKey.WatercolorStd], // item in cart
			extended: true, // value from dropdown
			cartItemIndex: ProductKey.WatercolorStd, // redundent?
			products: testProducts, // all our products
			bulkDiscount: false // is bulkdiscount enabled
		}))
		const getActions = store.getActions()
		const expectedActions: Actions[] = [
			{
				payload: {
					item: {
						[ProductKey.WatercolorStd]: {
							extended: true,
							id: extendedItem.product_id,
							name: extendedItem.name,
							price: extendedItem.price,
							qty: 1,
							slug: extendedItem.slug
						}
					}
				},
				type: CartActionTypes.UPDATE_CART_LICENSE
			},
			{
				type: CartActionTypes.UPDATE_CART_PRICE
			}
		]

		expect(getActions.length).toBe(2)
		expect(getActions).toEqual(expectedActions)

	})

	it('Should have type changeCheckoutType + correct payload', () => {
		const stateWithCartItem = initialState
		stateWithCartItem.cart = testCartWithItem
		const store = mockStore(stateWithCartItem)

		// @ts-ignore
		store.dispatch(changeCheckoutType('paypal'))
		const getActions = store.getActions()
		const expectedActions: Actions[] = [
			{
				payload: 'paypal',
				type: CartActionTypes.CHANGE_CHECKOUT_TYPE
			}
		]

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual(expectedActions)

	})
})
