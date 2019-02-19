import React from 'react'
import renderer from 'react-test-renderer'
import ProductPage from '../productDetailPage'
import { StaticQuery } from 'gatsby'
import { singleItemQuery } from '@redux/reduxTestUtils'

beforeEach(() => {
	// @ts-ignore
	StaticQuery.mockImplementationOnce((mock) =>
		mock.render(singleItemQuery)
	)
})

describe('Product Layout', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<ProductPage data={singleItemQuery}/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
})