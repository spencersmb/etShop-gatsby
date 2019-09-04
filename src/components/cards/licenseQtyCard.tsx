import { CartPricingConfig } from '@components/cart/cartStatics'
import NumberDial from '@components/forms/inputs/numberDial'
import { AddToCartBtn } from '@components/products/addToCartBtn'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { svgs } from '@svg'
import { chooseDiscountPercentage, displayPercent } from '@utils/priceUtils'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	bulkDiscount: boolean
	inCart: boolean
	numberOfLicenses: number | string
	onDialChange: (total: string | number) => void
}

// TODO: ADD TEST
function LicenseQtyCard (props: IProps) {
	const { bulkDiscount, numberOfLicenses, inCart, onDialChange } = props
	const disabled = (numberOfLicenses === 0) || (typeof numberOfLicenses === 'string')
	return (
		<LicenseQtyWrapper>
			<InputWrapper>
				<Discount>
					{bulkDiscount && <>
            Save {displayPercent(chooseDiscountPercentage(numberOfLicenses))} %
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
			</InputWrapper>
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
const InputWrapper = styled.div`
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
const NumberDialStyled = styled(NumberDial)<{ disableInput: boolean }>`
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
		color: ${props => props.disableInput ? colors.grey.i600 : colors.primary.text};
		border: 3px solid #D2DCE5;
		border-radius: 10px;
		padding: 2.5px 5px 2.5px 0;
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
	svg{
		width: 100%;
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

// it('Should render disabled warning', () => {
// 	const modalRender = render(<AddToCartBtn {...propsDefault}/>)
// 	expect(modalRender.getByTestId('warning').innerHTML).toEqual('Must have at least one computer license selected')
// })
