/* eslint-disable no-unused-vars */
import { ModalActionTypes } from '@et/types/Enums'
import { showModal } from '@redux/actions/modalActions'
import initialState from '@redux/reducers/initialState'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Modal Actions', () => {

  it('Should have type ShowModal', async () => {

    const store = mockStore(initialState)
    const modal = {
      modal: 'hi',
      options: 'options'
    }
    store.dispatch(showModal(modal))
    const getActions = store.getActions()
    const expectedActions =
      {
        payload: {
          ...modal
        },
        type: ModalActionTypes.SHOW_MODAL,
      }

    expect(getActions.length).toBe(1)
    expect(getActions).toEqual([expectedActions])
  })

})
