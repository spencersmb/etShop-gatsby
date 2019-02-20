import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { cartToggle } from '@redux/actions/cartActions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ICartState } from '@et/types/Cart'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { Actions } from '@et/types/Actions'
import React, { RefObject } from 'react'

interface IPropsPublic {
	poseRef: RefObject<any>;
}

interface IPropsRedux {
	cart: ICartState,
	changeCheckoutType: (type: string) => Actions,
	products: IProducts,
	emptyCart: () => Actions,
	cartToggle: () => void
}

export class CartLayout extends React.Component<IPropsPublic & IPropsRedux> {

	// emptyCart = () => {
	// 	this.props.emptyCart()
	// }
	// changePaymentType = (type: string) => {
	// 	this.props.changeCheckoutType(type)
	// }
	//
	// getCheckOutForm = () => {
	// 	const {cart} = this.props
	// 	// TODO: Redo how we check for free checkout
	// 	// Possibly add a free checkout toggle into redux so if the cart is empty and we
	// 	// add a free item - the cart is toggled to free checkout
	// 	// if cart has an item in it already and is not set to free, then the checkout is
	// 	// not changed to free
	// 	if (cart.totalPrice === 0 && cart.totalItems > 0) {
	// 		return (<div className='freeCheckout'>Free item checkout</div>)
	// 	} else {
	// 		return (
	// 			<TabsList
	// 				initialLoad={2}
	// 				onLoad={this.changePaymentType}
	// 			>
	// 				{/*Fade in out each item if key is active*/}
	// 				<div data-item={1} data-payment="stripe" data-click={this.changePaymentType}>
	// 					<StripeProviderWrapper>
	// 						<StripeCheckOutForm/>
	// 					</StripeProviderWrapper>
	// 				</div>
	// 				<div data-item={2} data-payment="paypal" data-click={this.changePaymentType}>
	// 					<PaypalCheckOutForm/>
	// 				</div>
	// 			</TabsList>
	// 		)
	// 	}
	//
	// }

	render () {
		return (
			<CartWrapper ref={this.props.poseRef}>
				<button className='jestCloseCart' onClick={this.props.cartToggle}> Close</button>

				<div>
					<button className='jestEmptyCart'>Empty Cart</button>
				</div>

				<div>
					Items list
					{/*<ErrorBoundary>*/}
					{/*<CartItemsList/>*/}
					{/*</ErrorBoundary>*/}
				</div>

				<div>
					{/*{this.getCheckOutForm()}*/}
					checkout forms
				</div>
			</CartWrapper>
		)
	}
}

const CartWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	background: #8ac3c0;
	transform:translateY(0) translateX(0);
	z-index: 4;
	//transition: all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
`

const mapStateToProps = (state: IState): any => {
	return {
		cart: state.cart,
		products: state.products
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		cartToggle: bindActionCreators(cartToggle, dispatch)
		// changeCheckoutType: bindActionCreators(changeCheckoutType, dispatch),
		// emptyCart: bindActionCreators(emptyCart, dispatch)
	}
}

export default connect<IPropsRedux>(mapStateToProps, mapDispatchToProps)(CartLayout)
