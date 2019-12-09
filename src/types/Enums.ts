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
  LOGOUT = '@@auth/logout',
  FORGOTPW = '@@auth/FORGOT_PW_COMPLETE',
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

export enum CouponActionTypes {
  SUBMIT_COUPON = '@@coupon/SUBMIT',
  SUBMIT_COUPON_SUCCESS = '@@coupon/SUBMIT_SUCCESS',
  SUBMIT_COUPON_INVALID = '@@coupon/SUBMIT_INVALID',
}

export enum OrderActionTypes {
  SUBMIT_ORDER = '@@checkout/SUBMIT_ORDER',
  GET_ORDER_DOWNLOADS = '@@checkout/GET_ORDER_DOWNLOADS',
  ORDER_SUCCESS = '@@checkout/ORDER_SUCCESS',
  COMPLETE_PAYPAL_ORDER_SUCCESS = '@@checkout/PAYPAL_ORDER_SUCCESS',
  REMOVE_ORDER_SUCCESS = '@@checkout/REMOVE_ORDER_SUCCESS',
}

export enum PaginationTypes {
  FETCHING_ORDERS = '@@paginate/FETCHING_ORDERS',
  LOAD_ORDERS_SUCCESS = '@@paginate/LOAD_ORDERS_SUCCESS',
  UPDATE_PAGINATION_AFTER_ORDER = '@@paginate/UPDATE_PAGINATION_AFTER_ORDER',
  CLEAR_ALL_PAGES = '@@paginate/CLEAR_ALL_PAGES',
  REFRESH_DOWNLOAD_LINKS = '@@paginate/REFRESH_DOWNLOAD_LINKS'
}

export enum NavActionTypes {
  TOGGLE_NAV = '@@nav/TOGGLE'
}

