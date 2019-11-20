import { device } from '@styles/global/breakpoints'
import { svgFlex } from '@styles/global/mixins'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import styled from 'styled-components'

const PaypalDisabledBtn = () => {
	return (
		<PPBtnContainer>
			<div>{renderSvg(svgs.PaypalPPLogoDisabled)}</div>
			<div>{renderSvg(svgs.PaypalDisabledLogo)}</div>
			<div>Checkout</div>
		</PPBtnContainer>
	)
}
const PPBtnContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	background: #eee;
	border-radius: 25px;
	height: 45px;
	min-height: 30px;
	max-height: 55px;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	text-transform: none;
	font-weight: 500;
	color: #9a9a9a;
	font-size: 14px;
	align-items: center;
	justify-content: center;
	
	& > div{
		height: 21px;
		&:nth-child(1){
			padding-right: 3px;
		}
		&:nth-child(2){
			padding-right: 4px;
		}
		svg{
			height: 100%;
			width: auto;
		}
		${svgFlex()}
	}
	
	@media ${device.laptop} {
		&:hover{
			cursor: pointer;
		}	    
		
	}
		
`
export default PaypalDisabledBtn
