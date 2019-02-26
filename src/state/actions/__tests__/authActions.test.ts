/* eslint-disable no-unused-vars */
import { AuthActionTypes } from '@et/types/Enums'
import { login, logout } from '@redux/actions/authActions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import initialState from '@redux/reducers/initialState'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const dataBase: string = process.env.DB || 'http://shopeverytuesday.local'

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
			last_name: 'Bigum'
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
		const expectedActions =
			{
				type: AuthActionTypes.LOGOUT
			}

		expect(getActions.length).toBe(1)
		expect(getActions).toEqual([expectedActions])
	})

})
