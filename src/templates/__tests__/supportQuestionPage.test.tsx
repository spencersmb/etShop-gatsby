import SEO from '@components/seo'
import SupportContent from '@components/support/supportPageContent'
import { shallow } from 'enzyme'
import React from 'react'
import {
	cleanup
} from 'react-testing-library'
import SupportQuestion from '../supportQuestion'
import { StaticQuery } from 'gatsby'
import { SupportQuestionPageQuery } from '@redux/reduxTestUtils'

const setup = () => {
	return shallow(<SupportQuestion
		data={SupportQuestionPageQuery}
		pageContext={SupportQuestionPageQuery.pageContext}
	/>)
}
beforeEach(() => {
	// @ts-ignore
	StaticQuery.mockImplementationOnce((mock) =>
		mock.render(SupportQuestionPageQuery)
	)
})
afterEach(cleanup)
describe('Support Question Page', () => {
	it('Should render SEO component', () => {
		const shallowRender = setup()
		const component = shallowRender.find(SEO)
		expect(component.length).toEqual(1)
	})
	it('Should render Category List Component', () => {
		const shallowRender = setup()
		const component = shallowRender.find(SupportContent)
		expect(component.length).toEqual(1)
	})
})
