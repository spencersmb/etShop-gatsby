import OrderItem from '@components/account/orderItem'
import { IPaginateState } from '@et/types/Pagination'
import { IReceipt } from '@et/types/WC_Order'
import PaginationBar from '../nav/paginationBar'
import React from 'react'

interface IProps {
	page: number;
	pagination: IPaginateState
	handleClick: (item: any) => void,
	selectedOrder: number
}

const OrdersList = (props: IProps) => {
	const { pagination, page, handleClick, selectedOrder } = props

	console.log('Order list render page defined?', props)

	return (
		<div>
			<h3>Orders:</h3>
			<div>
				{pagination.pages[page] && Object.keys(pagination.pages[page]).map((key: any, index) => {
						const pageItem: IReceipt = pagination.pages[page][key]
						return (
							<OrderItem
								key={pageItem.id}
								itemIndex={index}
								selectedOrder={selectedOrder}
								// isOpen={pageItem.id === state.selectedOrder}
								handleClick={handleClick}
								{...pageItem}
							/>
						)
					}
				).reverse()}
			</div>
			{!pagination.loading && pagination.totalPages > 0 &&
      <PaginationBar currentPage={page} total={pagination.totalPages}/>}
		</div>
	)
}

export default React.memo(OrdersList, (prev: any, next: any): boolean => {
	return !(prev.page !== next.page || prev.selectedOrder !== next.selectedOrder)
})