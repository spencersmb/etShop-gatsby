import { IProductBullet } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { ButtonSmall } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import { Width } from '@utils/windowUtils'
import React, { SyntheticEvent } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

const cardStyles = {
	standard: {
		main: colors.purple.i500
	},
	extended: {
		main: `#FF6363`
	}
}

interface IProps {
	inCart: boolean
	isSelected: boolean
	price: string
	type: string
	title: string
	bullets: IProductBullet[]
	handleViewLicense: (e: any) => void
	handleLicenseClick: (e: SyntheticEvent) => void
}

function LicenseCard (props: IProps) {
	const { type, isSelected, bullets, handleLicenseClick, handleViewLicense, price, title, inCart } = props

	return (
		<LicCard type={type}
						 inCart={inCart}
						 isOpen={isSelected}
						 pose={isSelected ? 'open' : 'closed'}>
			<LicHeader
				data-testid='header'
				onClick={handleLicenseClick}
				data-lic={type}
			>
				<LicSvg
					type={type}
					isOpen={isSelected}
					width={Width}
				>
					<svg viewBox='0 0 525 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
						{process.env.NODE_ENV !== 'test' && <PosedPath
              colorType={cardStyles[type].main}
              pose={isSelected ? 'open' : 'closed'}
              fillRule='evenodd'
              clipRule='evenodd'
              d='M525 0H0V65.0164C0.119141 65.0086 0.239136 65.0035 0.359741 65.0013C0.406372 65.0004 0.453125 65 0.5 65C4.64209 65 8 68.3578 8 72.5C8 76.6422 4.64209 80 0.5 80C0.332031 80 0.165283 79.9945 0 79.9836V88H525V79.9836C524.835 79.9945 524.668 80 524.5 80C520.358 80 517 76.6422 517 72.5C517 68.3578 520.358 65 524.5 65C524.668 65 524.835 65.0055 525 65.0164V0Z'
            />}
					</svg>
				</LicSvg>
				<LicHeaderContent>
					<LicTitle
						data-testid='title'
						pose={isSelected ? 'open' : 'closed'}
					>
						{title}
					</LicTitle>
					<LicPrice
						data-testid='price'
						pose={isSelected ? 'open' : 'closed'}
					>
						<span>$</span>
						{price}
					</LicPrice>
				</LicHeaderContent>
				<LicDash pose={isSelected ? 'open' : 'closed'}>
					{renderSvg(svgs.DottedLine)}
				</LicDash>
			</LicHeader>
			<LicFooterList
				type={type}
				isOpen={isSelected}
				pose={isSelected ? 'open' : 'closed'}>
				<LicBulletContainer>
					{bullets && bullets.length > 0 && <ul data-testid='bullets'>
						{bullets.map((bullet: { bullet_point: string }) => (
							<li key={bullet.bullet_point}>
								<span>{renderSvg(svgs.Checkmark)}</span>
								{bullet.bullet_point}
							</li>
						))}
          </ul>
					}
					<LicViewBtn
						hoverTextColor={cardStyles[type].main}
						data-testid='viewLicBtn'
						onClick={handleViewLicense}
						outline={false}
					>
						View license
					</LicViewBtn>
				</LicBulletContainer>


			</LicFooterList>
		</LicCard>
	)
}

const shadowHidden = '0px 30px 40px rgba(143,143,143,0), 0px 10px 20px rgba(161,161,161,0)'
const shadow3 = '0px 30px 40px rgba(57, 57, 57, 0.1), 0px 10px 20px rgba(36, 36, 36, 0.17)'

const LicCardPosed = posed.div({
	closed: {
		boxShadow: shadowHidden,
		borderRadius: '5px'
	},
	open: {
		boxShadow: shadow3,
		transition: {
			default: { duration: 300, delay: 300 }
		},
		borderRadius: '5px'
	}
})

const LicTitlePosed = posed.div({
	closed: {
		delay: 300,
		transition: {
			default: { duration: 300 }
		},
		color: colors.secondary.text
	},
	open: {
		transition: {
			default: { duration: 300 }
		},
		color: '#fff'
	}
})
const LicTitle = styled(LicTitlePosed)`
	${Sentinel.italic};
	font-weight: 500;
	font-size: 24px;
	line-height: 24px;
	font-style: italic;
	color: ${colors.secondary.text};
	position: relative;
	
	@media ${device.tablet} {
		font-size: 28px;
		line-height: 28px;
	}
`
const LicPrice = styled(LicTitlePosed)`
	${Sentinel.reg};
	font-weight: 600;
	color: ${colors.secondary.text};
	font-size: 28px;
	line-height: 28px;
	position: relative;
	
	
	span{
		position: absolute;
		line-height: 24px;
    left: -10px;
		font-size: 16px;
    top: -1px;
	}
	
	@media ${device.tablet} {
		font-size: 44px;
		line-height: 44px;
		span{
			top: 4px;
			left: -13px;
		}
	}
`
const PosedPath = posed.path({
	closed: {
		delay: 300,
		transition: {
			default: { duration: 300 }
		},
		fill: '#d2dce5'
	},
	open: {
		transition: {
			default: { duration: 300 }
		},
		fill: (props: any) => props.colorType ? props.colorType : '#d2dce5'
	}
})
const LicSvgPosed = posed.div({
	closed: {
		opacity: 1,
		// background: 'rgb(247, 248, 252)'
		background: (props: any) => props.width >= 1024 ? 'linear-gradient(90deg, rgba(232,232,232,1) 0%, rgba(247,248,252,1) 100%)' : 'rgb(247, 248, 252)'
		// background: 'linear-gradient(90deg, rgba(232,232,232,1) 0%, rgba(247,248,252,1) 100%)'
	},
	open: {
		opacity: 1,
		// background: 'rgb(218, 218, 218, 1)'
		background: (props: any) => props.width >= 1024 ? 'linear-gradient(90deg, rgba(218,218,218,1) 0%, rgba(218,218,218,1) 100%)' : 'rgb(218, 218, 218, 1)'
		// background: 'linear-gradient(90deg, rgba(218,218,218,1) 0%, rgba(218,218,218,1) 100%)'
	}
})
const LicSvg = styled(LicSvgPosed)`
	display: flex;
	opacity: 1;
	//width: 100%;
	svg{
		height: 100%;
		max-height: 81px;
		//flex:1;
		width: 100%;
	}
`

const LicHeaderContent = styled.div`
	position: absolute;
	top: 8px;
	left: 0;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
	padding: 0 15px;
	
	@media ${device.tablet} {
		padding: 0 30px;
		top: 6px;
	}	
	@media ${device.laptop} {
		top: 3px;
	}	
	@media ${device.laptopL} {
		top: 6px;
	}
`

const ContentPosed = posed.div({
	closed: {
		delay: 200,
		height: '5px',
		opacity: 1,
		backgroundColor: '#d2dce5',
		transition: {
			default: {
				ease: 'backInOut'
			}
		}
	},
	open: {
		backgroundColor: (props: any) => cardStyles[props.type].main,
		height: 'auto',
		opacity: 1,
		transition: {
			// delay: 200,
			default: {
				ease: 'backInOut'
			}
		}
	}
})
const LicFooterList = styled(ContentPosed)`
	overflow: hidden;
	position: relative;
	ul{
			margin: 0;
			padding: 0;
			flex: 2;
			
			li{
				list-style: none;
				position: relative;
				padding-left: 20px;
				margin-bottom: 5px;
				color: #fff;
				&:last-child{
				margin-bottom: 0;
				}
				
				span{
					position: absolute;
					left: 0;
					top: 0;
					width: 12px;
				}
				svg{
					fill: #fff;
				}
			}
		}
`

const LicBulletContainer = styled.div`
	padding: 5px 15px 20px;
	display: flex;
	flex-direction: row;
	
	@media ${device.tablet} {
		padding: 5px 30px 20px;
	}
		
`
const LicViewBtn = styled(ButtonSmall)`
	text-align: center;
	align-self: flex-end;
	padding: 4px 0;
	border: 2px solid #fff;
	background: transparent;
	font-size: 13px;
	text-transform: uppercase;
	font-weight: 600;
	max-width: 110px;
	margin: 0 auto;
	cursor: pointer;
	flex: 1;
	&:hover{
		background: #fff;
	}
`

const LicDashPosed = posed.div({
	closed: {
		opacity: 1
	},
	open: {
		opacity: 1
	}
})
const LicDash = styled(LicDashPosed)`
	position: absolute;
	overflow: hidden;
	top: 80%;
	left: 50%;
	width: 95%;
	height: 3px;
	max-width: 421px;
	margin: 0 auto;
	transform: translateX(-50%);
	opacity: 0;
	
	svg{
		display: block;
		width: 475px;
		path{
			stroke: #fff;
		}
	}
	
	@media ${device.tablet} {
		max-width: 445px;
		svg{
		width: 100%;
		}
	}
	@media ${device.laptop} {
		max-width: 465px;
		svg{
			width: 600px;
		}
	}
`
const LicHeader = styled.div`
	position: relative;
	cursor: pointer;
`
const LicCard = styled(LicCardPosed)`
	overflow: hidden;
	position: relative;
	z-index: ${props => props.type === 'extended' ? 1 : 2};
	&:hover {
		${LicSvg}{
				svg{
					path{
						fill: ${props => cardStyles[props.type].main} !important;
					}
				}
			}
		${LicTitle}, ${LicPrice}{
			 color: #fff !important;
		 }
		${LicFooterList}{
			background: ${props => cardStyles[props.type].main} !important;
		}
	}
}

`

export default LicenseCard
