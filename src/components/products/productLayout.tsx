import AddToCartBtn from '@components/products/addToCartBtn'
import NumberDial from '@components/forms/inputs/numberDial'
import LicenseSelect from '@components/forms/inputs/productSelect'
import Layout from '@components/layout'
import { ICartItem, ICartState } from '@et/types/Cart'
import { IProduct, IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { SentinelBlack, SentinelFamily, SentinelMedItl } from '@styles/global/fonts'
import { checkCartForProduct } from '@utils/cartUtils'
import { calcBulkPriceDiscount, displayCurrency } from '@utils/priceUtils'
import { Link } from 'gatsby'
import React, { Dispatch, useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import { CartPricingConfig } from '@components/cart/cartStatics'

interface IPropsPrivate {
	products: IProducts,
	cart: ICartState
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

type useSetStateType = [IPublicState, Dispatch<INewState>]

function useSetState (initialState: any): useSetStateType {
	const [state, setState] = useReducer((originalState: IPublicState, newState: INewState) => ({ ...originalState, ...newState }),
		initialState)

	return [
		state,
		setState
	]
}

export const ProductLayout = (props: IPropsPublic & IPropsPrivate) => {
	const { product, products, cart } = props
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
			const bulkDiscount: boolean = cartItem.qty >= CartPricingConfig.minQuantity

			// 3. Set state
			setState({
				selectedProduct,
				selectedLicense: cartItem.extended ? 'extended' : 'standard',
				numberOfLicenses: cartItem.qty,
				inCart: true,
				bulkDiscount,
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
					const bulkDiscount: boolean = cartItem.qty >= CartPricingConfig.minQuantity

					// 3. Set state
					setState({
						selectedProduct,
						selectedLicense: cartItem.extended ? 'extended' : 'standard',
						numberOfLicenses: cartItem.qty,
						inCart: true,
						bulkDiscount,
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

	function selectChange (e: any) {
		console.log('e', e)

		// setState({
		// 	selectedLicense: e.target.value
		// })
		//
		// if (e.target.value === 'standard') {
		// 	setState({
		// 		selectedProduct: standardItem.current,
		// 		price: standardItem.current.on_sale
		// 			? standardItem.current.sale_price
		// 			: calcBulkPriceDiscount(state.bulkDiscount, standardItem.current.price)
		// 	})
		// } else if (e.target.value === 'extended' && extendedItem.current) {
		// 	setState({
		// 		selectedProduct: extendedItem.current,
		// 		price: extendedItem.current.on_sale
		// 			? extendedItem.current.sale_price
		// 			: calcBulkPriceDiscount(state.bulkDiscount, extendedItem.current.price)
		// 	})
		// }
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

	return (
		<Layout>
			<ProductWrapper>
				<SliderGrid>
					<FlickityWrapper>

					</FlickityWrapper>
					<ProductTitle>
						<h1>{name}</h1>
						{sub_header && <p>{sub_header}</p>}
					</ProductTitle>
					{/*Convert to readable price helper fn?*/}

					<LicenseSelectWrapper>
						<LicenseSelect
							standardLicPrice={standardItem.current.price}
							extendedLicPrice={extendedItem.current ? extendedItem.current.price : ''}
							onChange={selectChange}
							selectedLicense={state.selectedLicense}
							showDropdown={hasExtendedLicense}
							inCart={state.inCart}
						/>
					</LicenseSelectWrapper>
					{/*<div>*/}
					{/*<p>Product: <b>{state.selectedProduct.slug}</b></p>*/}
					{/*<p># of licenses: <b>{state.numberOfLicenses}</b></p>*/}
					{/*</div>*/}

					<LicenseTotal>
						{state.bulkDiscount && <span>Bulk discount of {CartPricingConfig.bulkDiscount} applied</span>}
						{!state.payWhatYouWant && <NumberDialStyled
              label='Select number of license'
              qty={state.numberOfLicenses}
              disableInput={state.inCart}
              inputOnChange={onDialChange}/>}
					</LicenseTotal>

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

					<div>
						{state.payWhatYouWant && <div>
              <span>PWYW enabled</span>
              <NumberDialStyled
                label='Pay what you want'
                qty={state.price}
                disableInput={state.inCart}
                inputOnChange={onPwywChange}/>
            </div>}
					</div>


				</SliderGrid>
			</ProductWrapper>

		</Layout>
	)

}
const ProductWrapper = styled.div`
	margin-top: 60px;
	background: ${colors.grey.i200};
`
const SliderGrid = styled(GridFluid)`
	grid-template-rows: auto auto auto 1fr;
`
const FlickityWrapper = styled.div`
	grid-column: 2 / 9;
	height: 686px; // remember to remove
	background: #87DEDF;
	margin: 0 15px 0 -30px;
	grid-row: 1 / span 4;
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
const ProductTitle = styled.div`
		margin: 50px 0 0;
		grid-column: 9 / 14;
		grid-row: 1;
		
		h1{
			${SentinelBlack};
			font-weight: 900;
			font-style: normal;
			color: ${colors.grey.i800};
			font-size: 42px;
			margin-bottom: 0;
			line-height: 42px;
		}
		p{
			${SentinelMedItl};
			font-size: 25px;
			color: ${colors.secondary.text};
			font-weight: 500;
			letter-spacing: -.8px;
			margin:0;
		}
`
const LicenseSelectWrapper = styled.div`
	grid-column: 9 / 14;
	grid-row: 2;
`
const LicenseTotal = styled.div`
	background: #7f882f;
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
export default connect<IPropsPrivate, {}, IPropsPublic, IState>(mapStateToProps)(ProductLayout)