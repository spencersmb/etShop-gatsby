import SupportBreadCrumb from '@components/support/supportBreadCrumb'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'

afterEach(cleanup)

describe('Support Bread Crumbs Component', () => {
	it('Should render Correct Title', () => {
		const modalRender = render(<SupportBreadCrumb
			title={'Test Title'}
		/>)
		expect(modalRender.getByTestId('title').innerHTML).toBe('Test Title')
	})
})
