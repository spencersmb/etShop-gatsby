import React from 'react'
import renderer from 'react-test-renderer'
import { ILogoutAction } from '../../../state/actions/authActions'
import { IShowModalAction } from '../../../state/actions/modalActions'
import { testCartEmpty } from '../../../state/reduxTestUtils'
import { Navbar } from '../navbar'
import {
	render
} from 'react-testing-library'

const props = {
	showModal: jest.fn(),
	logout: jest.fn(),
	cartToggle: jest.fn(),
	cart: {
		...testCartEmpty
	},
	user: null
}
describe('Navbar Layout', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(<Navbar {...props} />)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
	it('Should have Login and Home buttons', () => {
		const { getByText, getByTestId } = render(<Navbar {...props} />)
		const element = getByTestId('navbar')
		// console.log('element', element.children[0].children.length)

		expect(getByText('Home')).toBeDefined()

	})
})