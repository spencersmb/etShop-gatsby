export enum ProductsActionTypes {
  LOAD_PRODUCTS_SUCCESS = '@@products/FETCH_SUCCESS',
  COUNT = '@@products/count',
  LOAD_PRODUCTS_ERROR = '@@products/FETCH_ERROR'
}

export enum ModalActionTypes {
  SHOW_MODAL = '@@modal/show',
  HIDE_MODAL = '@@modal/hide',
}

export enum WindowActionTypes {
  CHANGE_BREAKPOINT = '@@window/CHANGE_BREAKPOINT'
}

export enum AuthActionTypes {
  LOGIN_USER = '@@auth/login',
  LOGOUT = '@@auth/logout'
}

export enum CartActionTypes {
  ADD_TO_CART = '@@cart/ADD_ITEM',
  REMOVE_ITEM = '@@cart/REMOVE_ITEM',
  UPDATE_CART_STATE = '@@cart/UPDATE_LOCAL_STORAGE',
  UPDATE_CART_TOTAL = '@@cart/UPDATE_TOTAL',
  UPDATE_CART_PRICE = '@@cart/UPDATE_PRICE',
  UPDATE_CART_LICENSE = '@@cart/UPDATE_LICENSE',
  UPDATE_CART_QTY = '@@cart/UPDATE_QTY',
  EMPTY_CART = '@@cart/EMPTY_CART',
  LOAD_CART_COMPLETE = '@@cart/CART_LOADED',
  CART_TOGGLE = '@@cart/CART_TOGGLE',
  CHANGE_CHECKOUT_TYPE = '@@cart/CHANGE_CHECKOUT_TYPE',
}