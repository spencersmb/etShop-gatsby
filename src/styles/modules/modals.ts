import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import posed from 'react-pose'
import styled from 'styled-components'

export const ModalCloseSvg = styled.div`
	position: absolute;
	top: 5px;
	right: 5px;
	width: 40px;
	height: 40px;
	svg{
		width: 100%;
	}
	path, rect{
		fill: #fff;
	}
	&:hover{
		cursor: pointer;
	}
`
export const HeaderLayout = styled.div`
	background: ${colors.teal.i500};
	padding: 55px 25px 25px;
	h2{
		${Sentinel.semiboldItalic};
		font-weight: 400;
		text-align: center;
		color: #fff;
		font-size: 32px;
		line-height: 32px;
		margin: 0;
	}
	@media ${device.tablet} {
		padding: 25px;
	    
	}
		
`
export const ModalContent = styled.div`
	padding: 35px;
	color: ${colors.primary.headline};
	h5{
		${Sentinel.semiboldItalic};
		font-size: 18px;
		font-weight: 300;
		margin-bottom: 15px;
	}
	p{
		
		&:last-child{
			margin: 0;
		}
	}
	.modalContent{
		&__intro{
			font-size: 21px;
		}
	}
	.licChecklist{
		margin-bottom: 25px;
		&:last-child{
			margin-bottom: 0;
		}
	}
	ul{
		margin: 0;
		max-width: 580px;
	}
	li{
	 position: relative;
	 list-style: none;
	 margin-bottom: 10px;
	 font-size: 14px;
	 span{
	 	font-weight: bold;
	 }
	}
	.svg{
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 19px;
		top: 50%;
		left: -30px;
		transform: translateY(-50%);
		svg{
			width: 100%;
		}
		path{
			fill: ${colors.teal.i500};
		}
		
		&.licNo{
			path{
				fill: ${colors.red.warning};
			}
		}
	}
`
export const depth = 6
export const ModalStyled = styled.div<{ width: number }>`
		position: fixed;
		top: 50%;
		left: 50%;
		width: 100%;
		transform: translateY(-50%) translateX(-50%);
		background: #fff;
		z-index: ${depth + 1};
		opacity: 0;
		overflow: scroll;
		height: 100%;
		
		@media ${device.tablet} {
			border-radius: 15px;
			box-shadow: 0 20px 45px -6px rgba(0,0,0,.2);
			width: ${props => props.width}px;
			height: auto;
			overflow: hidden;
		}
`
export const ModalPose = posed(ModalStyled)({
	exit: {
		zIndex: 7,
		opacity: 0,
		transition: {
			default: { duration: 200 },
			y: { ease: 'easeOut' }
		},
		x: `-50%`,
		y: `-60%`
	},
	enter: {
		zIndex: 7,
		opacity: 1,
		delay: 300,
		transition: {
			default: { duration: 300 },
			y: { type: 'spring', stiffness: 1500, damping: 35 }
		},
		x: `-50%`,
		y: `-50%`
	}
})
