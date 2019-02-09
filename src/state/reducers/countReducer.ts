import initialState from './initialState'
import {Actions} from '@et/types/Actions'
import {ProductsActionTypes} from '@et/types/Enums'

export const countReducer = (state: number = initialState.count, action: Actions): number => {

  switch (action.type) {

    case ProductsActionTypes.COUNT:
      return state + 1

    default:
      return state
  }
}
