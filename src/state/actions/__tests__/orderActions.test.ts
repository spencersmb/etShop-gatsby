/* eslint-disable no-unused-vars */
import { OrderActionTypes } from '@et/types/Enums'
import { createOrder, processPaypalOrder } from '@redux/actions/orderActions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import initialState from '@redux/reducers/initialState'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const dataBase: string = process.env.GATSBY_DB || 'http://shopeverytuesday.local'

describe('Order Action tests', () => {

	afterEach(() => {
		nock.cleanAll()
	})

	it('Should call createOrder action and have 2 types', async () => {
		const store = mockStore(initialState)
		const apiResponse = {
			code: 200,
			message: 'Order success',
			order: {
				order_id: '502',
				email: 'spencer.bigum@gmail.com',
				date: '02-06-28',
				downloads: [],
				total: '25.99'
			}
		}

		const order = {
			payment_method: 'paypal',
			payment_method_title: 'Paypal',
			set_paid: true,
			total: '25.99',
			total_tax: '25.99',
			prices_include_tax: true,
			customer_user_agent: 'spencer@gmail.com',
			billing:
				{
					first_name: 'spencer',
					last_name: 'last name',
					email: 'spencer@gmail.com'
				},
			line_items: [],
			coupon_code: null
		}
		const actionResponse = [
			{
				type: OrderActionTypes.SUBMIT_ORDER
			}
		]

		const bodyData = {
			...apiResponse
		}

		nock(dataBase)
			.defaultReplyHeaders({
				'Content-Type': 'application/json'
			})
			.post(`/wp-json/${process.env.GATSBY_ROUTE}/orders`)
			.reply(200, bodyData)

		// @ts-ignore
		return store.dispatch(createOrder(order))
			.then(() => {
				const expectedActions = store.getActions()

				expect(expectedActions.length).toBe(1)
				expect(expectedActions).toEqual(actionResponse)
			})

	})

	it('Should call processPaypalOrder action and have 1 type', async () => {
		const store = mockStore(initialState)
		const apiResponse = {
			code: 200,
			message: 'Order success',
			order: {
				order_id: '502',
				email: 'spencer.bigum@gmail.com',
				date: '02-06-28',
				downloads: [],
				total: '25.99'
			}
		}

		const order = {
			first_name: 'spencer',
			last_name: 'bigum',
			paid: true,
			payment_id: '1234',
			payment_method: 'paypal',
			payment_token: '234',
			paypal_email: 'spencer@gmail.com',
			paypal_transaction_id: '1234',
			wc_order_id: '7890'
		}
		const actionResponse = [
			{
				type: OrderActionTypes.COMPLETE_PAYPAL_ORDER_SUCCESS
			}
		]

		const bodyData = {
			...apiResponse
		}

		nock(dataBase)
			.defaultReplyHeaders({
				'Content-Type': 'application/json'
			})
			.post(`/wp-json/${process.env.GATSBY_ROUTE}/paypalOrder`)
			.reply(200, bodyData)

		// @ts-ignore
		return store.dispatch(processPaypalOrder(order))
			.then(() => {
				const expectedActions = store.getActions()

				expect(expectedActions.length).toBe(1)
				expect(expectedActions).toEqual(actionResponse)
			})

	})

})