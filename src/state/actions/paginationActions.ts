import AuthApi from '@api/authApi'
import { PaginationTypes } from '@et/types/Enums'
import { IGetAllPaginationsResponse, ILoadPaginationSuccess } from '@et/types/Pagination'
import { IState } from '@et/types/State'
import { IOrderResponse } from '@et/types/WC_Order'
import { statusCheck } from '@utils/apiUtils'
import { Action, Dispatch } from 'redux'

export const fetchOrders: any = (page: number) => async (dispatch: Dispatch<Action>, getState: () => IState): Promise<any> => {

	// 2. check if orders are in state
	const currentState: IState = getState()
	// const currentPage: number = getCurrentPage(page)

	console.log('currentState.pagination.orders[currentPage]', currentState.pagination.pages[page])

	if (currentState.pagination.pages[page]) {
		console.log('orders already loaded')
		return null
	}

	// 2. if none found dispatch fetch loading
	dispatch(loadingOrders())

	// 3. dispatch Fetch api get orders

	const response: Response = await AuthApi.getAllOrders(page)

	await statusCheck(response, dispatch)

	const body: IGetAllPaginationsResponse = await response.json()
	console.log('body', body)

	dispatch(loadOrdersSuccess(body.data, page))
	// saveUserLocalStorage(body)
	// return {
	// 	firstName: body.first_name
	// }

}

export const loadingOrders = () => {
	return {
		type: PaginationTypes.FETCHING_ORDERS
	}
}

export const loadOrdersSuccess = (data: ILoadPaginationSuccess, page: number) => {
	return {
		payload: {
			data,
			page
		},
		type: PaginationTypes.LOAD_ORDERS_SUCCESS
	}
}

export const addItemAfterOrder = (order: IOrderResponse) =>{
	return {
		payload: order,
		type: PaginationTypes.UPDATE_PAGINATION_AFTER_ORDER
	}
}

export const clearFirstPage = () =>{
	return {
		type: PaginationTypes.CLEAR_ALL_PAGES
	}
}