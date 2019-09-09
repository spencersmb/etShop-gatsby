import React from 'react'
import styled from 'styled-components'

const SideBar = () => {
	return (
		<SideBarWrapper>
			Sidebar
		</SideBarWrapper>
	)
}
const SideBarWrapper = styled.aside`
	grid-column: 2 / 4;
`
export default SideBar
