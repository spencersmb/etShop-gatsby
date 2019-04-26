import SubmitButton from '@components/buttons/submitButton'
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
	completed: false,
	submitting: false,
	error: null
}

const submittingProps = {
	...defaultProps,
	submitting: true
}

const completedProps = {
	...defaultProps,
	completed: true
}

const errorProps = {
	...defaultProps,
	error: true

}
describe('Submit Button Tests', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<SubmitButton {...defaultProps}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct button text', () => {
		const modalRender = render(<SubmitButton {...defaultProps} />)
		const element = modalRender.getByText('Submit')
		expect(element.innerHTML).toEqual('Submit')
	})

	it('Should not show spinner or completed contents', () => {
		const modalRender = render(<SubmitButton {...defaultProps} />)
		const element = modalRender.getByTestId('button')
		expect(element.children.length).toEqual(1)
	})

	it('Should show spinner', () => {
		const modalRender = render(<SubmitButton {...submittingProps} />)
		const element = modalRender.getByTestId('spinner')
		expect(element).toBeTruthy()
	})

	it('Should show error div', () => {
		const modalRender = render(<SubmitButton {...errorProps} />)
		const element = modalRender.getByTestId('error')
		expect(element).toBeTruthy()
	})

	it('Should show success div', () => {
		const modalRender = render(<SubmitButton {...completedProps} />)
		const element = modalRender.getByTestId('success')
		expect(element).toBeTruthy()
	})
})