import { IState } from '@et/types/State'
import { userReducer } from '@redux/reducers/authReducer'
import { breakPointReducer } from '../reducers/breakpointReducer'
import { modalReducer } from '../reducers/modalReducer'
import { productReducer } from '../reducers/productReducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import initState from '../reducers/initialState'
import {reducer as formReducer} from 'redux-form'
import {reducer as toastrReducer} from 'react-redux-toastr'

const env = process.env.NODE_ENV || 'development'
const initStore = (initialState: IState = initState) => {

	const reducers = combineReducers<IState>({
		breakpoint: breakPointReducer,
		form: formReducer,
		modal: modalReducer,
		products: productReducer,
		toastr: toastrReducer,
		user: userReducer
	})

	if (typeof window !== 'undefined' && env === 'development') {
		return createStore(
			reducers,
			initialState,
			composeWithDevTools(applyMiddleware(thunkMiddleware)),
		)
	} else {
		return createStore(
			reducers,
			initialState,
			composeWithDevTools(applyMiddleware(thunkMiddleware)),

			// applyMiddleware(thunkMiddleware),
		)
	}
}
export default initStore