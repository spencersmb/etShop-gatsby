import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Navbar from './nav/navbar'

interface Iheader {
	siteTitle?: string
}

const Header = ({ siteTitle = `` }: Iheader) => (
	<HeaderStyled>
		<div
			style={{
				margin: `0 auto`,
				maxWidth: 960,
				padding: `1.45rem 1.0875rem`
			}}
		>
			<h1 style={{ margin: 0 }}>
				<Link
					to='/'
					style={{
						color: `white`,
						textDecoration: `none`
					}}
				>
					{siteTitle}
				</Link>
			</h1>
		</div>
		<div
			style={{
				margin: `0 auto`,
				maxWidth: 960,
				padding: `1.45rem 1.0875rem`,
				color: `#fff`,
				listStyle: `none`
			}}
		>
			<Navbar/>
		</div>
	</HeaderStyled>
)

export default Header

const HeaderStyled = styled.div`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`