import { Actions } from '@et/types/Actions'
import { ModalActionTypes } from '@et/types/Enums'
import { IShowModalProps } from '@et/types/Modal'

export const showModal = ({modal, options}: IShowModalProps): Actions => {
  return {
    payload: {
      modal,
      options
    },
    type: ModalActionTypes.SHOW_MODAL,
  }
}


export const hideModal = () => {
  return {
    type: ModalActionTypes.HIDE_MODAL
  }
}