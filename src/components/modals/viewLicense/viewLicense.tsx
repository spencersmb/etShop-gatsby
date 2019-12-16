import ViewLicenseContent from '@components/modals/viewLicense/viewLicenseContent'
import { LicenseProvider } from '@components/modals/viewLicense/viewLicenseContext'
import ViewLicenseNav from '@components/modals/viewLicense/viewLicenseNav'
import { IModal } from '@et/types/Modal'
import { ButtonReg, CenterButton } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { HeaderLayout, ModalCloseSvg, ModalContent, ModalPose } from '@styles/modules/modals'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'

const ViewLicenseModal = (props: IModal) => {
	const { closeModal } = props

	return (
		<ModalPose
			animateOnMount={true}
			key='device-modal'
			width={660}
		>
			<ModalCloseSvg onClick={closeModal}>
				{renderSvg(svgs.HamburgerClose)}
			</ModalCloseSvg>
			<HeaderLayout>
				<h2>
					Licenses
				</h2>
			</HeaderLayout>
			<LicenseProvider
				initialState={{ licenses: props.options.data.licenses, selectedLicense: props.options.data.selectedLicense }}>
				<ViewLicenseNav/>
				<ViewLicenseContent/>
			</LicenseProvider>
		</ModalPose>
	)
}

export default ViewLicenseModal
