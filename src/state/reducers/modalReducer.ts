import { ModalActionTypes } from '@et/types/Enums'
import initialState from './initialState'
import {Actions} from '@et/types/Actions'
import {IModalState} from '@et/types/Modal'

export const modalReducer = (state: IModalState = initialState.modal, action: Actions): IModalState => {
  switch (action.type) {
    case ModalActionTypes.SHOW_MODAL:
      return {
        ...state,
        component: action.payload.modal,
        options: action.payload.options,
        show: true,
      }
    case ModalActionTypes.HIDE_MODAL:

      return {
        ...state,
        component: null,
        options: {},
        show: false
      }
    default:
      return state
  }
}
