import { HeaderBlockContainer } from '@components/headers/headerBlockOne'
import SupportBreadCrumb from '@components/support/supportBreadCrumb'
import { device } from '@styles/global/breakpoints'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	headline: string
}

const HeaderBlockOneBCrumb = (props: IProps) => {
	const { headline } = props
	return (
		<SupportHeader className={`contain`}>
			<SupportBreadCrumb title={headline}/>
			<h1>
				{headline}
			</h1>
		</SupportHeader>
	)
}
const SupportHeader = styled(HeaderBlockContainer)`
	grid-row:1;
	grid-column: 2 / 4;
	margin: 0;
	h1{
		margin-left: 0;
	}
	@media ${device.tablet} {
		grid-column: 2 / 14;
		padding: 40px 0;
	}
	@media ${device.laptop} {
		grid-column: 4 / 12;
	}
		
`
export default HeaderBlockOneBCrumb
