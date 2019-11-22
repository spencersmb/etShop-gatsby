import { ISelectProduct } from '@components/products/productLayout'
import { ILicenseType } from '@et/types/Products'
import React, { ChangeEvent } from 'react'

interface IProps {
	licenses: ILicenseType[]
	change: ISelectProduct
	selected: string
}

const LicenseSelectDropdown = (props: IProps) => {
	const { change, selected, licenses } = props

	function handleChange (e: ChangeEvent<HTMLSelectElement>) {
		change({
			license: licenses[e.target.selectedIndex].type.value,
			slug: licenses[e.target.selectedIndex].item.slug
		})
	}

	return (
		<select onChange={handleChange} value={selected} data-testid={'license_select'}>
			{licenses && licenses.map((license, index) => (
				<option value={license.type.value} key={license.type.value}>
					{license.type.name} License
				</option>
			))}
		</select>
	)

}

export default LicenseSelectDropdown
