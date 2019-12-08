import { IOrderResponse, IReceipt } from '@et/types/WC_Order'
import React from 'react'

interface IProps {
	searchResult?: boolean,
	selectedOrder: IReceipt,
	handleState: any
	handleLinkRefresh: any
}

function isExpired (timeStamp: number) {
	const today = new Date()
	const exp = new Date(timeStamp * 1000)
	// returns true if date is not expired
	return exp.getTime() >= today.getTime()
}

function OrderDisplay (props: IProps) {
	const { selectedOrder } = props

	function createCloseBtn () {
		if (props.searchResult) {
			return null
		}
		return (
			<button onClick={() => {
				props.handleState({
					selectedOrder: null
				})
			}}>Close</button>
		)
	}

	function refreshOrder () {
		props.handleLinkRefresh(selectedOrder.order_id)
	}

	function downloadBtn (expDate: number, download: any) {
		if (!isExpired(expDate)) {
			return (
				<button onClick={refreshOrder}>Refresh Download</button>
			)
		}
		return (
			<a href={download.url}>Download</a>
		)
	}

	console.log('order', props.selectedOrder)

	return (
		<div data-testid='display-orderId'>
			order #{props.selectedOrder.id}

			{/*DOWNLOADS*/}
			{selectedOrder.downloads && selectedOrder.downloads.products.length > 0 &&
      <div>
        Downloads
        <ul>
					{selectedOrder.downloads.products.map(download => (
						<li key={download.name}>
							{downloadBtn(selectedOrder.downloads.exp_date, download)}

						</li>
					))}
        </ul>
      </div>
			}

			<div>
				{createCloseBtn()}
			</div>
		</div>
	)
}

export default OrderDisplay
