import SupportPageContent from '@components/support/supportPageContent'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'

const props = {
	content: '<p>This is the content</p>',
	title: 'title'
}
afterEach(cleanup)

describe('Support Cat List Component', () => {
	it('Should render 3 Support Items under the Category', () => {
		const modalRender = render(<SupportPageContent {...props} />)
		expect(modalRender.getByTestId('content').innerHTML).toBe('<p>This is the content</p>')
	})
	it('Should render 3 Support Items under the Category', () => {
		const modalRender = render(<SupportPageContent {...props} />)
		expect(modalRender.getByTestId('title').innerHTML).toBe(props.title)
	})
})
