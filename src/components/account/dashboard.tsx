import OrderDisplay from '@components/account/orderDisplay'
import OrdersList from '@components/account/ordersList'
import SearchInput from '@components/forms/inputs/searchInput'
import PaginationBar from '@components/nav/paginationBar'
import { IPaginateState } from '@et/types/Pagination'
import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import { IOrderResponse, IReceipt } from '@et/types/WC_Order'
import {
	ISearchOrderAction,
	resetDownloadLinks as resetDownloadLinksAction,
	searchOrderById as searchOrderByIdAction
} from '@redux/actions/orderActions'
import { fetchOrders } from '@redux/actions/paginationActions'
import { device } from '@styles/global/breakpoints'
import { useSetState } from '@utils/stateUtils'
import { Width } from '@utils/windowUtils'
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import styled from 'styled-components'

interface IProps {
	// orders: any
	// path: string,
	// uri: string,
	// navigate: any,
	user: IUserState
	location: {
		search: string
	}
}

interface IReduxState {
	pagination: IPaginateState
}

interface IReduxActions {
	searchOrderById: any
	resetDownloadLinks: any
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

type AllProps = IProps & IReduxActions & IReduxState

export function Dashboard (props: AllProps) {
	const { pagination, resetDownloadLinks } = props
	const page = getCurrentPage(props.location.search)
	const [state, setState] = useSetState({
		searching: false,
		selectedSearchOrder: null,
		selectedOrder: null
	})

	console.log('dashboard render', state)

	useEffect(() => {
		console.log('useEffect page check')

		const getMyOrders = async () => {
			const { orders } = await props.getOrders(page)
		}
		getMyOrders().catch((e) => {
			console.error(e)
		})

	}, [props.location.search])

	function orderClick (orderId: number) {
		console.log('orderClick', orderId)

		if (state.selectedOrder && orderId !== state.selectedOrder.id) {
			setState({ selectedOrder: pagination.pages[page][orderId] })
		} else if (!state.selectedOrder) {
			setState({ selectedOrder: pagination.pages[page][orderId] })
		}
	}

	async function submitSearch (orderId: any) {
		setState({ searching: true })

		// serach all local orders first
		// if no order found make request
		const localPagesArray = Object.keys(pagination.pages)
		const localOrders = localPagesArray.reduce((acc: IReceipt[], pageKey: string) => {
			const orderKeys = Object.keys(pagination.pages[pageKey])
			orderKeys.map(key => {
				acc.push(pagination.pages[pageKey][key])
			})
			return acc
		}, [])

		const itemFound = localOrders.filter(order => {
			return order.id.toString() === orderId
		})

		if (itemFound.length > 0) {
			setState({ searching: false, selectedSearchOrder: itemFound[0] })
		} else {
			try {
				const { order } = await props.searchOrderById(orderId)
				setState({ searching: false, selectedSearchOrder: order })
			} catch (e) {
				setState({ searching: false })
			}
		}

	}

	async function resetOrderLinks (orderId: string) {
		console.log('reset orderId', orderId)

		try {
			await resetDownloadLinks(orderId, page)
		} catch (e) {
			console.error('e', e)
		}

		// send ID to backend
		// get the same downloads array back and replace it in redux pagination.pages[1][orderId]
		// if state.selected Order is selected we'll need to replace it there
		// ill need order id + downloads
	}

	// Things to do:
	// place in data for receipt order component
	// begin refresh links flow

	return (
		<div style={{ display: 'flex' }}>

			<div>
				<h1>My orders</h1>

				<div>
					<SearchInput
						state={state}
						handleSubmit={submitSearch}
						handleState={setState}
					/>
				</div>
			</div>

			<div>
				{pagination.loading && <div>Loading Orders</div>}

				{/* order list for mobile */}
				{pagination.pages[page] && !pagination.loading && !state.selectedSearchOrder &&
        <OrderListWrapper>
          <OrdersList
            page={page}
            pagination={pagination}
            selectedOrder={state.selectedOrder}
            handleClick={orderClick}
          />
        </OrderListWrapper>
				}

				{/*detail order item for mobile*/}
				{state.selectedOrder &&
        <DetailOrderMobile>
          <OrderDisplay
            handleLinkRefresh={resetOrderLinks}
            selectedOrder={state.selectedOrder}
            handleState={setState}
          />
        </DetailOrderMobile>
				}

				{/*detail order list for desktop */}
				{React.useMemo(() => (
					Width >= 768 &&
          <OrderListWrapper desktop={true}>
						{pagination.pages[page] && !pagination.loading && !state.selectedSearchOrder && Object.keys(pagination.pages[page]).reverse().map(item => {
							const order = pagination.pages[page][item]
							console.log('orderList Desktop Render', order)

							return (
								<OrderDisplay
									key={order.id}
									handleLinkRefresh={resetOrderLinks}
									selectedOrder={order}
									handleState={setState}
								/>
							)
						})}


          </OrderListWrapper>

				), [state.selectedSearchOrder, pagination.loading])}

				{state.selectedSearchOrder &&
        <div>
          <OrderDisplay
            key={state.selectedSearchOrder.id}
            handleLinkRefresh={resetOrderLinks}
            selectedOrder={state.selectedSearchOrder}
            handleState={setState}
            searchResult={true}
          />
        </div>
				}

			</div>

			{pagination.pages[page] && pagination.totalPages > 0 &&
      <PaginationBar
        currentPage={page}
        total={pagination.totalPages}
      />}
		</div>
	)
}

const mapStateToProps = (state: IState) => {
	return {
		pagination: state.pagination
	}
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		searchOrderById: bindActionCreators(searchOrderByIdAction, dispatch),
		getOrders: bindActionCreators(fetchOrders, dispatch),
		resetDownloadLinks: bindActionCreators(resetDownloadLinksAction, dispatch)
	}
}

export default connect<IReduxState, IReduxActions, IProps, IState>(mapStateToProps, mapDispatchToProps)(Dashboard)

const OrderListWrapper = styled.div<{ desktop?: boolean }>`
	${props => props.desktop ? `
		display: none;
		flex-direction: column;
		
		@media ${device.tablet} {
			display: flex;
		}
	` : `
		display: flex;
		flex-direction: column;
		
		@media ${device.tablet} {
			display: none;
		}
	`}
		
`

const DetailOrderMobile = styled.div`
	display: flex;
	
	@media ${device.tablet} {
		display: none;
	}
		
`
