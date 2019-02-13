import { IProducts } from '@et/types/Products'
import {IModalState} from '@et/types/Modal'

export interface IState {
  breakpoint: number,
  modal: IModalState,
  products: IProducts
  // cart: ICartState,
  // modal: IModalState,
  // products: IProductState,
  // user: IUserState
}