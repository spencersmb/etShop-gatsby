import { device } from '@styles/global/breakpoints'
import styled from 'styled-components'

export const PageContainer = styled.div`
	padding-top: 75px;
	display: flex;
	flex-direction: column;
	flex: 1;
	
	main{
		//flex: 1;
		background: #f7f8fc;
		//display: flex;
		//flex-direction: column;
	}
	
	@media ${device.laptop} {
		padding-top: 0; // was 87 for stickt
	}
		
`
