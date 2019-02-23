import { CartItem } from '@components/cart/cartItem'
import { ProductKey, testCartWithItem, testProducts } from '@redux/reduxTestUtils'
import { calcBulkDiscount, displayCurrency, getPrice } from '@utils/priceUtils'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup,
	fireEvent
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const props = {
	cartIndex: ProductKey.WatercolorStd,
	cart: {
		...testCartWithItem
	},
	products: testProducts,
	updateCartItemQty: jest.fn(),
	changeLicense: jest.fn(),
	removeItem: jest.fn()
}

describe('User Hoc Render Props', () => {

	// TODO: add coupon & discount tests
	it('renders correctly', () => {
		const tree = renderer
			.create(
				<CartItem {...props}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct item name', () => {
		const modalRender = render(<CartItem {...props}/>)
		expect(modalRender.getByTestId('productName').innerHTML).toBe(testProducts[ProductKey.WatercolorStd].name)
	})

	it('Should render correct regular price', () => {
		const modalRender = render(<CartItem {...props}/>)
		expect(modalRender.getByTestId('productPrice').innerHTML).toBe(displayCurrency(testProducts[ProductKey.WatercolorStd].price))
	})

	it('Should render correct license', () => {
		const modalRender = render(<CartItem {...props}/>)
		const select = modalRender.getByTestId('selectID')
		expect(select.children[0].innerHTML).toEqual('Standard')
	})

	it('Should render correct discounted price and show discount content', () => {
		const discountedProps = props
		discountedProps.cart.items[ProductKey.WatercolorStd].qty = 12
		discountedProps.cart.items[ProductKey.WatercolorStd].price = '14.4'
		const modalRender = render(<CartItem {...discountedProps}/>)
		const input: any = modalRender.getByTestId('numberDial')

		expect(modalRender.getByTestId('bulkDiscount').innerHTML).toEqual('Bulk discount of 0.1 applied')
		expect(modalRender.getByTestId('productPrice').innerHTML).toBe(displayCurrency(calcBulkDiscount(testProducts[ProductKey.WatercolorStd].price)))
		expect(input.value).toEqual('12')
	})

	it('Should call updateCartItemQty action', () => {
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

	it('Should call changeLicense action', () => {
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

	it('Should call removeItem action with correct item index', () => {
		const modalRender = render(<CartItem {...props}/>)
		const btn = modalRender.getByTestId('removeItemBtn')
		btn.click()
		expect(props.removeItem).toHaveBeenCalledTimes(1)
		expect(props.removeItem).toHaveBeenCalledWith(ProductKey.WatercolorStd)
	})

})