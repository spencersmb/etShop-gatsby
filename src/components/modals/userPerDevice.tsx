import { IModal } from '@et/types/Modal'
import { device } from '@styles/global/breakpoints'
import { ButtonReg, CenterButton } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

const UserPerDeviceModal = (props: IModal) => {
	const { closeModal } = props
	const handleContact = () => {
		window.open('https://every-tuesday.com/contact', '_blank')
	}
	return (
		<ModalPose
			animateOnMount={true}
			key='device-modal'
			device={'test'}
		>
			<ModalCloseSvg onClick={closeModal}>
				{renderSvg(svgs.HamburgerClose)}
			</ModalCloseSvg>
			<HeaderLayout>
				<h2>
					License agreements
					per user
				</h2>
			</HeaderLayout>
			<ModalContent>
				<p className={'modalContent__intro'}>
					Both Standard and Extended Licenses are to installed on one computer/device per user. If you have designers
					working on a project, then you will need 5 licenses.
				</p>
				<p>
					If you need a more flexible license agreement to share the font or use the font in an app/epub/web app, be
					sure to contact us to discuss what type of license would best fit your products needs.
				</p>
				<CenterButton>
					<ButtonReg
						outline={true}
						textColor={colors.purple.i500}
						hoverTextColor={'#fff'}
						hoverColor={colors.purple.i500}
						onClick={handleContact}
					>
						Contact Us
					</ButtonReg>
				</CenterButton>
			</ModalContent>
		</ModalPose>
	)
}

export default UserPerDeviceModal
const ModalCloseSvg = styled.div`
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
const HeaderLayout = styled.div`
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
const ModalContent = styled.div`
	padding: 25px;
	p{
		color: ${colors.primary.headline};
		
		&:last-child{
			margin: 0;
		}
	}
	.modalContent{
		&__intro{
			font-size: 21px;
		}
	}
`
const depth = 6
const ModalStyled = styled.div`
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
			width: 580px;
			height: auto;
			overflow: hidden;
		}
`
const ModalPose = posed(ModalStyled)({
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
