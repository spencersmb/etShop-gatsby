import CartList from '@components/cart/cartList'
import CheckoutTabs from '@components/tabs/checkoutTabs'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { cartToggle, changeCheckoutType, emptyCart } from '@redux/actions/cartActions'
import { isPWYWItemInCart } from '@utils/cartUtils'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ICartState } from '@et/types/Cart'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { Actions } from '@et/types/Actions'
import React, { RefObject } from 'react'

interface IPropsPublic {
	poseRef: RefObject<any>;
}

interface IReduxState {
	cart: ICartState,
	products: IProducts,
}

interface IReduxActions {
	changeCheckout: (type: string) => Actions,
	emptyCart: () => Actions,
	cartToggle: () => void
}

function preventDefault (e) {
	e = e || window.event
	if (e.preventDefault) {
		e.preventDefault()
	}
	e.returnValue = false
}

export class CartLayout extends React.Component<IPropsPublic & IReduxState & IReduxActions> {

	getCheckOutForm = () => {
		const { cart } = this.props
		// TODO: Redo how we check for free checkout
		// Possibly add a free checkout toggle into redux so if the cart is empty and we
		// add a free item - the cart is toggled to free checkout
		// if cart has an item in it already and is not set to free, then the checkout is
		// not changed to free
		if (this.props.cart.totalPrice === 0 && isPWYWItemInCart(this.props.cart.items, this.props.products)) {
			return (<div className='freeCheckout'>Free item checkout</div>)
		} else {
			return (
				<CheckoutTabs
					cartTotal={this.props.cart.totalPrice}
					initialLoad='stripe'
					handleChangeType={this.props.changeCheckout}
				>
					<div data-payment='stripe'>Tab 1</div>
					<div data-payment='paypal'>Tab 2</div>
				</CheckoutTabs>
			)
		}

	}

	componentDidMount (): void {
		const body: HTMLElement | null = document.getElementById('app')
		if (body) {
			body.style.top = '-' + window.pageYOffset.toString(10) + 'px'
			body.style.position = 'fixed'
		}

	}

	componentWillUnmount (): void {
		const body = document.getElementById('app')
		if (body) {
			const styles = window.getComputedStyle(body, 'top')
			console.log('parseInt(styles.top.substring(1), 10)', parseInt(styles.top.substr(1), 10))

			body.style.position = 'relative'
			window.scrollTo(0, (styles.top ? parseInt(styles.top.substr(1), 10) : 0))
			body.style.top = 'auto'
		}

	}

	render () {
		return (
			<CartWrapper data-testid='cart-wrapper' ref={this.props.poseRef}>
				<button data-testid='close-btn' className='jestCloseCart' onClick={this.props.cartToggle}>Close</button>

				<div>
					<button
						data-testid='empty-cart-btn'
						className='jestEmptyCart'
						onClick={this.props.emptyCart}>
						Empty Cart
					</button>
				</div>

				<div>
					<CartList/>
				</div>

				<div>
					<CheckoutTabs
						cartTotal={this.props.cart.totalPrice}
						initialLoad='stripe'
						handleChangeType={this.props.changeCheckout}
						freeCheckout={this.props.cart.totalPrice === 0 && isPWYWItemInCart(this.props.cart.items, this.props.products)}
					>
						<div data-payment='stripe'>Tab 1</div>
						<div data-payment='paypal'>Tab 2</div>
					</CheckoutTabs>
					<hr/>
					<div>
						<div>pay what you want found?</div>
						<div>
							{JSON.stringify(isPWYWItemInCart(this.props.cart.items, this.props.products))}
						</div>
					</div>
					<hr/>
					<div>
						<button
							type='button'
							disabled={this.props.cart.totalPrice === 0
								? !isPWYWItemInCart(this.props.cart.items, this.props.products)
								: false}>Checkout temp btn
						</button>
					</div>
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
	overflow-y: scroll;
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
		cartToggle: bindActionCreators(cartToggle, dispatch),
		changeCheckout: bindActionCreators(changeCheckoutType, dispatch),
		emptyCart: bindActionCreators(emptyCart, dispatch)
	}
}

export default connect<IReduxState, IReduxActions, IPropsPublic, IState>(mapStateToProps, mapDispatchToProps)(CartLayout)
