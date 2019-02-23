import AddToCartBtn from '@components/cart/addToCartBtn'
import NumberDial from '@components/forms/inputs/numberDial'
import LicenseSelect from '@components/forms/inputs/productSelect'
import Layout from '@components/layout'
import { ICartItem, ICartState } from '@et/types/Cart'
import { IProduct, IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { checkCartForProduct } from '@utils/cartUtils'
import { calcBulkPriceDiscount, displayCurrency } from '@utils/priceUtils'
import { Link } from 'gatsby'
import React, { Dispatch, useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import config from '../../../gatsby-config'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'

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
			const bulkDiscount: boolean = cartItem.qty >= config.siteMetadata.pricing.minQuantity

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
					const bulkDiscount: boolean = cartItem.qty >= config.siteMetadata.pricing.minQuantity

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
		setState({
			selectedLicense: e.target.value
		})

		if (e.target.value === 'standard') {
			setState({
				selectedProduct: standardItem.current,
				price: standardItem.current.on_sale
					? standardItem.current.sale_price
					: calcBulkPriceDiscount(state.bulkDiscount, standardItem.current.price)
			})
		} else if (e.target.value === 'extended' && extendedItem.current) {
			setState({
				selectedProduct: extendedItem.current,
				price: extendedItem.current.on_sale
					? extendedItem.current.sale_price
					: calcBulkPriceDiscount(state.bulkDiscount, extendedItem.current.price)
			})
		}
	}

	function onDialChange (total: number | string) {

		if (total >= config.siteMetadata.pricing.minQuantity) {
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

	const { name, license: { hasExtendedLicense } } = props.product

	return (
		<Layout>
			<h1>Item name: {name}</h1>
			{/*Convert to readable price helper fn?*/}
			<h2>price: {displayCurrency(state.price)}</h2>
			<hr/>
			<div>
				<p>State:</p>
				<p>Product: <b>{state.selectedProduct.slug}</b></p>
				<p># of licenses: <b>{state.numberOfLicenses}</b></p>
			</div>
			<hr/>
			<p>has extended license: <span
				style={{ color: hasExtendedLicense ? 'green' : 'blue' }}>{JSON.stringify(hasExtendedLicense)}</span>
			</p>
			<div>
				{state.payWhatYouWant && <div>
          <span>PWYW enabled</span>
          <NumberDialStyled
            label='Pay what you want'
            qty={state.price}
            disabled={state.inCart}
            inputOnChange={onPwywChange}/>
        </div>}
			</div>
			<hr/>
			<p>
				<LicenseSelect
					onChange={selectChange}
					selectedLicense={state.selectedLicense}
					showDropdown={hasExtendedLicense}
					inCart={state.inCart}
				/>
			</p>
			<hr/>
			<div style={{ paddingBottom: 20 }}>
				{state.bulkDiscount && <span>Bulk discount of {config.siteMetadata.pricing.discount} applied</span>}
				{!state.payWhatYouWant && <NumberDialStyled
          label='Select number of license'
          qty={state.numberOfLicenses}
          disabled={state.inCart}
          inputOnChange={onDialChange}/>}
			</div>
			<hr/>
			<div>
				{React.useMemo(() => (
					<AddToCartBtn
						handleAddToCartState={() => (setState({ inCart: true }))}
						isInCart={state.inCart}
						slug={product.slug}
						selectedProduct={state.selectedProduct}
						licenseQty={state.numberOfLicenses}
						price={state.price}
					/>), [state.inCart, state.price])}
			</div>
			<Link to='/page-2/'>Go to page 2</Link>
		</Layout>
	)

}
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
const mapStateToProps = (state: IState) => ({
	cart: state.cart,
	products: state.products
})
export default connect<IPropsPrivate, {}, IPropsPublic, IState>(mapStateToProps)(ProductLayout)