import { LicenseEnum } from '@et/types/Cart'
import { ILicenseType } from '@et/types/Products'
import { IShowModalAction } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { ButtonSmall } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { svgs } from '@svg'
import { calcBulkPriceDiscount, displayCurrency } from '@utils/priceUtils'
import { renderSvg } from '@utils/styleUtils'
import { Width } from '@utils/windowUtils'
import React from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

interface IProps {
	showModal: IShowModalAction,
	licenses: ILicenseType[],
	bulkDiscount: boolean,
	licenceQty: number,
	onChange: ({ license, slug }: { license: string, slug: string }) => void
	selectedLicense: string
}

const cardStyles = {
	standard: {
		main: colors.purple.i500
	},
	extended: {
		main: `#FF6363`
	}
}
const highLights = {
	color: colors.primary.headline,
	lightBg: '#FFE3EB'
}
const LicenseSelect = (props: IProps) => {
	const { licenses, onChange, bulkDiscount, licenceQty, selectedLicense, showModal } = props
	const handleClick = (index: number) => (e: any) => {
		onChange({
			license: licenses[index].type.value,
			slug: licenses[index].item.slug
		})
	}
	const triggerViewLicense = (e: any) => {
		e.preventDefault()
		showModal({
			modal: () => (<div>License</div>),
			options: {
				closeModal: true,
				hasBackground: true,
				data: {
					test: 'spencer'
				}
			}
		})
	}
	const licensesHeight = () => {
		switch (licenses.length) {
			case 3:
				return '270'
			case 2:
				return '205'
			default:
				return 'none'
		}
	}

	return (
		<LicContainer height={licensesHeight()}>
			<LicLabel>
				CHOOSE LICENSE TYPE
			</LicLabel>
			<ul>
				{licenses && licenses.map((license: any, i: number) => {
						return (
							<LicItem
								key={license.type.name}
								onClick={handleClick(i)}
								selected={selectedLicense === license.type.value}>
						<span className={'licItem__radio'}>
							<p className={'etRadioWrapper'}>
								<input
									type='radio'
									id={`${license.type.value}-radio`}
									name='radio-group'
									onChange={() => {}}
									checked={selectedLicense === license.type.value}
								/>
								<label htmlFor={`${license.type.value}-radio`}>{license.type.name}</label>
							</p>
						<p
							className={'price'}>{displayCurrency(calcBulkPriceDiscount(bulkDiscount, license.item.price, licenceQty))}</p>
						</span>
								<LicBtnWrapper pose={selectedLicense === license.type.value ? 'open' : 'closed'}>
									<LicViewBtn
										data-testid='viewLicBtn'
										onClick={triggerViewLicense}
										outline={false}>
										View license
									</LicViewBtn>
								</LicBtnWrapper>
							</LicItem>
						)
					}
				)}
			</ul>
		</LicContainer>
	)
}
const LicContainer = styled.div<{ height: string }>`
	position: relative;
	border-top: 1px solid ${colors.grey.i600};
	border-bottom: 1px solid ${colors.grey.i600};
	padding: 25px 0;
	margin-bottom: 25px;
	min-height: ${props => props.height}px;
	ul{
		margin: 0;
		padding: 0;
	}
`
const LicLabel = styled.div`
	font-size: 13px;
	font-weight: bold;
	color: ${colors.primary.headline};
	margin-bottom: 20px;
`
const LicButtonPose = posed.li({
	closed: {
		height: 0
	},
	open: {
		transition: {
			default: { duration: 300 }
		},
		height: 'auto'
	}
})
const LicBtnWrapper = styled(LicButtonPose)`
	overflow: hidden;
	display: flex;
	justify-content: flex-start;
	padding-left: 31px;
`
const LicItem = styled.div<{ selected: boolean }>`
	list-style: none;
	color: ${props => props.selected ? highLights.color : colors.primary.headline};
	margin-bottom: 15px;
	&:last-child{
		margin-bottom: 0;
	}
	p{
		margin: 0;
	}
	
	.licItem__radio{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		label{
			font-size: 20px;
			line-height: 20px;
			font-weight: 400;
			margin: 0;
			color: ${props => props.selected ? highLights.color : colors.primary.headline};
		}
	}
	
	.price{
		${Sentinel.semiboldItalic};
		font-size: 21px;
		line-height: 21px;
	}
`
export default LicenseSelect

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
const LicTitle = styled.div`
	${Sentinel.italic};
	font-weight: 500;
	font-size: 24px;
	line-height: 24px;
	font-style: italic;
	color: ${colors.secondary.text};
	position: relative;
	
	@media ${device.laptopL} {
		font-size: 28px;
		line-height: 28px;
	}
`
const LicPrice = styled.div`
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
		font-size: 36px;
		line-height: 36px;
		span{
			top: 4px;
			left: -13px;
		}
	}
	
	@media ${device.laptopL} {
		font-size: 44px;
		line-height: 44px;
		span{
			top: 0;
			left: -11px;
		}
	}
`
const LicSvg = styled.div`
	display: flex;
	opacity: 1;
	position: relative;
	top: 1px;
	background: linear-gradient(90deg, rgba(218,218,218,1) 0%, rgba(218,218,218,1) 100%);
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
	align-items: center;
	padding: 0 15px;
	
	@media ${device.tablet} {
		padding: 0 30px;
		top: 11px;
	}	
	@media ${device.laptop} {
		top: 13px;
	}	

`

const LicFooterList = styled.div`
	overflow: hidden;
	position: relative;
	background: #fff;
	color: #000;
	ul{
			margin: 0;
			padding: 0;
			
			li{
				list-style: none;
				position: relative;
				padding-left: 20px;
				margin-bottom: 5px;
				&:last-child{
				margin-bottom: 0;
				}
				
				span{
				}
				svg{
					fill: #fff;
				}
			}
		}
`

const LicDescContainer = styled.div`
	padding: 5px 15px 20px;
	display: flex;
	flex-direction: column;
	transition: all .3s;
	
	@media ${device.tablet} {
		padding: 5px 30px 20px;
	}
		
`
const LicViewBtn = styled(ButtonSmall)`
	text-align: center;
	align-self: flex-start;
	padding: 4px 13px;
	border: 2px solid ${highLights.color};
	background: transparent;
	font-size: 12px;
	text-transform: uppercase;
	font-weight: 600;
	margin: 10px 0 10px;
	cursor: pointer;
	color: ${highLights.color};
	&:hover{
		background: ${highLights.color};
	}
`
const LicDash = styled.div`
	position: absolute;
	overflow: hidden;
	top: 80%;
	left: 50%;
	width: 95%;
	height: 3px;
	max-width: 421px;
	margin: 0 auto;
	transform: translateX(-50%);
	opacity: 1;
	
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
	path{
		fill: #fff;
	}
`
const LicCard = styled(LicCardPosed)`
	overflow: hidden;
	position: relative;
	z-index: 1;
	box-shadow: ${shadow3};
	border-radius: 5px;
	@media ${device.laptop} {
	}
		
}

`
// 	<div>
// 	<LicCard>
// 	<LicHeader
// data-testid='header'
// onClick={()=>{}}
// data-lic={'extended'}
// 	>
// 	<LicSvg>
// 	<svg viewBox='0 0 525 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
// 	{process.env.NODE_ENV !== 'test' && <path
//       fillRule='evenodd'
//       clipRule='evenodd'
//       d='M525 0H0V65.0164C0.119141 65.0086 0.239136 65.0035 0.359741 65.0013C0.406372 65.0004 0.453125 65 0.5 65C4.64209 65 8 68.3578 8 72.5C8 76.6422 4.64209 80 0.5 80C0.332031 80 0.165283 79.9945 0 79.9836V88H525V79.9836C524.835 79.9945 524.668 80 524.5 80C520.358 80 517 76.6422 517 72.5C517 68.3578 520.358 65 524.5 65C524.668 65 524.835 65.0055 525 65.0164V0Z'
//     />}
// </svg>
// </LicSvg>
// <LicHeaderContent>
// <LicTitle data-testid='title'>
// title
// </LicTitle>
// </LicHeaderContent>
// <LicDash>
// {renderSvg(svgs.DottedLine)}
// 					</LicDash>
// </LicHeader>
// <LicFooterList>
// <LicDescContainer>
// <ul>
// {licenses && licenses.map((license: any, i: number) => (
// 								<li key={license.type.name} onClick={handleClick(i)}>
// <span>{license.type.name}</span>
// <span>{displayCurrency(calcBulkPriceDiscount(bulkDiscount, license.item.price, licenceQty)).substring(1)}</span>
// </li>
// ))}
// 						</ul>
// <LicViewBtn
// // data-testid='viewLicBtn'
// // onClick={()=>{}}
// // outline={false}
// // >
// // View license
// // </LicViewBtn>
// </LicDescContainer>
//
//
// </LicFooterList>
// </LicCard>
//
// </div>
