import { WindowActionTypes } from '@et/types/Enums'
import initialState from './initialState'
import {Actions} from '@et/types/Actions'

export const breakPointReducer = (state: number = initialState.breakpoint, action: Actions): number => {
  switch (action.type) {

    case WindowActionTypes.CHANGE_BREAKPOINT:
      return action.payload

    default:
      return state
  }
}
