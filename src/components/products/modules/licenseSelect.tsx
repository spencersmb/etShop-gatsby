import { ILicenseType } from '@et/types/Products'
import { IShowModalAction } from '@redux/actions/modalActions'
import { ButtonSmall } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { calcBulkPriceDiscount, displayCurrency } from '@utils/priceUtils'
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
				return '245'
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
export default LicenseSelect

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
		height: 0,
		transition: {
			default: { duration: 300 }
		}
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
