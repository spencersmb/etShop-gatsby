import Login from '@components/modals/login'
import React from 'react'
import renderer from 'react-test-renderer'
import { testCartEmpty, testCartWithMultiples } from '@redux/reduxTestUtils'
import { Navbar } from '../navbar'
import {
	cleanup,
	render
} from 'react-testing-library'

const props = {
	showModal: jest.fn(),
	logout: jest.fn(),
	cartToggle: jest.fn(),
	toggleNav: jest.fn(),
	clearPaginationAction: jest.fn(),
	cart: {
		...testCartEmpty
	},
	user: null,
	nav: {
		isOpen: false
	}
}
const cartAdded = {
	showModal: jest.fn(),
	logout: jest.fn(),
	cartToggle: jest.fn(),
	toggleNav: jest.fn(),
	clearPaginationAction: jest.fn(),
	cart: {
		...testCartWithMultiples
	},
	user: null,
	nav: {
		isOpen: false
	}
}
const propsLoggedIn = {
	showModal: jest.fn(),
	logout: jest.fn(),
	cartToggle: jest.fn(),
	toggleNav: jest.fn(),
	clearPaginationAction: jest.fn(),
	cart: {
		...testCartEmpty
	},
	user: {
		email: 'spencer@gmail.com',
		firstName: 'spencer',
		lastName: 'bigum',
		token: '12345',
		gravatar: '23232323'
	},
	nav: {
		isOpen: false
	}
}
afterEach(() => {
	cleanup()
	props.showModal.mockClear()
})

describe('Navbar Layout', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(<Navbar {...props} />)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
	it('Should have Logo Link to index page', () => {
		const { getByTestId } = render(<Navbar {...props} />)
		const element = getByTestId('nav-logo')
		// @ts-ignore
		expect(element.children[0].children[0].href).toBe('http://localhost/')
	})
	it('Should have mobile hamburger button', () => {
		const { getByTestId } = render(<Navbar {...props} />)
		const element = getByTestId('hamburger')
		expect(element).toBeDefined()
	})
	it('Should have mobile close button', () => {
		const { getByTestId } = render(<Navbar {...props} />)
		const element = getByTestId('nav-close')
		expect(element).toBeDefined()
	})

	it('Should call toggle nav onClick', () => {
		const { getByTestId } = render(<Navbar {...props} />)
		const element = getByTestId('nav-close')
		element.click()
		expect(props.toggleNav).toHaveBeenCalled()
	})
	it('Should have 3 center nav links', () => {
		const { getByText, getByTestId } = render(<Navbar {...props} />)
		const element = getByTestId('nav-center')

		expect(element.children[0].children[0].innerHTML).toBe('Products')
		expect(element.children[1].children[0].innerHTML).toBe('Blog')
		expect(element.children[2].children[0].innerHTML).toBe('Support')

		// @ts-ignore
		expect(element.children[0].children[0].href).toBe('http://localhost/')
		// @ts-ignore
		expect(element.children[1].children[0].href).toBe('https://every-tuesday.com/')
		// @ts-ignore
		expect(element.children[2].children[0].href).toBe('http://localhost/support')
	})
	it('Should have signIn Button and call openSignInModal', () => {
		const { getByText, getByTestId } = render(<Navbar {...props} />)
		const element = getByText('Sign In')
		const calledWith = {
			modal: Login,
			options: {
				closeModal: true,
				hasBackground: true,
				name: 'signin'
			}
		}
		element.click()
		expect(element).toBeDefined()
		expect(props.showModal).toHaveBeenCalledTimes(1)
		expect(props.showModal).toHaveBeenCalledWith(calledWith)

	})
	it('Should have Join Button and call openSignInModal', () => {
		const { getByText, getByTestId } = render(<Navbar {...props} />)
		const element = getByText('Join Now')
		const calledWith = {
			modal: Login,
			options: {
				closeModal: true,
				hasBackground: true,
				name: 'signup'
			}
		}
		element.click()
		expect(element).toBeDefined()
		expect(props.showModal).toHaveBeenCalledTimes(1)
		expect(props.showModal).toHaveBeenCalledWith(calledWith)

	})
	it('Should have correct items in cart', () => {
		const { getByText, getByTestId } = render(<Navbar {...props} />)
		const element = getByTestId('cart-count')
		expect(element.children[0].innerHTML).toBe('')
	})
	it('Should have correct items in cart after it was added', () => {
		const nav = render(<Navbar {...cartAdded} />)
		const cart = nav.getByTestId('cart-count')
		expect(cart.children[0].innerHTML).toBe('2')
	})
	it('Should have user profile after login', () => {
		const { getByText, getByTestId } = render(<Navbar {...propsLoggedIn} />)
		expect(getByText('My account')).toBeDefined()
	})
	it('Should have user sign out btn after login', () => {
		const { getByText, getByTestId } = render(<Navbar {...propsLoggedIn} />)
		expect(getByText('Sign Out')).toBeDefined()
	})
})
