import { Dashboard } from '@components/account/dashboard'
import { testPaginationFull, testReceipt } from '@redux/reduxTestUtils'
import React from 'react'
import { act } from 'react-dom/test-utils'
import {
	render,
	cleanup,
	wait
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)
// this is just a little hack to silence a warning that we'll get until react
// fixes this: https://github.com/facebook/react/pull/14853
// https://github.com/kentcdodds/react-testing-library/issues/281
const originalError = console.error
beforeAll(() => {
	console.error = (...args: any) => {
		if (/Warning.*not wrapped in act/.test(args[0])) {
			return
		}
		originalError.call(console, ...args)
	}
})

afterAll(() => {
	console.error = originalError
})

const props = {
	location: {
		search: '1'
	},
	pagination: testPaginationFull,
	getOrders: jest.fn(() => Promise.resolve({
		orders: {
			667: {
				...testReceipt
			},
			668: {
				...testReceipt,
				order_id: '668'
			}
		}
	})),
	selectedOrder: null,
	searchOrderById: jest.fn(),
	resetDownloadLinks: jest.fn(),
	user: null
}
describe('Dashboard test', () => {

	it('Should call getOrders function', async () => {
		const modalRender = render(<Dashboard {...props}/>)

		await wait(() => {
				expect(props.getOrders).toHaveBeenCalledTimes(1)
				expect(props.getOrders).toHaveBeenCalledWith(1)
			}
		)
	})

	it('Should have correct order ID', async () => {
		const modalRender = render(<Dashboard {...props}/>)
		await wait(() => expect(modalRender.getByTestId('display-orderId').innerHTML).toBe('667'))
	})

})
