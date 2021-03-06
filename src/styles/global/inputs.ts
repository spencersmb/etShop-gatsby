import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import styled, { css } from 'styled-components'

export const InputOutline = styled.div<{ disableInput: boolean }>`
	input{
		${Sentinel.reg};
		font-style: italic;
		background: transparent;
		font-weight: 600;
		font-size: 24px;
		line-height: 24px;
		text-align: center;
		color: ${props => props.disableInput ? colors.grey.i600 : colors.primary.text};
		border: 3px solid #D2DCE5;
		border-radius: 10px;
		padding: 2.5px 5px 2.5px 0;
		width: 100%;
		&:focus{
			outline: none;
		}
		-moz-appearance: textfield;
		&::-webkit-outer-spin-button, 
		::-webkit-inner-spin-button{
			-webkit-appearance: none;
			margin: 0;
		};
	}
`

export const InputContainer = styled.div`
	width: 72px;
	margin: 0 10px;

	label{
		display: none;
	}
`

export const InputWrapper = styled.div<{ disableInput: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	
	.label{
		color: ${colors.primary.text};
	}
	
	.numberDial__outline{
		width: 72px;
		margin: 0 10px;
	
		label{
			display: none;
		}
	}
	
	input{
			${Sentinel.reg};
			font-style: italic;
			background: transparent;
			font-weight: 600;
			font-size: 24px;
			line-height: 24px;
			text-align: center;
			color: ${props => props.disableInput ? colors.grey.i600 : colors.primary.text};
			border: 3px solid #D2DCE5;
			border-radius: 10px;
			padding: 2.5px 5px 2.5px 0;
			width: 100%;
			transition: border .3s;
			&:focus{
				outline: none;
				border-color: ${colors.teal.i500};
			}
			&::-webkit-outer-spin-button, 
			::-webkit-inner-spin-button{
				-webkit-appearance: none;
				margin: 0;
			};
			&:read-only{
				cursor: auto;
				border-color: #D2DCE5;
			}
	}
	
	select:-moz-focusring {
			color: transparent;
			text-shadow: 0 0 0 #000;
	}
	select {
			background: transparent;
			&:focus{
				outline: 0;
				border: none;
			}
	}
	
	&.input_checkoutNavBar{
		.label{
			font-size: 14px;
			line-height: 14px;
		}
		input{
			font-size: 18px;
			padding: 0 2.5px 0 0;
		}
	}
`

export const resetInput = `
		background-color: transparent;
    padding: 0;
    border: 0;
    border-radius: 0;
    color: inherit;
    line-height: inherit;
    appearance: none;
`

export const radioClass = css`
	.etRadioWrapper{
		[type="radio"]:checked,
		[type="radio"]:not(:checked) {
			position: absolute;
			left: -9999px;
		}
		[type="radio"]:checked + label,
		[type="radio"]:not(:checked) + label
		{
				position: relative;
				padding-left: 31px;
				cursor: pointer;
				line-height: 20px;
		}
		[type="radio"]:checked + label:before,
		[type="radio"]:not(:checked) + label:before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 22px;
				height: 22px;
				border: 2px solid ${colors.grey.i600};
				border-radius: 100%;
				background: transparent;
		}
		[type="radio"]:checked + label:before{
			border: 2px solid ${colors.primary.pink};
		}

		[type="radio"]:checked + label:after,
		[type="radio"]:not(:checked) + label:after {
				content: '';
				width: 12px;
				height: 12px;
				background: ${colors.primary.pink};
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 5px;
				border-radius: 100%;
				transition: all 0.1s ease;
				transform-origin: top;
		}
		[type="radio"]:not(:checked) + label:after {
				opacity: 0;
				transform: scale(0) translateY(-50%);
		}
		[type="radio"]:checked + label:after {
				opacity: 1;
				transform: scale(1) translateY(-50%);
		}
	}
`
