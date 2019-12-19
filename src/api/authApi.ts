import { IFacebookUserCreate, IUserCreate, IUserSubmit } from '@et/types/User'
import { fakeApiCall } from '@utils/apiUtils'
import { createHeaders } from '@utils/orderUtils'
import fetched from 'isomorphic-unfetch'

// import {logFormData} from '@et/utils/errorHandling'

class AuthApi {
	static login (user: IUserSubmit): Promise<Response> {
		const url: string = `${process.env.GATSBY_DB}/wp-json/jwt-auth/v1/token`

		const formData = new FormData()
		formData.append('username', user.signinEmail)
		formData.append('password', user.signinPassword)

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
		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/login/createUser`

		const formData = new FormData()
		formData.append('email', user.signupEmail)
		formData.append('password', user.password)
		formData.append('firstName', user.signupFirstName)
		formData.append('lastName', user.signupLastName)
		formData.append('nonce', process.env.GATSBY_WPNONCE || '')

		// log formData for debugging
		// logFormData(formData)
		// return fakeApiCall('reject')

		return fetched(
			url,
			{
				body: formData,
				method: 'POST',
				mode: 'cors'
			}
		)
	}

	static createFacebookUser (user: IFacebookUserCreate): Promise<Response> {
		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/login/facebookLogin`

		const formData = new FormData()
		formData.append('email', user.email)
		formData.append('firstName', user.first_name)
		formData.append('name', user.name)
		formData.append('lastName', user.last_name)
		formData.append('facebook_user_ID', user.userID)
		formData.append('accessToken', user.accessToken)
		formData.append('expires', user.expiresIn.toString())
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

	static resetPassword (reduxFormData: { email: string, password: string, rpKey: string }): Promise<Response> {

		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/login/resetPassword`
		const formData = new FormData()
		formData.append('email', reduxFormData.email)
		formData.append('password', reduxFormData.password)
		formData.append('rpKey', reduxFormData.rpKey)
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

	static forgotPasswordRequest (email: string): Promise<Response> {

		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/login/forgotPassword`
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
		// const url: string = `${process.env.GATSBY_DB}/wp-json/et-shop/user/getAllOrdersExt/?page=${page}`
		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/order/getAllOrdersExt/?page=${page}`
		const options: any = {
			headers: createHeaders(),
			method: 'GET',
			mode: 'cors'
		}
		return fetched(
			url,
			options
		)
	}

	static getOrder (orderId: string): Promise<Response> {
		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/order/getOrder/?id=${orderId}`
		const options: any = {
			headers: createHeaders(),
			method: 'GET',
			mode: 'cors'
		}
		return fetched(
			url,
			options
		)
	}

	static getGuestOrder ({ orderId, email }: { orderId: string, email: string }): Promise<Response> {
		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/order/getGuestOrder/?id=${orderId}&email=${email}`

		const options: any = {
			headers: createHeaders(),
			method: 'GET',
			mode: 'cors'
		}
		return fetched(
			url,
			options
		)
	}

	static resetLinks (orderId: string): Promise<Response> {
		const url: string = `${process.env.GATSBY_DB}/wp-json/${process.env.GATSBY_ROUTE}/v1/order/resetDownloads/?id=${orderId}`
		const options: any = {
			headers: createHeaders(),
			method: 'GET',
			mode: 'cors'
		}
		return fetched(
			url,
			options
		)
	}

}

export default AuthApi
