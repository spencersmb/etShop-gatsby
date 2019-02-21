import { IState } from '@et/types/State'
import { addProductToCart, cartToggle, IAddProductAction } from '@redux/actions/cartActions'
import React from 'react'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ICartState } from '@et/types/Cart'
import { IProduct } from '@et/types/Products'

interface IPropsPublic {
	handleAddToCartState: () => void;
	isInCart: boolean;
	pwyw: null | number;
	slug: string;
	selectedProduct: IProduct;
	licenseQty: number | string;
	price: string
}

interface IPropsReduxActions {
	addToCart: IAddProductAction,
	cartToggle: () => void,
}

interface IPropsPrivate {
	cart: ICartState,
}

export class AddToCartBtn extends React.Component<IPropsPublic & IPropsPrivate & IPropsReduxActions> {
	static calcPriceBasedOnQty = (qty: number, price: string): string => {
		if (qty > 10) {
			const strToNum = parseInt(price, 10)
			const percent = .10
			return (strToNum - (percent * strToNum)).toString()
		} else {
			return price
		}
	}

	handleAddToCart = async () => {

		const { addToCart, cart, selectedProduct, handleAddToCartState, licenseQty, price } = this.props

		// add item, the current items in cart, the standard license slug, and qty
		if (typeof licenseQty !== 'string') {
			addToCart(selectedProduct, cart.items, this.props.slug, licenseQty, price)
			handleAddToCartState()
		}
	}

	checkout = () => {
		// Show cart pop-up
		this.props.cartToggle()
	}

	render () {
		// CART has been loaded variable to load in components? Or delay animation?
		const disabled = (this.props.licenseQty === 0) || (typeof this.props.licenseQty === 'string')

		if (this.props.isInCart) {
			return (
				<button onClick={this.checkout}>
					Checkout
				</button>
			)
		}

		return (
			<>
				<button onClick={this.handleAddToCart} disabled={disabled}>
					Add To Cart
				</button>
				{disabled && <div className='jestWarning'>Must have at least one computer license selected</div>}
			</>
		)
	}
}

const mapStateToProps = (state: IState): { cart: ICartState } => {
	return {
		cart: state.cart
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		addToCart: bindActionCreators(addProductToCart, dispatch),
		cartToggle: bindActionCreators(cartToggle, dispatch)
	}
}

export default connect<IPropsPrivate, IPropsReduxActions, IPropsPublic, IState>(mapStateToProps, mapDispatchToProps)(AddToCartBtn)
