import { IUserCreate, IUserSubmit } from '@et/types/User'
import { createHeaders } from '@utils/orderUtils'
import fetched from 'isomorphic-unfetch'

// import {logFormData} from '@et/utils/errorHandling'

class AuthApi {
	static login (user: IUserSubmit): Promise<Response> {
		const url: string = `${process.env.GATSBY_DB}/wp-json/jwt-auth/v1/token`

		const formData = new FormData()
		formData.append('username', user.email)
		formData.append('password', user.password)

		// log formData for debugging
		// logFormData(formData)

		return fetched(
			url,
			{
				body: formData,
				method: 'POST',
				mode: 'cors'
			}
		)
	}

	static createUser (user: IUserCreate): Promise<Response> {
		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/createUser`

		const formData = new FormData()
		formData.append('email', user.email)
		formData.append('password', user.password)
		formData.append('firstName', user.firstName)
		formData.append('lastName', user.lastName)
		formData.append('nonce', process.env.GATSBY_WPNONCE || '')

		// log formData for debugging
		// logFormData(formData)

		return fetched(
			url,
			{
				body: formData,
				method: 'POST',
				mode: 'cors'
			}
		)
	}

	static resetPassword (reduxFormData: { email: string, password: string, key: string }): Promise<Response> {
		const url: string = `${process.env.GATSBY_DB}/wp-json/et-shop/reset`
		const formData = new FormData()
		formData.append('email', reduxFormData.email)
		formData.append('password', reduxFormData.password)
		formData.append('key', reduxFormData.key)

		// log formData for debugging
		// logFormData(formData)

		return fetched(
			url,
			{
				body: formData,
				method: 'POST',
				mode: 'cors'
			}
		)
	}

	static forgotPasswordRequest ({ email }: { email: string }): Promise<Response> {

		const url: string = `${process.env.GATSBY_DB}/wp-json/et-shop/forgotPassword`
		const formData = new FormData()
		formData.append('email', email)

		return fetched(
			url,
			{
				body: formData,
				method: 'POST',
				mode: 'cors'
			}
		)
	}

	static getAllOrders (page: number): Promise<Response> {
		const url: string = `${process.env.GATSBY_DB}/wp-json/et-shop/user/getAllOrdersExt/?page=${page}`
		const options: any = {
			headers: createHeaders(),
			method: 'GET'
			// mode: 'cors'
		}
		return fetched(
			url,
			options
		)
	}
}

export default AuthApi
