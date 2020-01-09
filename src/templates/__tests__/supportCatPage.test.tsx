import { shallow } from 'enzyme'
import React from 'react'
import {
	render,
	cleanup,
	wait
} from 'react-testing-library'
import CategoryTopic from '../supportCatListPage'
import { StaticQuery } from 'gatsby'
import { CatPageQuery } from '@redux/reduxTestUtils'

const setup = () => {
	return shallow(<CategoryTopic
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

	it('Should render 1 Category', () => {
		const modalRender = render(<CategoryTopic
			data={CatPageQuery}
		/>)
		expect(modalRender.getAllByTestId('catItem').length).toBe(1)
	})
	it('Should render 3 Support Items under the Category', () => {
		const modalRender = render(<CategoryTopic
			data={CatPageQuery}
		/>)
		expect(modalRender.getAllByTestId('supportItem').length).toBe(3)
	})
	it('Should have backBtn with correct link', () => {
		const modalRender = render(<CategoryTopic
			data={CatPageQuery}
		/>)
		expect(modalRender.getByTestId('backBtn').children[0].innerHTML).toBe('BACK TO SUPPORT TOPICS')
		expect(modalRender.getByTestId('backBtn').children[0].getAttribute('href')).toBe('/support'
		)
	})
})
