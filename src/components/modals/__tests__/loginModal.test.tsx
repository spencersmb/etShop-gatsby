import React from 'react'
import { connect } from 'react-redux'
import { cleanup } from 'react-testing-library'
import { modalReducer } from '@redux/reducers/modalReducer'
import { renderWithRedux } from '@redux/reduxTestUtils'
import { IModalState } from '@et/types/Modal'
import Login, { LoginModal } from '../login'

afterEach(cleanup)

const close = jest.fn()
const initialProps = {
	loginAction: jest.fn(),
	closeModal: close
}
const signUpProps = {
	loginAction: jest.fn(),
	closeModal: close,
	options: {
		name: 'signup'
	}
}
const modal = {
	component: Login,
	show: true,
	createUser: jest.fn(),
	options: {
		hasBackground: true,
		closeModal: false,
		content: '',
		name: 'signin'
	}
}
const Connected = connect((state: IModalState) => {

		return {
			...state,
			...modal
		}
	}
)(LoginModal)

const ConnectedSignUp = connect((state: IModalState) => {

		return {
			...state,
			component: Login,
			show: true,
			createUser: jest.fn(),
			options: {
				hasBackground: true,
				closeModal: false,
				content: '',
				name: 'signup'
			}
		}
	}
)(LoginModal)

describe('Login Modal', () => {

	// React pose wont render snapshots by default
	// it('renders correctly', () => {
	// 	const tree = renderer
	// 		.create(<LoginModal {...initialProps}/>)
	// 		.toJSON()
	// 	expect(tree).toMatchSnapshot()
	// })

	/**
	 * How it works
	 * ? Create a connect component passing in default props.
	 * ? Pass in additional component props on the component like redux Actions needed
	 * ?
	 */

	it('Should render signin form and have signup button', () => {
		const modalRender = renderWithRedux(<Connected {...initialProps}/>, modalReducer)
		const signUp = modalRender.queryByTestId('signUp-form')
		expect(modalRender.getByText('Sign Up')).toBeTruthy()
		expect(modalRender.getByTestId('signIn-form')).toBeTruthy()
		expect(signUp).toBeNull()
	})

	it('Should render close button and call close when clicked', () => {
		const modalRender = renderWithRedux(<Connected {...initialProps}/>, modalReducer)
		const closeBtn = modalRender.getByText('Close')
		closeBtn.click()
		expect(closeBtn).toBeTruthy()
		expect(close).toHaveBeenCalledTimes(1)
	})

	it('Should render signup form and have sign button', () => {
		const modalRender = renderWithRedux(<ConnectedSignUp {...signUpProps}/>, modalReducer)
		const signIn = modalRender.queryByTestId('signIn-form')
		expect(modalRender.getByText('Sign In')).toBeTruthy()
		expect(modalRender.getByTestId('signUp-form')).toBeTruthy()
		expect(signIn).toBeNull()
	})

	// Sing Up button is only present after button click
	it('Should switch states on click', () => {
		const modalRender = renderWithRedux(<ConnectedSignUp {...signUpProps}/>, modalReducer)
		const button = modalRender.getByText('Sign In')
		button.click()
		expect(modalRender.getByTestId('signIn-form')).toBeTruthy()
	})
})