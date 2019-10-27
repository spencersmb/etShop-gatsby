import LicenseQtyCard from '@components/cards/licenseQtyCard'
import FontPreviewer from '@components/fontPreviewer/fontPreview'
import FlickityGalleryContext from '@components/gallery/flickityGalleryRE'
import AddToCartBtn from '@components/products/addToCartBtn'
import NumberDial from '@components/forms/inputs/numberDial'
import LicenseSelect from '@components/forms/inputs/productSelect'
import Layout from '@components/layout'
import CheckoutNavBar from '@components/products/modules/checkoutNavBar'
import FeaturesList from '@components/products/modules/features/FeaturesList'
import ProductDescription from '@components/products/modules/productDesc'
import SideBar from '@components/products/modules/productDetailsSidebar'
import RelatedProducts from '@components/products/modules/relatedProducts'
import { ICartItem, ICartState } from '@et/types/Cart'
import { IProduct, IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { Sentinel } from '@styles/global/fonts'
import { InputWrapper } from '@styles/global/inputs'
import { svgs } from '@svg'
import { checkCartForProduct } from '@utils/cartUtils'
import { calcBulkPriceDiscount, calcTotalQtyPrice } from '@utils/priceUtils'
import { useSetState } from '@utils/stateUtils'
import { renderSvg } from '@utils/styleUtils'
import { Width } from '@utils/windowUtils'
import { Link } from 'gatsby'
import React, {
	useEffect,
	useLayoutEffect,
	useRef
} from 'react'
import { useInView } from 'react-intersection-observer'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch as ReduxDispatch } from 'redux'
import styled from 'styled-components'
import _ from 'lodash'
import { CartPricingConfig } from '@components/cart/cartStatics'

interface IPropsPrivate {
	products: IProducts,
	cart: ICartState
}

interface IPropsActions {
	showModalAction: IShowModalAction
}

interface IPropsPublic {
	product: IProduct
}

interface IPublicState {
	selectedProduct: IProduct,
	selectedLicense: string,
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

// TODO: Dont show related if none are present,
// switch off of has ext license data point instead if needed
export const ProductLayout = (props: IPropsPublic & IPropsPrivate & IPropsActions) => {
	const { product, products, cart, showModalAction } = props
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
	const extendedItem = useRef(product.license.extendedItem ? products[product.license.extendedItem.slug] : null)

	// dispatch effect after cart is loaded
	// check for product in cart on load
	// then dispatch to state the item found
	useLayoutEffect(() => {

		// Check if item is in cart on load
		const productFound: boolean = checkCartForProduct(cart, product.slug).length > 0

		if (productFound && !state.inCart) {

			// 1. Get the item in the cart
			const cartItem: ICartItem = cart.items[product.slug]

			// 2. Set the correct item
			const selectedProduct = cartItem.extended && extendedItem.current ? extendedItem.current : standardItem.current
			const bulkDiscountCalc: boolean = cartItem.qty >= CartPricingConfig.minQuantity

			// 3. Set state
			setState({
				selectedProduct,
				selectedLicense: cartItem.extended ? 'extended' : 'standard',
				numberOfLicenses: cartItem.qty,
				inCart: true,
				bulkDiscount: bulkDiscountCalc,
				payWhatYouWant: selectedProduct.pwyw,
				price: cartItem.price
			})
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
					// 1. Get the item in the cart
					const cartItem: ICartItem = cart.items[product.slug]

					// 2. Set the correct item
					const selectedProduct = cartItem.extended && extendedItem.current ? extendedItem.current : standardItem.current
					const bulkDiscountCalc: boolean = cartItem.qty >= CartPricingConfig.minQuantity

					// 3. Set state
					setState({
						selectedProduct,
						selectedLicense: cartItem.extended ? 'extended' : 'standard',
						numberOfLicenses: cartItem.qty,
						inCart: true,
						bulkDiscount: bulkDiscountCalc,
						payWhatYouWant: selectedProduct.pwyw,
						price: cartItem.price
					})
				}

			}
		}
	}, [cart.totalPrice, cart.totalItems])

	const previousCart = useRef(cart)
	useEffect(() => {
		previousCart.current = cart
	})

	function selectChange (license: string) {
		console.log('state.bulkDiscount', state.bulkDiscount)

		if (license === 'standard') {
			setState({
				selectedLicense: license,
				selectedProduct: standardItem.current,
				price: standardItem.current.on_sale
					? standardItem.current.sale_price
					: calcBulkPriceDiscount(state.bulkDiscount, standardItem.current.price, state.numberOfLicenses)
			})
		} else if (license === 'extended' && extendedItem.current) {
			setState({
				selectedLicense: license,
				selectedProduct: extendedItem.current,
				price: extendedItem.current.on_sale
					? extendedItem.current.sale_price
					: calcBulkPriceDiscount(state.bulkDiscount, extendedItem.current.price, state.numberOfLicenses)
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

	const { name, sub_header, license: { hasExtendedLicense }, images, intro_title, intro_description, details, font_preview } = props.product
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
								<Link to='/'>
									<span>{renderSvg(svgs.ChevronLeft)}</span>
									<span>Back to products</span>
								</Link>
							</ButtonWrapper>
						</BackBtn>
						<FlickityGalleryContext items={images} showModal={showModalAction} subSelector={true}/>
					</Gallery>
					<ProductTitle>
						<BackBtnMobile>
							<ButtonWrapper>
								<Link to='/'>
									<span>{renderSvg(svgs.ChevronLeft)}</span>
									<span>Back to products</span>
								</Link>
							</ButtonWrapper>
						</BackBtnMobile>
						<h1 className={`sentinel-bold`}>{name}</h1>
						{sub_header && <p>{sub_header}</p>}
					</ProductTitle>

					{/*License Selection*/}
					<LicenseSelectWrapper ref={ref}>
						<LabelHeader>
							Choose License:
						</LabelHeader>
						{React.useMemo(() => (
							<LicenseSelect
								showModal={showModalAction}
								license={standardItem.current.license}
								standardLicPrice={standardItem.current.price}
								extendedLicPrice={extendedItem.current ? extendedItem.current.price : ''}
								onChange={selectChange}
								selectedLicense={state.selectedLicense}
								inCart={state.inCart}
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
          </LicenseQtyWrapper>
					}

					{payWhatYouWant &&
          <PWYWWrapper>
            <InputWrapper disableInput={state.inCart}>
              <div className={`label`}>Pay What You Want</div>
              <NumberDial
                className={`numberDial__outline`}
                label='Pay what you want'
                qty={state.price}
                inputOnChange={onPwywChange}/>
            </InputWrapper>
          </PWYWWrapper>
					}

					<BuyNowWrapper>
						{React.useMemo(() => (
							<AddToCartBtn
								handleAddToCartState={() => (setState({ inCart: true }))}
								isInCart={state.inCart}
								slug={product.slug}
								selectedProduct={state.selectedProduct}
								licenseQty={state.numberOfLicenses}
								price={state.price}
								total={calcTotalQtyPrice(state.price, numberOfLicenses)}
							/>), [
							state.inCart,
							state.price,
							state.numberOfLicenses
						])}
					</BuyNowWrapper>

					{/*<p>has extended license: <span*/}
					{/*style={{ color: hasExtendedLicense ? 'green' : 'blue' }}>{JSON.stringify(hasExtendedLicense)}</span>*/}
					{/*</p>*/}


				</SliderGrid>
				{standardItem.current.font_preview.enabled &&
        <FontPreviewer styles={standardItem.current.font_preview.styles}/>}
				<DescriptionWrapper>
					<ProductDescription
						intro_title={standardItem.current.intro_title}
						intro_description={standardItem.current.intro_description}
					/>
					{React.useMemo(() => (<SideBar
						onChange={selectChange}
						isExtLicenseSelected={state.selectedLicense === 'extended'}
						details={standardItem.current.details}
						fontPreview={standardItem.current.font_preview.enabled}
					/>), [state.selectedLicense])}
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
					handleLicenseChange={selectChange}
					payWhatYouWant={payWhatYouWant}
					onPwywChange={onPwywChange}
					inView={inView}
					numberOfLicenses={numberOfLicenses}
					selectedProduct={state.selectedProduct}
					slug={product.slug}
					inCart={inCart}
					selectedLicense={state.selectedLicense}
					title={standardItem.current.name}
					price={state.price}
					total={calcTotalQtyPrice(state.price, numberOfLicenses)}
				/>
			), [inView, state.price, numberOfLicenses, inCart, payWhatYouWant])}
		</Layout>
	)

}
const productRowGap = styled.div`
	margin-bottom: 15px;
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
	padding: 80px 0 0;
	position: relative;
	z-index: 2;
	
	@media ${device.laptop} {
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
	font-size: 14px;
	line-height: 14px;
	a{
		display: flex;
		flex-direction: row;
		align-items: center;
		color: ${colors.primary.text};
		&:hover{
			color: ${colors.primary.pink};
			path{
				fill: ${colors.primary.pink};
			}
		}
	}
	span{
		width: 14px;
		margin-right: 10px;
		&:last-child{
			flex: 1;
		}
		
	}
	svg{
		width: 100%;
		path{
			transition: .3s;
			fill: ${colors.primary.text};
		}
	}
`
const BackBtnMobile = styled.div`
	text-align: center;
	max-width: 150px;
	margin: 0 auto 15px;
	
	@media ${device.laptop} {
		display: none;   
	}
`
const BackBtn = styled.div`
	position: absolute;
	background: #fff;

	height: 100px;
	width: 100%;
	padding: 20px 0 0 30px;
	text-transform: uppercase;
	font-weight: 500;
	display: none;
	
	@media ${device.laptop} {
		top: -55px;
		left: 0;
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
			font-size: 42px;
			margin-bottom: 0;
			line-height: 42px;
		}
		p{
			${Sentinel.italic};
			font-size: 25px;
			color: ${colors.secondary.text};
			font-weight: 500;
			letter-spacing: -.8px;
			margin:0;
		}
		@media ${device.tablet} {
			grid-column: 2 / 14;
		}
		@media ${device.laptop} {
			margin: 20px 0 25px;
			grid-column: 9 / 14;
			grid-row: 1;	
			text-align: left;
		}
`
const LabelHeader = styled.div`
	margin: 0 0 5px 20px;
	color: ${colors.primary.text};
`
const LicenseSelectWrapper = styled(productRowGap)`
	margin: 0 auto;
	grid-column: 2 / 4;
	max-width: 484px;
	width: 100%;
	//display: flex;
	//flex-direction: column;
	@media ${device.tablet} {
		grid-column: 4 / 12;
	}
	@media ${device.laptop} {
		grid-column: 9 / 14;
		grid-row: 2;	
	}
`
const LicenseQtyWrapper = styled(productRowGap)`
	grid-column: 2 / 4;
	@media ${device.tablet} {
	 grid-column: 4 / 12;
	}
	@media ${device.laptop} {
	 grid-column: 9 / 14;
	 	grid-row: 3;
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
