import Receipt from '@components/modals/receipt'
import { IOderDownloadItem } from '@et/types/WC_Order'
import React from 'react'
import renderer from 'react-test-renderer'
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
			downloads: [
				{
					access_expires: null,
					download_url: 'http://shopeverytuesday.local/?download_file=222&order=wc_order_EdNHrViFaMtUl&uid=c24e829363b796166ef3bf065a6d18155b8cea36bbb5f692c52e02b6c0d70d20&key=831ced27-6944-4747-a419-99c292de9c0c',
					downloads_remaining: '',
					order_id: 657,
					product_id: 222,
					product_name: 'Watercolor texture kit Vol. 1',
					product_url: 'http://shopeverytuesday.local/product/watercolor-texture-kit'
				},
				{
					access_expires: null,
					download_url: 'http://shopeverytuesday.local/?download_file=222&order=wc_order_EdNHrViFaMtUl&uid=c24e829363b796166ef3bf065a6d18155b8cea36bbb5f692c52e02b6c0d70d20&key=831ced27-6944-4747-a419-99c292de9c0c',
					downloads_remaining: '',
					order_id: 657,
					product_id: 100,
					product_name: 'Watercolor texture kit Vol. 2',
					product_url: 'http://shopeverytuesday.local/product/watercolor-texture-kit'
				}
			]
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
		expect(attrs).toBe(props.options.data.downloads[0].download_url)
		expect(item.children[0].innerHTML).toEqual('Watercolor texture kit Vol. 1')
	})

})