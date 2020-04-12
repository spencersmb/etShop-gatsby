import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import PrivateRoute from '../privateRoutes'

afterEach(cleanup)
const testComp = () => (<div>Test Component</div>)

const hasUser = {
	Component: testComp,
	path: '/account/profile',
	location: {
		pathname: '/account/profile'
	},
	user: {
		email: 'spencer.bigum@gmail.com',
		firstName: 'spencer',
		lastName: 'spencer',
		token: '12345',
		gravatar: '',
		fbProfilePic: 'string'
	}
}

describe('Private Route Wrapper', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<PrivateRoute {...hasUser}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render child component', () => {
		const modalRender = render(<PrivateRoute {...hasUser}/>)
		expect(modalRender.getByText('Test Component').innerHTML).toEqual('Test Component')
	})

})
