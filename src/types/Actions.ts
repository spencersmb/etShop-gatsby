import {AuthActionTypes, ProductsActionTypes} from './Enums'
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

export interface IAuthLogin {
  type: AuthActionTypes.LOGIN_USER
  payload: IAuthResponse
}

export interface IAuthLogOut {
  type: AuthActionTypes.LOGOUT
}

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