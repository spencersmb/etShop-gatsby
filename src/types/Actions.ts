import { ICartItem, ICouponRaw, ILocalStorageCart } from '@et/types/Cart'
import { IProducts } from '@et/types/Products'
import {
  AuthActionTypes,
  CartActionTypes,
  CouponActionTypes,
  ModalActionTypes,
  ProductsActionTypes,
  WindowActionTypes
} from './Enums'
import { IAuthResponse, IUser } from '@et/types/User'

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

export interface IAddItemToCart {
  type: CartActionTypes.ADD_TO_CART,
  payload: {
    item: {
      [id: string]: ICartItem
    }
  }
}

export interface ICartToggle {
  type: CartActionTypes.CART_TOGGLE
}

export interface IUpdateCartTotal {
  type: CartActionTypes.UPDATE_CART_TOTAL
}

export interface IupdateCartPrice {
  type: CartActionTypes.UPDATE_CART_PRICE
}
export interface IUpdateCartState {
  type: CartActionTypes.UPDATE_CART_STATE,
  payload: {
    cart: ILocalStorageCart
  }
}

export interface IEmptyCart {
  type: CartActionTypes.EMPTY_CART
}

export interface ILoadCartComplete {
  type: CartActionTypes.LOAD_CART_COMPLETE
}

export interface ICartRemoveProduct {
  payload: {
    id: string
  },
  type: CartActionTypes.REMOVE_ITEM
}

export interface IUpdateCartQty {
  type: CartActionTypes.UPDATE_CART_QTY,
  payload: {
    price: string,
    qty: number,
    slug: string,
  }
}

export interface IUpdateCartLicense {
  type: CartActionTypes.UPDATE_CART_LICENSE,
  payload: {
    item: {
      [id: string]: ICartItem
    },
  }
}

export interface ICartChangeCheckoutType {
  payload: string,
  type: CartActionTypes.CHANGE_CHECKOUT_TYPE
}
export interface ICouponSubmitAction {
  type: CouponActionTypes.SUBMIT_COUPON,
}
export interface ICouponSubmitSuccess {
  payload: {
    coupon: ICouponRaw
  }
  type: CouponActionTypes.SUBMIT_COUPON_SUCCESS,
}

export interface ICouponSubmitInvalid {
  type: CouponActionTypes.SUBMIT_COUPON_INVALID,
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

type CartActions =
  | IAddItemToCart
  | ICartToggle
  | IUpdateCartTotal
  | IupdateCartPrice
  | IUpdateCartState
  | ILoadCartComplete
  | IEmptyCart
  | ICartRemoveProduct
  | IUpdateCartQty
  | IUpdateCartLicense
  | ICartChangeCheckoutType

type CouponActions =
  | ICouponSubmitAction
  | ICouponSubmitSuccess
  | ICouponSubmitInvalid

export type Actions =
  | AuthActions
  | ProductActions
  | ModalActions
  | WindowActions
  | CartActions
  | CouponActions