import FeatureItem from '@components/products/modules/features/featureItem'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const propsDefault = {
	description: 'description',
	icon: 'texture',
	title: 'title 1',
	index: 1
}
describe('Feature Item Test', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(
				<FeatureItem {...propsDefault}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct title', () => {
		const modalRender = render(<FeatureItem {...propsDefault}/>)
		expect(modalRender.getByTestId('title').innerHTML).toEqual(propsDefault.title)
	})
	it('Should render correct description', () => {
		const modalRender = render(<FeatureItem {...propsDefault}/>)
		expect(modalRender.getByTestId('desc').innerHTML).toEqual(propsDefault.description)
	})
})
