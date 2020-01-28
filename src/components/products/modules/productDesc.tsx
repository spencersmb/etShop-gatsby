import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { useScrollToElement } from '@utils/windowUtils'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface IProps {
	instructions: string
	intro_description: string
}

const ProductDescription = ({ intro_description = '', instructions }: IProps) => {

	// useScrollToElement('desc')

	const [navSelection, setNavSelection] = useState('desc')
	const pluginOptions = {
		wordPressUrl: `${process.env.GATSBY_DB}`,
		uploadsUrl: `${process.env.GATSBY_DB}/wp-content/uploads/`
	}

	function createDesc () {
		const sanitize = intro_description ? intro_description : ''

		return {
			__html: sanitize.toString()
		}
	}

	function handleNavClick (e: any) {
		setNavSelection(e.target.getAttribute('data-tab'))
	}

	return (
		<>
			<DescNav data-testid={`productNav`}>
				<DescNavItem
					selected={navSelection === 'desc'}
					onClick={handleNavClick}
					data-tab={`desc`}>
					Description
					<span/>
				</DescNavItem>
				{instructions.length > 0 &&
        <DescNavItem
          selected={navSelection === 'install'}
          onClick={handleNavClick}
          data-tab={`install`}
          data-testid={`install-nav-item`}
        >
          Install Instructions
          <span/>
        </DescNavItem>
				}
			</DescNav>
			{navSelection === 'desc' &&
      <DescContainer data-testid={'title'}>
        <Desc data-testid={'desc'} className={'install'} dangerouslySetInnerHTML={createDesc()}/>
      </DescContainer>
			}
			{navSelection === 'install' &&
      <DescContainer data-testid={`instructions`}>
        <Desc dangerouslySetInnerHTML={{ __html: instructions }}/>
      </DescContainer>
			}
		</>
	)
}
const Desc = styled.div`
	grid-column: 2 / 4;
	display: flex;
	flex-direction: column;
	h1{
		text-align: center;
		color: ${colors.primary.headline};
		${Sentinel.semiboldItalic};
		font-size: 54px;
		line-height: 52px;
		font-weight: 500;
		font-style: italic;
	}

	h3{
		${Sentinel.reg};
		color: ${colors.primary.headline};
		font-size: 24px;
		margin: 1.72em 0 0;
	}
	p{
		color: ${colors.primary.headline};
		font-size: 18px;
		line-height: 1.58;
		letter-spacing: -0.004em;
		margin-top: 0.86em;
		margin-bottom: 0;
		
		&.install{
			&:first-child{
			font-size: 21px;
			strong{
				font-weight: 400;
			}
		}
		}
	}
	ul{		
		margin-top: .86em;
		margin-bottom: 0;
	}
	li{
		color: ${colors.primary.headline};
		margin-bottom: 5px;
		font-size: 18px;
		line-height: 1.58;
		letter-spacing: -0.004em;
	}
	a{
		color: ${colors.db.primary};
	}
	
	@media ${device.tablet} {
		grid-column: 3 /13;
	}
	
	@media ${device.laptop} {
		grid-column: 2 /9;
		grid-row: 3 / span 4;
		h1{
			text-align: left;
		}
	}
		
	
	@media ${device.laptopL} {
		grid-column: 3/10;
		padding-right: 15px;
		margin-left: -30px;
		h1{
			margin-left: -100px;
		}
		p{
				&.install{
					&:first-child{
					font-size: 24px;
					line-height: 32px;
				}
				}
		}

	}

`

const InstallContainer = styled.div`
	grid-column: 2 / 4;
	padding-bottom: 40px;
	
	@media ${device.tablet} {
		grid-column: 2 / 12;
	}
	
	@media ${device.laptop} {
		grid-column: 2 / 8;
	}
	
	@media ${device.laptopL} {
		font-size: 57px;
		line-height: 54px;
		margin: 50px 0 50px 0;
	}
`
const DescNavItem = styled.div<{ selected: boolean }>`
	text-transform: uppercase;
	color: ${colors.primary.headline};
	font-weight: bold;
	padding-bottom: 10px;
	position: relative;
	&:hover{
		cursor: pointer;
	}

	&:first-child{
		margin-right: 50px;
	}
	
	span{
		position: absolute;
		bottom: 0;
		left: 0;
		width: ${props => props.selected ? `100%` : '0'};
		transition: width .2s ease-in;
		height: 3px;
		background: ${colors.teal.i500};
	}
`
const DescNav = styled.div`
	grid-column: 2 / 4;
	padding-bottom: 40px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	
	@media ${device.tablet} {
		grid-column: 2 /14;
	}
	
	@media ${device.laptop} {
		grid-column: 2 / 10;
		justify-content: flex-start;
	}	
	
	@media ${device.laptopL} {
		grid-column: 3 / 10;
		margin-left: -30px;
	}
		
	
`
const DescContainer = styled.div`
	margin-bottom: 25px;
	grid-column: 2 / 4;
	
	
	@media ${device.tablet} {
		grid-column: 3 / 13;
	}
	
	@media ${device.laptop} {
		grid-column: 2 / 10;
		
		
	}
	
	@media ${device.laptopL} {
		margin: 0 0 0 0;
		grid-column: 3 / 10;
		
	}
`
export default React.memo(ProductDescription)
