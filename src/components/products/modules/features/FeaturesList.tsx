import FeatureItem from '@components/products/modules/features/featureItem'
import { IFeatureItem } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { Sentinel } from '@styles/global/fonts'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	features: IFeatureItem[]
}

const FeaturesList = (props: IProps) => {

	const { features } = props
	return (
		<Container>
			<TitleHeader data-testid={'title'}>
				Features
			</TitleHeader>
			<Features data-testid={'items'}>
				{features.map((feature, index) => (<FeatureItem index={index} key={index} {...feature}/>))}
			</Features>
			<Divider>
				{renderSvg(svgs.Divider1)}
			</Divider>
		</Container>
	)
}
const Features = styled.div`
	grid-column: 2 /4;
	position: relative;
	z-index: 2;
	align-items: flex-start;
	@media ${device.tablet} {
		grid-column: 3 / 13;
	}
	
	@media ${device.laptop} {
		grid-column: 2 / 14;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 80px 1fr 80px 1fr;
		//flex-direction: row;
		//flex-wrap: wrap;
		//align-items: flex-start;
	}
		
`
const Divider = styled.div`
width: 100%;
position: absolute;
bottom:0;
left:0;
z-index: 1;
height: 350px;
overflow: hidden;
grid-column: 1 / -1;
	svg{
		width: 850px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
	}
	
	@media ${device.tablet} {
		svg{
			width: 1500px;
		}
	}
	
	@media ${device.laptop} {
		svg{
			width: 2020px;
		}
	}
	
		@media ${device.laptopL} {
		svg{
			width: 3020px;
		}
	}
	
`
const Container = styled(GridFluid)`
grid-row-gap: 0 !important;
padding: 60px 0 80px;
overflow: hidden;
position: relative;
z-index: 1;

	@media ${device.laptop} {
		margin-top: 80px;
		padding: 110px 0 150px;
	}
	@media ${device.laptopL} {
		padding: 190px 0 180px;
	}
`
const TitleHeader = styled.h5`
	font-weight: 500;
	${Sentinel.semiboldItalic};
	font-style: italic;
	position: relative;
	color: ${colors.primary.headline};
	grid-column: 2 /4;
	margin-bottom: 25px;
	font-size: 28px;
	z-index: 2;
	text-align: center;
	
	@media ${device.tablet} {
    font-size: 34px;
    font-weight: 500;
    font-style: italic;
    margin-bottom: 25px;
    text-align: center;
    grid-column: 2 / 14;
	}
	
	@media ${device.laptop} {
		color: #d6e0ea;
		left: 0;
		top: -30px;
		font-size: 190px;
    line-height: 190px;
    position: absolute;
	}
	@media ${device.laptopL} {
		top: 0;
		font-size: 248px;
    line-height: 248px;
	}
		
`
export default React.memo(FeaturesList)
