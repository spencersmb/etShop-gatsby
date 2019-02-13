import {IState} from '@et/types/State'

const initialState: IState = {
  breakpoint: 0,
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