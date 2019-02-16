import { IUserCreate, IUserSubmit } from '@et/types/User'
import config from '../../gatsby-config'
import fetched from 'isomorphic-unfetch'

// import {logFormData} from '@et/utils/errorHandling'

class AuthApi {
	static login(user: IUserSubmit): Promise<Response> {
		const url: string = `${config.siteMetadata.db}/wp-json/jwt-auth/v1/token`

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

	static resetPassword(reduxFormData: { email: string, password: string, key: string }): Promise<Response> {
		const url: string = `${config.siteMetadata.db}/wp-json/et-shop/reset`
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

	static createUser(user: IUserCreate): Promise<Response> {
		const url: string = `${config.siteMetadata.db}/wp-json/et-shop/createUser`

		const formData = new FormData()
		formData.append('email', user.email)
		formData.append('password', user.password)
		formData.append('firstName', user.firstName)
		formData.append('lastName', user.lastName)
		formData.append('nonce', '4*`R?rV+4uv>I-bj)t0^HbGLd*(^!4}Q}X-y0O%EWT@j7YkvFN@6bqdGwJY)aOE')

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

	static forgotPasswordRequest({email}: { email: string }): Promise<Response> {

		const url: string = `${config.siteMetadata.db}/wp-json/et-shop/forgotPassword`
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
}

export default AuthApi
