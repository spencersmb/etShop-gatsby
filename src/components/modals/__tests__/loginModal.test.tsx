import React from 'react'
import { connect } from 'react-redux'
import { cleanup } from 'react-testing-library'
import { modalReducer } from '@redux/reducers/modalReducer'
import { renderWithRedux } from '@redux/reduxTestUtils'
import { IModalState } from '@et/types/Modal'
import Login,{LoginModal} from '../login'

afterEach(cleanup)

const close = jest.fn()
const initialProps = {
		closeModal: close,
	}
const signUpProps = {
	closeModal: close,
	options:{
		name: 'signup',
	}
}
const modal = {
	component: Login,
	show: true,
	options: {
		content: '',
		name: 'signin'
	}
}
const Connected = connect((state: IModalState) =>{

	return {
		...state,
		...modal
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

	it('Should render signin button', ( ) => {
		const modalRender = renderWithRedux(<Connected {...initialProps}/>, modalReducer)
		expect(modalRender.getByText('Sign Up')).toBeTruthy()
	})

	it('Should render close button and call close when clicked', ( ) => {
		const modalRender = renderWithRedux(<Connected {...initialProps}/>, modalReducer)
		const closeBtn = modalRender.getByText('Close')
		closeBtn.click()
		expect(closeBtn).toBeTruthy()
		expect(close).toHaveBeenCalledTimes(1)
	})

	it('Should render signup button', ( ) => {
		const modalRender = renderWithRedux(<Connected {...signUpProps}/>, modalReducer)
		expect(modalRender.getByText('Sign In')).toBeTruthy()
	})

	// Sing Up button is only present after button click
	it('Should switch states on click', ( ) => {
		const modalRender = renderWithRedux(<Connected {...signUpProps}/>, modalReducer)
		const button = modalRender.getByText('Sign In')
		button.click()
		expect(modalRender.getByText('Sign Up')).toBeTruthy()
	})
})