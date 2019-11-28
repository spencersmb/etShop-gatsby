import { IModal } from '@et/types/Modal'
import { device } from '@styles/global/breakpoints'
import { ButtonReg, CenterButton } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { HeaderLayout, ModalCloseSvg, ModalContent, ModalPose } from '@styles/modules/modals'
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
			width={580}
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

