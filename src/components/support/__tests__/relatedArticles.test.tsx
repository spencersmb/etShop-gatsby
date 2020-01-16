import RelatedSupportArticles from '@components/support/relatedArticles'
import SupportBreadCrumb from '@components/support/supportBreadCrumb'
import { ISupportQuestion } from '@et/types/Support'
import { supportQuestionsTesting } from '@redux/reduxTestUtils'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'

afterEach(cleanup)

describe('Related Article Component Tests', () => {
	it('Should render Correct Header', () => {
		const modalRender = render(<RelatedSupportArticles
			selectedId={'123456'}
			supportQuestions={supportQuestionsTesting}
		/>)
		expect(modalRender.getByTestId('header').innerHTML).toBe('Related Articles')
	})

	it('Should render 3 articles', () => {
		const modalRender = render(<RelatedSupportArticles
			selectedId={'123456'}
			supportQuestions={supportQuestionsTesting}
		/>)
		expect(modalRender.getAllByTestId('articleItem').length).toBe(2)
	})
})
