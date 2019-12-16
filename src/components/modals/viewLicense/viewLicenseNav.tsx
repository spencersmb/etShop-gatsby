import useLicenseContext from '@components/modals/viewLicense/useLicenseContext'
import { colors } from '@styles/global/colors'
import React from 'react'
import styled from 'styled-components'

const ViewLicenseNav = () => {
	const { selectedLicense, setLicense, licenses } = useLicenseContext()

	function handleChangeLicense (e: any) {
		setLicense(e.currentTarget.getAttribute('data-license'))
	}

	return (
		<ItemContainer>
			{licenses.map(license => (<Item
				onClick={handleChangeLicense}
				data-license={license.type.value}
				key={license.type.value}
				isSelected={selectedLicense === license.type.value}>
				{license.type.name}
			</Item>))}
		</ItemContainer>
	)
}

export default ViewLicenseNav
const ItemContainer = styled.ul`
 display: flex;
 flex-direction: row;
 justify-content: center;
 margin: 0;
 padding: 0;
 background: ${colors.grey.i400};
`
const Item = styled.li<{ isSelected: boolean }>`
	padding: 20px;
	list-style: none;
	font-weight: 500;
	color: ${props => props.isSelected ? '#fff' : colors.grey.i800};
	background: ${props => props.isSelected ? colors.grey.i600 : 'transparent'};
	transition: all .3s;
	
	&:hover{
		cursor: pointer;
		color: ${props => props.isSelected ? '#fff' : colors.teal.i500};
	}
`
