import SEO from '@components/seo'
import SupportCategoryList from '@components/support/supportCategoryItems'
import { shallow } from 'enzyme'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'
import SupportCategoryTopic from '../supportCatListPage'
import { StaticQuery } from 'gatsby'
import { CatPageQuery } from '@redux/reduxTestUtils'

const setup = () => {
	return shallow(<SupportCategoryTopic
		data={CatPageQuery}
	/>)
}

beforeEach(() => {
	// @ts-ignore
	StaticQuery.mockImplementationOnce((mock) =>
		mock.render(CatPageQuery)
	)
})
afterEach(cleanup)
describe('Support Cat Lis Page', () => {
	it('Should render SEO component', () => {
		const shallowRender = setup()
		const component = shallowRender.find(SEO)
		expect(component.length).toEqual(1)
	})
	it('Should render Category List Component', () => {
		const shallowRender = setup()
		const component = shallowRender.find(SupportCategoryList)
		expect(component.length).toEqual(1)
	})
	// it('Should render 3 Support Items under the Category', () => {
	// 	const modalRender = render(<SupportCategoryTopic
	// 		data={CatPageQuery}
	// 	/>)
	// 	expect(modalRender.getAllByTestId('supportItem').length).toBe(3)
	// })
	// xit('Should have backBtn with correct link', () => {
	// 	const modalRender = render(<SupportCategoryTopic
	// 		data={CatPageQuery}
	// 	/>)
	// 	expect(modalRender.getByTestId('backBtn').children[0].innerHTML).toBe('BACK TO SUPPORT TOPICS')
	// 	expect(modalRender.getByTestId('backBtn').children[0].getAttribute('href')).toBe('/support'
	// 	)
	// })
})
