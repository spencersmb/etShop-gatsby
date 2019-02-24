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
import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react'

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

export function CartLayout (props: IPropsPublic & IReduxState & IReduxActions) {
	const [pwywCheckout, setPwywCheckout] = useState(false)
	const bodyScrollPos = useRef(0)
	const checkout = useMemo(() => <CheckoutTabs
		cartTotal={props.cart.totalPrice}
		initialLoad='stripe'
		handleChangeType={props.changeCheckout}
		freeCheckout={pwywCheckout}
	>
		<div data-payment='stripe'>Tab 1</div>
		<div data-payment='paypal'>Tab 2</div>
	</CheckoutTabs>, [
		pwywCheckout
	])

	useEffect(() => {

		setPwywCheckout(props.cart.totalPrice === 0 && isPWYWItemInCart(props.cart.items, props.products))
		const body: HTMLElement | null = document.querySelector('#___gatsby')
		if (body) {

			bodyScrollPos.current = document.body.scrollTop || document.documentElement.scrollTop || 0
			// // body.style.top = '-' + window.pageYOffset.toString(10) + 'px'
			body.style.width = `100%`
			body.style.top = `-${bodyScrollPos.current}px`
			body.style.position = 'fixed'
		}

		return () => {

			if (body) {

				// way 2
				body.style.removeProperty('position')
				body.style.removeProperty('top')

				document.documentElement.scrollTop = document.body.scrollTop = bodyScrollPos.current

				// way 1
				// const styles = window.getComputedStyle(body, 'top')
				//
				// body.style.position = 'relative'
				// window.scrollTo(0, (styles.top ? parseInt(styles.top.substr(1), 10) : 0))
				// body.style.top = 'auto'
			}

		}
	})

	useEffect(() => {
		console.log('pwywCheckout', pwywCheckout)

		if (props.cart.totalPrice === 0 && isPWYWItemInCart(props.cart.items, props.products) && !pwywCheckout) {
			console.log('enable')
			setPwywCheckout(true)
		}
	})

	return (
		<CartWrapper data-testid='cart-wrapper' ref={props.poseRef} id='cartWrapper'>
			<button data-testid='close-btn' className='jestCloseCart' onClick={props.cartToggle}>Close</button>

			<div>
				<button
					data-testid='empty-cart-btn'
					className='jestEmptyCart'
					onClick={props.emptyCart}>
					Empty Cart
				</button>
			</div>

			<div>
				<CartList/>
			</div>

			<div>
				{checkout}
				<hr/>
				<div>
					<div>pay what you want found?</div>
					<div>
						{JSON.stringify(isPWYWItemInCart(props.cart.items, props.products))}
					</div>
				</div>
				<hr/>
				<div>
					<button
						type='button'
						disabled={props.cart.totalPrice === 0
							? !isPWYWItemInCart(props.cart.items, props.products)
							: false}>Checkout temp btn
					</button>
				</div>
			</div>
		</CartWrapper>
	)
}

export class CartLayoutold extends React.Component<IPropsPublic & IReduxState & IReduxActions> {
	bodyScrollPos = 0

	componentDidMount (): void {
		const body: HTMLElement | null = document.querySelector('#___gatsby')
		if (body) {

			this.bodyScrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0
			// // body.style.top = '-' + window.pageYOffset.toString(10) + 'px'
			body.style.width = `100%`
			body.style.top = `-${this.bodyScrollPos}px`
			body.style.position = 'fixed'
		}

	}

	componentWillUnmount (): void {
		const body = document.getElementById('___gatsby')
		if (body) {

			// way 2
			body.style.removeProperty('position')
			body.style.removeProperty('top')

			document.documentElement.scrollTop = document.body.scrollTop = this.bodyScrollPos

			// way 1
			// const styles = window.getComputedStyle(body, 'top')
			//
			// body.style.position = 'relative'
			// window.scrollTo(0, (styles.top ? parseInt(styles.top.substr(1), 10) : 0))
			// body.style.top = 'auto'
		}

	}

	render () {
		return (
			<CartWrapper data-testid='cart-wrapper' ref={this.props.poseRef} id='cartWrapper'>
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
	//height: 100vh;
	height: 100%;
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
