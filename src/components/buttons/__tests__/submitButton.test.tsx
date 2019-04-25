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
describe('Submit Button Tests', () => {

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

})