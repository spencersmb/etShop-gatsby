import React from 'react'
import renderer from 'react-test-renderer'
import { cleanup, render } from 'react-testing-library'
import { hideModal } from '../../../state/actions/modalActions'
import {LoginModal} from '../login'
afterEach(cleanup)
const close = jest.fn()
	const initialProps = {
		closeModal: close,
		options:{
			name: 'signin',
			content: ''
		}
	}
const signUpProps = {
	closeModal: close,
	options:{
		name: 'signup',
		content: ''
	}
}
describe('Login Modal', () => {

	// React pose wont render snapshots by default
	// it('renders correctly', () => {

	// 	const tree = renderer
	// 		.create(<LoginModal {...initialProps}/>)
	// 		.toJSON()
	// 	expect(tree).toMatchSnapshot()
	// })

	it('Should render signin button', ( ) => {
		const modalRender = render(<LoginModal {...initialProps}/>)
		expect(modalRender.getByText('Sign Up')).toBeTruthy()
	})

	it('Should render close button and call close when clicked', ( ) => {
		const modalRender = render(<LoginModal {...initialProps}/>)
		const closeBtn = modalRender.getByText('Close')
		closeBtn.click()
		expect(closeBtn).toBeTruthy()
		expect(close).toHaveBeenCalledTimes(1)
	})

	it('Should render signup button', ( ) => {
		const modalRender = render(<LoginModal {...signUpProps}/>)
		expect(modalRender.getByText('Sign In')).toBeTruthy()
	})

	// Sing Up button is only present after button click
	it('Should switch states on click', ( ) => {
		const modalRender = render(<LoginModal {...signUpProps}/>)
		const button = modalRender.getByText('Sign In')
		button.click()
		expect(modalRender.getByText('Sign Up')).toBeTruthy()
	})
})