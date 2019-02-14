import { IProducts } from '@et/types/Products'
import {IModalState} from '@et/types/Modal'
import {IReduxForm} from '@et/types/ReduxForms'

export interface IState {
  breakpoint: number,
  modal: IModalState,
  products: IProducts
  form: IReduxForm
  // cart: ICartState,
  // modal: IModalState,
  // products: IProductState,
  // user: IUserState
}