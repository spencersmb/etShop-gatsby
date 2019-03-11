import { Actions } from '@et/types/Actions'
import { PaginationTypes } from '@et/types/Enums'
import { IPaginateState } from '@et/types/Pagination'
import _ from 'lodash'
import initialState from './initialState'

export const paginationReducer = (state: IPaginateState = initialState.pagination, action: Actions): IPaginateState => {
	switch (action.type) {
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
				pages: {}
			}

		// Use Flattened object, then keep page 1 but remove others if they exist,
		// or in the reducer just add Items under page 1
		case PaginationTypes.UPDATE_PAGINATION_AFTER_ORDER:
			console.log('action', action)

			const itemsByPage = 3
			let count = 1
			let pageId = 1
			const allItems: any = Object.keys(state.pages).map((pageKey: any) => {
				const orders = Object.keys(state.pages[pageKey])
				return orders.map((orderKey: any) => {
					return state.pages[pageKey][orderKey]
				})
			})
			allItems[0].unshift({
				date: '03-09-2019',
				id: 999,
				total: '3.46'
			})
			console.log('allItems', allItems)

			const flattened = [].concat.apply([], allItems)
				.reduce((prev: any, next: any) => {
					prev[pageId] = {
						...prev[pageId],
						[next.id]: { ...next }
					}

					if (count % 3 === 0) {
						pageId = pageId + 1
					}
					count = count + 1

					return prev
				}, {})

			// flattened[1] = {
			// 	...flattened[1],
			// 	[999]: {
			// 		date: '03-09-2019',
			// 		id: 999,
			// 		total: '3.46'
			// 	}
			// }
			console.log('flattened', flattened)

			const totalOrders = parseInt(state.totalOrders, 10) + 1
			const totalPages = _.round(totalOrders / itemsByPage)
			const updated = state.pages
			const id = parseInt(action.payload.order.order_id, 10)
			// updated[1] = {
			// 	...state.pages[1],
			// 	[id]: {
			// 		date: action.payload.order.date,
			// 		id,
			// 		total: action.payload.order.total
			// 	}
			// }
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
