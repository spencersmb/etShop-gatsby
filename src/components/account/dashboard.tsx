import OrderDisplay from '@components/account/orderDisplay'
import OrdersList from '@components/account/ordersList'
import { IPaginateState } from '@et/types/Pagination'
import { IState } from '@et/types/State'
import { IReceipt } from '@et/types/WC_Order'
import { addItemAfterOrder, fetchOrders } from '@redux/actions/paginationActions'
import { useSetState } from '@utils/stateUtils'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

interface IProps {
	// orders: any
	// path: string,
	// uri: string,
	// navigate: any,
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

export function Dashboard (props: IProps & IReduxActions & IReduxState) {
	const { pagination } = props
	const page = getCurrentPage(props.location.search)
	const [state, setState] = useSetState({ selectedOrder: null })

	console.log('dashboard render', state)

	useEffect(() => {
		console.log('page to fetch', page)
		const getMyOrders = async () => {
			const { orders } = await props.getOrders(page)

			// set item to be displayed if no order is selected
			if (!state.selectedOrder && orders) {
				const itemsOnPage = Object.keys(orders).reverse()
				// console.log('items on page', itemsOnPage)
				setState({ selectedOrder: orders[itemsOnPage[0]] })
			}
		}

		getMyOrders().catch((e) => {
			console.error(e)
		})

	}, [props.location.search])

	function orderClick (orderId: number) {
		if (state.selectedOrder && orderId !== state.selectedOrder.id) {
			setState({ selectedOrder: pagination.pages[page][orderId] })
		}
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
