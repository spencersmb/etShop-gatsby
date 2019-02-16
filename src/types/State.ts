import { IProducts } from '@et/types/Products'
import {IModalState} from '@et/types/Modal'
import {IReduxForm} from '@et/types/ReduxForms'
import { IUserState } from '@et/types/User'

export interface IState {
  breakpoint: number,
  modal: IModalState,
  products: IProducts
  form: IReduxForm,
  toastr: any
  // cart: ICartState,
  // modal: IModalState,
  // products: IProductState,
  user: IUserState
}