import styled from 'styled-components'

interface IButtonProps {
	color?: string
	textColor?: string
	hoverColor?: string
	hoverTextColor?: string
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