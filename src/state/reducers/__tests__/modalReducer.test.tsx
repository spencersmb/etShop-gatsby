import { ModalActionTypes } from '@et/types/Enums'
import { modalReducer } from '@redux/reducers/modalReducer'
import React from 'react'
import initialState from '@redux/reducers/initialState'

describe('Modal Reducer', () => {

  it('should reduce an action with the type SHOW_MODAL', () => {

    const modalComponent = () => (<div>Test Modal</div>)

    const modal = {
      modal: modalComponent,
      options: {
        closeOutsideModal: true,
        content: 'string',
        hasBackground: true,
      }
    }

    const reducer = modalReducer(initialState.modal, {
      type: ModalActionTypes.SHOW_MODAL,
      payload:{
        ...modal
      }
    })

    const result = {
      component: modalComponent,
      options: {
        closeOutsideModal: true,
        content: 'string',
        hasBackground: true,
      },
      show: true

    }
    expect(reducer).toEqual(result)
  })

  it('should reduce an action with the type HIDE_MODAL', () => {
    const reducer = modalReducer(initialState.modal, {
      type: ModalActionTypes.HIDE_MODAL
    })
    const removedModal = {'component': null, 'options': {}, 'show': false}
    expect(reducer).toEqual(removedModal)
  })

})
