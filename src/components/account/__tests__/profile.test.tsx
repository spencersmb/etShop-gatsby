import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import Profile from '../profile'

afterEach(cleanup)

const hasUser = {
	user: {
		email: 'spencer.bigum@gmail.com',
		firstName: 'Spencer',
		lastName: 'spencer',
		token: '12345'
	}
}
describe('Profile Layout', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<Profile {...hasUser}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct user email', () => {
		const modalRender = render(<Profile {...hasUser}/>)
		expect(modalRender.getByText('spencer.bigum@gmail.com').innerHTML).toEqual('spencer.bigum@gmail.com')
	})

})