import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import styled, { keyframes } from 'styled-components'

export const CloseBtn = styled.div`
	width: 45px;
	height: 45px;
	position: absolute;
	top: 10px;
	right: 10px;
	display: flex;
	cursor:pointer;
	z-index: 4;
	svg{
		width: 100%
	}
	path{
		fill: ${colors.grey.i800};
	}

		
`
export const FormWrapper = styled.div`
	position: absolute;
	width: 100%;
	padding: 20px 20px 20px;
	display: flex;
	flex-direction: column;
	height: 100%;
	
	@media ${device.tablet} {
		padding: 20px 40px 20px;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
	}
`
export const FormContent = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: center;
	@media ${device.tablet} {
		margin-right: 40%;
	}
`

export const FormImg = styled.div<{ type?: string }>`
	display: none;
	@media ${device.tablet} {
		display: flex;
		width: 413px;
		position: absolute;
		right: -100px;
		top: 50px;
		
		${props => props.type === '1' ? `
			width: 243px;
			right: 0px;
			top: 40px;
		` : ``};
		.gatsby-image-wrapper{
			width: 100%;
		}
	}
`
export const Form1 = styled.form`
	display: flex;
	flex-direction: column;
`
export const FormHeader1 = styled.div`
	text-align: center;
	margin-bottom: 25px;
	padding: 0 15px;
	
	h3{
		${Sentinel.black};
		font-size: 20px;
		color: ${colors.grey.i800};
		line-height: 24px;
		margin: 0 0 10px;
		max-width: 400px;
		
		&.signUp{
			font-size: 21px;
			line-height: 21px;
		}
	}
	
	.signup__subhead{
		font-size: 16px;
		color: ${colors.grey.i800};
		line-height: 24px;
		margin: 0;
	}
	
	.form__switchAccounts{
		margin: 5px 0 0;
		font-weight: 500;
		color: ${colors.primary.pink};
		font-style: italic;
		font-size: 14px;
		display: inline-flex;
		cursor: pointer;
	}
	
	.FormHeader1__icon{
		width: 45px;
		display: flex;
		margin: 0 auto 10px;
		justify-content: center;
		align-items: center;
		svg{
			width: 100%;
		}
		path{
			fill: ${colors.grey.i800};
		}
			
	}
	
	&.FormHeader1__signup{
		margin-top: 70px;
	}
	
	@media ${device.mobileX} {
		padding: 0;
		h3{
			font-size: 38px;
			line-height: 38px;
		}
	}
	
	@media ${device.tablet} {
		padding: 0;
		text-align: left;
		&.FormHeader1__signup{
			margin-top: 0;
		}
		h3{
			font-size: 43px;
			line-height: 43px;
		}
		.FormHeader1__icon{
			margin: 0 0 10px;
		}
		.signup__subhead{
		}
	}
`
export const FormGroup = styled.div<{ column?: boolean }>`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
	
	@media ${device.laptop} {
		flex-direction: ${props => props.column ? 'column' : 'row'};
		flex-wrap: ${props => props.column ? 'no-wrap' : 'wrap'};
	}
`
export const FormInput = styled.div<{ removeMargin?: boolean, fullWidth?: boolean }>`
	position: relative;
	margin-top: 16px;
	${props => props.removeMargin ? `margin-bottom: 0;` : `margin-bottom: 26px;`}
	
	@media ${device.laptop} {
		${props => props.fullWidth ? '' : `
			flex: 1 0 50%;
			&:nth-child(1){
				padding-right: 10px;
			}
			&:nth-child(2){
				padding-left: 10px;
			}
		`}
	}
		

	.formGroup{
		position: relative;
    
    &:before,
    &:after{
			display: block;
			content: "";
			position: absolute;
			bottom: 0;
    }
    
    &:before{
			height: 2px;
			background: ${colors.teal.i500};
			z-index: 1;
			width: 0;
			transition: width 0.3s;
    }
    
    &:after{
    	height: 1px;
			background: #e6e6e6;
			width: 100%;
    }
		&.valid.has-value,
		&.invalid.has-value{
			.renderLabel{
				transform: translateY(-220%) scale(0.82);
				color: ${colors.text};
			}
		}
		
    &.valid.hasFocus,
	 	&.invalid.hasFocus{
			&:before{
				width: 100%;
			}
			.renderLabel{
				transform: translateY(-220%) scale(0.82);
				color: ${colors.teal.i500};
			}
		}
		
		input{
			-webkit-appearance: none;
			appearance: none;
			border-radius: 0;
			font-family: inherit;
			border-style: solid;
			border-color: #cccccc;
			color: ${colors.primary.text};
			display: block;
			font-size: 16px;
			height: 2.3125rem;
			width: 100%;
			box-sizing: border-box;
			transition: box-shadow 0.45s, border-color 0.45s ease-in-out;
			
			border-width: 0;
			padding-left: 0;
			padding-right: 0;
			box-shadow: none;
			margin: 0;
			background: transparent;
			
			&:focus{
				outline: none;
			}
		}
		
		.renderLabel{
			font-size: 0.875rem;
			font-weight: normal;
			margin-bottom: 0;
			
			display: block;
			width: 100%;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			line-height: 1;
			cursor: text;
			color: #8996a4;
			transition: transform ease 0.3s, color ease 0.3s;
			transform-origin: 0 0;
			}
		
		.renderLabel{
		
		}
		.renderInputSvg{
		
		}
	}
`

export const InputError = styled.div`
	font-size: 0.875rem;
	color:red;
	display: flex;
	flex-direction: column;
	//position: absolute;
	//left: 0;
	//bottom: -25px;
	span{
		padding-top: 5px;
	}
`

const rotate = keyframes`
   100% {
    transform: rotate(360deg);
  }
`
const dash = keyframes`
 	0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`
export const SpinnerContainer = styled.div<{ show: boolean }>`
	opacity: ${props => props.show ? 1 : 0};
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	width: 25px;
	height: 25px;
	z-index: 2;
	
	.spinner{
		animation: ${rotate} 2s linear infinite;
		width: 100%;
	
		& .path {
		stroke: #8976FF !important;
		stroke-linecap: round;
		animation: ${dash} 1.5s ease-in-out infinite;
		}
	}
`

export const SvgValidation = styled.div<{ isValid: boolean }>`
	width: 15px;
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	svg{
		width: 100%;
	}
	path{
		fill: ${props => props.isValid ? 'green' : 'red'};
	}
`

export const FacebookWrapper = styled.div`
	margin-top: 15px;
`
export const ForgotPassword = styled.p`
	color: ${colors.purple.i500};
	padding-top: 10px;
	text-align: center;
	cursor: pointer;
	
	&:hover{
		color: ${colors.purple.i700};
	}
`
export const Arrow = styled.span`
	width: 20px;
	display: flex;
	transform: rotate(180deg);
	margin-left: 5px;
	align-items: center;

	svg{
		width: 100%;
	}
	path{
		fill: ${colors.primary.pink};
	}
`
