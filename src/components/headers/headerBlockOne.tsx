import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	headline: string
}

const HeaderBlockOne = (props: IProps) => {

	return (
		<HeaderBlockContainer>
			<h5>SUPPORT DESK</h5>
			<h1>
				{props.headline}
			</h1>
		</HeaderBlockContainer>
	)
}
export const HeaderBlockContainer = styled.div`
	max-width: 1260px;
	margin: 0 auto;
	padding: 40px 0;
	h1{
		text-align: center;
		${Sentinel.semiboldItalic};
		font-size: 36px;
		font-weight: 400;
		margin: 0;
		color: ${colors.primary.headline};
	}
	h5{
		font-size: 14px;
		color: ${colors.primary.headline};
		text-transform: uppercase;
		line-height: 14px;
		font-weight: 400;
		text-align: center;
	}
	
	@media ${device.tablet} {
		padding: 80px 0;

		h1{
			text-align: left;
			margin-left: 30px;
			font-size: 52px;
			line-height: 52px;
		}
		h5{
			text-align: left;
			margin-left: 30px;
		}
	}
	
	@media ${device.laptop} {
		h1{
			font-size: 60px;
			line-height: 60px;
		}
	}
		
`
export default HeaderBlockOne
