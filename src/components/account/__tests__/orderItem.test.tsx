import OrderItem from '@components/account/orderItem'
import { CartItem } from '@components/cart/cartItem'
import { ProductKey, testProducts, testReceipt } from '@redux/reduxTestUtils'
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
	itemIndex: 16,
	selectedOrder: 16,
	handleClick: jest.fn(),
	...testReceipt
}

describe('Order Item Tests', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<OrderItem {...props}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct order ID text', () => {
		const modalRender = render(<OrderItem {...props}/>)
		expect(modalRender.getByTestId('orderItem-id').innerHTML).toBe(`order# ${props.id}`)
	})

	it('Should render correct date', () => {
		const modalRender = render(<OrderItem {...props}/>)
		expect(modalRender.getByTestId('orderItem-date').innerHTML).toBe(`date: ${props.date}`)
	})

	it('Should render correct total', () => {
		const modalRender = render(<OrderItem {...props}/>)
		const select = modalRender.getByTestId('orderItem-total').innerHTML
		expect(select).toEqual(`total ${props.total}`)
	})

	it('Should render correct text color when selected', () => {
		const modalRender = render(<OrderItem {...props}/>)
		const wrapper = modalRender.getByTestId('orderItem-wrapper')
		expect(wrapper).toHaveStyle(`color: black`)
	})

	it('Should render correct red text color when selected', () => {
		const redProps = props
		props.itemIndex = 222
		props.selectedOrder = 667
		const modalRender = render(<OrderItem {...redProps}/>)
		const wrapper = modalRender.getByTestId('orderItem-wrapper')
		expect(wrapper).toHaveStyle(`color: red`)
	})

	it('Should call handleClick action', () => {
		const modalRender = render(<OrderItem {...props}/>)
		const btn: any = modalRender.getByTestId('orderItem')
		btn.click()
		const calledWidth = props.id
		expect(props.handleClick).toHaveBeenCalledTimes(1)
		expect(props.handleClick).toHaveBeenCalledWith(calledWidth)

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

	xit('Should call removeItem action with correct item index', () => {
		const modalRender = render(<CartItem {...props}/>)
		const btn = modalRender.getByTestId('removeItemBtn')
		btn.click()
		expect(props.removeItem).toHaveBeenCalledTimes(1)
		expect(props.removeItem).toHaveBeenCalledWith(ProductKey.WatercolorStd)
	})

})