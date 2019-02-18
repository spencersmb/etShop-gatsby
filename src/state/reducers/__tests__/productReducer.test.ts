import { AuthActionTypes, ProductsActionTypes } from '@et/types/Enums'
import { IAuthResponse, IUser } from '@et/types/User'
import { userReducer } from '@redux/reducers/authReducer'
import initialState from '@redux/reducers/initialState'
import data from '@redux/products.json'
import { productReducer } from '@redux/reducers/productReducer'

describe('Product Reducer', () => {

	it('should reduce an action with the type LOAD_PRODUCTS_SUCCESS', () => {

		const reducer = productReducer(initialState.products, {
			type: ProductsActionTypes.LOAD_PRODUCTS_SUCCESS,
			payload: data
		})

		expect(reducer).toEqual(data)
	})

})
