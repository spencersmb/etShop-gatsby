import LicenseSelectDropdown from '@components/forms/inputs/licenseSelectDropdown'
import NumberDial from '@components/forms/inputs/numberDial'
import AddToCartBtn from '@components/products/addToCartBtn'
import { IProduct } from '@et/types/Products'
import { colors } from '@styles/global/colors'
import { InputWrapper } from '@styles/global/inputs'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import { getWindowPosition } from '@utils/windowUtils'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	inView: boolean
	title: string
	slug: string
	total: string
	selectedLicense: string,
	selectedProduct: IProduct
	numberOfLicenses: number | string,
	inCart: boolean,
	handleAddToCartState: () => void
	handleLicenseChange: (license: string) => void
	handleDialChange: (total: number | string) => void
	price: string
	payWhatYouWant: boolean
	onPwywChange: (total: number | string) => void
}

const CheckoutNavBar = (props: IProps) => {
	const { inView, price, title, total, selectedLicense, numberOfLicenses, inCart, slug, handleDialChange, handleLicenseChange, handleAddToCartState, onPwywChange, selectedProduct, payWhatYouWant } = props

	function showInput () {
		if (payWhatYouWant) {
			return (
				<InputWrapper disableInput={inCart}>
					<div className={`label`}>Pay What You Want</div>
					<NumberDial
						className={`numberDial__outline`}
						label='Pay what you want'
						qty={price}
						inputOnChange={onPwywChange}/>
				</InputWrapper>
			)
		} else {
			return (
				<InputWrapper disableInput={inCart}>
					<div className={`label`}>Number of Licences</div>
					<NumberDial
						className={`numberDial__outline`}
						label='LICENSE FOR'
						qty={numberOfLicenses}
						inputOnChange={handleDialChange}/>
				</InputWrapper>
			)
		}

	}

	return (
		<CheckoutNavContainer>
			<Container>

				<div>
					<div data-testid={`title`}>
						{title}
					</div>
					<div>
						<LicenseSelectWrapper>
							<LicenseSelectDropdown
								hasExtendedLicesnse={selectedProduct.license.hasExtendedLicense}
								change={handleLicenseChange}
								selected={selectedLicense}/>
						</LicenseSelectWrapper>
					</div>

				</div>

				<div>
					{showInput()}
				</div>

				{/*<div>*/}
				{/*	NavBar visible: {(getWindowPosition() > 300 && !inView).toString()}*/}
				{/*</div>*/}
				<AddToCartBtn
					handleAddToCartState={handleAddToCartState}
					isInCart={inCart}
					slug={slug}
					selectedProduct={selectedProduct}
					licenseQty={numberOfLicenses}
					price={price}
					total={total}
				/>
			</Container>
		</CheckoutNavContainer>
	)
}
const LicenseSelectWrapper = styled.div`
	select{
		&:focus{
			outline: none;
		}
	}
`
const Container = styled.div`
	display: flex;
	flex-direction: row;
	
	.checkoutWrapper{
		max-width: none;
	}
	
	button{
		background: red;
	}
`
const CheckoutNavContainer = styled.aside`
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 75px;
	background: #fff;
	z-index: 3;
`
export default CheckoutNavBar
