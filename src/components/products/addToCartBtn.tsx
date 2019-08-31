import { IState } from '@et/types/State'
import { addProductToCart, cartToggle as cartToggleAction, IAddProductAction } from '../../state/actions/cartActions'
import React from 'react'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ICartState } from '@et/types/Cart'
import { IProduct } from '@et/types/Products'

interface IPropsPublic {
	handleAddToCartState: () => void;
	isInCart: boolean;
	slug: string;
	selectedProduct: IProduct;
	licenseQty: number | string;
	price: string
	total: string
}

interface IPropsReduxActions {
	addToCart: IAddProductAction,
	cartToggle: () => void,
}

interface IPropsPrivate {
	cart: ICartState,
}

export function AddToCartBtn (props: IPropsPublic & IPropsPrivate & IPropsReduxActions) {
	const { addToCart, cart, selectedProduct, handleAddToCartState, licenseQty, price, slug, cartToggle, isInCart, total } = props
	const disabled = (licenseQty === 0) || (typeof licenseQty === 'string')

	async function handleAddToCart () {
		// secure check for 0 licenses
		if (typeof licenseQty !== 'string') {
			handleAddToCartState()
			addToCart(selectedProduct, cart.items, slug, licenseQty, price)
		}
	}

	if (isInCart) {
		return (
			<button data-testid='checkout' onClick={cartToggle}>
				Checkout
			</button>
		)
	}

	return (
		<>
			<button data-testid='addToCart' onClick={handleAddToCart} disabled={disabled}>
				I want this <span>{total}</span>
			</button>
			{disabled && <div data-testid='warning'>Must have at least one computer license selected</div>}
		</>
	)
}

const mapStateToProps = (state: IState): { cart: ICartState } => {
	return {
		cart: state.cart
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		addToCart: bindActionCreators(addProductToCart, dispatch),
		cartToggle: bindActionCreators(cartToggleAction, dispatch)
	}
}

export default connect<IPropsPrivate, IPropsReduxActions, IPropsPublic, IState>(mapStateToProps, mapDispatchToProps)(AddToCartBtn)
