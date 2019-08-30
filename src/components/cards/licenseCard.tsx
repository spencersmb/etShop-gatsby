import { IProductBullet } from '@et/types/Products'
import { colors } from '@styles/global/colors'
import { Sentinel, SentinelFamily, SentinelMedItl } from '@styles/global/fonts'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React, { SyntheticEvent } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

interface IProps {
	isSelected: boolean
	price: string
	type: string
	title: string
	bullets: IProductBullet[]
	handleViewLicense: (e: any) => void
	handleLicenseClick: (e: SyntheticEvent) => void
}

function LicenseCard (props: IProps) {
	const { type, isSelected, bullets, handleLicenseClick, handleViewLicense, price, title } = props
	return (
		<LicCard pose={isSelected ? 'open' : 'closed'}>
			<LicHeader
				data-testid='header'
				pose={isSelected ? 'open' : 'closed'}
				onClick={handleLicenseClick}
				data-lic={type}>
				<LicSvg>
					{renderSvg(svgs.CardTop)}
				</LicSvg>
				<LicHeaderContent>
					<LicTitle
						className={Sentinel.italic}
						data-testid='title'
						pose={isSelected ? 'open' : 'closed'}>
						<span>type</span>
						{title}
					</LicTitle>
					<LicPrice
						data-testid='price'
						pose={isSelected ? 'open' : 'closed'}>
						<span>$</span>
						{price}
					</LicPrice>
				</LicHeaderContent>
				<LicDash pose={isSelected ? 'open' : 'closed'}>
					{renderSvg(svgs.DottedLine)}
				</LicDash>
			</LicHeader>
			<LicFooterContent
				pose={isSelected ? 'open' : 'closed'}>
				<ul data-testid='bullets'>
					{bullets.map((bullet: { bullet_point: string }) => (
						<li key={bullet.bullet_point}>
							<span>{renderSvg(svgs.Checkmark)}</span>
							{bullet.bullet_point}
						</li>
					))}
				</ul>
				<LicViewBtn
					data-testid='viewLicBtn'
					onClick={handleViewLicense}>
					View license
				</LicViewBtn>
			</LicFooterContent>
		</LicCard>
	)
}

const shadowHidden = '0px 30px 40px rgba(143,143,143,0), 0px 10px 20px rgba(161,161,161,0)'
const shadow3 = '0px 30px 40px rgba(143, 143, 143, 0.26), 0px 10px 20px rgba(161, 161, 161, 0.37)'
const LicCardPosed = posed.div({
	closed: {
		borderColor: 'rgb(161, 130, 233, 0)',
		boxShadow: shadowHidden
	},
	open: {
		borderColor: 'rgb(161, 130, 233, 1)',
		boxShadow: shadow3
	}
})
const LicCard = styled(LicCardPosed)`
	//margin-bottom: 15px;
	border-radius: 0 0 15px 15px;
	border-top: 4px solid;
	overflow: hidden;
`
const LicCardTitleColor = posed.div({
	closed: {
		color: colors.grey.i600
	},
	open: {
		color: colors.purple.i500
	}
})
const LicTitle = styled(LicCardTitleColor)`
	font-weight: 500;
	font-size: 28px;
	font-style: italic;
	color: ${colors.secondary.text};
	position: relative;
	line-height: 28px;
	transition: .3s;
	span{
		position: absolute;
		top: -25px;	
		left: 0;
		color: ${colors.secondary.text};
		font-family: Fira, sans-serif;
		font-size: 12px;
		letter-spacing: 3px;
		text-transform: uppercase;
	}
`
const LicPrice = styled(LicCardTitleColor)`
	${SentinelFamily};
	font-weight: 600;
	font-size: 44px;
	color: ${colors.secondary.text};
	line-height: 44px;
	position: relative;
	transition: .3s;
	
	span{
		position: absolute;
		top: 4px;
		left: -13px;
		font-size: 24px;
		line-height: 24px;
	}
`
const LicHeaderPosed = posed.div({
	closed: {
		height: 73
	},
	open: {
		height: 'auto'
	}
})
const LicHeader = styled(LicHeaderPosed)`
	position: relative;
	cursor: pointer;
	
	&:hover {
		${LicTitle}, ${LicPrice} {
			 color: ${colors.purple.i500} !important;
		 }
  }
`
const LicSvgPosed = posed.div({
	closed: {
		opacity: 0,
		background: 'rgb(218, 218, 218, 0)'
	},
	open: {
		opacity: 1,
		background: 'rgb(218, 218, 218, 1)'
	}
})
const LicSvg = styled(LicSvgPosed)`
	display: flex;
	opacity: 0;
	svg{
		height: 100%;
		max-height: 81px;
		flex:1;
	}
`
const LicHeaderContent = styled.div`
	position: absolute;
	top: 15px;
	left: 0;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
	padding: 0 30px;
`
const ContentPosed = posed.div({
	closed: {
		height: 0,
		opacity: 0
	},
	open: {
		height: 'auto',
		opacity: 1,
		transition: {
			delay: 200,
			ease: 'backInOut'
		}
	}
})
const LicFooterContent = styled(ContentPosed)`
	overflow: hidden;
	background: #fff;
	padding-left: 30px;
	ul{
			min-height: 30px;
			margin: 0 0 15px;
			padding: 10px 0 0;
			li{
				list-style: none;
				position: relative;
				padding-left: 20px;
				margin-bottom: 10px;
				color: ${colors.grey.i800};
				span{
					position: absolute;
					left: 0;
					top: 0;
					width: 12px;
				}
				svg{
					fill: ${colors.grey.i800};
				}
			}
		}
`
const LicViewBtn = styled.div`
	position: relative;
	display: inline-block;
	font-size: 14px;
	text-transform: uppercase;
	color: ${colors.teal.i500};
	font-weight: 600;
	padding-bottom: 20px;
	cursor: pointer;
`
const LicDashPosed = posed.div({
	closed: {
		opacity: 0
	},
	open: {
		opacity: .8
	}
})
const LicDash = styled(LicDashPosed)`
	position: absolute;
	bottom: 12px;
	left: 50%;
	width: 100%;
	height: 3px;
	max-width: 465px;
	margin: 0 auto;
	transform: translateX(-50%);
	opacity: 0;
	
	svg{
		display: block;
		width: 100%;
	}
`
export default LicenseCard
