import { CartItem } from '@components/cart/cartItem'
import { ProductKey, testCartWithItem, testProducts } from '@redux/reduxTestUtils'
import { calcBulkDiscount, displayCurrency, getPrice } from '@utils/priceUtils'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup,
	wait,
	fireEvent
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const props = {
	cartIndex: ProductKey.WatercolorStd,
	itemIndex: 0,
	cart: {
		...testCartWithItem
	},
	products: testProducts,
	updateCartItemQty: jest.fn(),
	changeLicense: jest.fn(),
	removeItem: jest.fn()
}

describe('Cart Item tests', () => {

	it('Should render correct item name', () => {
		const modalRender = render(<CartItem {...props}/>)
		expect(modalRender.getByTestId('productName').innerHTML).toBe(testProducts[ProductKey.WatercolorStd].name)
	})

	it('Should render correct price per license', () => {
		const modalRender = render(<CartItem {...props}/>)
		expect(modalRender.getByTestId('productPrice').innerHTML).toBe(displayCurrency(testProducts[ProductKey.WatercolorStd].price))
	})

	it('Should render correct license Quantity', () => {
		const modalRender = render(<CartItem {...props}/>)
		expect(modalRender.getByTestId('itemQty').innerHTML).toBe(testCartWithItem.items[ProductKey.WatercolorStd].qty.toString())
	})

	it('Should render correct total', () => {
		const modalRender = render(<CartItem {...props}/>)
		expect(modalRender.getByTestId('itemTotal').innerHTML).toBe('$16')
	})

	it('Should render correct license', () => {
		const modalRender = render(<CartItem {...props}/>)
		const select = modalRender.getByTestId('itemLicense')
		expect(select.innerHTML).toEqual('Standard License')
	})

	it('Should render correct discounted price and show discount content', async () => {
		const discountedProps = props
		discountedProps.cart.items[ProductKey.WatercolorStd].qty = 12
		discountedProps.cart.items[ProductKey.WatercolorStd].price = '11.7'
		const modalRender = render(<CartItem {...discountedProps}/>)

		await wait(() => {
			const discount = modalRender.getByTestId('discountSavings')
			const originalTotal = modalRender.getByTestId('originalTotal')
			expect(discount.innerHTML).toBe('-$51.60')
			expect(originalTotal.innerHTML).toBe('$192')
		})
	})

	it('Should call removeItem action with correct item index', () => {
		const modalRender = render(<CartItem {...props}/>)
		const btn = modalRender.getByTestId('removeItemBtn')
		btn.click()
		expect(props.removeItem).toHaveBeenCalledTimes(1)
		expect(props.removeItem).toHaveBeenCalledWith(ProductKey.WatercolorStd)
	})

	xit('Should call updateCartItemQty action', () => {
		const modalRender = render(<CartItem {...props}/>)
		const input: any = modalRender.getByTestId('numberDial')
		fireEvent.input(input, { target: { value: 23 } })

		const cartItemRef = props.cart.items[ProductKey.WatercolorStd]
		const calledWidth = {
			key: props.cartIndex,
			cartItem: {
				...cartItemRef,
				qty: 23
			},
			bulkDiscount: true,
			regularPrice: getPrice(testProducts[cartItemRef.slug])
		}
		expect(props.updateCartItemQty).toHaveBeenCalledTimes(1)
		expect(props.updateCartItemQty).toHaveBeenCalledWith(calledWidth)

	})

	xit('Should call changeLicense action', () => {
		const modalRender = render(<CartItem {...props}/>)
		const select = modalRender.getByTestId('selectID')
		fireEvent.change(select)

		const calledWith = {
			currentCartItem: props.cart.items[props.cartIndex], // item in cart
			extended: false, // value from dropdown
			cartItemIndex: props.cartIndex, // redundent?
			products: testProducts, // all our products
			bulkDiscount: true // is bulkdiscount enabled
		}
		expect(props.changeLicense).toHaveBeenCalledTimes(1)
		expect(props.changeLicense).toHaveBeenCalledWith(calledWith)

	})

	// renders pose component so we can't do snapshot
	// it('renders correctly', () => {
	// 	const tree = renderer
	// 		.create(
	// 			<CartItem {...props}/>
	// 		)
	// 		.toJSON()
	// 	expect(tree).toMatchSnapshot()
	// })

})
