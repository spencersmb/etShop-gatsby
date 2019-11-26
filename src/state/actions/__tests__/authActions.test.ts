/* eslint-disable no-unused-vars */
import { AuthActionTypes, CartActionTypes, CouponActionTypes, PaginationTypes } from '@et/types/Enums'
import {
	createUser,
	createUserFacebook,
	forgotPassword,
	login,
	logout,
	resetPassword
} from '@redux/actions/authActions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import initialState from '@redux/reducers/initialState'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const dataBase: string = 'http://shopeverytuesday.local'

describe('Auth Action tests', () => {

	afterEach(() => {
		nock.cleanAll()
	})

	it('Should have type LOGIN_USER', async () => {
		const store = mockStore(initialState)
		const apiResponse = {
			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zaG9wZXZlcnl0dWVzZGF5LmxvY2FsIiwiaWF0IjoxNTUwMjcxMDA3LCJuYmYiOjE1NTAyNzEwMDcsImV4cCI6MTU1MDg3NTgwNywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTMifX19.OOUk1NVDmaZDr9XAZuxCYFL7s8JzOJ0wJcEzO4Tp7tk',
			user_email: 'everytues-buyer@gmail.com',
			user_nicename: 'everytues-buyergmail-com',
			user_display_name: 'everytues-buyer@gmail.com',
			first_name: 'Spencer',
			last_name: 'Bigum',
			gravatar: 'adsadadad'
		}

		const payload = {
			...apiResponse
		}
		const actionResponse = [
			{
				payload,
				type: AuthActionTypes.LOGIN_USER
			}
		]

		const bodyData = {
			...apiResponse
		}

		nock(dataBase)
			.defaultReplyHeaders({
				'Content-Type': 'application/json'
			})
			.post(`/wp-json/jwt-auth/v1/token`)
			.reply(200, bodyData)

		// @ts-ignore
		return store.dispatch(login({
			email: 'spencer@gmail.com',
			password: '1234'
		}))
			.then(() => {
				const expectedActions = store.getActions()

				expect(expectedActions.length).toBe(1)
				expect(expectedActions).toEqual(actionResponse)
			})

	})

	it('Should have type LOGOUT', () => {

		const store = mockStore(initialState)
		store.dispatch(logout())
		const getActions = store.getActions()
		const expectedActions = [
			{
				type: PaginationTypes.CLEAR_ALL_PAGES
			},
			{
				type: AuthActionTypes.LOGOUT
			}
		]

		expect(getActions.length).toBe(2)
		expect(getActions).toEqual(expectedActions)
	})

	it('Create User: Should have type LOGIN_USER + SUBMIT_COUPON_SUCCESS', async () => {
		const store = mockStore(initialState)
		const apiResponse = {
			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zaG9wZXZlcnl0dWVzZGF5LmxvY2FsIiwiaWF0IjoxNTcxNTc2OTg2LCJuYmYiOjE1NzE1NzY5ODYsImV4cCI6MTU3MjE4MTc4NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiOTMifX19.ZiAWjMSP-2ZqOsCWh3EylAEij7f5mpTTeBDqABg_Fkc',
			user_email: 'test366@gmail.com',
			gravatar: '4e41c83ac05d9c5140edbcf9733a8296',
			user_nicename: 'test366gmail-com',
			user_display_name: 'test366@gmail.com',
			first_name: 'Spencer',
			last_name: '',
			coupon: {
				code: '0312487fb689',
				id: 854,
				amount: '10',
				discount_type: 'percent',
				product_ids: [],
				excluded_product_ids: []
			}
		}

		const payload = {
			...apiResponse
		}
		const actionResponse = [
			{
				payload,
				type: AuthActionTypes.LOGIN_USER
			},
			{
				payload: {
					coupon: { ...apiResponse.coupon }
				},
				type: CouponActionTypes.SUBMIT_COUPON_SUCCESS
			}
		]

		const bodyData = {
			...apiResponse
		}

		nock(dataBase)
			.defaultReplyHeaders({
				'Content-Type': 'application/json'
			})
			.post(`/wp-json/${process.env.GATSBY_ROUTE}/v1/login/createUser`)
			.reply(200, bodyData)

		// @ts-ignore
		return store.dispatch(createUser({
			email: 'spencer@gmail.com',
			firstName: 'spencer',
			lastName: 'bigum',
			password: '123456'
		}))
			.then(() => {
				const expectedActions = store.getActions()

				expect(expectedActions.length).toBe(2)
				expect(expectedActions).toEqual(actionResponse)
			})

	})

	it('Create FacebookUser: Should have type LOGIN_USER only(for existing users) ', async () => {
		const store = mockStore(initialState)
		const apiResponse = {
			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zaG9wZXZlcnl0dWVzZGF5LmxvY2FsIiwiaWF0IjoxNTcxNTc2OTg2LCJuYmYiOjE1NzE1NzY5ODYsImV4cCI6MTU3MjE4MTc4NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiOTMifX19.ZiAWjMSP-2ZqOsCWh3EylAEij7f5mpTTeBDqABg_Fkc',
			user_email: 'test366@gmail.com',
			gravatar: '4e41c83ac05d9c5140edbcf9733a8296',
			user_nicename: 'test366gmail-com',
			user_display_name: 'test366@gmail.com',
			first_name: 'Spencer',
			last_name: '',
			fbProfilePic: 'picUrl'
		}

		const payload = {
			...apiResponse
		}
		const actionResponse = [
			{
				payload,
				type: AuthActionTypes.LOGIN_USER
			}
		]

		const bodyData = {
			...apiResponse
		}

		nock(dataBase)
			.defaultReplyHeaders({
				'Content-Type': 'application/json'
			})
			.post(`/wp-json/${process.env.GATSBY_ROUTE}/v1/login/facebookLogin`)
			.reply(200, bodyData)

		// @ts-ignore
		return store.dispatch(createUserFacebook({
			accessToken: 'accessToken',
			data_access_expiration_time: 12345,
			email: 'email@gmail.com',
			expiresIn: 54321,
			id: 12345,
			first_name: 'Spencer',
			name: 'Spencer B.',
			last_name: 'Bigum',
			picture: {
				data: {
					height: 1024,
					is_silhouette: false,
					url: 'picUrl',
					width: 768
				}
			},
			signedRequest: '123466',
			userID: 'userId'
		}))
			.then(() => {
				const expectedActions = store.getActions()

				expect(expectedActions.length).toBe(actionResponse.length)
				expect(expectedActions).toEqual(actionResponse)
			})

	})

	it('Create FacebookUser: Should have type LOGIN_USER + SUBMIT_COUPON_SUCCESS', async () => {
		const store = mockStore(initialState)
		const apiResponse = {
			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zaG9wZXZlcnl0dWVzZGF5LmxvY2FsIiwiaWF0IjoxNTcxNTc2OTg2LCJuYmYiOjE1NzE1NzY5ODYsImV4cCI6MTU3MjE4MTc4NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiOTMifX19.ZiAWjMSP-2ZqOsCWh3EylAEij7f5mpTTeBDqABg_Fkc',
			user_email: 'test366@gmail.com',
			gravatar: '4e41c83ac05d9c5140edbcf9733a8296',
			user_nicename: 'test366gmail-com',
			user_display_name: 'test366@gmail.com',
			first_name: 'Spencer',
			last_name: '',
			fbProfilePic: 'picUrl',
			coupon: {
				code: '0312487fb689',
				id: 854,
				amount: '10',
				discount_type: 'percent',
				product_ids: [],
				excluded_product_ids: []
			}
		}

		const payload = {
			...apiResponse
		}
		const actionResponse = [
			{
				payload,
				type: AuthActionTypes.LOGIN_USER
			},
			{
				payload: {
					coupon: { ...apiResponse.coupon }
				},
				type: CouponActionTypes.SUBMIT_COUPON_SUCCESS
			}
		]

		const bodyData = {
			...apiResponse
		}

		nock(dataBase)
			.defaultReplyHeaders({
				'Content-Type': 'application/json'
			})
			.post(`/wp-json/${process.env.GATSBY_ROUTE}/v1/login/facebookLogin`)
			.reply(200, bodyData)

		// @ts-ignore
		return store.dispatch(createUserFacebook({
			accessToken: 'accessToken',
			data_access_expiration_time: 12345,
			email: 'email@gmail.com',
			expiresIn: 54321,
			id: 12345,
			first_name: 'Spencer',
			name: 'Spencer B.',
			last_name: 'Bigum',
			picture: {
				data: {
					height: 1024,
					is_silhouette: false,
					url: 'picUrl',
					width: 768
				}
			},
			signedRequest: '123466',
			userID: 'userId'
		}))
			.then(() => {
				const expectedActions = store.getActions()

				expect(expectedActions.length).toBe(actionResponse.length)
				expect(expectedActions).toEqual(actionResponse)
			})

	})

	it('Should have type FORGOT_PASSWORD', async () => {
		const store = mockStore(initialState)
		const apiResponse = {
			user_email: 'everytues-buyer@gmail.com'
		}

		const actionResponse = [
			{
				type: AuthActionTypes.FORGOTPW
			}
		]

		const bodyData = {
			...apiResponse
		}

		nock(dataBase)
			.defaultReplyHeaders({
				'Content-Type': 'application/json'
			})
			.post(`/wp-json/${process.env.GATSBY_ROUTE}/v1/login/forgotPassword`)
			.reply(200, bodyData)

		// @ts-ignore
		return store.dispatch(forgotPassword('spencer.bigum@gmail.com'))
			.then(() => {
				const expectedActions = store.getActions()

				expect(expectedActions.length).toBe(1)
				expect(expectedActions).toEqual(actionResponse)
			})

	})

	it('Password Reset: Should have type LOGIN_PASSWORD', async () => {
		const store = mockStore(initialState)
		const apiResponse = {
			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zaG9wZXZlcnl0dWVzZGF5LmxvY2FsIiwiaWF0IjoxNTUwMjcxMDA3LCJuYmYiOjE1NTAyNzEwMDcsImV4cCI6MTU1MDg3NTgwNywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTMifX19.OOUk1NVDmaZDr9XAZuxCYFL7s8JzOJ0wJcEzO4Tp7tk',
			user_email: 'everytues-buyer@gmail.com',
			user_nicename: 'everytues-buyergmail-com',
			user_display_name: 'everytues-buyer@gmail.com',
			first_name: 'Spencer',
			last_name: 'Bigum',
			gravatar: 'adsadadad'
		}

		const payload = {
			...apiResponse
		}
		const actionResponse = [
			{
				payload,
				type: AuthActionTypes.LOGIN_USER
			}
		]

		const bodyData = {
			...apiResponse
		}

		nock(dataBase)
			.defaultReplyHeaders({
				'Content-Type': 'application/json'
			})
			.post(`/wp-json/${process.env.GATSBY_ROUTE}/v1/login/resetPassword`)
			.reply(200, bodyData)

		// @ts-ignore
		return store.dispatch(resetPassword({
			email: 'spencer.bigum@gmail.com',
			password: '12345',
			rpKey: 'stringRPKEY12345'
		}))
			.then(() => {
				const expectedActions = store.getActions()

				expect(expectedActions.length).toBe(1)
				expect(expectedActions).toEqual(actionResponse)
			})

	})

})
