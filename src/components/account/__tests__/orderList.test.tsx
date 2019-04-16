import OrdersList from '@components/account/ordersList'
import { testPaginationFull } from '@redux/reduxTestUtils'
import React from 'react'
import renderer from 'react-test-renderer'
import { cleanup, render } from 'react-testing-library'

afterEach(cleanup)
const props = {
	page: 1,
	pagination: testPaginationFull,
	handleClick: jest.fn(),
	selectedOrder: 222
}
describe('Product List Layout', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<OrdersList {...props}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct items', () => {
		const modalRender = render(<OrdersList {...props}/>)
		const list = modalRender.getByTestId('orderList')
		expect(list.children.length).toEqual(2)
	})

	it('Should render pagination bar', () => {
		const modalRender = render(<OrdersList {...props}/>)
		const bar = modalRender.getByTestId('paginationBar')
		expect(bar).toBeTruthy()
	})
})