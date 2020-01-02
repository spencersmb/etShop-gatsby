import ViewLicenseModal from '@components/modals/viewLicense/viewLicense'
import { ILicenseType } from '@et/types/Products'
import { IShowModalAction } from '@redux/actions/modalActions'
import { ButtonSmall } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { calcBulkPriceDiscount, displayCurrency } from '@utils/priceUtils'
import React, { useEffect } from 'react'
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
			modal: ViewLicenseModal,
			options: {
				closeModal: true,
				hasBackground: true,
				data: {
					licenses,
					selectedLicense
				}
			}
		})
	}

	// set min-heights for the container based on how many license choices there are
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
			<LicBtnWrapper>
				<LicViewBtn
					data-testid='viewLicBtn'
					onClick={triggerViewLicense}
					outline={false}>
					View licenses
				</LicViewBtn>
			</LicBtnWrapper>
			<ul>
				{licenses && licenses.map((license: any, i: number) => {
						return (
							<LicItem
								key={license.type.name}
								selected={selectedLicense === license.type.value}>
						<span className={'licItem__radio'}>
							<Price
								style={{ width: '100%' }}
								color={colors.primary.pink}
								selected={selectedLicense === license.type.value}
								className={'etRadioWrapper'}>
								<input
									type='radio'
									id={`${license.type.value}-radio`}
									name='radio-group'
									onChange={handleClick(i)}
									checked={selectedLicense === license.type.value}
								/>
								<label htmlFor={`${license.type.value}-radio`}>
									<span>{license.type.name}</span>
									{license.item.onSale && <Sale>Sale</Sale>}
								</label>
							</Price>
						<Price
							color={colors.primary.pink}
							selected={selectedLicense === license.type.value}
							className={'price'}>{displayCurrency(calcBulkPriceDiscount(bulkDiscount, license.item.price, licenceQty))}</Price>
						</span>

							</LicItem>
						)
					}
				)}
			</ul>
		</LicContainer>
	)
}
export default LicenseSelect
const Sale = styled.span`
	background: ${colors.purple.i500};
	color: #fff;
	font-size: 13px;
	line-height: 13px;
	text-transform: uppercase;
	border-radius: 25px;
	padding: 5px 8px;
	margin: 0 0 0 10px;
`
const Price = styled.p<{ selected: boolean, color: string }>`
	transition: color .2s;
	color: ${props => props.selected ? props.color : 'inherit'};
	label{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: ${props => props.selected ? props.color : 'inherit'} !important;
	}
`
const LicContainer = styled.div<{ height: string }>`
	position: relative;
	border-top: 1px solid ${colors.grey.i600};
	border-bottom: 1px solid ${colors.grey.i600};
	padding: 15px 0 25px;
	margin-bottom: 25px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	//min-height: ${props => props.height}px;
	align-items: flex-end;
	
	ul{
		flex: 1 0 100%;
		margin: 30px 0 0;
		padding: 0;
	}
`
const LicLabel = styled.div`
	font-size: 13px;
	font-weight: bold;
	color: ${colors.primary.headline};
	flex: 1;
`
const LicButtonPose = posed.li({
	closed: {
		height: 0,
		transition: {
			default: { duration: 200 }
		}
	},
	open: {
		transition: {
			default: { duration: 200 }
		},
		height: 'auto'
	}
})
const LicBtnWrapper = styled.div`
	overflow: hidden;
	display: flex;
	justify-content: flex-end;
	//padding-left: 31px;
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
	margin: 0;
	cursor: pointer;
	color: ${highLights.color};
	&:hover{
		background: ${highLights.color};
	}
`
