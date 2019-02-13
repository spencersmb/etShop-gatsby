import { AuthActionTypes, ModalActionTypes, ProductsActionTypes, WindowActionTypes } from './Enums'
import {IAuthResponse} from '@et/types/User'

export interface ILoadProductsSuccess {
  type: ProductsActionTypes.LOAD_PRODUCTS_SUCCESS,
  payload: any
}
export interface ILoadProductsError {
  type: ProductsActionTypes.LOAD_PRODUCTS_ERROR
}
export interface ICount {
  type: ProductsActionTypes.COUNT
}

export interface IShowModal {
  type: ModalActionTypes.SHOW_MODAL
  payload: any
}

export interface IHideModal {
  type: ModalActionTypes.HIDE_MODAL
}

export interface IChangeBreakPoint {
  type: WindowActionTypes.CHANGE_BREAKPOINT,
  payload: number
}

export interface IAuthLogin {
  type: AuthActionTypes.LOGIN_USER
  payload: IAuthResponse
}

export interface IAuthLogOut {
  type: AuthActionTypes.LOGOUT
}

export type WindowActions =
  | IChangeBreakPoint

export type ModalActions =
  | IShowModal
  | IHideModal

type ProductActions =
  | ILoadProductsSuccess
  | ILoadProductsError
  | ICount

export type AuthActions =
  | IAuthLogin
  | IAuthLogOut

export type Actions =
  | AuthActions
  | ProductActions
  | ModalActions
  | WindowActions