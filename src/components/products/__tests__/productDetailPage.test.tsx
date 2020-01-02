import { shallow } from 'enzyme'
import React from 'react'
import SEO from '../../seo'
import { ProductDetailPage } from '../../../templates/productPage'
import { StaticQuery } from 'gatsby'
import { singleItemQuery } from '@redux/reduxTestUtils'
import ProductLayout from '../productLayout'

const setup = () => {
	return shallow(<ProductDetailPage
		data={singleItemQuery}
	/>)
}

beforeEach(() => {
	// @ts-ignore
	StaticQuery.mockImplementationOnce((mock) =>
		mock.render(singleItemQuery)
	)
})

describe('Product Detail Page', () => {
	it('Should render SEO component', () => {
		const shallowRender = setup()
		const component = shallowRender.find(SEO)
		expect(component.length).toEqual(1)
	})
	it('Should render Product Layout Component', () => {
		const shallowRender = setup()
		const component = shallowRender.find(ProductLayout)
		expect(component.length).toEqual(1)
	})
})
