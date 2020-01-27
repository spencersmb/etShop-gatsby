import FeaturesList from '@components/products/modules/features/FeaturesList'
import SocialMediaBars from '@components/socialMedia/socialBars'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const propsDefault = {
	bars: [
		{
			type: 'youtube-tuts'
		},
		{
			type: 'procreate-Instagram'
		}
	]
}
describe('Product Description', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(
				<SocialMediaBars {...propsDefault}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct # of items', () => {
		const modalRender = render(<SocialMediaBars {...propsDefault}/>)
		expect(modalRender.getAllByTestId('item').length).toEqual(propsDefault.bars.length)
	})
})
