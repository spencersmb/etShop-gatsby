import React from 'react'

interface IProps {
	showDropdown: boolean
	onChange: any,
	selectedLicense: string,
	inCart?: boolean
}

const ProductSelect = ({ onChange, selectedLicense, showDropdown, inCart }: IProps) => {

	if (showDropdown) {
		return (
			<select
				disabled={inCart}
				data-testid='selectID'
				onChange={onChange}
				value={selectedLicense}>
				<option value='standard'>Standard</option>
				<option value='extended'>Extended</option>
			</select>
		)
	}

	return (
		<span>
			Standard
		</span>
	)

}

export default ProductSelect