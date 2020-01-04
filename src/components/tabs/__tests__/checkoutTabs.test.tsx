import { LoginModal } from '@components/modals/login'
import CheckoutTabs from '@components/tabs/checkoutTabs'
import { IModalState } from '@et/types/Modal'
import { IState } from '@et/types/State'
import { cartReducer } from '@redux/reducers/cartReducer'
import { productReducer } from '@redux/reducers/productReducer'
import { renderWithRedux } from '@redux/reduxTestUtils'
import { isPWYWItemInCart } from '@utils/cartUtils'
import React from 'react'
import { connect } from 'react-redux'
import {
	cleanup,
	wait
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import { combineReducers } from 'redux'

afterEach(cleanup)

const props = {
	initialLoad: 'stripe',
	handleChangeType: jest.fn(),
	toggleCheckout: jest.fn(),
	freeCheckout: false
}

const propsPaypal = {
	initialLoad: 'paypal',
	handleChangeType: jest.fn(),
	toggleCheckout: jest.fn(),
	freeCheckout: false
}

const propsFree = {
	initialLoad: 'paypal',
	handleChangeType: jest.fn(),
	toggleCheckout: jest.fn(),
	freeCheckout: true
}

const Connected = connect((state: IState) => {
		return {
			...state,
			cart: {
				totalPrice: 15
			}
		}
	}
)(CheckoutTabs)

const ConnectedPaypal = connect((state: IState) => {
		return {
			...state,
			cart: {
				...state.cart,
				paymentType: 'paypal'
			}
		}
	}
)(CheckoutTabs)

describe('Checkout Tabs', () => {

	it('Should render correct number of tabs', () => {
		const modalRender = renderWithRedux(<Connected {...props}>
			<div data-payment='stripe'>Tab 1</div>
			<div data-payment='paypal'>Tab 2</div>
		</Connected>, combineReducers({
			products: productReducer,
			cart: cartReducer
		}))
		expect(modalRender.getByTestId('tabs__Nav').children.length).toEqual(2)
	})

	it('Should render correct tab paypal content', async () => {
		const modalRender = renderWithRedux(<ConnectedPaypal {...propsPaypal}>
			<div data-payment='stripe'>Tab 1</div>
			<div data-payment='paypal'>Tab 2</div>
		</ConnectedPaypal>, combineReducers({
			products: productReducer,
			cart: cartReducer
		}))
		await wait(() => {
			expect(modalRender.getByTestId('tabs__Content').innerHTML).toEqual('Tab 2')

		})
	})

	it('Should render correct tab stripe content', () => {
		const modalRender = renderWithRedux(<Connected {...props}>
			<div data-payment='stripe'>Tab 1</div>
			<div data-payment='paypal'>Tab 2</div>
		</Connected>, combineReducers({
			products: productReducer,
			cart: cartReducer
		}))
		expect(modalRender.getByTestId('tabs__Content').innerHTML).toEqual('Tab 1')
	})

	it('Should call handleChangeType action', () => {
		const modalRender = renderWithRedux(<ConnectedPaypal {...propsPaypal}>
			<div data-payment='stripe'>Tab 1</div>
			<div data-payment='paypal'>Tab 2</div>
		</ConnectedPaypal>, combineReducers({
			products: productReducer,
			cart: cartReducer
		}))
		const btn = modalRender.getByTestId('tab-stripe')
		btn.click()
		expect(propsPaypal.handleChangeType).toHaveBeenCalledTimes(1)
		expect(propsPaypal.handleChangeType).toHaveBeenCalledWith('stripe')
	})

	it('Should render correct free checkout content', () => {
		const modalRender = renderWithRedux(<Connected {...propsFree}>
			<div data-payment='stripe'>Tab 1</div>
			<div data-payment='paypal'>Tab 2</div>
		</Connected>, combineReducers({
			products: productReducer,
			cart: cartReducer
		}))
		expect(modalRender.getByTestId('freeCheckout')).toBeTruthy()
	})

})
