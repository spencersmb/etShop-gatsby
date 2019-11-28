import NumberDial from '@components/forms/inputs/numberDial'
import UserPerDeviceModal from '@components/modals/userPerDevice'
import { IShowModalAction } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { InputOutline, InputWrapper } from '@styles/global/inputs'
import { svgs } from '@svg'
import { chooseDiscountPercentage, displayPercent } from '@utils/priceUtils'
import { renderSvg } from '@utils/styleUtils'
import React, { useEffect } from 'react'
import styled from 'styled-components'

interface IProps {
	bulkDiscount: boolean
	inCart: boolean
	numberOfLicenses: number | string
	onDialChange: (total: string | number) => void
	showModal: IShowModalAction
}

function LicenseQtyCard (props: IProps) {
	const { bulkDiscount, numberOfLicenses, inCart, onDialChange, showModal } = props
	const disabled = (numberOfLicenses === 0) || (typeof numberOfLicenses === 'string')

	function triggerViewLicense (e: any) {
		e.preventDefault()
		showModal({
			modal: UserPerDeviceModal,
			options: {
				closeModal: true,
				hasBackground: true,
				data: {
					test: 'spencer'
				}
			}
		})
	}

	return (
		<LicenseQtyWrapper>
			<Container>
				{bulkDiscount && <Discount data-testid='discount'>
          Save {displayPercent(chooseDiscountPercentage(numberOfLicenses))} %
          <span>Volume Discount</span>
        </Discount>
				}
				<InputWrapper disableInput={inCart}>
					<div className={`label`}>Number of Licences</div>
					<NumberDial
						className={`numberDial__outline`}
						label='LICENSE FOR'
						qty={numberOfLicenses}
						disableInput={inCart}
						inputOnChange={onDialChange}/>
					<Icon onClick={triggerViewLicense}>{renderSvg(svgs.Info)}</Icon>
				</InputWrapper>
			</Container>
			{disabled && <Warning data-testid='warning'>Must have at least one computer license.</Warning>}
		</LicenseQtyWrapper>
	)
}

const Warning = styled.div`
	color: ${colors.red.i500};
	margin-top: 5px;
	font-style: italic;
	text-align: right;
`
const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	@media ${device.laptop} {
		flex-direction: row;
		max-width: none;
	}
`
const RightSide = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`
const NumberDialStyled = styled(NumberDial)`
	width: 72px;
	margin: 0 10px;

	label{
		display: none;
	}
`
const LicenseQtyWrapper = styled.div`
	width: 100%;
	position: relative;
	padding:  0 0 15px;
	display: flex;
	flex-direction: column;
	max-width: 484px;
	margin: 0 auto;   
	justify-content: flex-end;
	@media ${device.laptop} {
		padding: 15px 0;
		max-width: none;
	}
		
`
const Icon = styled.div`
	width: 25px;
	height: 25px;
	display: flex;
	cursor: pointer;
	&:hover{
		svg{
			path{
				fill: ${colors.primary.pink};
				&:first-child{
					stroke:${colors.primary.pink};
				}
			}
		}
	}
	svg{
		width: 100%;
		path{
			transition: .3s;
			fill: ${colors.primary.text};
			&:nth-last-child(3){
				fill:white;
			}
			&:first-child{
				stroke:${colors.primary.text};
			}
		}
	}
`
const Label = styled.div`
	color: ${colors.primary.text};
`
const Discount = styled.div`
	text-align: center;
	justify-content: center;
	margin: 0 0 10px;
	color: ${colors.red.warning};
	${Sentinel.black};
	font-weight: 800;
	font-size: 20px;
	line-height: 14px;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	span{
		color: ${colors.primary.text};
		margin: 10px 0 0;
    font-size: 14px;
		text-align: center;
		display: flex;
		line-height: 14px;
		align-items: center;
		border-radius: 50%;
	}
	
	@media ${device.laptop} {
		font-size: 14px;
		margin: 0 0 0 15px;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		flex-direction: row;
		
		span{
			margin: 0 0 0 5px;
			width: 72px;
			height: 72px;
			justify-content: center;
			background: ${colors.red.warning};
			color: #fff;
		}
	}
		
`

export default LicenseQtyCard


