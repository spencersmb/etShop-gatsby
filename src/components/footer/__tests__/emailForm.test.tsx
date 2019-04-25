import PinkEmailForm from '@components/footer/emailForm'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup,
	fireEvent
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)
const defaultProps = {
	handleSubmit: jest.fn(),
	completed: false,
	hasError: false,
	submitting: false,
	error: null,
	handleTextInput: jest.fn((input: string) => (input))
}

const completedProps = {
	...defaultProps,
	completed: true
}

const errorProps = {
	...defaultProps,
	hasError: true,
	error: true

}
describe('Email Form Tests', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<PinkEmailForm {...defaultProps}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct placeholder text', () => {
		const modalRender = render(<PinkEmailForm {...defaultProps} />)
		const element = modalRender.getByTestId('email-input')
		expect(element.getAttribute('placeholder')).toEqual('Enter your email address')
	})

	it('Should call handleTextInput', () => {
		const modalRender = render(<PinkEmailForm {...defaultProps} />)
		const element: any = modalRender.getByTestId('email-input')
		fireEvent.change(element, { target: { value: 'spencer.bigum@gmail.com' } })
		expect(element.value).toBe('spencer.bigum@gmail.com')
		expect(defaultProps.handleTextInput).toHaveBeenCalledTimes(1)
	})

	it('Should render submit btn', () => {
		const modalRender = render(<PinkEmailForm {...defaultProps} />)
		const element = modalRender.getByTestId('submitBtn')
		expect(element).toBeTruthy()
	})

	it('Should render completed text', () => {
		const modalRender = render(<PinkEmailForm {...completedProps} />)
		const success = modalRender.getByTestId('success')
		expect(success.innerHTML).toEqual('Success! Please check your email to confirm subscription.')
	})

	it('Should render error text', () => {
		const modalRender = render(<PinkEmailForm {...errorProps} />)
		const error = modalRender.getByTestId('error')
		expect(error.innerHTML).toEqual('There was a problem with your email. Please try again.')
	})

})