import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'
import SupportItem from '../supportQuestion'
import { StaticQuery } from 'gatsby'
import { SupportQuestionOne, SupportQuestionPageQuery } from '@redux/reduxTestUtils'

beforeEach(() => {
	// @ts-ignore
	StaticQuery.mockImplementationOnce((mock) =>
		mock.render(SupportQuestionPageQuery)
	)
})
afterEach(cleanup)
describe('Support Question Page', () => {
	it('Should render content block', () => {
		const modalRender = render(<SupportItem
			data={SupportQuestionPageQuery}
			pageContext={{ content: SupportQuestionOne.content }}
		/>)
		expect(modalRender.getByTestId('content').innerHTML).toBe('<p>This is the content</p>')
	})
	it('Should render correct title', () => {
		const modalRender = render(<SupportItem
			data={SupportQuestionPageQuery}
			pageContext={{ content: SupportQuestionOne.content }}
		/>)
		expect(modalRender.getByTestId('title').innerHTML).toBe(SupportQuestionOne.title)
	})
})
