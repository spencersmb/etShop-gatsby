import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import styled, { keyframes } from 'styled-components'

export const FormWrapper = styled.div`
	position: absolute;
	width: 100%;
	padding: 20px;
`
export const Form1 = styled.form`
	display: flex;
	flex-direction: column;
`
export const FormHeader1 = styled.div`
	text-align: center;
	
	h3{
		${Sentinel.black};
		font-size: 34px;
		color: ${colors.grey.i800};
		line-height: 34px;
		margin: 10px 0 0;
	}
	
	p{
		margin: 10px 0 0;
		color: ${colors.grey.i600};
		font-weight: 500;
	}
	
	span{
		color: ${colors.primary.pink};
		font-style: italic;
	}
	
	.FormHeader1__icon{
		width: 45px;
		display: flex;
		margin: 0 auto;
		justify-content: center;
		svg{
			width: 100%;
		}
		path{
			fill: ${colors.grey.i800};
		}
			
	}
`

export const FormInput = styled.div`
		position: relative;
    margin-top: 16px;
    margin-bottom: 26px;
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
			background: #E91E63;
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
				color: #E91E63;
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
			font-size: 0.875rem;
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
			color: ${colors.grey.i600};
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
	font-weight: normal;
	color: #E91E63;
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

export const SubmitButton = styled.button`

`
