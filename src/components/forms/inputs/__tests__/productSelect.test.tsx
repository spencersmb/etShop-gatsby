import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup,
	fireEvent
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import ProductSelect from '../productSelect'

afterEach(cleanup)
const showDropDown = {
	standardLicPrice: '15',
	extendedLicPrice: '40',
	showDropdown: true,
	onChange: jest.fn(),
	selectedLicense: 'standard'
}
const noDropDown = {
	standardLicPrice: '15',
	extendedLicPrice: '40',
	showDropdown: false,
	onChange: jest.fn(),
	selectedLicense: 'standard'
}
describe('Product Select', () => {

	it('Should render correct text for both licenses', () => {
		const modalRender = render(<ProductSelect {...showDropDown}/>)
		const standardSelect = modalRender.getByTestId('standard')
		const extendedSelect = modalRender.getByTestId('extended')
		expect(standardSelect.children.length).toEqual(1)
		expect(extendedSelect.children.length).toEqual(1)
		expect(standardSelect.innerHTML).toEqual('<span>type</span>Standard License')
		expect(extendedSelect.innerHTML).toEqual('<span>type</span>Extended License')
	})

	it('Should render correct price for both licenses', () => {
		const modalRender = render(<ProductSelect {...showDropDown}/>)
		const standardSelect = modalRender.getByTestId('standardPrice')
		const extendedSelect = modalRender.getByTestId('extendedPrice')
		expect(standardSelect.children.length).toEqual(1)
		expect(extendedSelect.children.length).toEqual(1)
		expect(standardSelect.innerHTML).toEqual('<span>$</span>15')
		expect(extendedSelect.innerHTML).toEqual('<span>$</span>40')
	})

	it('Should call onChange when clicked with the correct extended type', () => {
		const modalRender = render(<ProductSelect {...showDropDown}/>)
		const select = modalRender.getByTestId('header')
		select.click()
		expect(showDropDown.onChange).toHaveBeenCalledTimes(1)
		expect(showDropDown.onChange).toHaveBeenCalledWith('extended')
	})

	it('Should render single select item', () => {
		const modalRender = render(<ProductSelect {...noDropDown}/>)
		const wrapper = modalRender.getByTestId('wrapper')

		expect(wrapper.children.length).toEqual(1)
	})

	xit('Should call triggerViewLic when clicked', () => {
		const modalRender = render(<ProductSelect {...showDropDown}/>)
		const select = modalRender.getByTestId('viewLicBtn')
		select.click()
		expect(showDropDown.onChange).toHaveBeenCalledTimes(1)
		expect(showDropDown.onChange).toHaveBeenCalledWith('extended')
	})

	// cant do snapshopts with Pose Elements
	// xit('renders correctly', () => {
	// 	const tree = renderer
	// 		.create(
	// 			<ProductSelect {...showDropDown}/>
	// 		)
	// 		.toJSON()
	// 	expect(tree).toMatchSnapshot()
	// })

})