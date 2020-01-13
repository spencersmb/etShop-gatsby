import SupportCategoryList from '@components/support/supportCategoryItems'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'
import { supportQuestionsTesting } from '@redux/reduxTestUtils'

afterEach(cleanup)

describe('Support Cat List Component', () => {
	it('Should render 3 Support Items under the Category', () => {
		const modalRender = render(<SupportCategoryList
			supportQuestions={supportQuestionsTesting}
		/>)
		expect(modalRender.getAllByTestId('supportItem').length).toBe(3)
	})
	it('Should have backBtn with correct link', () => {
		const modalRender = render(<SupportCategoryList
			supportQuestions={supportQuestionsTesting}
		/>)
		expect(modalRender.getByTestId('backBtnText').innerHTML).toBe('BACK TO SUPPORT TOPICS')
		expect(modalRender.getByTestId('backBtn').children[0].getAttribute('href')).toBe('/support'
		)
	})
})
