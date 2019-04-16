import OrderItem from '@components/account/orderItem'
import { testReceipt } from '@redux/reduxTestUtils'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
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

})