import SubmitButton from '@components/buttons/submitButton'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)
const defaultProps = {
	completed: false,
	submitting: false,
	invalid: false,
	buttonText: 'button text',
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
	invalid: true,
	error: {
		message: 'test error'
	}

}
describe('Submit Button Tests', () => {
	//
	// it('renders correctly', () => {
	// 	const tree = renderer
	// 		.create(
	// 			<SubmitButton {...defaultProps}/>
	// 		)
	// 		.toJSON()
	// 	expect(tree).toMatchSnapshot()
	// })

	it('Should render correct button text', () => {
		const modalRender = render(<SubmitButton {...defaultProps} />)
		const element = modalRender.getByText('button text')
		expect(element.innerHTML).toEqual('button text')
	})

	it('Should not show spinner or completed contents', () => {
		const modalRender = render(<SubmitButton {...defaultProps} />)
		const element = modalRender.getByTestId('submitButton')
		expect(element.children.length).toEqual(1)
	})

	it('Should show spinner', () => {
		const modalRender = render(<SubmitButton {...submittingProps} />)
		const element = modalRender.getByTestId('spinner')
		expect(element).toBeTruthy()
	})

})
