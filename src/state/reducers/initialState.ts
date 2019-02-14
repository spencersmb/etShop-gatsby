import {IState} from '@et/types/State'

const initialState: IState = {
  breakpoint: 0,
  form: {},
  modal: {
    component: null,
    options: {
      closeOutsideModal: false,
      content:'',
      hasBackground: false
    },
    show: false,
  },
  products: {},

}
export default initialState