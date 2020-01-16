import HeaderBlockOne from '@components/headers/headerBlockOne'
import { SupportQuestionOne } from '@redux/reduxTestUtils'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'

afterEach(cleanup)
const props = {
	headline: 'Getting Started'
}
describe('Header Block One Tests', () => {
	it('Should render Correct Title', () => {
		const modalRender = render(<HeaderBlockOne {...props}/>)
		expect(modalRender.getByTestId('title').innerHTML).toBe(props.headline)
	})
})
