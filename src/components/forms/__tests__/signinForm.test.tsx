import React from 'react'
import { connect, Provider } from 'react-redux'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { cleanup, fireEvent } from 'react-testing-library'
import SignInForm from '@components/forms/signin'
import { combineReducers, createStore } from 'redux'
import { reducer, FormReducer } from 'redux-form'
import sinon from 'sinon'
import { renderWithRedux } from '@redux/reduxTestUtils'
afterEach(cleanup)

const ConnectedFull = connect((state: FormReducer) =>{

		return {
			...state,
		}
	}
)(SignInForm)

const changeFormSpy = jest.fn()
const props = {
	handleUserSubmit: jest.fn(),
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
		expect(props.handleUserSubmit).toHaveBeenCalledTimes(1)
	})

	it('should have a changeForm btn and call changeForm on click', () => {
		const mountedForm = setup()
		const btn = mountedForm.getByText('Sign Up')
		btn.click()

		expect(props.changeForm).toHaveBeenCalledTimes(1)
		expect(btn).toBeTruthy()
	})
})

describe('Login Modal Enzyme', () => {

	it('Should take snapshot of blank form layout', () => {
		const store = createStore(combineReducers({form: reducer}))

		const enzymeProps = {
			handleSubmit: jest.fn(),
			closeModal: jest.fn(),
			changeForm: changeFormSpy,
			poseRef: React.createRef(),
			firstRender: true
		}
		// @ts-ignore
		const re = <SignInForm {...enzymeProps} />
		const SignInFormMounted = mount(
			<Provider store={store}>
				{re}
			</Provider>
		)
		expect(SignInFormMounted.html()).toMatchSnapshot()
	})
	// let submitFormSpy: any
	// const submitSpy = sinon.stub()
	//
	// afterEach(() => {
	// 	submitSpy.reset()
	// })

	// xit('Should call submitSpy when form is submitted', () => {
	// 	const setupEnzyme = () => {
	// 		const reducers = {
	// 			form: reducer,
	// 			// user: authReducer
	// 		}
	// 		const initialState = {
	// 			user: {
	// 				meta: {
	// 					accountType: 'free'
	// 				}
	// 			}
	// 		}
	// 		const store = createStore(combineReducers(reducers), {})
	//
	// 		const signinProps = {
	// 			handleSubmit: submitSpy,
	// 			array: () => {},
	// 			change: () => {
	// 				console.log('change')
	// 			},
	// 			closeModal: jest.fn(),
	// 			changeForm: changeFormSpy,
	// 			poseRef: React.createRef(),
	// 			firstRender: true
	// 		}
	//
	// 		// submitFormSpy = sinon.spy(SignInForm.prototype, 'userSubmit')
	// 		return mount(
	// 			<Provider store={store}>
	// 				<SignInForm {...signinProps} />
	// 			</Provider>
	// 		)
	// 	}
	// 	const wrapper = setupEnzyme()
	// 	// @ts-ignore
	// 	const spy = jest.spyOn(wrapper.instance(), 'userSubmit'); // replace function via reference
	// 	wrapper.update(); // forceUpdate()
	// 	const submitBtn = wrapper.find('button')
	// 	const formFields = wrapper.find('form')
	//
	// 	formFields.simulate('submit')
	//
	// 	expect(submitBtn.length).toEqual(2)
	// 	expect(submitFormSpy.callCount).toEqual(1)
	// 	// submitFormSpy.restore()
	// })
})