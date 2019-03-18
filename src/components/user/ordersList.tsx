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
	orders: any
	path: string,
	uri: string,
	navigate: any,
	location: {
		search: string
	}
}

interface IReduxState {
	pagination: IPaginateState
}

interface IReduxActions {
	getOrders: (page: number) => void
}

function getCurrentPage (path: string) {
	const split = path
		.split(/(=)/)
		.splice(2, 2)
		.reduce((a, b) => {
			return parseInt(b, 10)
		}, 0)
	console.log('split', split)

	if (split !== 0) {
		return split
	}
	return 1
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

const OrdersList = (props: IProps & IReduxActions & IReduxState) => {
	const { pagination } = props
	// const [state, setState] = useSetState({
	// 	selectedOrder: null
	// })
	const page = getCurrentPage(props.location.search)

	console.log('Orderlist render', props.pagination.pages[page])
	useEffect(() => {
		// console.log('page to fetch', page)
		props.getOrders(page)
	}, [props.location.search])

	function addItem () {
		// props.add({
		// 	order: {
		// 		date: '03-09-2019',
		// 		id: 999,
		// 		total: '3.46'
		// 	}
		// })
	}

	return (
		<div>
			<h3>Orders:</h3>
			<button onClick={addItem}>Test</button>
			<div>
				{pagination.pages[page] && Object.keys(pagination.pages[page]).map((key: any, index) => {
						const pageItem: IReceipt = pagination.pages[page][key]
						return (
							<OrderItem
								key={pageItem.id}
								itemIndex={index}
								// isOpen={pageItem.id === state.selectedOrder}
								// handleClick={setState}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		getOrders: bindActionCreators(fetchOrders, dispatch),
		add: bindActionCreators(addItemAfterOrder, dispatch)
	}
}
export default connect((state: IState) => ({
	pagination: state.pagination
}), mapDispatchToProps)(OrdersList)