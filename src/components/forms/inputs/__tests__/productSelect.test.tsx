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
	showDropdown: true,
	onChange: jest.fn(),
	selectedLicense: 'standard'
}
const noDropDown = {
	showDropdown: false,
	onChange: jest.fn(),
	selectedLicense: 'standard'
}
describe('Product Select', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<ProductSelect {...showDropDown}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct text for select options', () => {
		const modalRender = render(<ProductSelect {...showDropDown}/>)
		const select = modalRender.getByTestId('selectID')
		expect(select.children.length).toEqual(2)
		expect(select.children[0].innerHTML).toEqual('Standard')
		expect(select.children[1].innerHTML).toEqual('Extended')
	})

	it('Should call onChange when clicked', () => {
		const modalRender = render(<ProductSelect {...showDropDown}/>)
		const select = modalRender.getByTestId('selectID')
		fireEvent.change(select)
		expect(showDropDown.onChange).toHaveBeenCalledTimes(1)
	})

	it('Should render no select item', () => {
		const modalRender = render(<ProductSelect {...noDropDown}/>)
		const result = `<div><span>Standard</span></div>`

		expect(modalRender.baseElement.innerHTML).toEqual(result)
	})

})