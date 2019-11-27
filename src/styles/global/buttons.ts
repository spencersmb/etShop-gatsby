import { device } from '@styles/global/breakpoints'
import styled from 'styled-components'

interface IButtonProps {
	color?: string
	textColor?: string
	hoverColor?: string
	hoverTextColor?: string
	outline: boolean
}

export const ButtonSmall = styled.div<IButtonProps>`
	background: ${props => props.color ? props.color : '#000000'};
	color: ${props => props.textColor ? props.textColor : 'white'};
	border-radius: 25px;
	font-size: 14px;
	text-transform: uppercase;
	padding: 8px 18px;
	font-weight: 500;
	transition: .3s;
	&:hover{
		cursor: pointer;
		color: ${props => props.hoverTextColor ? props.hoverTextColor : 'white'};
		background: ${props => props.hoverColor ? props.hoverColor : '#000000'};

	}
`
export const CenterButton = styled.div`
 width: 100%;
 text-align: center;
`
export const ButtonReg = styled.button<IButtonProps>`
	background: ${props => props.outline ? 'transparent' : (props.color ? props.color : '#000000')};
	color: ${props => props.textColor ? props.textColor : 'white'};
	border-radius: 50px;
	font-size: 16px;
	text-transform: uppercase;
	padding: 12px 27px;
	font-weight: 500;
	transition: .3s;
	outline: none;
	border: ${props => props.outline ? `3px solid ${props.textColor ? props.textColor : '#fff'}` : 'none'};
	
	&:focus{
		outline: none;
	}
	
	@media ${device.laptop} {
		&:hover{
			cursor: pointer;
			color: ${props => props.hoverTextColor ? props.hoverTextColor : '#000'};
			background: ${props => props.hoverColor ? props.hoverColor : '#ffffff'};
		}
	}
		
`
