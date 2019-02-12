export enum ProductsActionTypes {
  LOAD_PRODUCTS_SUCCESS = '@@products/FETCH_SUCCESS',
  COUNT = '@@products/count',
  LOAD_PRODUCTS_ERROR = '@@products/FETCH_ERROR'
}

export enum ModalActionTypes {
  SHOW_MODAL = '@@modal/show',
  HIDE_MODAL = '@@modal/hide',
}

export enum AuthActionTypes {
  LOGIN_USER = '@@auth/login',
  LOGOUT = '@@auth/logout'
}