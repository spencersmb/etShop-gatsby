import OrderDisplay from '@components/user/orderDisplay'
import OrdersList from '@components/user/ordersList'
import { IPaginateState } from '@et/types/Pagination'
import { IState } from '@et/types/State'
import { addItemAfterOrder, fetchOrders } from '@redux/actions/paginationActions'
import React, { Dispatch as ReactDispatch, useEffect, useReducer } from 'react'
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
	getOrders: (page: number) => Promise<any>
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

function getCurrentPage (path: string) {
	const split = path
		.split(/(=)/)
		.splice(2, 2)
		.reduce((a, b) => {
			return parseInt(b, 10)
		}, 0)
	// console.log('split', split)

	if (split !== 0) {
		return split
	}
	return 1
}

function Dashboard (props: IProps & IReduxActions & IReduxState) {
	const { pagination } = props
	const page = getCurrentPage(props.location.search)
	const getSelectedItem = (page: any) => {
		if (!page || !pagination.pages[page]) {
			return null
		}
		const itemsOnPage = Object.keys(pagination.pages[page]).reverse()
		return page[itemsOnPage[0]]
	}
	const [state, setState] = useSetState({ selectedOrder: null })

	// useEffect(() => {
	// 	console.log('dashboard mount', pagination.pages[page])
	//
	// 	if (pagination.pages[page]) {
	// 		const itemsOnPage = Object.keys(pagination.pages[page]).reverse()
	// 		console.log('item', pagination.pages[page][itemsOnPage[0]])
	//
	// 		setState({ selectedOrder: pagination.pages[page][itemsOnPage[0]] })
	// 	}
	// }, [])

	console.log('dashboard render', state)

	useEffect(() => {
		console.log('page to fetch', page)
		props.getOrders(page).then(({ orders }) => {
			// set item to display if its null
			console.log('state', state)
			// console.log('pagination.pages[page]', orders)

			if (!state.selectedOrder && orders) {
				const itemsOnPage = Object.keys(orders).reverse()
				// console.log('selectedPage[itemsOnPage[0]]', itemsOnPage)

				setState({ selectedOrder: orders[itemsOnPage[0]] })
			}
		})
	}, [props.location.search])

	function orderClick (item) {
		console.log('item', item)
		setState({ selectedOrder: pagination.pages[page][item] })
	}

	return (
		<div>
			<h1>Dashboard</h1>
			<div style={{ display: 'flex' }}>
				{pagination.pages[page] && state.selectedOrder && <OrdersList
          page={page}
          pagination={pagination}
          selectedOrder={state.selectedOrder.id}
          handleClick={orderClick}
        />}
				<div>
					<h2>Order</h2>
					{state.selectedOrder && <OrderDisplay selectedOrder={state.selectedOrder}/>}
				</div>
			</div>
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
}), mapDispatchToProps)(Dashboard)