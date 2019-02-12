import { IProducts } from '@et/types/Products'
import {IModalState} from '@et/types/Modal'

export interface IState {
  count: number,
  modal: IModalState,
  products: IProducts
  // breakPoint: number,
  // cart: ICartState,
  // modal: IModalState,
  // products: IProductState,
  // user: IUserState
}