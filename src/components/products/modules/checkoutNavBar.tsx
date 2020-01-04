import LicenseSelectDropdown from '@components/forms/inputs/licenseSelectDropdown'
import NumberDial from '@components/forms/inputs/numberDial'
import AddToCartBtn from '@components/products/addToCartBtn'
import { ISelectProduct } from '@components/products/productLayout'
import { LicenseEnum } from '@et/types/Cart'
import { ILicenseType, IProduct, IProductFeaturedImage } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { InputWrapper, resetInput } from '@styles/global/inputs'
import { svgs } from '@svg'
import { getLicenseColor, renderSvg } from '@utils/styleUtils'
import { getWindowPosition } from '@utils/windowUtils'
import Img from 'gatsby-image'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface IProps {
	inView: boolean
	title: string
	slug: string
	total: string
	selectedLicense: LicenseEnum,
	selectedProduct: IProduct
	numberOfLicenses: number | string,
	inCart: boolean,
	handleAddToCartState: () => void
	handleLicenseChange: ISelectProduct
	handleDialChange: (total: number | string) => void
	price: string
	payWhatYouWant: boolean
	bulkDiscount: boolean
	onPwywChange: (total: number | string) => void
	featuredImage: IProductFeaturedImage,
	licenses: ILicenseType[]
}

const CheckoutNavBar = (props: IProps) => {
	const { inView, price, title, total, selectedLicense, numberOfLicenses, inCart, slug, handleDialChange, handleLicenseChange, handleAddToCartState, onPwywChange, selectedProduct, payWhatYouWant, featuredImage, bulkDiscount, licenses } = props
	const mounted = useRef(false)

	// const windowPosRef = useRef(inView)
	// const [windowPos, setWindowPos] = useState(0)
	useEffect(() => {
		mounted.current = true
	})
	// useEffect(() => {
	// 	// windowPosRef.current = inView
	// 	// setWindowPos(window.pageYOffset)
	// 	// console.log('getWindowPosition()', getWindowPosition())
	// 	// console.log('window.scrollY', windowPosRef.current)
	// 	// console.log('show nav', windowPosRef.current > 300 && !inView)
	//
	// }, [inView])

	function showInput () {
		if (payWhatYouWant) {
			return (
				<InputWrapper disableInput={inCart}>
					<div className={`label`}>Pay What You Want</div>
					<NumberDial
						disableInput={inCart}
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
						disableInput={inCart}
						className={`numberDial__outline`}
						label='LICENSE FOR'
						qty={numberOfLicenses}
						inputOnChange={handleDialChange}/>
				</InputWrapper>
			)
		}

	}

	return (
		<CheckoutNavContainer
			// pose={windowPos > 300 && !inView ? 'show' : 'hide'}
			showNav={getWindowPosition() > 300 && !inView && mounted.current}>
			<Container>
				<Section0>
					<Img
						alt={featuredImage.alt}
						fluid={featuredImage.localFile.childImageSharp.fluid}
					/>
				</Section0>
				<Section1>
					<Title data-testid={`title`}>
						{title}
					</Title>
					<SelectBtn selectedLic={selectedLicense}>
						<LicenseSelectDropdown
							licenses={licenses}
							change={handleLicenseChange}
							selected={selectedLicense}/>
						<span>
							{renderSvg(svgs.ChevronLeft)}
						</span>
					</SelectBtn>

				</Section1>

				<Section2>
					{showInput()}
				</Section2>

				{/*<div>*/}
				{/*	NavBar visible: {(getWindowPosition() > 300 && !inView).toString()}*/}
				{/*</div>*/}
				<Section3>
					<AddToCartBtn
						selectedLicense={selectedLicense}
						handleAddToCartState={handleAddToCartState}
						isInCart={inCart}
						slug={slug}
						selectedProduct={selectedProduct}
						licenseQty={numberOfLicenses}
						price={price}
						bulkDiscount={bulkDiscount}
						total={total}
					/>
				</Section3>
			</Container>
		</CheckoutNavContainer>
	)
}
const SelectBtn = styled.div<{ selectedLic: LicenseEnum }>`
	position: relative;
	select{
		${resetInput};
		${Sentinel.semiboldItalic};
		font-size: 16px;
		color: ${props => getLicenseColor(props.selectedLic)};
		padding-right: 25px;
		position: relative;
		z-index: 1;
		
		&:focus{
			outline: none;
		}
	}
	span{
		width: 15px;
		margin-left: 10px;
		position: absolute;
		right: 0;
		top: 59%;
		transform: translateY(-50%);
		z-index: 0;
		svg{
			width:100%;
			transform: rotate(-90deg);
		}
		path{
			fill: ${props => getLicenseColor(props.selectedLic)};
		}
	}
`
const Title = styled.div`
	${Sentinel.black};
	font-weight: 900;
	font-style: normal;
	color: ${colors.grey.i800};
	font-size: 21px;
	margin-bottom: 0;
	line-height: 28px;
`
const Section0 = styled.div`
	background: rebeccapurple;
	display: flex;
	flex: 0;
	flex-direction: column;
	align-items: flex-start;
	height: 100%;
	
	.gatsby-image-wrapper{
		width: 100%;
	}
	
	@media ${device.laptopL} {
		width: 100%;
		max-width: 200px;
		flex: 1;
	}
		
`
const Section1 = styled.div`
	padding: 0 30px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	border-right: 1px solid #DADADA;
	height: 100%;
	justify-content: center;
	background: #fff;
	
	@media ${device.tablet} {
		flex: 1;
	}
		

	@media ${device.laptop} {
		padding: 0 30px;
	}
`
const Section2 = styled.div`
	background: #fff;
	flex: 1;
	align-items: flex-start;
	display: flex;
	justify-content: center;
	
	& > div{
		flex-direction: column;
	}
	
	.label{
		margin-bottom: 5px;
	}
	
	@media ${device.laptop} {
		padding: 0 30px;
		flex: 0;
		min-width: 220px;
	}
		
`
const Section3 = styled.div`
	padding: 20px;
	min-width: 260px;
	background: ${colors.teal.i500};
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`
const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 100%;
	background: #fff;
	max-width: 1200px;
	margin: 0 auto;

	.checkoutWrapper{
		max-width: none;
	}
	
	button{
		background: #fff;
		color: ${colors.primary.headline};
	}
	
	.addToCart__total{
		color: #fff;
	}
`

const CheckoutNavContainer = styled.div<{ showNav: boolean }>`
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 90px;
	z-index: 3;
	transition: .3s transform;
	background: #fff;
	box-shadow: 0px -10px 60px rgba(0,0,0,0.13);
	transform:  ${props => props.showNav ? 'translateY(0)' : 'translateY(100px)'};
	display: none;
	//display: block;
	@media ${device.tablet} {
		display: block;
	}
		
`
export default CheckoutNavBar
