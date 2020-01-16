import SupportCategory from '@components/support/supportCategory'
import { supportQuestionsTesting } from '@redux/reduxTestUtils'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'

afterEach(cleanup)
const props = {
	count: 3,
	name: 'Getting Started',
	slug: 'getting-started',
	supportQuestions: {
		nodes: supportQuestionsTesting
	}
}
const propsViewBtn = {
	count: 4,
	name: 'Getting Started',
	slug: 'getting-started',
	supportQuestions: {
		nodes: [
			...supportQuestionsTesting,
			{
				id: '12345678',
				slug: 'question-4',
				title: 'Question 4',
				excerpt: '<p>This is the excerpt</p>',
				content: '<p>This is the content</p>',
				acfSupportQuestions: {
					popularity: 2,
					subtitle: 'subtitle-4'
				}
			}
		]
	}
}

describe('Support Category Component', () => {
	it('Should render correct category title', () => {
		const modalRender = render(<SupportCategory {...props}/>)
		expect(modalRender.getByTestId('title').innerHTML).toBe(props.name)
	})
	it('Should render 3 Support Items under the Category', () => {
		const modalRender = render(<SupportCategory {...props}/>)
		expect(modalRender.getAllByTestId('supportItem').length).toBe(3)
	})
	it('Should have no View All Btn', () => {
		const modalRender = render(<SupportCategory {...props}/>)
		expect(modalRender.queryByTestId('viewAll')).toBe(null)
	})
	it('Should have View All Btn', () => {
		const modalRender = render(<SupportCategory {...propsViewBtn}/>)
		expect(modalRender.queryByTestId('viewAll')).toBeTruthy()
	})
	it('Should have View All Btn with correct link', () => {
		const modalRender = render(<SupportCategory {...propsViewBtn}/>)
		expect(modalRender.getByTestId('viewAll').children[0].getAttribute('href')).toBe(`/support/category/${props.slug}`)
	})
})
