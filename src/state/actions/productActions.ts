import { Actions } from '@et/types/Actions'
import { ProductsActionTypes } from '@et/types/Enums'
// import {Action, Dispatch} from 'redux'
import data from '../products.json'

export const count = (): Actions => {
  return {
    type: ProductsActionTypes.COUNT
  }
}

export const loadProducts = (): Actions => {
  if(!data){
    return {
      type: ProductsActionTypes.LOAD_PRODUCTS_ERROR
    }
  }

  return {
    type: ProductsActionTypes.LOAD_PRODUCTS_SUCCESS,
    payload: data
  }
}