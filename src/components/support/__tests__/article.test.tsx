import RelatedArticle from '@components/support/article'
import RelatedSupportArticles from '@components/support/relatedArticles'
import { SupportQuestionOne, supportQuestionsTesting } from '@redux/reduxTestUtils'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'

afterEach(cleanup)

describe('Article Component Tests', () => {
	it('Should render Correct Title', () => {
		const modalRender = render(<RelatedArticle {...SupportQuestionOne}/>)
		expect(modalRender.getByTestId('title').innerHTML).toBe(SupportQuestionOne.title)
	})

	it('Should render Correct Subtitle', () => {
		const modalRender = render(<RelatedArticle {...SupportQuestionOne}/>)
		expect(modalRender.getByTestId('subtitle').innerHTML).toBe(SupportQuestionOne.acfSupportQuestions.subtitle)
	})

	it('Should render Correct Link', () => {
		const modalRender = render(<RelatedArticle {...SupportQuestionOne}/>)
		expect(modalRender.getByTestId('articleItem').children[0].getAttribute('href')).toBe(`/support/${SupportQuestionOne.slug}`)
	})
})
