import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Navbar from './nav/navbar'

interface Iheader {
	siteTitle?: string
}

const Header = ({ siteTitle = `` }: Iheader) => (
	<HeaderWrapper>
		<HeaderStyled>
			<Navbar/>
		</HeaderStyled>
	</HeaderWrapper>
)

export default Header

const HeaderWrapper = styled.header`
  background: rebeccapurple;
	position: fixed;
	top: 0;
  left: 0;
  width: 100%;
	z-index: 100;
`
const HeaderStyled = styled.div`
	background: #0074D9;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
`

const NavContainer = styled.div`
	flex: 1;
`
