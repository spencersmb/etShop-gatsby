import { IState } from '@et/types/State'
import { breakPointReducer } from '@redux/reducers/breakpointReducer'
import { modalReducer } from '@redux/reducers/modalReducer'
import { productReducer } from '@redux/reducers/productReducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import initState from '@redux/reducers/initialState'

const env = process.env.NODE_ENV || 'development'
const initStore = (initialState: IState = initState) => {

	const reducers = combineReducers<IState>({
		breakpoint: breakPointReducer,
		modal: modalReducer,
		products: productReducer,
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