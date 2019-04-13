import PaginationBar from '@components/nav/paginationBar'
import OrderItem from '@components/user/orderItem'
import { IPaginateState } from '@et/types/Pagination'
import { IState } from '@et/types/State'
import { IReceipt } from '@et/types/WC_Order'
import { addItemAfterOrder, fetchOrders } from '@redux/actions/paginationActions'
import React, { useEffect, useReducer, Dispatch as ReactDispatch } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

interface IProps {
	page: number;
	pagination: IPaginateState
	handleClick: (item: any) => void
}

interface IPublicState {
	selectedOrder: number
}

interface INewState {
	type: string,
	selectedOrder?: number
}

type useSetStateType = [IPublicState, ReactDispatch<INewState>]

export function useSetState (initialState: any): useSetStateType {
	const [state, setState] = useReducer((originalState: IPublicState, newState: INewState) => ({ ...originalState, ...newState }),
		initialState)

	return [
		state,
		setState
	]
}

const OrdersList = (props: IProps) => {
	const { pagination, page, handleClick, selectedOrder } = props

	console.log('Orderlist render page defined?', props)

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