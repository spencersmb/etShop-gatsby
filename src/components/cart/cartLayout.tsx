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
import { Sentinel } from '@styles/global/fonts'
import { CartHeader, CartHeaderTitle } from '@styles/modules/cart'
import { svgs } from '@svg'
import { isPWYWItemInCart } from '@utils/cartUtils'
import { displayCurrency } from '@utils/priceUtils'
import { renderSvg } from '@utils/styleUtils'
import posed, { PoseGroup } from 'react-pose'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ICartState } from '@et/types/Cart'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { Actions } from '@et/types/Actions'
import React, { RefObject, useMemo, Suspense, useRef, useEffect, useState } from 'react'

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
	const [checkoutOpen, setCheckoutOpen] = useState(false)
	const bodyScrollPos = useRef(0)
	// use memo here to only keep track if there is a PWYW item in the cart and the total is 0
	// to flip to the free checkout form
	const toggleCheckout = () => {
		console.log('toggleCart')
		setCheckoutOpen(!checkoutOpen)
	}
	const checkout = useMemo(() => <CheckoutTabs
		initialLoad='stripe'
		toggleCheckout={toggleCheckout}
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
		props.cart.totalPrice === 0 && isPWYWItemInCart(props.cart.items, props.products) && checkoutOpen || !checkoutOpen
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

			<CartHeader>
				<div
					data-testid='close-btn'
					className='closeCartBtn jestCloseCart'
					onClick={closeCart}>
					{renderSvg(svgs.ArrowLeft)}
				</div>
				<CartHeaderTitle>
					<h2>Your Cart</h2>
					<p>{props.cart.totalItems} items</p>
				</CartHeaderTitle>
				<div className={`emptyCartBtn`}>
					<button
						data-testid='empty-cart-btn'
						className='jestEmptyCart'
						onClick={props.emptyCart}>
						Empty Cart
					</button>
				</div>
			</CartHeader>

			{/* CartList Items */}
			<CartListContainer>
				<CartListInner>
					<CartList/>
				</CartListInner>
				<CartSubTotal>
					<SubTotalContainer>
						<span>Total</span>
						<p>{displayCurrency(props.cart.totalPrice)}</p>
					</SubTotalContainer>
					<button onClick={toggleCheckout}>Checkout</button>
				</CartSubTotal>

			</CartListContainer>

			{/*CheckOut*/}
			<PoseGroup>
				{checkoutOpen && <CheckoutCart key={'z'}>
          <CheckoutTabs
            initialLoad='stripe'
            toggleCheckout={toggleCheckout}
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
          </CheckoutTabs>
        </CheckoutCart>}
			</PoseGroup>

		</CartWrapper>
	)
}

const CartListContainer = styled(GridFluid)`
	width: 100%;
`

const CheckoutPose = posed.div({
	enter: {
		// opacity: 1,
		x: '0%',
		transition: {
			default: {
				ease: 'easeOut'
			}
		}
	},
	exit: {
		// opacity: 0,
		x: '-100%',
		transition: {
			default: {}
		}
	}
})
const CheckoutCart = styled(CheckoutPose)`
	position: fixed;
	top: 0;
	transform: translateX(-100%);
	background: #fff;
	width: 100%;
	height: 100%;
	z-index: 3	;
`
const CartListInner = styled.div`
	grid-column: 2 / 4;
	@media ${device.tablet} {
		grid-column: 2 / 9;
		background: green;
		margin-left: -30px;
	}
	
`
const CartSubTotal = styled.div`
	position: absolute;
	z-index: 2;
	bottom: 0;
	width: 100%;
	left: 0;
	border-top: 1px solid ${colors.grey.i300};
	padding: 25px 20px;

	@media ${device.tablet} {
		grid-column: 9 / 14;
		margin-right: -30px;
	}
`

const SubTotalContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	span{
		${Sentinel.semiboldItalic};
		color: ${colors.secondary.text};
		font-size: 18px;
		text-transform: uppercase;
	}
	p{
		${Sentinel.reg};
		color: ${colors.grey.i800};
		font-weight: 600;
		font-size: 52px;
		line-height: 52px;
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
	flex-direction: column;
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
