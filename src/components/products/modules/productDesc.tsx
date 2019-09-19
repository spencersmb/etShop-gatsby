import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import React, { useEffect } from 'react'
import styled from 'styled-components'

interface IProps {
	intro_title: string
	intro_description: string
}

const ProductDescription = ({ intro_title = '', intro_description = '' }: IProps) => {

	function createDesc () {
		const sanitize = intro_description ? intro_description : ''

		return {
			__html: sanitize.toString()
		}
	}

	useEffect(() => {
		setTimeout(() => {
			const elmnt = document.getElementById('desc')
			if (elmnt) {
				elmnt.scrollIntoView()
			}
		}, 300)

	})
	return (
		<>
			<SubTitle>Description</SubTitle>
			<Title>{intro_title}</Title>
			<Desc dangerouslySetInnerHTML={createDesc()}/>
		</>
	)
}

const SubTitle = styled.span`
	grid-column: 2 / 4;
	font-size: 12px;
	font-weight: 500;
	color: ${colors.primary.text};
	text-transform: uppercase;
	text-align: left;
	margin-bottom: 20px;
	
	@media ${device.tablet} {
		grid-column: 2/6;
	}
	@media ${device.laptopL} {
		grid-column: 3/6;
		margin:0;
	}
		
`
const Title = styled.h3`
	color: ${colors.primary.headline};
	${Sentinel.semiboldItalic};
	font-size: 54px;
	line-height: 52px;
	font-weight: 500;
	font-style: italic;
	margin-bottom: 25px;
	text-align: left;
	grid-column: 2 / 4;
	
	@media ${device.tablet} {
		grid-column: 2 / 8;
	}
	
	@media ${device.laptopL} {
		font-size: 57px;
		line-height: 54px;
		margin: 50px 0 50px -30px;
	}
`
const Desc = styled.div`
	grid-column: 2 / 4;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	p{
		color: ${colors.primary.headline};
		&:first-child{
			font-size: 21px;
			strong{
				font-weight: 400;
			}
		}
	}
	li{
		color: ${colors.primary.headline};
		margin-bottom: 5px;
	}
	
	@media ${device.tablet} {
		grid-column: 2 /9;
		grid-row: 3 / span 4;
	}
	
	@media ${device.laptopL} {
		p{
				&:first-child{
					font-size: 24px;
					line-height: 32px;
				}
		}
		grid-column: 3/10;
		padding-right: 15px;
	}

`
export default ProductDescription
