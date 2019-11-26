import Footer from '@components/footer/footer'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('Footer Tests', () => {

	it('Should render Logo', () => {
		const modalRender = render(<Footer productPage={false}/>)
		const element = modalRender.getByTestId('footer-logo')
		expect(element).toBeTruthy()
	})

	it('Should render correct nav links', () => {
		const modalRender = render(<Footer productPage={false}/>)
		const element = modalRender.getByTestId('footer-links')
		expect(element).toBeTruthy()
		expect(element.children.length).toEqual(4)
		const items = element.children
		const link1 = items[0].children[0]
		const link2 = items[1].children[0]
		const link3 = items[2].children[0]
		const link4 = items[3].children[0]

		expect(link1.innerHTML).toBe('Products')
		expect(link1.getAttribute('href')).toBe('/products')

		expect(link2.innerHTML).toBe('Blog')
		expect(link2.getAttribute('href')).toBe('https://every-tuesday.com')

		expect(link3.innerHTML).toBe('Support')
		expect(link3.getAttribute('href')).toBe('/support')

		expect(link4.innerHTML).toBe('Privacy Policy')
		expect(link4.getAttribute('href')).toBe('/privacy')
	})

	it('Should render correct social links', () => {
		const modalRender = render(<Footer productPage={false}/>)
		const element = modalRender.getByTestId('social-links')
		expect(element).toBeTruthy()
		expect(element.children.length).toEqual(5)
		const items = element.children
		const link1 = items[0].children[0]
		const link2 = items[1].children[0]
		const link3 = items[2].children[0]
		const link4 = items[3].children[0]

		expect(link1.getAttribute('href')).toBe('https://www.youtube.com/user/everytues')
		expect(link2.getAttribute('href')).toBe('https://www.instagram.com/everytuesday/')
		expect(link3.getAttribute('href')).toBe('https://www.pinterest.com/teelac/')
		expect(link4.getAttribute('href')).toBe('https://www.facebook.com/everytues')
	})

})
