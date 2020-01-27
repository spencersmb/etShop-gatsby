import { IFacebookUserCreate } from '@et/types/User'
import { INavAction } from '@redux/actions/navActions'
import { StaticQuery } from 'gatsby'
import React from 'react'
import { connect } from 'react-redux'
import { cleanup } from 'react-testing-library'
import { modalReducer } from '@redux/reducers/modalReducer'
import { renderWithRedux, testCartEmpty } from '@redux/reduxTestUtils'
import { IModalState } from '@et/types/Modal'
import Login, { LoginModal } from '../login'

afterEach(cleanup)
beforeEach(() => {
	// @ts-ignore
	StaticQuery.mockImplementationOnce((mock: any) =>
		mock.render({
			allFile: {
				edges: [
					{
						node: {
							name: 'Dreamy Ink Textures',
							id: '46e80e85-da3a-5a1e-9ef3-bd46e38d1dd5',
							relativePath: 'color-tray-round.png',
							childImageSharp: {
								fluid: {
									aspectRatio: 12,
									srcSet: 'srcSet',
									sizes: '',
									src: '/static/dreamy-textures-800x500.jpg'
								}
							}
						}
					},
					{
						node: {
							name: 'Dreamy Ink Textures',
							id: '46e80e85-da3a-5a1e-6666-bd46e38d1dd5',
							relativePath: 'outlined-brushes-full.png',
							childImageSharp: {
								fluid: {
									aspectRatio: 12,
									srcSet: 'srcSet',
									sizes: '',
									src: '/static/dreamy-textures-800x500.jpg'
								}
							}
						}
					}
				]
			}
		})
	)
})

const close = jest.fn()
const initialProps = {
	loginAction: jest.fn(),
	closeModal: close,
	createUser: jest.fn(),
	createUserFacebook: jest.fn(),
	navToggle: jest.fn(),
	nav: {
		isOpen: false
	},
	cart: testCartEmpty
}
const signUpProps = {
	loginAction: jest.fn(),
	closeModal: close,
	createUser: jest.fn(),
	createUserFacebook: jest.fn(),
	navToggle: jest.fn(),
	nav: {
		isOpen: false
	},
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
			cart: testCartEmpty,
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
	// xit('renders correctly', () => {
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
		expect(modalRender.getByText('Sign In')).toBeTruthy()
		expect(modalRender.getByTestId('signIn-form')).toBeTruthy()
		expect(signUp).toBeNull()
	})

	it('Should render close button and call close when clicked', () => {
		const modalRender = renderWithRedux(<Connected {...initialProps}/>, modalReducer)
		const closeBtn = modalRender.getByTestId('close-btn')
		closeBtn.click()
		expect(closeBtn).toBeTruthy()
		expect(close).toHaveBeenCalledTimes(1)
	})

	it('Should render signup form and have sign button', () => {
		const modalRender = renderWithRedux(<ConnectedSignUp {...signUpProps}/>, modalReducer)
		const signIn = modalRender.queryByTestId('signIn-form')
		expect(modalRender.getByText('Create Account!')).toBeTruthy()
		expect(modalRender.getByTestId('signUp-form')).toBeTruthy()
		expect(signIn).toBeNull()
	})

	it('Should render firstName input', () => {
		const modalRender = renderWithRedux(<ConnectedSignUp {...signUpProps}/>, modalReducer)
		expect(modalRender.getByLabelText('First Name')).toBeTruthy()
	})

	it('Should render Email input', () => {
		const modalRender = renderWithRedux(<ConnectedSignUp {...signUpProps}/>, modalReducer)
		expect(modalRender.getByLabelText('Email')).toBeTruthy()
	})

	it('Should render password input', () => {
		const modalRender = renderWithRedux(<ConnectedSignUp {...signUpProps}/>, modalReducer)
		expect(modalRender.getByLabelText('Password')).toBeTruthy()
	})
})
