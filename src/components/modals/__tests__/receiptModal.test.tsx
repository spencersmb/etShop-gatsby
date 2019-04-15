import Receipt from '@components/modals/receipt'
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
			type: 'Stripe',
			total: '16.00',
			orderId: '324',
			date: 'March 8, 2019',
			email: 'everytues-buyer@gmail.com',
			downloads: {
				exp_date: 1313131321,
				products: [
					{
						url: 'asdadaa',
						id: 222,
						name: 'Watercolor',
						filename: '*.zip'
					},
					{
						url: 'asdadaa',
						id: 16,
						name: 'Skinny Jeans',
						filename: '*.zip'
					}
				]
			}
		}
	}
}
describe('Reciept Modal', () => {

	it('Should render correct user email', () => {
		const modalRender = render(<Receipt {...props}/>)
		expect(modalRender.getByTestId('emailCopy').innerHTML).toEqual('Copy sent to everytues-buyer@gmail.com')
	})

	it('Should render correct total', () => {
		const modalRender = render(<Receipt {...props}/>)
		expect(modalRender.getByTestId('receiptTotal').innerHTML).toEqual('total: $16.00')
	})

	it('Should render correct OrderId', () => {
		const modalRender = render(<Receipt {...props}/>)
		expect(modalRender.getByTestId('receiptOrderId').innerHTML).toEqual('order #324')
	})

	it('Should render correct Date', () => {
		const modalRender = render(<Receipt {...props}/>)
		expect(modalRender.getByTestId('receiptDate').innerHTML).toEqual(`date: ${props.options.data.date}`)
	})

	it('Should render correct number of Downloads', () => {
		const modalRender = render(<Receipt {...props}/>)
		expect(modalRender.getByTestId('orderDownloads').children.length).toEqual(2)
	})

	it('Should render correct download item', () => {
		const modalRender = render(<Receipt {...props}/>)
		const item = modalRender.getByTestId('download-222')
		const attrs: any = item.children[0].getAttribute('href')
		expect(attrs).toBe(props.options.data.downloads.products[0].url)
		expect(item.children[0].innerHTML).toEqual('Watercolor')
	})

})