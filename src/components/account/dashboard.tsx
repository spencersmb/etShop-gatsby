import OrderDisplay from '@components/account/orderDisplay'
import OrdersList from '@components/account/ordersList'
import PoseHoc, { IPoseHoc } from '@components/animations/poseHoc'
import Cart from '@components/cart/cartLayout'
import SearchInput from '@components/forms/inputs/searchInput'
import PaginationBar from '@components/nav/paginationBar'
import { OnPoseComplete } from '@et/types/Modal'
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
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { Sentinel } from '@styles/global/fonts'
import { CartSliderTransition } from '@styles/modules/cart'
import { SearchFilledContainer } from '@styles/modules/searchInputPill'
import { useSetState } from '@utils/stateUtils'
import { Width } from '@utils/windowUtils'
import React, { useEffect, useRef } from 'react'
import posed, { PoseGroup } from 'react-pose'
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
		selectedOrder: null,
		searchInput: '',
		orderModalOpen: false
	})

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
			setState({ selectedOrder: pagination.pages[page][orderId], orderModalOpen: true })
		} else if (!state.selectedOrder) {
			setState({ selectedOrder: pagination.pages[page][orderId], orderModalOpen: true })
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
				setState({ searching: false })

				// setState({ searching: false, selectedSearchOrder: order })
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
	}

	console.log('dashbaord state', state)

	return (
		<PageContainer>

			<PageHeader>
				<h1>My Orders</h1>

				<SearchFilledContainer>
					<SearchInput
						state={state}
						handleSubmit={submitSearch}
						handleState={setState}
					/>
				</SearchFilledContainer>
			</PageHeader>

			<OrderDisplayContainer>
				{pagination.loading && <div>Loading Orders</div>}

				{/*
					MOBILE:
					Order list and Search
				*/}
				{Width < 768 && pagination.pages[page] && !pagination.loading && !state.selectedSearchOrder &&
        <OrderListWrapper>
          <OrdersList
            page={page}
            pagination={pagination}
            selectedOrder={state.selectedOrder}
            handleClick={orderClick}
          />
        </OrderListWrapper>
				}

				{/*
					DESKTOP:
					Order list and Search
				*/}
				{
					Width >= 768 &&
          <OrderListWrapper desktop={true}>
						{pagination.pages[page] && !pagination.loading && !state.selectedSearchOrder && Object.keys(pagination.pages[page]).reverse().map(item => {
							const order: IReceipt = pagination.pages[page][item]

							return (
								<OrderDisplay
									key={order.id}
									page={page}
									exp={order.downloads.exp_date}
									resetDownloadLinks={resetDownloadLinks}
									handleLinkRefresh={resetOrderLinks}
									selectedOrder={order}
									handleState={setState}
								/>
							)
						})}

						{state.selectedSearchOrder &&
            <div>
              <OrderDisplay
                key={state.selectedSearchOrder.id}
                page={page}
                exp={state.selectedSearchOrder.downloads.exp_date}
                resetDownloadLinks={resetDownloadLinks}
                handleLinkRefresh={resetOrderLinks}
                selectedOrder={state.selectedSearchOrder}
                handleState={setState}
                searchResult={true}
              />
            </div>
						}

          </OrderListWrapper>
				}
				{/*{React.useMemo(() => (*/}
				{/*	Width >= 768 &&*/}
				{/*  <OrderListWrapper desktop={true}>*/}
				{/*		{pagination.pages[page] && !pagination.loading && !state.selectedSearchOrder && Object.keys(pagination.pages[page]).reverse().map(item => {*/}
				{/*			const order = pagination.pages[page][item]*/}
				{/*			console.log('orderList Desk‘top Render', order)*/}

				{/*			return (*/}
				{/*				<OrderDisplay*/}
				{/*					key={order.id}*/}
				{/*					page={page}*/}
				{/*					resetDownloadLinks={resetDownloadLinks}*/}
				{/*					handleLinkRefresh={resetOrderLinks}*/}
				{/*					selectedOrder={order}*/}
				{/*					handleState={setState}*/}
				{/*				/>*/}
				{/*			)*/}
				{/*		})}*/}

				{/*		{state.selectedSearchOrder &&*/}
				{/*    <div>*/}
				{/*      <OrderDisplay*/}
				{/*        key={state.selectedSearchOrder.id}*/}
				{/*        page={page}*/}
				{/*        resetDownloadLinks={resetDownloadLinks}*/}
				{/*        handleLinkRefresh={resetOrderLinks}*/}
				{/*        selectedOrder={state.selectedSearchOrder}*/}
				{/*        handleState={setState}*/}
				{/*        searchResult={true}*/}
				{/*      />*/}
				{/*    </div>*/}
				{/*		}*/}

				{/*  </OrderListWrapper>*/}

				{/*), [state.selectedSearchOrder, pagination.loading, pagination.pages, page])}*/}

				{/*
				PAGINATION
			*/}
				{pagination.totalPages > 0 &&
        <PaginationBar
          currentPage={page}
          total={pagination.totalPages}
        />}

			</OrderDisplayContainer>


			{/*
				MOBILE:
				SELECTED ORDER POP-OUT
			*/}
			{/*<DetailOrderMobilePose pose={state.orderModalOpen ? 'enter' : 'exit'} onPoseComplete={(type: any) => {*/}
			{/*	console.log('type', type)*/}
			{/*	if (type === 'exit') {*/}
			{/*		setState({*/}
			{/*			selectedOrder: null*/}
			{/*		})*/}
			{/*	}*/}

			{/*}}>*/}
			{/*	<OrderDisplay*/}
			{/*		handleLinkRefresh={resetOrderLinks}*/}
			{/*		selectedOrder={state.selectedOrder}*/}
			{/*		handleState={setState}*/}
			{/*	/>*/}
			{/*</DetailOrderMobilePose>*/}
			<PoseGroup>

				{!!state.selectedOrder &&
        <DetailOrderMobilePoseHOC
          key={`mobileOrderDisplay`}>
					{({ ref }: IPoseHoc) => (
						<OrderDisplay
							page={page}
							exp={state.selectedOrder.downloads.exp_date}
							resetDownloadLinks={resetDownloadLinks}
							mobile={true}
							poseRef={ref}
							handleLinkRefresh={resetOrderLinks}
							selectedOrder={state.selectedOrder}
							handleState={setState}
						/>
					)}
        </DetailOrderMobilePoseHOC>
				}

				{/*{!!state.selectedOrder &&*/}
				{/*<DetailOrderMobile*/}
				{/*  key={`mobileOrderDisplay`}>*/}
				{/*  <OrderDisplay*/}
				{/*    handleLinkRefresh={resetOrderLinks}*/}
				{/*    selectedOrder={state.selectedOrder}*/}
				{/*    handleState={setState}*/}
				{/*  />*/}
				{/*</DetailOrderMobile>*/}
				{/*}*/}

				{/*
					MOBILE:
					SELECTED SEARCH POP-OUT
				*/}

				{!!state.selectedSearchOrder &&
        <DetailOrderMobilePoseHOC
          key={`mobileOrderDisplay`}>
					{({ ref }: IPoseHoc) => (
						<OrderDisplay
							page={page}
							resetDownloadLinks={resetDownloadLinks}
							exp={state.selectedSearchOrder.downloads.exp_date}
							mobile={true}
							poseRef={ref}
							handleLinkRefresh={resetOrderLinks}
							selectedOrder={state.selectedSearchOrder}
							handleState={setState}
							searchResult={true}
						/>
					)}
        </DetailOrderMobilePoseHOC>
				}


			</PoseGroup>
		</PageContainer>
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
const PageContainer = styled(GridFluid)`
	display: flex;
	flex-direction: column;
	padding: 0;
`
const PageHeader = styled.div`
	display: flex;
	flex-direction: column;
	margin: 15px 0 0;
	padding: 0 20px;
	grid-column: 2/ 4;
	
	h1{
		color: ${colors.primary.headline};
		${Sentinel.semiboldItalic};
		text-align: center;
		font-weight: 300;
		margin-bottom: 15px;
		flex: 1;
	}
	
	@media ${device.tablet} {
		flex-direction: row;
		grid-column: 3/ 13;
		margin: 30px 0 0;
		h1{
			text-align: left;
			margin:0;
		}
	}
		
`
const OrderDisplayContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 20px;
	position: relative;
	grid-column: 2/ 4;
	
	@media ${device.tablet} {
		grid-column: 3/ 13;
	}
		
`
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
const DetailOrderMobilePoseHOC = posed(PoseHoc)({
	enter: {
		x: '0%',
		transition: CartSliderTransition.enter
	},
	exit: {
		x: '-100%',
		transition: CartSliderTransition.exit
	}
})
