import HeaderBlockOneBCrumb from '@components/headers/headerBlockOneBreadcrumb'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'

afterEach(cleanup)
const props = {
	headline: 'Getting Started'
}
describe('Header Block One With Breadcrumb Tests', () => {
	it('Should render Correct Title', () => {
		const modalRender = render(<HeaderBlockOneBCrumb {...props}/>)
		expect(modalRender.getByTestId('headline').innerHTML).toBe(props.headline)
	})

	it('Should render Correct Title', () => {
		const modalRender = render(<HeaderBlockOneBCrumb {...props}/>)
		expect(modalRender.getByTestId('breadcrumb')).toBeDefined()
	})
})
