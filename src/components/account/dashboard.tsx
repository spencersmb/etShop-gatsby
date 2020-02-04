import OrderDisplay from '@components/account/orderDisplay'
import OrdersList from '@components/account/ordersList'
import PoseHoc, { IPoseHoc } from '@components/animations/poseHoc'
import Cart from '@components/cart/cartLayout'
import SearchInput from '@components/forms/inputs/searchInput'
import PaginationBar from '@components/nav/paginationBar'
import DefaultSpinner from '@components/spinners/defaultSpinner'
import { OnPoseComplete } from '@et/types/Modal'
import { IPaginateState } from '@et/types/Pagination'
import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import { IOrderResponse, IReceipt } from '@et/types/WC_Order'
import { logout as logoutUser } from '@redux/actions/authActions'
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
	logout: any
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

interface ILocalState {
	searching: boolean,
	selectedSearchOrder: any,
	selectedOrder: any,
	searchInput: string,
	orderModalOpen: boolean
}

interface INewState {
	searching?: boolean,
	selectedSearchOrder?: any,
	selectedOrder?: any,
	searchInput?: string,
	orderModalOpen?: boolean
}

export function Dashboard (props: AllProps) {
	const { pagination, resetDownloadLinks } = props
	const page = getCurrentPage(props.location.search)
	const [state, setState] = useSetState<ILocalState, INewState>({
		searching: false,
		selectedSearchOrder: null,
		selectedOrder: null,
		searchInput: '',
		orderModalOpen: false
	})

	useEffect(() => {
		const getMyOrders = async () => {
			const { orders } = await props.getOrders(page)
		}

		getMyOrders().catch((e) => {
			props.logout()
		})

	}, [props.location.search])

	function orderClick (orderId: number) {
		// console.log('orderClick', orderId)

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
				setState({ searching: false, selectedSearchOrder: order })
			} catch (e) {
				setState({ searching: false })
				props.logout()
			}
		}

	}

	async function resetOrderLinks (orderId: string) {
		return resetDownloadLinks(orderId, page)
	}

	function buildDesktopList () {
		const items = Object.keys(pagination.pages[page])

		if (items.length === 0) {
			return (
				<div>
					No Items found
				</div>
			)
		}

		return items.map(item => {
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
		}).reverse()
	}

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
				{pagination.loading && <LoadingContainer>
          <h2>Loading Orders</h2>
          <SpinnerWrapper>
            <DefaultSpinner submitting={pagination.loading} color={colors.db.primary} size={'50px'}/>
          </SpinnerWrapper>
        </LoadingContainer>}

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
						{pagination.pages[page] && !pagination.loading && !state.selectedSearchOrder && buildDesktopList()}

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


				{/*
					MOBILE:
					SELECTED SEARCH POP-OUT
				*/}
				{!!state.selectedSearchOrder && innerWidth < 768 &&
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
		resetDownloadLinks: bindActionCreators(resetDownloadLinksAction, dispatch),
		logout: bindActionCreators(logoutUser, dispatch)
	}
}

export default connect<IReduxState, IReduxActions, IProps, IState>(mapStateToProps, mapDispatchToProps)(Dashboard)

const PageContainer = styled(GridFluid)`
	display: flex;
	flex-direction: column;
	padding: 0;
`
const LoadingContainer = styled.div`
	width: 100;
	display: flex;
	flex-direction: column;
	text-align: center;
	position: relative;
	justify-content: center;
	align-items: center;
	
	h2{
		${Sentinel.semiboldItalic};
		font-size: 14px;
		font-weight: 400;
		color: ${colors.db.primary};
	}
`
const SpinnerWrapper = styled.div`
	position: relative;
	width: 50px;
	height: 50px;
	display: flex;

`
const PageHeader = styled.div`
	display: flex;
	flex-direction: column;
	margin: 15px auto 0;
	padding: 0 20px;
	grid-column: 2/ 4;
	max-width: 955px;
	width: 100%;
	
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
		grid-column: 2/ 14;
		margin: 30px auto 0;
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
		grid-column: 2/ 14;
	}	
	@media ${device.laptopL} {
		grid-column: 3/ 13;
	}
		
`
const OrderListWrapper = styled.div<{ desktop?: boolean }>`
	${props => props.desktop ? `
		display: none;
		flex-direction: column;
		max-width: 955px;
		width: 100%;
		margin: 0 auto;
		
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
