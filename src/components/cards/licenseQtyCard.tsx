import { CartPricingConfig } from '@components/cart/cartStatics'
import NumberDial from '@components/forms/inputs/numberDial'
import { colors } from '@styles/global/colors'
import { SentinelFamily, SentinelMedItl } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
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
			<Icon>{renderSvg(svgs.Computer)}</Icon>
			<QtyInput>
				<NumberDialStyled
					label='LICENSE FOR'
					qty={numberOfLicenses}
					disableInput={inCart}
					inputOnChange={onDialChange}/>
				<span>Computers</span>
			</QtyInput>
			<Discount>
				{bulkDiscount && <div>
          Save {displayPercent(CartPricingConfig.bulkDiscount)} %
          <span>Volume Discount</span>
        </div>
				}
			</Discount>
		</LicenseQtyWrapper>
	)
}

const NumberDialStyled = styled(NumberDial)`
	margin-left: 10px;
	input{
		${SentinelMedItl};
		font-style: italic;
		font-weight: 600;
		font-size: 26px;
		line-height: 24px;
		text-align: right;
		color: ${colors.teal.i500};
		outline: none;
		border: none;
		border-bottom: 2px solid ${colors.secondary.text};
		width: 100%;
		max-width: 45px;
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
`
const LicenseQtyWrapper = styled.div`
	background: #fff;
	box-shadow: ${shadowStyles.shadow3alt};
	border-radius: 15px;
	width: 100%;
	position: relative;
	padding: 15px;
	display: flex;
	flex-direction: row;
	align-items: center;
	
	label{
		position: absolute;
		top: -23px;
		left: 30px;
		letter-spacing: 2px;
		color: ${colors.secondary.text};
		font-size: 14px;
		font-style: italic;
	}
`
const Icon = styled.div`
	width: 30px;
	height: 30px;
	svg{
		width: 100%;
	}
`
const QtyInput = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	span{
		margin-left: 5px;
		text-transform: uppercase;
		font-weight: 500;
		font-size: 16px;
		color: ${colors.grey.i600};
	}
`
const Discount = styled.div`
	position: relative;
	color: ${colors.red.warning};
	${SentinelFamily};
	font-weight: 500;
	font-size: 14px;
	line-height: 14px;
	margin: 0 0 0 30px;
	
	span{
		position: absolute;
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
		top: 50%;
		left: 63px;
		transform: translateY(-50%);
	}
`

export default LicenseQtyCard