import { IState } from '@et/types/State'

const initialState: IState = {
	breakpoint: 0,
	form: {},
	modal: {
		component: null,
		show: false,
		options: {
			closeOutsideModal: false,
			content: '',
			hasBackground: false
		}
	},
	products: {},
	toastr: {
		confirm: null,
		toastrs: []
	},
	user: null,
	cart: {
		coupon: {
			code: '',
			discount: '',
			loading: false,
			product_ids: [],
			submitted: false,
			type: '',
			valid: false
		},
		isOpen: false,
		items: {},
		loaded: false,
		paymentType: 'stripe',
		totalItems: 0,
		totalPrice: 0,
		originalPrice: 0
	},
	pagination: {
		loading: false,
		pages: {},
		totalOrders: '0',
		totalPages: 0
	}
}
export default initialState