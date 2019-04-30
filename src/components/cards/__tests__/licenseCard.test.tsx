import LicenseCard from '@components/cards/licenseCard'
import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)
const propsDefault = {
	isSelected: true,
	price: '15',
	type: 'standard',
	title: 'Standard License',
	bullets: [
		{ bullet_point: 'bullet item 1' },
		{ bullet_point: 'bullet item 2' }
	],
	handleViewLicense: jest.fn(),
	handleLicenseClick: jest.fn((type) => type)
}
describe('License Card Tests', () => {

	it('Should render correct title', () => {
		const modalRender = render(<LicenseCard {...propsDefault}/>)
		const standardSelect = modalRender.getByTestId('title')
		expect(standardSelect.children.length).toEqual(1)
		expect(standardSelect.innerHTML).toEqual('<span>type</span>Standard License')
	})

	it('Should render correct price', () => {
		const modalRender = render(<LicenseCard {...propsDefault}/>)
		const standardSelect = modalRender.getByTestId('price')
		expect(standardSelect.children.length).toEqual(1)
		expect(standardSelect.innerHTML).toEqual('<span>$</span>15')
	})

	it('Should render correct number of bullet items', () => {
		const modalRender = render(<LicenseCard {...propsDefault}/>)
		const standardSelect = modalRender.getByTestId('bullets')
		expect(standardSelect.children.length).toEqual(2)
	})

	it('Should call onChange when header clicked', () => {
		const modalRender = render(<LicenseCard {...propsDefault}/>)
		const select = modalRender.getByTestId('header')
		select.click()
		expect(propsDefault.handleLicenseClick).toHaveBeenCalledTimes(1)
	})

	it('Should call triggerViewLic when clicked', () => {
		const modalRender = render(<LicenseCard {...propsDefault}/>)
		const select = modalRender.getByTestId('viewLicBtn')
		select.click()
		expect(propsDefault.handleLicenseClick).toHaveBeenCalledTimes(1)
	})

})