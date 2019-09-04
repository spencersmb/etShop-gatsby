import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import ProductSelect from '../productSelect'

afterEach(cleanup)
const showDropDown = {
	bulkDiscount: false,
	standardLicPrice: '15',
	extendedLicPrice: '40',
	onChange: jest.fn(),
	showModal: jest.fn(),
	selectedLicense: 'standard',
	license: {
		type: 'standard',
		hasExtendedLicense: true,
		standardItem: {
			slug: 'slug',
			bullets: [
				{ bullet_point: 'bullet item' }
			]
		},
		extendedItem: {
			slug: 'slug',
			bullets: [
				{ bullet_point: 'bullet item' }
			]
		}
	},
	licenceQty: 1
}
const noDropDown = {
	bulkDiscount: false,
	standardLicPrice: '15',
	extendedLicPrice: '40',
	onChange: jest.fn(),
	showModal: jest.fn(),
	selectedLicense: 'standard',
	license: {
		type: 'standard',
		hasExtendedLicense: false,
		standardItem: {
			slug: 'slug',
			bullets: [
				{ bullet_point: 'bullet item' }
			]
		},
		extendedItem: {
			slug: 'slug',
			bullets: [
				{ bullet_point: 'bullet item' }
			]
		}
	},
	licenceQty: 1
}
describe('Product Select', () => {

	it('Should render 2 select items', () => {
		const modalRender = render(<ProductSelect {...showDropDown}/>)
		const wrapper = modalRender.getByTestId('wrapper')
		expect(wrapper.children.length).toEqual(2)
	})

	it('Should render single select item', () => {
		const modalRender = render(<ProductSelect {...noDropDown}/>)
		const wrapper = modalRender.getByTestId('wrapper')
		expect(wrapper.children.length).toEqual(1)
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
