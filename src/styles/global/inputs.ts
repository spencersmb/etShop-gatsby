import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import styled from 'styled-components'

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
			&:focus{
				outline: none;
			}
			-moz-appearance: textfield;
			&::-webkit-outer-spin-button, 
			::-webkit-inner-spin-button{
				-webkit-appearance: none;
				margin: 0;
			};
			&:read-only{
				cursor: auto;
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
