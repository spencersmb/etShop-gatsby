import useLicenseContext from '@components/modals/viewLicense/useLicenseContext'
import { LicenseEnum } from '@et/types/Cart'
import { ModalContent } from '@styles/modules/modals'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

const ViewLicenseContent = () => {
	const { selectedLicense, licenses } = useLicenseContext()
	const getContent = (type: LicenseEnum) => {
		switch (type) {
			case LicenseEnum.server:
				return <ServerContent/>
			case LicenseEnum.extended:
				return <ExtendedContent/>
			default:
				return <StandardContent/>
		}
	}

	return (
		<>
			{licenses.map(license => (
				<RenderPosed key={license.type.value} pose={selectedLicense === license.type.value ? 'open' : 'closed'}>
					{getContent(license.type.value)}
				</RenderPosed>
			))}
		</>
	)
}

export default ViewLicenseContent
const StandardContent = () => {
	return (
		<>
			<ModalContent>
				<p className={'modalContent__intro'}>
					The licensed font can appear in unlimited commercial and personal projects including, but not limited to,
					physical end products, social media, broadcast, packaging, and paid ads.
				</p>
				<div className={'licChecklist'}>
					<h5>Can be used for</h5>
					<ul>
						<li><span className='svg'>{renderSvg(svgs.Checkmark)}</span><span>Web app and website</span> usage Only in
							rasterized form
						</li>
						<li><span className='svg'>{renderSvg(svgs.Checkmark)}</span><span>Games</span> Only in rasterized form</li>
						<li><span
							className='svg'>{renderSvg(svgs.Checkmark)}</span><span>Design or Print-on-Demand applications</span> Only
							the Licensee may use the font to create a
							completed end product
						</li>
					</ul>
				</div>
				<div className={'licChecklist'}>
					<h5>Cannot be used for</h5>
					<ul>
						<li><span className='svg licNo'>{renderSvg(svgs.Close)}</span><span>Embedding fonts</span> files Must always
							be
							used in rasterized form
						</li>
					</ul>
				</div>
			</ModalContent>
		</>
	)
}
const ExtendedContent = () => {
	return (
		<>
			<ModalContent>
				<p className={'modalContent__intro'}>
					EXTENDED
				</p>
				<p>
					If you need a more flexible license agreement to share the font or use the font in an app/epub/web app, be
					sure to contact us to discuss what type of license would best fit your products needs.
				</p>
			</ModalContent>
		</>
	)
}
const ServerContent = () => {
	return (
		<>
			<ModalContent>
				<p className={'modalContent__intro'}>
					Server
				</p>
				<p>
					If you need a more flexible license agreement to share the font or use the font in an app/epub/web app, be
					sure to contact us to discuss what type of license would best fit your products needs.
				</p>
				<p>
					If you need a more flexible license agreement to share the font or use the font in an app/epub/web app, be
					sure to contact us to discuss what type of license would best fit your products needs.
				</p>
				<p>
					If you need a more flexible license agreement to share the font or use the font in an app/epub/web app, be
					sure to contact us to discuss what type of license would best fit your products needs.
				</p>
			</ModalContent>
		</>
	)
}
const RenderStart = styled.div`

`
const RenderPosed = posed(RenderStart)({
	open: {
		height: 'auto',
		opacity: 1,
		transition: {
			opacity: {
				delay: 200
			}
		}
	},
	closed: {
		height: 0,
		opacity: 0,
		transition: {
			default: {
				duration: 200
			}
		}
	}
})
