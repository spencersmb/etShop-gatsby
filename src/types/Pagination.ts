import { IOderDownloadItem } from '@et/types/WC_Order'

export interface IPaginateState {
	loading: boolean,
	pages: IPaginateOrder,
	totalOrders: string,
	totalPages: number
}

export interface IPaginateOrder {
	[id: string]: {
		id: number
		total: string
		date: string
	}
}

export interface IRawPage {
	[id: number]: {
		total: string,
		date: string
	}
}
export interface ILoadPaginationSuccess {
	max_num_pages: number
	orders:IRawPage
	total: string
}
export interface IGetAllPaginationsResponse {
	code: number,
	data: ILoadPaginationSuccess
}