import React from 'react'
import renderer from 'react-test-renderer'
import { cleanup, render } from 'react-testing-library'
import { svgs } from '../../assets/svg'
import { renderSvg } from '../styleUtils'

afterEach(cleanup)
const Parent = () => {
	return(
		<div data-testid='svg-test'>
			{renderSvg(svgs.CreditCard)}
		</div>
	)
}

describe('Login Modal', () => {
	it('Should render an SVG component', () => {
		const rendered = render(<Parent/>)
		const wrapper = rendered.getByTestId('svg-test')
		expect(wrapper.children.length).toBe(1)
	})
	it('renders SVG correctly', () => {
		const tree = renderer
			.create(<Parent/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
})