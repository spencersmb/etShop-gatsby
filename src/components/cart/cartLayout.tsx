import CartList from '@components/cart/cartList'
import StripeCheckout from '@components/stripe/stripeCheckout'
import StripeProviderWrapper from '@components/stripe/stripeProvider'
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
import React, { RefObject, useEffect, useMemo, useRef, Suspense } from 'react'

const PaypalProvider = React.lazy(() => import('@components/paypal/paypalProvider'))

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
	const bodyScrollPos = useRef(0)
	const target = useRef<HTMLElement | null>(null)
	const checkout = useMemo(() => <CheckoutTabs
		initialLoad='stripe'
		handleChangeType={props.changeCheckout}
		freeCheckout={props.cart.totalPrice === 0 && isPWYWItemInCart(props.cart.items, props.products)}
	>
		<div data-payment='stripe'>
			<StripeProviderWrapper>
				<StripeCheckout/>
			</StripeProviderWrapper>
		</div>
		<div data-payment='paypal'>
			<Suspense fallback={<div>Loading...</div>}>
				<PaypalProvider/>
			</Suspense>
		</div>
	</CheckoutTabs>, [
		props.cart.totalPrice === 0 && isPWYWItemInCart(props.cart.items, props.products)
	])

	useEffect(() => {
		target.current = document.querySelector('#___gatsby')
		if (target.current) {
			bodyScrollPos.current = document.body.scrollTop || document.documentElement.scrollTop || 0
			target.current.style.width = `100%`
			target.current.style.top = `-${bodyScrollPos.current}px`
			target.current.style.position = 'fixed'
		}

		return () => {

			if (target.current) {
				target.current.style.removeProperty('position')
				target.current.style.removeProperty('top')

				document.documentElement.scrollTop = document.body.scrollTop = bodyScrollPos.current
			}

		}
	}, [])

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

			</div>
		</CartWrapper>
	)
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
