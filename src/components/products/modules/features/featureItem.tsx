import { IFeatureItem } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import styled from 'styled-components'

function getSvgIcon (name: string): string {
	switch (name) {
		case 'texture':
			return svgs.Textures
		case 'grid':
			return svgs.Templates
		case 'laptop':
			return svgs.Computer
		case 'cart':
			return svgs.Cart
		case 'brush':
			return svgs.Procreate
		case 'lettering':
			return svgs.Fonts
		default:
			return svgs.Textures
	}
}

function getFeatureColor (index: number): string {
	switch (index) {
		case 1:
			return colors.teal.i500
		case 2:
			return `#FFC149`
		case 3:
			return colors.primary.pink
		default:
			return colors.purple.i500
	}
}

interface IProps {
	index: number
}

const FeatureItem = (props: IFeatureItem & IProps) => {
	const { title, description, icon, index } = props
	const itemColor = getFeatureColor(index)
	return (
		<Wrapper>
			<Title color={itemColor} data-testid={'title'}>
				{title}
			</Title>
			<Desc data-testid={'desc'}>
				{description}
			</Desc>
			<Icon color={itemColor}>
				{renderSvg(getSvgIcon(icon))}
			</Icon>
		</Wrapper>
	)
}
const Icon = styled.div<{ color: string }>`
	position: absolute;
	top: 20px;
	right: 20px;
	width: 35px;
	height: 35px;
	svg{
		width: 100%;
	}
	path{
		fill: ${props => props.color};
	}
`
const Desc = styled.div`
 color: ${colors.secondary.text};
`
const Title = styled.div<{ color: string }>`
	font-size: 28px;
	line-height: 32px;
	${Sentinel.semiboldItalic};
	font-style: italic;
	font-weight: 500;
	margin-bottom: 15px;
	color: ${props => props.color};
	max-width: 230px;
	
	@media ${device.tablet}{
		font-size: 32px;
		max-width: 300px;
	}
	
	@media ${device.laptop}{
		font-size: 32px;
		max-width: 400px;
	}
`
const Wrapper = styled.div`
	position: relative;
	padding: 20px;
	background: #fff;
	display: flex;
	flex-direction: column;
	border-radius: 15px;
	box-shadow: ${shadowStyles.shadow3alt};
	margin-bottom: 30px;
	
	@media ${device.tablet}{
		padding: 30px 90px 30px 30px;
	}
	@media ${device.laptop}{
		margin: 0 20px 0;
		position: relative;
    grid-row: 2;
		&:nth-child(1){
			align-self: end;
		}
		&:nth-child(2){
			grid-row: span 2;
			grid-row-start: 4;
		}
		&:nth-child(3){
			grid-row-start: 1;
			grid-row: span 2;
			grid-column: 2;
			margin-bottom: 80px;
		}		
		&:nth-child(4){
			grid-row-start: 4;
			grid-row: span 2;
			grid-column: 2;
		}
	}
	@media ${device.laptopL}{
		padding: 30px 120px 30px 30px;
		margin: 0s 15px 0;
		position: relative;
		&:nth-child(even){
			margin-left: 35px;
		}
		&:nth-child(odd){
			margin-right: 35px;
		}
	}
`
export default React.memo(FeatureItem)
