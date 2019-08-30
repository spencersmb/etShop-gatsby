import LicenseQtyCard from '@components/cards/licenseQtyCard'
import AddToCartBtn from '@components/products/addToCartBtn'
import NumberDial from '@components/forms/inputs/numberDial'
import LicenseSelect from '@components/forms/inputs/productSelect'
import Layout from '@components/layout'
import { ICartItem, ICartState } from '@et/types/Cart'
import { IProduct, IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { SentinelBlack, SentinelFamily, SentinelMedItl } from '@styles/global/fonts'
import { checkCartForProduct } from '@utils/cartUtils'
import { calcBulkPriceDiscount, displayCurrency } from '@utils/priceUtils'
import React, { Dispatch as ReactDispatch, useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
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
	numberOfLicenses: number | string,
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

type useSetStateType = [IPublicState, ReactDispatch<INewState>]

function useSetState (initialState: any): useSetStateType {
	const [state, setState] = useReducer((originalState: IPublicState, newState: INewState) => ({ ...originalState, ...newState }),
		initialState)

	return [
		state,
		setState
	]
}

// TODO: Refactor now that standardItem and extendedItem are always present
// switch off of has ext license data point instead if needed
export const ProductLayout = (props: IPropsPublic & IPropsPrivate & IPropsActions) => {
	const { product, products, cart, showModalAction } = props
	const [state, setState] = useSetState({
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
		console.log('selected license', license)

		setState({
			selectedLicense: license
		})

		if (license === 'standard') {
			setState({
				selectedProduct: standardItem.current,
				price: standardItem.current.on_sale
					? standardItem.current.sale_price
					: calcBulkPriceDiscount(state.bulkDiscount, standardItem.current.price)
			})
		} else if (license === 'extended' && extendedItem.current) {
			setState({
				selectedProduct: extendedItem.current,
				price: extendedItem.current.on_sale
					? extendedItem.current.sale_price
					: calcBulkPriceDiscount(state.bulkDiscount, extendedItem.current.price)
			})
		}
	}

	function onDialChange (total: number | string) {

		if (total >= CartPricingConfig.minQuantity) {
			setState({
				numberOfLicenses: total,
				bulkDiscount: true,
				price: calcBulkPriceDiscount(true, state.price)
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
		setState({
			price: total.toString()
		})

	}

	const { name, sub_header, license: { hasExtendedLicense } } = props.product
	const { bulkDiscount, numberOfLicenses, inCart, payWhatYouWant } = state
	return (
		<Layout>
			<ProductWrapper>
				<SliderGrid>
					<FlickityWrapper/>
					<ProductTitle>
						<h1 className={`sentinel-bold`}>{name}</h1>
						{sub_header && <p className={`sentinel-medItalic`}>{sub_header}</p>}
					</ProductTitle>
					{/*Convert to readable price helper fn?*/}

					<LicenseSelectWrapper>
						<LicenseSelect
							showModal={showModalAction}
							license={standardItem.current.license}
							standardLicPrice={standardItem.current.price}
							extendedLicPrice={extendedItem.current ? extendedItem.current.price : ''}
							onChange={selectChange}
							selectedLicense={state.selectedLicense}
							inCart={state.inCart}
						/>
					</LicenseSelectWrapper>
					{/*<div>*/}
					{/*<p>Product: <b>{state.selectedProduct.slug}</b></p>*/}
					{/*<p># of licenses: <b>{state.numberOfLicenses}</b></p>*/}
					{/*</div>*/}
					{!payWhatYouWant &&
          <LicenseQtyWrapper>
            <LicenseQtyCard
              bulkDiscount={bulkDiscount}
              inCart={inCart}
              numberOfLicenses={numberOfLicenses}
              onDialChange={onDialChange}/>
          </LicenseQtyWrapper>
					}

					{state.payWhatYouWant &&
          <PWYWWrapper>
            <span>PWYW enabled</span>
            <NumberDialStyled
              label='Pay what you want'
              qty={state.price}
              disableInput={state.inCart}
              inputOnChange={onPwywChange}/>
          </PWYWWrapper>
					}


					<Price>
						{React.useMemo(() => (
							<AddToCartBtn
								handleAddToCartState={() => (setState({ inCart: true }))}
								isInCart={state.inCart}
								slug={product.slug}
								selectedProduct={state.selectedProduct}
								licenseQty={state.numberOfLicenses}
								price={state.price}
							/>), [state.inCart, state.price, state.numberOfLicenses])}
					</Price>

					{/*<p>has extended license: <span*/}
					{/*style={{ color: hasExtendedLicense ? 'green' : 'blue' }}>{JSON.stringify(hasExtendedLicense)}</span>*/}
					{/*</p>*/}


				</SliderGrid>
			</ProductWrapper>

		</Layout>
	)

}
const productRowGap = styled.div`
	margin-bottom: 30px;
`
const ProductWrapper = styled.div`
	padding-top: 60px;
	background: ${colors.grey.i200};
`
const SliderGrid = styled(GridFluid)`
	grid-template-rows: auto auto auto 1fr;
	grid-row-gap: 0;
	@media ${device.tablet}{
		grid-row-gap: 0;
	}
`
const FlickityWrapper = styled.div`
	grid-column: 2 / 9;
	height: 686px; // remember to remove
	background: #87DEDF;
	margin: 0 15px 0 -30px;
	grid-row: 1 / span 4;
`
const LicenseQtyWrapper = styled(productRowGap)`
	grid-column: 9 / 14;
	grid-row: 3;
`
const NumberDialStyled = styled(NumberDial)`
	input{
		color: red;
		-moz-appearance: textfield;
		&::-webkit-outer-spin-button, 
		::-webkit-inner-spin-button{
			-webkit-appearance: none;
			margin: 0;
		};
	}
`
const ProductTitle = styled(productRowGap)`
		margin: 40px 0 30px;
		grid-column: 9 / 14;
		grid-row: 1;
		
		h1{
			font-weight: 900;
			font-style: normal;
			color: ${colors.grey.i800};
			font-size: 42px;
			margin-bottom: 0;
			line-height: 42px;
		}
		p{
			font-size: 25px;
			color: ${colors.secondary.text};
			font-weight: 500;
			letter-spacing: -.8px;
			margin:0;
		}
`
const LicenseSelectWrapper = styled(productRowGap)`
	grid-column: 9 / 14;
	grid-row: 2;
`
const PWYWWrapper = styled(productRowGap)`
	grid-column: 9 / 14;
	grid-row: 3;
`
const Price = styled.div`
	background: #885b21;
	grid-column: 9 / 14;
	grid-row: 4;
`
const mapStateToProps = (state: IState) => ({
	cart: state.cart,
	products: state.products
})
const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		showModalAction: bindActionCreators(showModal, dispatch)
	}
}
export default connect<IPropsPrivate, IPropsActions, IPropsPublic, IState>(mapStateToProps, mapDispatchToProps)(ProductLayout)
