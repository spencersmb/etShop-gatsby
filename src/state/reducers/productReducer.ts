import { Actions } from '@et/types/Actions'
import { ProductsActionTypes } from '@et/types/Enums'
import initialState from './initialState'

export const productReducer = (state: [] = initialState.products, action: Actions): [] => {
  switch (action.type) {

    case ProductsActionTypes.LOAD_PRODUCTS_SUCCESS:
      return action.payload // JSON array of data

    default:
      return state
  }
}
