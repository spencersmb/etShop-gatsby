import FeaturesList from '@components/products/modules/features/FeaturesList'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const propsDefault = {
	features: [
		{
			description: 'description',
			icon: 'texture',
			title: 'title 1'
		},
		{
			description: 'description',
			icon: 'grid',
			title: 'title 2'
		}
	]
}
describe('Feature List Tests', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(
				<FeaturesList {...propsDefault}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct title', () => {
		const modalRender = render(<FeaturesList {...propsDefault}/>)
		expect(modalRender.getByTestId('title').innerHTML).toEqual('Features')
	})
	it('Should render correct # of items', () => {
		const modalRender = render(<FeaturesList {...propsDefault}/>)
		expect(modalRender.getByTestId('items').children.length).toEqual(propsDefault.features.length)
	})
})
