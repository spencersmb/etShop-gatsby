import { FlexGridContained } from '@styles/global/cssGrid'
import React from 'react'
import styled from 'styled-components'
import Navbar from './nav/navbar'

interface Iheader {
	siteTitle?: string
}

const Header = ({ siteTitle = `` }: Iheader) => (
	<HeaderWrapper>
		<FlexGridContained>
			<Navbar/>
		</FlexGridContained>
	</HeaderWrapper>
)

export default Header

const HeaderWrapper = styled.header`
  background: white;
	position: fixed;
	top: 0;
  left: 0;
  width: 100%;
	z-index: 2;
`
