import SideBar from '@components/products/modules/productDetailsSidebar'
import { ProductKey, testProducts } from '@redux/reduxTestUtils'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const propsDefault = {
	details:
		{
			file_types: ['jpg'],
			file_size: '1.2 Gigs',
			dpi: '600',
			programs: [
				'photoshop', 'procreate', 'illustrator'
			],
			reqs: false
		},
	fontPreview: false,
	onChange: jest.fn(),
	isStandardLicense: true,
	licenses: testProducts[ProductKey.WatercolorStd].product_licenses
}

const webfontDefault = {
	details:
		{
			file_types: ['otf', 'ttf', 'woff', 'woff2'],
			file_size: '1.2 Gigs',
			dpi: '600',
			programs: [
				'photoshop', 'procreate', 'illustrator'
			],
			reqs: false
		},
	fontPreview: true,
	onChange: jest.fn(),
	isStandardLicense: true,
	licenses: testProducts[ProductKey.WatercolorStd].product_licenses
}
const webfontExt = {
	details:
		{
			file_types: ['otf', 'ttf', 'woff', 'woff2'],
			file_size: '1.2 Gigs',
			dpi: '600',
			programs: [
				'photoshop', 'procreate', 'illustrator'
			],
			reqs: false
		},
	fontPreview: true,
	onChange: jest.fn(),
	isStandardLicense: false,
	licenses: testProducts[ProductKey.WatercolorStd].product_licenses
}
describe('Product Description', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(
				<SideBar {...propsDefault}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct file types for std item', () => {
		const modalRender = render(<SideBar {...propsDefault}/>)
		expect(modalRender.getByTestId('fileTypes').children.length).toEqual(1)
	})

	// count # of children to determine if it rendered
	it('Should not render web font upgrade message', () => {
		const modalRender = render(<SideBar {...propsDefault}/>)
		expect(modalRender.getByTestId('fileTypeSection').children.length).toEqual(2)
	})

	it('Should render resolution dpi message', () => {
		const modalRender = render(<SideBar {...propsDefault}/>)
		expect(modalRender.getByTestId('dpi').innerHTML).toEqual(`600<span>dpi</span>`)
	})

	it('Should render file size message', () => {
		const modalRender = render(<SideBar {...propsDefault}/>)
		expect(modalRender.getByTestId('fileSize').innerHTML).toEqual(`1.2<span>Gigs</span>`)
	})

	it('Should render correct number of programs', () => {
		const modalRender = render(<SideBar {...propsDefault}/>)
		expect(modalRender.getByTestId('programs').children.length).toEqual(3)
	})

	// For WEB FONTS
	it('Should render web font upgrade message', () => {
		const modalRender = render(<SideBar {...webfontDefault}/>)
		expect(modalRender.getByTestId('upgrade').innerHTML).toEqual('<p>Web Font? Upgrade to</p><span>Extended License</span>')
	})

	it('Should not render web font types with standard license', () => {
		const modalRender = render(<SideBar {...webfontDefault}/>)
		expect(modalRender.getByTestId('fileTypes').children.length).toEqual(2)
	})

	it('Should call clickHandler on click', () => {
		const modalRender = render(<SideBar {...webfontDefault}/>)
		const button = modalRender.getByTestId('upgrade')
		button.click()
		expect(webfontDefault.onChange).toHaveBeenCalledTimes(1)
	})

	it('Should render web font types with extended license selected', () => {
		const modalRender = render(<SideBar {...webfontExt}/>)
		expect(modalRender.getByTestId('fileTypes').children.length).toEqual(4)
	})

	it('Should not render web font message', () => {
		const modalRender = render(<SideBar {...webfontExt}/>)
		expect(modalRender.queryByTestId('upgrade')).toBeNull()
	})

})
