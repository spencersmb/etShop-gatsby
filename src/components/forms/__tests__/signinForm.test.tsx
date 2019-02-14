import React from 'react'
import { connect } from 'react-redux'
import renderer from 'react-test-renderer'
import { cleanup, fireEvent } from 'react-testing-library'
import SignInForm from '@components/forms/signin'
import { reducer, FormReducer } from 'redux-form'
import { renderWithRedux } from '../../../state/reduxTestUtils'
afterEach(cleanup)

const ConnectedFull = connect((state: FormReducer) =>{

		return {
			...state,
		}
	}
)(SignInForm)

const changeFormSpy = jest.fn()
const props = {
	handleSubmit: jest.fn(),
	closeModal: jest.fn(),
	changeForm: changeFormSpy,
	poseRef: React.createRef(),
	firstRender: true
}

const setup = (): any => {
	const mounted = renderWithRedux(<ConnectedFull {...props}/>, reducer)
	const emailInput = mounted.getByLabelText('Email:')
	const passwordInput = mounted.getByLabelText('Password:')
	const submitBtn = mounted.getByText('Submit')
	return {
		submitBtn,
		passwordInput,
		emailInput,
		...mounted,
	}
}

describe('Login Modal', () => {

	it('Should render email input type', ( ) => {
		const mountedForm = setup()
		expect(mountedForm.emailInput.name).toBe('email')
		expect(mountedForm.emailInput.type).toBe('email')
	})

	it('Should render password input type', ( ) => {
		const mountedForm = setup()
		expect(mountedForm.passwordInput.name).toBe('password')
		expect(mountedForm.passwordInput.type).toBe('password')
	})

	it('should have a submit btn', async () => {
		const mountedForm = setup()
		const btn = mountedForm.submitBtn
		btn.click()
		expect(btn).toBeTruthy()
	})

	it('should have a changeForm btn and call changeForm on click', () => {
		const mountedForm = setup()
		const btn = mountedForm.getByText('Sign Up')
		btn.click()

		expect(props.changeForm).toHaveBeenCalledTimes(1)
		expect(btn).toBeTruthy()
	})
})