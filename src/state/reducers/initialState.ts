import {IState} from '@et/types/State'

const initialState: IState = {
  breakpoint: 0,
  form: {},
  modal: {
    component: null,
    show: false,
    options: {
      closeOutsideModal: false,
      content:'',
      hasBackground: false
    },
  },
  products: {},
  toastr: {
   confirm: null,
    toastrs: [],
  },
  user: null
}
export default initialState