import { Actions } from '@et/types/Actions'
import { ModalActionTypes } from '@et/types/Enums'

export const showModal = ({modal, options}: { modal: any, options: any }): Actions => {
  return {
    payload: {
      modal,
      options
    },
    type: ModalActionTypes.SHOW_MODAL,
  }
}