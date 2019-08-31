import { CartPricingConfig } from '@components/cart/cartStatics'
import NumberDial from '@components/forms/inputs/numberDial'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { svgs } from '@svg'
import { displayPercent } from '@utils/priceUtils'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	bulkDiscount: boolean
	inCart: boolean
	numberOfLicenses: number | string
	onDialChange: (total: string | number) => void
}

function LicenseQtyCard (props: IProps) {
	const { bulkDiscount, numberOfLicenses, inCart, onDialChange } = props
	return (
		<LicenseQtyWrapper>
			<Discount>
				{bulkDiscount && <>
          Save {displayPercent(CartPricingConfig.bulkDiscount)} %
          <span>Volume Discount</span>
        </>
				}
			</Discount>
			<RightSide>
				<Label>Number of Licences</Label>
				<NumberDialStyled
					label='LICENSE FOR'
					qty={numberOfLicenses}
					disableInput={inCart}
					inputOnChange={onDialChange}/>
				<Icon>{renderSvg(svgs.Info)}</Icon>
			</RightSide>
		</LicenseQtyWrapper>
	)
}

const RightSide = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`
const NumberDialStyled = styled(NumberDial)`
	width: 72px;
	margin: 0 10px;

	input{
		${Sentinel.reg};
		font-style: italic;
		background: transparent;
		font-weight: 600;
		font-size: 24px;
		line-height: 24px;
		text-align: center;
		color: ${colors.primary.text};
		border: 3px solid #D2DCE5;
		border-radius: 10px;
		padding: 5px 5px 5px 0;
		width: 100%;
		&:focus{
			outline: none;
		}
		-moz-appearance: textfield;
		&::-webkit-outer-spin-button, 
		::-webkit-inner-spin-button{
			-webkit-appearance: none;
			margin: 0;
		};
		
	}
	label{
		display: none;
	}
`
const LicenseQtyWrapper = styled.div`
	width: 100%;
	position: relative;
	padding: 15px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`
const Icon = styled.div`
	width: 25px;
	height: 25px;
	display: flex;
	svg{
		width: 100%;
	}
`
const Label = styled.div`
	color: ${colors.primary.text};
`
const Discount = styled.div`
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	${Sentinel.black};
	color: ${colors.red.warning};
	font-weight: 800;
	font-size: 14px;
	line-height: 14px;
	margin: 0 0 0 15px;
	display: flex;
	flex-direction: row;
	align-items: center;
	
	span{
		background: ${colors.red.warning};
		width: 72px;
		height: 72px;
		text-align: center;
		color: #fff;
		display: flex;
		line-height: 14px;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		margin: 0 0 0 5px;
	}
`

export default LicenseQtyCard
