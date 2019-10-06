import { ICartState } from '@et/types/Cart'
import { IPaginateState } from '@et/types/Pagination'
import { IProducts } from '@et/types/Products'
import { IModalState, INavState } from '@et/types/Modal'
import { IReduxForm } from '@et/types/ReduxForms'
import { IUserState } from '@et/types/User'

export interface IState {
	breakpoint: number
	cart: ICartState
	form: IReduxForm
	modal: IModalState
	nav: INavState
	products: IProducts
	pagination: IPaginateState
	toastr: any
	user: IUserState
}
