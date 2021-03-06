import OrderItem from '@components/account/orderItem'
import { IPaginateState } from '@et/types/Pagination'
import { IReceipt } from '@et/types/WC_Order'
import PaginationBar from '../nav/paginationBar'
import React from 'react'

interface IProps {
	page: number;
	pagination: IPaginateState
	handleClick: (item: any) => void,
	selectedOrder: any
}

const OrdersList = (props: IProps) => {
	const { pagination, page, handleClick, selectedOrder } = props
	// console.log('Order list render page defined?', props)
	const items = Object.keys(pagination.pages[page])

	if (items.length === 0) {
		return (
			<div>Sorry no Items found</div>
		)
	}

	return (
		<>
			{pagination.pages[page] && items.map((key: any, index) => {
					const pageItem: IReceipt = pagination.pages[page][key]
					return (
						<OrderItem
							key={pageItem.id}
							itemIndex={index}
							selectedOrder={selectedOrder}
							handleClick={handleClick}
							{...pageItem}
						/>
					)
				}
			).reverse()}
		</>
	)
}

export default React.memo(OrdersList, (prev: any, next: any): boolean => {
	return !(prev.page !== next.page || prev.selectedOrder !== next.selectedOrder)
})
