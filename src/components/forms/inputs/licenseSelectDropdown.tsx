import React, { ChangeEvent, ReactEventHandler } from 'react'

interface IProps {
	hasExtendedLicesnse: boolean
	change: any
	selected: string
}

const LicenseSelectDropdown = (props: IProps) => {
	const { hasExtendedLicesnse, change, selected } = props

	function handleChange (e: ChangeEvent<HTMLSelectElement>) {
		change(e.target.value)
	}

	if (hasExtendedLicesnse) {
		return (
			<select onChange={handleChange} value={selected} data-testid={'license_select'}>
				<option value='standard'>Standard License</option>
				<option value='extended'>Extended License</option>
			</select>
		)
	} else {
		return (
			<select>
				<option value='standard'>Standard License</option>
			</select>
		)
	}
}

export default LicenseSelectDropdown
