import { Actions } from '@et/types/Actions'
import { ProductsActionTypes } from '@et/types/Enums'
import data from '../products.json'

export const loadProducts = (): Actions => {
	return {
		type: ProductsActionTypes.LOAD_PRODUCTS_SUCCESS,
		payload: data
	}
}