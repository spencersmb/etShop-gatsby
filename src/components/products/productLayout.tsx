import LicenseQtyCard from '@components/cards/licenseQtyCard'
import { CartPricingConfig } from '@components/cart/cartStatics'
import FontPreviewer from '@components/fontPreviewer/fontPreview'
import NumberDial from '@components/forms/inputs/numberDial'
import FlickityGalleryContext from '@components/gallery/flickityGalleryRE'
import Layout from '@components/layout'
import AddToCartBtn from '@components/products/addToCartBtn'
import CheckoutNavBar from '@components/products/modules/checkoutNavBar'
import FeaturesList from '@components/products/modules/features/FeaturesList'
import LicenseSelect from '@components/products/modules/licenseSelect'
import ProductDescription from '@components/products/modules/productDesc'
import SideBar from '@components/products/modules/productDetailsSidebar'
import RelatedProducts from '@components/products/modules/relatedProducts'
import SocialMediaBars from '@components/socialMedia/socialBars'
import { ICartItem, ICartState, LicenseEnum } from '@et/types/Cart'
import { IGalleryItem, Image, IProduct, IProducts, IYoutubeItem } from '@et/types/Products'
import { IState } from '@et/types/State'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { Sentinel } from '@styles/global/fonts'
import { InputWrapper } from '@styles/global/inputs'
import { svgs } from '@svg'
import { checkCartForProduct, getIndexFromLicenseType } from '@utils/cartUtils'
import { calcBulkPriceDiscount, calcTotalQtyPrice } from '@utils/priceUtils'
import { useSetState } from '@utils/stateUtils'
import { renderSvg } from '@utils/styleUtils'
import { Width, windowHasScrollbar } from '@utils/windowUtils'
import { Link } from 'gatsby'
import _ from 'lodash'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch as ReduxDispatch } from 'redux'
import styled from 'styled-components'

interface IPropsPrivate {
	products: IProducts,
	cart: ICartState
}

interface IPropsActions {
	showModalAction: IShowModalAction
}

interface IPropsPublic {
	product: IProduct
	galleryItems: IGalleryItem[]
}

interface IPublicState {
	selectedProduct: IProduct,
	selectedLicense: LicenseEnum,
	numberOfLicenses: number,
	inCart: boolean,
	bulkDiscount: boolean,
	price: string,
	payWhatYouWant: boolean
}

interface INewState {
	selectedProduct?: IProduct,
	selectedLicense?: string,
	numberOfLicenses?: number | string
	inCart?: boolean,
	bulkDiscount?: boolean,
	price?: string,
	payWhatYouWant?: boolean
}

export type ISelectProduct = ({ license, slug }: { license: string, slug: string }) => void

// TODO: Dont show related if none are present,
// switch off of has ext license data point instead if needed
export const ProductLayout = (props: IPropsPublic & IPropsPrivate & IPropsActions) => {
	const { product, products, cart, showModalAction, galleryItems } = props
	const [state, setState] = useSetState<IPublicState, INewState>({
		selectedProduct: product,
		selectedLicense: 'standard',
		numberOfLicenses: 1,
		inCart: false,
		bulkDiscount: false,
		payWhatYouWant: product.pwyw,
		price: product.price
	})
	const standardItem = useRef(props.product)

	// dispatch effect after cart is loaded
	// check for product in cart on load
	// then dispatch to state the item found
	useLayoutEffect(() => {

		// Check if item is in cart on load
		const productFound: boolean = checkCartForProduct(cart, product.slug).length > 0

		if (productFound && !state.inCart) {
			updatePage()
		}

	}, [cart.loaded])

	// on Cart price change
	// if the item gets removed,
	// reset the pageLayout instance
	useEffect(() => {
		if (previousCart.current.loaded) {
			const productFound: boolean = checkCartForProduct(cart, product.slug).length > 0

			if (!productFound) {
				setState({
					inCart: false,
					numberOfLicenses: 1,
					selectedLicense: 'standard',
					bulkDiscount: false,
					selectedProduct: props.product,
					price: props.product.price
				})
			} else {

				// check if the items are equal
				if (!_.isEqual(previousCart.current.items[product.slug], cart.items[product.slug])) {
					// product is in cart and may have changed
					updatePage()
				}

			}
		}
	}, [cart.totalPrice, cart.totalItems])

	const previousCart = useRef(cart)
	useEffect(() => {
		previousCart.current = cart
	})

	function updatePage () {
		// 1. Get the item in the cart
		const cartItem: ICartItem = cart.items[product.slug]

		// 2. Set the correct item
		// Check what license is selected then get that product
		// const licenseIndex = getIndexFromLicenseType(cartItem.licenseType)
		const selectedProduct = products[cartItem.slug]
		const bulkDiscountCalc: boolean = cartItem.qty >= CartPricingConfig.minQuantity

		// 3. Set state
		setState({
			selectedProduct,
			selectedLicense: cartItem.licenseType, // standard - extended - server
			numberOfLicenses: cartItem.qty,
			inCart: true,
			bulkDiscount: bulkDiscountCalc,
			payWhatYouWant: selectedProduct.pwyw,
			price: cartItem.price
		})
	}

	function onSelectChange ({ license, slug }: { license: string, slug: string }) {
		if (license === 'standard') {
			setState({
				selectedLicense: license,
				selectedProduct: standardItem.current,
				numberOfLicenses: standardItem.current.pwyw ? 1 : state.numberOfLicenses,
				bulkDiscount: standardItem.current.pwyw ? false : state.bulkDiscount,
				payWhatYouWant: standardItem.current.pwyw,
				price: standardItem.current.on_sale
					? standardItem.current.sale_price
					: calcBulkPriceDiscount(state.bulkDiscount, standardItem.current.price, state.numberOfLicenses)
			})
		} else {
			const selectedProduct = products[slug]
			setState({
				selectedLicense: license,
				selectedProduct,
				payWhatYouWant: selectedProduct.pwyw,
				price: selectedProduct.on_sale
					? selectedProduct.sale_price
					: calcBulkPriceDiscount(state.bulkDiscount, selectedProduct.price, state.numberOfLicenses)
			})
		}

	}

	function onDialChange (total: number | string) {

		if (typeof total === 'number' && total >= CartPricingConfig.minQuantity) {
			setState({
				numberOfLicenses: total,
				bulkDiscount: true,
				price: calcBulkPriceDiscount(true, state.price, total)
			})
		} else {
			setState({
				numberOfLicenses: total,
				bulkDiscount: false,
				price: state.selectedProduct.price
			})
		}

	}

	function onPwywChange (total: number | string) {
		if (typeof total === 'number') {
			setState({
				price: total.toString()
			})
		} else {
			setState({
				price: '0'
			})
		}

	}

	function handleBackClick () {
		window.history.back()
	}

	const { name, sub_header, images, youtube_gallery_items } = props.product
	const { bulkDiscount, numberOfLicenses, inCart, payWhatYouWant } = state
	const [ref, inView, entry] = useInView({
		/* Optional options */
		threshold: 0
	})

	return (
		<Layout productPage={true}>
			<ProductWrapper>
				<SliderGrid>
					<Gallery>
						<BackBtn>
							<ButtonWrapper>
								<div onClick={handleBackClick}>
									<span>{renderSvg(svgs.ChevronLeft)}</span>
									<span>Back to products</span>
								</div>
							</ButtonWrapper>
						</BackBtn>
						<FlickityGalleryContext
							items={galleryItems}
							showModal={showModalAction}
							subSelector={true}/>
					</Gallery>
					<ProductTitle>
						<BackBtnMobile>
							<ButtonWrapper>
								<div onClick={handleBackClick}>
									<span>{renderSvg(svgs.ChevronLeft)}</span>
									<span>Back to products</span>
								</div>
							</ButtonWrapper>
						</BackBtnMobile>
						<h1 className={`sentinel-bold`}>{name}</h1>
						{sub_header && <p>{sub_header}</p>}
					</ProductTitle>

					{/*License Selection*/}
					<LicenseSelectWrapper ref={ref}>
						{React.useMemo(() => (
							<LicenseSelect
								showModal={showModalAction}
								selectedLicense={state.selectedLicense}
								onChange={onSelectChange}
								licenses={standardItem.current.product_licenses}
								bulkDiscount={bulkDiscount}
								licenceQty={typeof numberOfLicenses === 'number' ? numberOfLicenses : 0}
							/>
						), [state.bulkDiscount && state.price || state.selectedLicense])}

					</LicenseSelectWrapper>

					{!payWhatYouWant &&
          <LicenseQtyWrapper>
            <LicenseQtyCard
              bulkDiscount={bulkDiscount}
              inCart={inCart}
              numberOfLicenses={numberOfLicenses}
              showModal={showModalAction}
              onDialChange={onDialChange}/>
            <p>** 1 License per device</p>
          </LicenseQtyWrapper>
					}

					{payWhatYouWant &&
          <LicenseQtyWrapper>
            <InputWrapper disableInput={state.inCart}>
              <div className={`label`}>Pay What You Want</div>
              <NumberDial
                className={`numberDial__outline`}
                label='Pay what you want'
                qty={state.price}
                disableInput={inCart}
                inputOnChange={onPwywChange}/>
            </InputWrapper>
          </LicenseQtyWrapper>
					}

					<BuyNowWrapper>
						{React.useMemo(() => (
							<AddToCartBtn
								handleAddToCartState={() => (setState({ inCart: true }))}
								isInCart={state.inCart}
								bulkDiscount={bulkDiscount}
								slug={product.slug}
								selectedProduct={state.selectedProduct}
								licenseQty={state.numberOfLicenses}
								price={state.price}
								selectedLicense={state.selectedLicense}
								total={calcTotalQtyPrice(state.price, numberOfLicenses)}
							/>), [
							state.inCart,
							state.price,
							state.numberOfLicenses
						])}
					</BuyNowWrapper>
				</SliderGrid>

				{standardItem.current.font_preview.enabled &&
        <FontPreviewer styles={standardItem.current.font_preview.styles}/>}

				<DescriptionWrapper id={'desc'}>

					<ProductDescription
						instructions={standardItem.current.install_instructions}
						intro_description={standardItem.current.intro_description}
					/>
					{React.useMemo(() => (<SideBar
						onChange={onSelectChange}
						licenses={standardItem.current.product_licenses}
						isStandardLicense={state.selectedLicense === 'standard'}
						details={standardItem.current.details}
						fontPreview={standardItem.current.font_preview.enabled}
					/>), [state.selectedLicense])}

					{standardItem.current.description_footer.length > 0 &&
          <SocialMediaWrapper>
            <SocialMediaBars bars={standardItem.current.description_footer}/>
          </SocialMediaWrapper>
					}

				</DescriptionWrapper>

				{standardItem.current.features.length > 1 && <FeaturesList features={standardItem.current.features}/>}

				{standardItem.current.related_products && standardItem.current.related_products.length > 0 &&
        <RelatedProducts products={standardItem.current.related_products}/>}


			</ProductWrapper>

			{Width > 767 && React.useMemo(() => (
				<CheckoutNavBar
					featuredImage={product.featuredImage}
					handleDialChange={onDialChange}
					handleAddToCartState={() => (setState({ inCart: true }))}
					handleLicenseChange={onSelectChange}
					licenses={standardItem.current.product_licenses}
					payWhatYouWant={payWhatYouWant}
					onPwywChange={onPwywChange}
					inView={inView}
					bulkDiscount={bulkDiscount}
					numberOfLicenses={numberOfLicenses}
					selectedProduct={state.selectedProduct}
					slug={product.slug}
					inCart={inCart}
					selectedLicense={state.selectedLicense}
					title={standardItem.current.name}
					price={state.price}
					cartOpen={cart.isOpen}
					total={calcTotalQtyPrice(state.price, numberOfLicenses)}
				/>
			), [inView, state.price, numberOfLicenses, inCart, payWhatYouWant, bulkDiscount])}
		</Layout>
	)

}

const mapStateToProps = (state: IState) => ({
	cart: state.cart,
	products: state.products
})
const mapDispatchToProps = (dispatch: ReduxDispatch<Action>) => {
	return {
		showModalAction: bindActionCreators(showModal, dispatch)
	}
}
export default connect<IPropsPrivate, IPropsActions, IPropsPublic, IState>(mapStateToProps, mapDispatchToProps)(ProductLayout)
export const SocialMediaWrapper = styled.div`
	grid-column: 2 / 4;
	padding: 80px 0 0;
	@media ${device.tablet} {
		grid-column: 2 / 14;
	}
	@media ${device.laptop} {
		padding: 40px 0 0;
		grid-row: 4;
		grid-column: 3 / 13;
	}	
`
const productRowGap = styled.div`
	margin-bottom: 20px;
`
const ProductWrapper = styled.div`
	padding: 20px 0 0;
	background: ${colors.grey.i200};
	
	@media ${device.laptop} {
		padding: 100px 0 0;	
	}
		
`
const DescriptionWrapper = styled(GridFluid)`
	grid-row-gap: 0 !important;
	padding: 100px 0 0;
	position: relative;
	z-index: 2;
	align-items: flex-start;
	
	@media ${device.laptop} {
		grid-template-rows: auto 1fr auto;
		padding: 120px 0 0;
	}
`
const SliderGrid = styled(GridFluid)`
	grid-row-gap: 0 !important;
	padding: 0;

	@media ${device.tablet}{
		grid-template-rows: auto auto auto 1fr;
	}
`
const ButtonWrapper = styled.div`
	text-transform: uppercase;
	a, div{
		display: flex;
		flex-direction: row;
		align-items: center;
		color: ${colors.primary.text};
		transition: .3s;
		&:hover{
			color: ${colors.primary.pink};
			path{
				fill: ${colors.primary.pink};
			}
		}
	}
	span{
		margin-right: 10px;
		line-height: 14px;
		&:first-child{
			max-width: 17px;
			display: flex;
			flex-direction: column;
		}
		&:last-child{
			flex: 1;
			line-height: 11px;
		}
	}
	svg{
		width: 100%;
		path{
			transition: .3s;
			fill: ${colors.primary.text};
		}
	}
	
	@media ${device.laptop} {
		font-size: 14px;
		line-height: 14px;
		span{
			width: 14px;
		}
		a, div{
			padding: 20px;
			&:hover{
				cursor: pointer;
			}
		}
	}
		
`
const BackBtnMobile = styled.div`
	text-align: center;
	width: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto 17px;
	
	@media ${device.laptop} {
		display: none;   
	}
`
const BackBtn = styled.div`
	position: absolute;
	background: #fff;
	height: 100px;
	width: 100%;
	text-transform: uppercase;
	font-weight: 500;
	display: none;
	
	@media ${device.laptop} {
		top: -55px;
		left: 25px;
		width: 270px;
		display: block;   
	}
	
	@media ${device.laptopL} {
		left: -30px;
		width: 470px;
	}
		
`
const Gallery = styled.div`
	grid-column: 2 / 4;
	margin: 0 15px 60px;
	grid-row: 2;
	position: relative;
	
	@media ${device.tablet} {
		//height: 686px; // remember to remove
	 	grid-column: 2 / 14; 
	}
	@media ${device.laptop} {
		width: 100%;
	 	grid-column: 2 / 9; 
	 	margin: 0 15px 0 -30px;
	 	grid-row: 1 /span 4;
	}
`

const ProductTitle = styled(productRowGap)`
		margin: 40px 0 35px;
		grid-column: 2 / 4;
		text-align: center;
		grid-row: 1;
		
		h1{
			${Sentinel.black};
			font-weight: 900;
			font-style: normal;
			color: ${colors.grey.i800};
			font-size: 30px;
			line-height: 34px;
			max-width: 640px;
			margin: 0 auto 15px;
		}
		p{
			${Sentinel.italic};
			font-size: 25px;
			color: ${colors.grey.i800};
			font-weight: 500;
			letter-spacing: -.8px;
			margin:0;
		}
		@media ${device.tablet} {
			grid-column: 2 / 14;
			h1{
				font-size: 42px;
				line-height: 42px;
			}
		}
		@media ${device.laptop} {
			margin: 20px 0 20px;
			grid-column: 9 / 14;
			grid-row: 1;	
			text-align: left;
			h1{
				font-size: 34px;
				line-height: 38px;
				margin-bottom: 5px;
			}
		}
		@media ${device.laptopL} {
			h1{
				font-size: 42px;
				line-height: 42px;
			}
		    
		}
			
`
const LabelHeader = styled.div`
	margin: 0 0 5px 20px;
	color: ${colors.primary.text};
`
const LicenseSelectWrapper = styled(productRowGap)`
	margin: 0 auto;
	grid-column: 2 / 4;
	max-width: 413px;
	width: 100%;
	//display: flex;
	//flex-direction: column;
	@media ${device.tablet} {
		grid-column: 4 / 12;
		max-width: 484px;
		
	}
	@media ${device.laptop} {
		grid-column: 9 / 14;
		grid-row: 2;	
	}
`
const LicenseQtyWrapper = styled(productRowGap)`
	grid-column: 2 / 4;
	
	p{
		text-align: right;
		max-width: 484px;
		margin: 0 auto;
		font-size: 14px;
		color: ${colors.grey.i800};
	}

	@media ${device.tablet} {
		& >div{
			padding: 5px;
		}
	 grid-column: 4 / 12;
	}
	@media ${device.laptop} {
	 	grid-column: 9 / 14;
	 	grid-row: 3;
		display: flex;
    flex-direction: column;
    justify-content: flex-end;
    p{
    	margin: 0 0 0 auto;
    }
	}
	
`
const PWYWWrapper = styled(productRowGap)`
	grid-column: 2 / 4;
	
	@media ${device.tablet} {
		grid-column: 2 / 14;
	}
	
	@media ${device.tablet} {
		grid-column: 9 / 14;
		grid-row: 3;	
	}
`
const BuyNowWrapper = styled.div`
	grid-column: 2 / 4;
	text-align: center;
	@media ${device.tablet} {
		grid-column: 4 / 12;
	}
	@media ${device.laptop} {
		grid-column: 9 / 14;
		grid-row: 4;
		text-align: right;
	}
`

