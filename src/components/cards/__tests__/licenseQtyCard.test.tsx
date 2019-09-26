import LicenseQtyCard from '@components/cards/licenseQtyCard'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup,
	fireEvent
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const propsDefault = {
	bulkDiscount: false,
	inCart: false,
	numberOfLicenses: 1,
	onDialChange: jest.fn(),
	showModal: jest.fn()
}

describe('Cart Item tests', () => {

	it('Should not render disabled warning', () => {
		const modalRender = render(<LicenseQtyCard {...propsDefault}/>)
		expect(modalRender.queryByTestId('warning')).toBeNull()

	})

	it('Should render disabled warning', () => {
		const disabled = {
			...propsDefault,
			numberOfLicenses: '0'
		}

		const modalRender = render(<LicenseQtyCard {...disabled}/>)
		expect(modalRender.getByTestId('warning').innerHTML).toEqual('Must have at least one computer license.')
	})

	it('Should have one input', () => {
		const modalRender = render(<LicenseQtyCard {...propsDefault}/>)

		expect(modalRender.getByTestId('numberDial')).toBeDefined()
	})

	it('Should show discount message', () => {
		const discount = {
			...propsDefault,
			bulkDiscount: true
		}
		const modalRender = render(<LicenseQtyCard {...discount}/>)
		expect(modalRender.getByTestId('discount')).toBeDefined()
	})

	it('Should call onDialChange', () => {
		const modalRender = render(<LicenseQtyCard {...propsDefault}/>)

		const input = modalRender.getByTestId('numberDial')
		fireEvent.change(input, { target: { value: 23 } })
		expect(propsDefault.onDialChange).toHaveBeenCalledTimes(1)
	})

})
