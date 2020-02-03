import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import styled from 'styled-components'

function getSMIconBgColor (type: string) {
	switch (type) {
		case 'youtube-tuts':
			return `
				background: linear-gradient(180deg, #F95A86 0%, #FF9F9F 100%);`
		case 'procreate-Instagram':
			return `
background: linear-gradient(180deg, #6448C9 0%, #9364DC 100%);`
		default:
			return `background: transparent;`
	}
}

export const SMBarContainer = styled.div`
	border-top: 1px solid ${colors.grey.i600};
	padding: 40px 0 0;
	margin: 40px 0 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	&:last-child{
		padding: 40px 0 40px;
		margin: 40px 0 40px;
		border-bottom: 1px solid ${colors.grey.i600};
	}
	
	.supportPage & {
		&:last-child{
			margin: 40px 0 0;
			border-bottom: none;
		}
	}
	@media ${device.tablet} {
		padding: 20px 0 0;
		margin: 20px 0 0;
		flex-direction: row;
		
		&:last-child{
			padding: 20px 0 20px;
			margin: 20px 0 20px;
		}
		
		.supportPage & {
			&:last-child{
				padding: 20px 0 0;
				margin: 20px 0 0;
				border-bottom: none;
			}
		}
	}

`
const SMCircle = styled.div<{ type: string }>`
	width: 50px;
	height: 50px;
	display: flex;	
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	overflow: hidden;
	${props => getSMIconBgColor(props.type)}
	
	@media ${device.tablet} {
		width: 80px;
		height: 80px;
	}
`
export const SMIcon = styled(SMCircle)<{
	color: string
}>`
	svg{
		flex: 1;
		width: 30px;
	}
	path{
		fill: ${props => props.color};
	}
	
	@media ${device.tablet} {
		width: 80px;
		height: 80px;
		svg{
			width: 45px;
		}
	}
`
export const SMImage = styled(SMCircle)`
	.gatsby-image-wrapper{
		width: 100%;
	}
`
export const SMContentContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-top: 15px;
	text-align: center;
	
	@media ${device.tablet} {
		text-align: left;
		margin: 0 0 0 20px;
	}
`
export const SMTitle = styled.h4`
	color: ${colors.primary.headline};
	font-size: 24px;
	font-weight: 400;
	margin-bottom: 15px	;
	${Sentinel.semiboldItalic};
	
	@media ${device.tablet} {
		font-size: 28px;
		line-height: 28px;
	}
`
export const SMCat = styled.div`
	font-size: 13px;
	text-transform: uppercase;
	color: ${colors.primary.headline};
	
	@media ${device.tablet} {
		font-size: 14px;
	}
`
export const SMDesc = styled.div`
	color: ${colors.secondary.text};
	max-width: 600px;
`

export const SMButton = styled.a`
	color: ${colors.grey.i800};
	border: 3px solid ${colors.grey.i800};
	border-radius: 50px;
	padding: 6px 14px;
	text-transform: uppercase;
	text-align: center;
	width: 100%;
	max-width: 135px;
	margin: 25px auto 0;
	transition: .3s;
	
	&:hover{
		background: ${colors.grey.i800};
		color: #fff;
	}
	
	@media ${device.tablet} {
		margin: 0 auto;
	}
		
`

