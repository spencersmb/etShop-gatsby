import { device } from '@styles/global/breakpoints'
import { ButtonReg } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import styled from 'styled-components'

const FontPreviewBtn = () => {
	function togglePreview () {
		console.log('OPen preview')

	}

	return (
		<FontPreviewBtnWrapper>
			<Header>
				<Icon>{renderSvg(svgs.FontPreview)}</Icon>
				<ButtonText>
					<span>Font Preview</span>
					<span>Try before you buy</span>
				</ButtonText>
			</Header>
			<TryButton
				data-testid='tryBtn'
				onClick={togglePreview}
				outline={false}
				color={colors.teal.i500}
				hoverColor={colors.teal.i800}
				hoverTextColor={'#fff'}
			>
				TRY IT OUT
			</TryButton>
		</FontPreviewBtnWrapper>
	)
}

const TryButton = styled(ButtonReg)`
	align-items: center;
	margin: 0;
	text-align: center;
		
	@media ${device.tablet} {
		background: #fff;
		color: ${colors.teal.i500};
	}
		
`
const ButtonText = styled.div`
	display: flex;
	flex-direction: column;
	span{
		font-size: 18px;
		line-height: 18px;
		color:${colors.primary.text};
		&:first-child{
			font-weight: 600;
			font-size: 21px;
			line-height: 21px;
		}
	}
`
const Icon = styled.div`
	width: 37px;
	height: 37px;
	margin-right: 10px;
	svg{
		width: 100%;
		path{
			fill: ${colors.teal.i500};
		}
	}
	
	@media ${device.tablet} {
		svg{
			path{
				fill: #fff;
			}
		} 
	}
		
`
const Header = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
`
const FontPreviewBtnWrapper = styled.aside`
	display: flex;
	flex-direction: column;
	grid-column: 1 / -1;
	justify-content: center;	
	padding: 35px 37px;
	margin: 35px 0;
	background: ${colors.grey.i400};
	
	@media ${device.tablet} {
		grid-column: 9 /14; 
		box-shadow: ${shadowStyles.shadow5};
		background: ${colors.teal.i500};
		position: relative;
		z-index: 2;
		max-width: 365px;
		width: 100%;
		margin: 0 auto;
		// border-radius: 50px;
		// padding: 25px 37px;
		// border:3px solid ${colors.purple.i500};
	    
	}
	
	@media ${device.laptop} {
		margin: 0 0 0 auto;
		grid-row:4;
		justify-content: flex-end;
	}
		
`
export default FontPreviewBtn
