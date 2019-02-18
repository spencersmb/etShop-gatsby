/* eslint-disable no-unused-vars */
import { ProductsActionTypes } from '@et/types/Enums'
import { loadProducts } from '@redux/actions/productActions'
import data from '@redux/products.json'
import { cleanup } from 'react-testing-library'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import initialState from '@redux/reducers/initialState'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
afterEach(cleanup)
describe('Product Action tests', () => {

	it('Should have type LOAD_PRODUCTS_SUCCESS', () => {

		const store = mockStore(initialState)
		store.dispatch(loadProducts())
		const getActions = store.getActions()
		const expectedActions =
			{
				type: ProductsActionTypes.LOAD_PRODUCTS_SUCCESS,
				payload: data
			}

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual([expectedActions])
	})

})
