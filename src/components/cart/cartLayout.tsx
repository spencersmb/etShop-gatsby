import CartList from '@components/cart/cartList'
import StripeCheckout from '@components/stripe/stripeCheckout'
import StripeProviderWrapper from '@components/stripe/stripeProvider'
import CheckoutTabs from '@components/tabs/checkoutTabs'
import { IModalState } from '@et/types/Modal'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { cartToggle, changeCheckoutType, emptyCart } from '@redux/actions/cartActions'
import { isPWYWItemInCart } from '@utils/cartUtils'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ICartState } from '@et/types/Cart'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { Actions } from '@et/types/Actions'
import React, { RefObject, useMemo, Suspense } from 'react'

const PaypalCheckout = React.lazy(() => import('@components/paypal/paypalCheckout'))

interface IPropsPublic {
	poseRef: RefObject<any>;
}

interface IReduxState {
	cart: ICartState,
	modal: IModalState
	products: IProducts,
}

interface IReduxActions {
	changeCheckout: (type: string) => Actions,
	emptyCart: () => Actions,
	cartToggle: () => void
}

export function CartLayout (props: IPropsPublic & IReduxState & IReduxActions) {

	// use memo here to only keep track if there is a PWYW item in the cart and the total is 0
	// to flip to the free checkout form
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
			<Suspense fallback={null}>
				<PaypalCheckout/>
			</Suspense>
		</div>
	</CheckoutTabs>, [
		props.cart.totalPrice === 0 && isPWYWItemInCart(props.cart.items, props.products)
	])

	return (
		<CartWrapper
			data-testid='cart-wrapper'
			ref={props.poseRef}
			id='cartWrapper'>
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
	will-change: opacity;
	backface-visibility: hidden;
	transform: translate3d(0, 0, 0);
	height: 100%;
	width: 100%;
	overflow-y: scroll;
	background: #8ac3c0;
	//transform:translateY(0) translateX(0);
	z-index: 4;
	//transition: all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
`

const mapStateToProps = (state: IState): any => {
	return {
		cart: state.cart,
		products: state.products,
		modal: state.modal
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
