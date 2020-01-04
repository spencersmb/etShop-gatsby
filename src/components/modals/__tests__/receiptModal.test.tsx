import Receipt from '@components/modals/receipt'
import { testReceipt } from '@redux/reduxTestUtils'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const props = {
	closeModal: jest.fn(),
	options: {
		data: {
			...testReceipt
		}
	}
}
describe('Reciept Modal', () => {

	it('Should render correct user email', () => {
		const modalRender = render(<Receipt {...props}/>)
		expect(modalRender.getByTestId('emailCopy').innerHTML).toEqual(`Copy sent to ${testReceipt.email}`)
	})

	it('Should render correct total', () => {
		const modalRender = render(<Receipt {...props}/>)
		expect(modalRender.getByTestId('receiptTotal').innerHTML).toEqual(`$${testReceipt.total}`)
	})

	it('Should render correct OrderId', () => {
		const modalRender = render(<Receipt {...props}/>)
		expect(modalRender.getByTestId('receiptOrderId').innerHTML).toEqual(`Order #${testReceipt.order_id}`)
	})

	it('Should render correct Date', () => {
		const modalRender = render(<Receipt {...props}/>)
		expect(modalRender.getByTestId('receiptDate').innerHTML).toEqual(`${props.options.data.date}`)
	})

	it('Should render correct number of Downloads', () => {
		const modalRender = render(<Receipt {...props}/>)
		expect(modalRender.getByTestId('orderDownloads').children.length).toEqual(testReceipt.downloads.products.length)
	})

	it('Should render correct download items', () => {
		const modalRender = render(<Receipt {...props}/>)
		const item = modalRender.getByTestId(`download-url`)
		const name = modalRender.getByTestId(`download-name`)

		const attrs: any = item.getAttribute('href')
		expect(attrs).toBe(testReceipt.downloads.products[0].url)
		expect(name.innerHTML).toEqual('Watercolor kit<span>Version 2.0</span>')
	})

})
