import CartList from '@components/cart/cartList'
import StripeCheckout from '@components/stripe/stripeCheckout'
import StripeProviderWrapper from '@components/stripe/stripeProvider'
import CheckoutTabs from '@components/tabs/checkoutTabs'
import { IModalState } from '@et/types/Modal'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { cartToggle, changeCheckoutType, emptyCart } from '@redux/actions/cartActions'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { isPWYWItemInCart } from '@utils/cartUtils'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ICartState } from '@et/types/Cart'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { Actions } from '@et/types/Actions'
import React, { RefObject, useMemo, Suspense, useRef, useEffect } from 'react'

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
	const target = useRef<HTMLElement | null>(null)
	const bodyScrollPos = useRef(0)
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

	useEffect(() => {
		target.current = document.querySelector('#___gatsby')
	})

	function closeCart () {
		props.cartToggle()
	}

	return (
		<CartWrapper
			data-testid='cart-wrapper'
			ref={props.poseRef}
			id='cartWrapper'>
			<CloseButton
				data-testid='close-btn'
				className='jestCloseCart'
				onClick={closeCart}>Close</CloseButton>
			<CartInner>
				<CartLeft>
					<CartHeader>
						<div>
							<button
								data-testid='empty-cart-btn'
								className='jestEmptyCart'
								onClick={props.emptyCart}>
								Empty Cart
							</button>
						</div>
					</CartHeader>
					<div>
						<CartList/>
					</div>
				</CartLeft>
				<CartRight>
					{checkout}
				</CartRight>
			</CartInner>
		</CartWrapper>
	)
}

const CloseButton = styled.button`
	position: absolute;
	top:0;
	right: 0;
`
const CartInner = styled(GridFluid)`
	margin-top: 50px;
	width: 100%;
`
const CartHeader = styled.div`

`
const CartRight = styled.div`
	@media ${device.tablet} {
		grid-column: 9 / 14;
		background: rebeccapurple;
		margin-right: -30px;
	}
`
const CartLeft = styled.div`
	@media ${device.tablet} {
		grid-column: 2 / 9;
		background: green;
		margin-left: -30px;
	}
	
`
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
	background: ${colors.grey.i200};
	display: flex;
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
