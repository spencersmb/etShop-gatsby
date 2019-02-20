import NumberDial from '@components/forms/inputs/numberDial'
import ProductSelect from '@components/forms/inputs/productSelect'
import { IProduct, IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import React, { useEffect, useReducer, useRef } from 'react'
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
	inCart: boolean
}

interface INewState {
	selectedProduct?: IProduct,
	selectedLicense?: string,
	numberOfLicenses?: number | string
	inCart?: boolean
}

export const ProductLayout = (props: IPropsPublic & IPropsPrivate) => {
	const { product, products } = props
	const [state, setState] = useReducer((originalState: IPublicState, newState: INewState) => ({ ...originalState, ...newState }),
		{
			selectedProduct: product,
			selectedLicense: 'standard',
			numberOfLicenses: 1,
			inCart: false
		})
	const standardItem = useRef(props.product)
	const extendedItem = useRef(product.license.extendedItem ? products[product.license.extendedItem.slug] : null)

	useEffect(() => {
	}, [])

	const selectChange = (e: any) => {
		setState({ selectedLicense: e.target.value })

		if (e.target.value === 'standard') {
			setState({ selectedProduct: standardItem.current })
		} else if (e.target.value === 'extended' && extendedItem.current) {
			setState({ selectedProduct: extendedItem.current })
		}
	}
	const onDialChange = (total: number | string) => {
		setState({ numberOfLicenses: total })
	}
	const { name, license: { hasExtendedLicense } } = props.product

	return (
		<div>
			<h1>Item name: {name}</h1>
			{/*Convert to readable price helper fn?*/}
			<h2>price: {state.selectedProduct.price}</h2>
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
				<NumberDialStyled
					qty={state.numberOfLicenses}
					inCart={state.inCart}
					inputOnChange={onDialChange}/>
			</div>
			<hr/>
		</div>
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