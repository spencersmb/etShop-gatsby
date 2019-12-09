import { Actions } from '@et/types/Actions'
import { PaginationTypes } from '@et/types/Enums'
import { IPaginateState } from '@et/types/Pagination'
import _ from 'lodash'
import initialState from './initialState'

export const paginationReducer = (state: IPaginateState = initialState.pagination, action: Actions): IPaginateState => {
	switch (action.type) {

		case PaginationTypes.REFRESH_DOWNLOAD_LINKS:
			const selectedPage = state.pages[action.payload.page]
			const selectedItem = selectedPage[action.payload.order.order_id]
			selectedItem.downloads = action.payload.order.downloads
			return {
				...state,
				pages: {
					...state.pages,
					[action.payload.page]: {
						// add whats currently in state back in
						...state.pages[action.payload.page],

						// overwrite the item we have targeted
						[action.payload.order.order_id]: {
							...selectedItem
						}
					}
				}
			}
		case PaginationTypes.FETCHING_ORDERS:
			return {
				...state,
				loading: true
			}
		case PaginationTypes.LOAD_ORDERS_SUCCESS:
			const newOrders = action.payload.data.orders

			return {
				...state,
				pages: {
					...state.pages,
					[action.payload.page]: {
						...newOrders
					}
				},
				loading: false,
				totalOrders: action.payload.data.total,
				totalPages: action.payload.data.max_num_pages
			}

		case PaginationTypes.CLEAR_ALL_PAGES:
			return {
				...state,
				pages: {},
				loading: false,
				totalPages: 0,
				totalOrders: '0'
			}

		// Use Flattened object, then keep page 1 but remove others if they exist,
		// or in the reducer just add Items under page 1
		case PaginationTypes.UPDATE_PAGINATION_AFTER_ORDER:
			console.log('action', action)

			const itemsByPage = 10
			let count = 1
			let pageId = 1

			// 1. Put all allItems into an array from the pagination
			const allItems: any = Object.keys(state.pages).map((pageKey: any) => {
				const orders = Object.keys(state.pages[pageKey])
				return orders.map((orderKey: any) => {
					return state.pages[pageKey][orderKey]
				})
			})

			// 2. Add the new item from the completed order to the front of the array
			// use reverse so we start at the most recent item
			allItems[0].reverse().unshift({
				...action.payload.order
				// date: action.payload.order.date,
				// id: action.payload.order.order_id,
				// total: action.payload.order.total,
			})
			// console.log('allItems', allItems)

			// 3. Flatten both arrays
			// 4. Then Reduce everything into an object
			// Only take items into the first page, remove all other pages.
			const flattened = [].concat.apply([], allItems)
				.reduce((prev: any, next: any) => {
					if (pageId === 1) {
						prev[pageId] = {
							...prev[pageId],
							[next.id]: { ...next }
						}
					} else {
						return prev
					}

					if (count % itemsByPage === 0) {
						pageId = pageId + 1
					}
					count = count + 1

					return prev
				}, {})

			// console.log('flattened', flattened)

			const totalOrders = parseInt(state.totalOrders, 10) + 1
			const totalPages = _.round(totalOrders / itemsByPage)

			return {
				...state,
				pages: {
					...flattened
				},
				totalOrders: totalOrders.toString(),
				totalPages
			}
		default:
			return state
	}
}
