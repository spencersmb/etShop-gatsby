import { device } from '@styles/global/breakpoints'
import styled from 'styled-components'

const SliderButton = styled.button<{ background?: { hover: string, color: string } }>`
	position: absolute;
	top: 50%;
	left: 10px;
	transform: translateX(0) translateY(-50%);
	outline: none;
	display: none;
	height: 64px;
	width: 32px;
	border-radius: 8px;
	cursor: pointer;
	transition: background .2s,transform .2s,-webkit-transform .2s, opacity .2s;
	background-color: ${props => props.background ? props.background.color : 'transparent'};
	opacity: 1;
	padding: 0;
	border: 0;
	visibility: hidden;
	z-index: 3;
	&[disabled]{
		opacity: 0;
	}
	
	path{
		transition: .2s;
	}
	
	&:focus{
		outline: none;
	}
	
	@media ${device.laptop}{
		display: flex;
		visibility: visible;
		&:hover{
			${props => props.background ? `
				background-color: ${props.background.color}
			` : ''};
			path{
				fill: #fff;
			}
		}
	}
	

`
export const FmGalleryBtnLeft = styled(SliderButton)`
`
export const FmGalleryBtnRight = styled(SliderButton)<{ hasScrollbar?: boolean }>`
	${props => props.hasScrollbar ? `right: 20px;` : `right: 10px;`};
	left: auto;
`
