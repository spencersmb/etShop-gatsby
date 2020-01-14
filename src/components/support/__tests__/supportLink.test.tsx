import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'
import SupportLink from '../supportLink'

afterEach(cleanup)
const props = {
	item: {
		title: 'title',
		slug: 'slug',
		excerpt: '<p>excerpt</p>',
		content: '<p>Content</p>',
		acfSupportQuestions:{
			popularity: 1
		}
	}
}
const propsShowExcerpt = {
	item: {
		title: 'title',
		slug: 'slug',
		excerpt: '<p>excerpt</p>',
		content: '<p>Content</p>',
		acfSupportQuestions:{
			popularity: 1
		}
	},
	showExcerpt: true
}
describe('Support Link Component', () => {

	it('Should render correct title', () => {
		const modalRender = render(<SupportLink {...props}/>)
		expect(modalRender.getByTestId('title').innerHTML).toBe('title')
	})
	it('Should render 3 Support Items under the Category', () => {
		const modalRender = render(<SupportLink {...props}/>)
		expect(modalRender.getByTestId('supportItem').children[0].getAttribute('href')).toBe('/support/slug')
	})
	it('Should render correct excerpt', () => {
		const modalRender = render(<SupportLink {...propsShowExcerpt}/>)
		expect(modalRender.getByTestId('excerpt').innerHTML).toBe(propsShowExcerpt.item.excerpt)
	})
})
