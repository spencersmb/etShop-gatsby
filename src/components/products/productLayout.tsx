import AddToCartBtn from '@components/cart/addToCartBtn'
import NumberDial from '@components/forms/inputs/numberDial'
import ProductSelect from '@components/forms/inputs/productSelect'
import Layout from '@components/layout'
import { IProduct, IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { calcPriceBasedOnQty } from '@utils/priceUtils'
import React, { useEffect, useReducer, useRef } from 'react'
import config from '../../../gatsby-config'
import { connect } from 'react-redux'
import styled from 'styled-components'

interface IPropsPrivate {
	products: IProducts
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
	price: string
}

interface INewState {
	selectedProduct?: IProduct,
	selectedLicense?: string,
	numberOfLicenses?: number | string
	inCart?: boolean,
	bulkDiscount?: boolean,
	price?: string
}

// Create State for bulk
// if license qty is larger than X - set state to true
// pass that in as a prop to add to cart btn
// create Price utils file with calc discount function

// Price gets set when licenses change or extended Item?
// fix license qty so that it is a number to help calc price better

export const ProductLayout = (props: IPropsPublic & IPropsPrivate) => {
	const { product, products } = props
	const [state, setState] = useReducer((originalState: IPublicState, newState: INewState) => ({ ...originalState, ...newState }),
		{
			selectedProduct: product,
			selectedLicense: 'standard',
			numberOfLicenses: 1,
			inCart: false,
			bulkDiscount: false,
			price: product.price
		})
	const standardItem = useRef(props.product)
	const extendedItem = useRef(product.license.extendedItem ? products[product.license.extendedItem.slug] : null)

	useEffect(() => {
		console.log('mount')

	}, [])

	const selectChange = (e: any) => {
		setState({
			selectedLicense: e.target.value
		})

		if (e.target.value === 'standard') {
			setState({
				selectedProduct: standardItem.current,
				price: standardItem.current.on_sale ? standardItem.current.sale_price : standardItem.current.price
			})
		} else if (e.target.value === 'extended' && extendedItem.current) {
			setState({
				selectedProduct: extendedItem.current,
				price: extendedItem.current.on_sale ? extendedItem.current.sale_price : extendedItem.current.price
			})
		}
	}
	const onDialChange = (total: number | string) => {

		const isNumber = typeof total === 'number'
		if (total >= config.siteMetadata.pricing.minQuantity) {
			setState({
				numberOfLicenses: total,
				bulkDiscount: true
			})
		} else {
			setState({
				numberOfLicenses: total,
				bulkDiscount: false
			})
		}

	}
	const { name, license: { hasExtendedLicense } } = props.product

	return (
		<Layout>
			<h1>Item name: {name}</h1>
			{/*Convert to readable price helper fn?*/}
			<h2>price: {state.bulkDiscount ? calcPriceBasedOnQty(state.numberOfLicenses, state.price) : state.price}</h2>
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
			<p>
				<ProductSelect
					onChange={selectChange}
					selectedLicense={state.selectedLicense}
					showDropdown={hasExtendedLicense}
				/>
			</p>
			<hr/>
			<div style={{ paddingBottom: 20 }}>
				{state.bulkDiscount ? <span>Bulk discount of {config.siteMetadata.pricing.discount} applied</span> : ''}
				<NumberDialStyled
					qty={state.numberOfLicenses}
					inCart={state.inCart}
					inputOnChange={onDialChange}/>
			</div>
			<hr/>
			<div>
				<AddToCartBtn
					handleAddToCartState={() => (setState({ inCart: true }))}
					isInCart={state.inCart}
					pwyw={null}
					slug={product.slug}
					selectedProduct={state.selectedProduct}
					licenseQty={state.numberOfLicenses}
					price={state.price}
				/>
			</div>
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
	// cart: state.cart,
	products: state.products
	// pwyw: pwywForm(state, 'pwyw'),
	// initialValues: {pwyw: 0} // pull initial values from account reducer
})
export default connect<IPropsPrivate, {}, IPropsPublic, IState>(mapStateToProps)(ProductLayout)