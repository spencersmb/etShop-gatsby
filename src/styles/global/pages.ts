import { device } from '@styles/global/breakpoints'
import styled from 'styled-components'

export const PageContainer = styled.div`
	padding-top: 65px;
	
	@media ${device.laptop} {
		padding-top: 0; // was 87 for stickt
	}
		
`
