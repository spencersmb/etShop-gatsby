import SupportPageContent from '@components/support/supportPageContent'
import { SupportQuestionOne } from '@redux/reduxTestUtils'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'

const props = {
	id: '123456',
	content: '<p>This is the content</p>',
	title: 'title',
	categories: [
		...SupportQuestionOne.categories.nodes
	]
}
afterEach(cleanup)

describe('Support Cat List Component', () => {
	it('Should render correct content', () => {
		const modalRender = render(<SupportPageContent {...props} />)
		expect(modalRender.getByTestId('content').innerHTML).toBe('<p>This is the content</p>')
	})
	it('Should render correct title', () => {
		const modalRender = render(<SupportPageContent {...props} />)
		expect(modalRender.getByTestId('title').innerHTML).toBe(props.title)
	})
	it('Should render correct contact title', () => {
		const modalRender = render(<SupportPageContent {...props} />)
		expect(modalRender.getByTestId('contact-title').innerHTML).toBe('Not finding what you are looking for?')
	})
	it('Should render correct contact button text', () => {
		const modalRender = render(<SupportPageContent {...props} />)
		expect(modalRender.getByTestId('contactBtn').innerHTML).toBe('CONTACT US')
	})
})
