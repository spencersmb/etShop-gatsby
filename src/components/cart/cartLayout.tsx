import CartList from '@components/cart/cartList'
import StripeCheckout from '@components/stripe/stripeCheckout'
import StripeProviderWrapper from '@components/stripe/stripeProvider'
import CheckoutPage from '@components/tabs/checkoutTabs'
import { IModalState, OnPoseComplete } from '@et/types/Modal'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import { cartToggle, changeCheckoutType, emptyCart } from '@redux/actions/cartActions'
import { device } from '@styles/global/breakpoints'
import { ButtonReg } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import { CartHeader, CartHeaderTitle, CartPageContainer, CartSliderTransition } from '@styles/modules/cart'
import { svgs } from '@svg'
import { isPWYWItemInCart } from '@utils/cartUtils'
import { displayCurrency } from '@utils/priceUtils'
import { renderSvg } from '@utils/styleUtils'
import { bodyScrollBar, getWindowSize, windowHasScrollbar } from '@utils/windowUtils'
import posed, { PoseGroup } from 'react-pose'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ICartState } from '@et/types/Cart'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { Actions } from '@et/types/Actions'
import React, { RefObject, useMemo, Suspense, useRef, useEffect, useState, useLayoutEffect } from 'react'

const PaypalCheckout = React.lazy(() => import('@components/paypal/paypalCheckout'))

interface IPropsPublic {
	poseRef: RefObject<any>;
}

interface IReduxState {
	user: IUserState,
	cart: ICartState,
	modal: IModalState
	products: IProducts,
}

interface IReduxActions {
	changeCheckout: (type: string) => Actions,
	emptyCart: () => Actions,
	cartToggle: () => void
}

type useScrollReturn = [boolean, number, number]
export const useScrollEventv2 = (elementId: string, fixedElement: any, scrollElement?: any): useScrollReturn => {
	const [fixed, setFixed] = useState(false)
	const [offsetLeft, setOffsetLeft] = useState(0)
	const [width, setWidth] = useState(0)
	const [windowWidth, setwindowWidth] = useState(0)
	const [mq, setMq] = useState('')
	const prevFixed = useRef(fixed)
	const prevMQ = useRef(mq)
	const prevWindowWidth = useRef(0)
	const scroller: any = useRef(null)
	const fixedElementRef: any = useRef(null)

	useEffect(() => {
		fixedElementRef.current = document.getElementById(fixedElement)
		scroller.current = scrollElement ? document.getElementById(scrollElement) : window
		setWidth(fixedElementRef.current.getBoundingClientRect().width)
		setTimeout(() => {
			setOffsetLeft(fixedElementRef.current.getBoundingClientRect().left)
		}, 600)
	}, [])

	useEffect(() => {
		prevFixed.current = fixed
	}, [fixed])

	useEffect(() => {
		prevMQ.current = mq
	}, [mq])

	useEffect(() => {
		prevWindowWidth.current = window.innerWidth
	}, [prevWindowWidth])

	useEffect(() => {

		const filterContainer = document.getElementById(elementId)
		const size = 0

		const reqAnim = () => {
			requestAnimationFrame(watchNav)
		}
		const watchNav = () => {

			const elFromTop = filterContainer ? filterContainer.getBoundingClientRect().top : 0

			const windowDevice = getWindowSize()

			// console.log('windowDevice', windowDevice)
			// console.log('fromTop < size', fromTop < size)
			// console.log('prevMQ.current', prevMQ.current)
			// console.log('windowDevice', window.innerWidth)

			if (prevMQ.current !== windowDevice) {
				setMq(windowDevice)
			}

			if (windowDevice !== 'desktop') {
				return
			}
			// console.log('prevWindowWidth.current', prevWindowWidth.current)
			// console.log('window.width', window.innerWidth)

			if (prevWindowWidth.current !== window.innerWidth) {
				setwindowWidth(window.innerWidth)
				setWidth(fixedElementRef.current.getBoundingClientRect().width)
				setOffsetLeft(fixedElementRef.current.getBoundingClientRect().left)
			}
			if (elFromTop <= size && !prevFixed.current) {
				setFixed(true)

			} else if (elFromTop > size && prevFixed.current) {
				setFixed(false)

			}
		}

		scroller.current.addEventListener('scroll', reqAnim)

		return () => {
			scroller.current.removeEventListener('scroll', reqAnim)
		}
	}, [])

	return [fixed, offsetLeft, width]
}

export function CartLayout (props: IPropsPublic & IReduxState & IReduxActions) {
	const { cart, changeCheckout } = props
	const target = useRef<HTMLElement | null>(null)
	const [checkoutOpen, setCheckoutOpen] = useState(false)
	const [fixed, offsetLeft, width] = useScrollEventv2('cartPageContainer', 'cartCheckoutNav', 'cartWrapper')
	const bodyScrollPos = useRef(0)
	const CheckoutSliderRef: any = useRef(null)

	// use memo here to only keep track if there is a PWYW item in the cart and the total is 0
	// to flip to the free checkout form
	const toggleCheckout = () => {
		// console.log('window.innerWidth > 992', window.innerWidth > 992)
		if (window.innerWidth > 992) {
			CheckoutSliderRef.current.style.overflowY = `scroll`
			// CheckoutSliderRef.current.style.padding = `0 15px 0 0`
		} else {
			// CheckoutSliderRef.current.style.overflowY = `hidden`
		}
		// if (checkoutOpen) {
		// 	CheckoutSliderRef.current.style.overflowY = `hidden`
		//
		// 	if (window.innerWidth > 992) {
		// 		CheckoutSliderRef.current.style.overflowY = `scroll`
		// 		// CheckoutSliderRef.current.style.padding = `0 15px 0 0`
		// 	}
		// }
		setCheckoutOpen(!checkoutOpen)
	}

	useEffect(() => {
		if (checkoutOpen && windowHasScrollbar()) {
			CheckoutSliderRef.current.style.padding = `0 15px 0 0`
		}
	})

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
					<p className={'qty'}>{props.cart.totalItems} items</p>
					<p className={'total'}>{displayCurrency(props.cart.originalPrice)}</p>
				</CartHeaderTitle>
				<CartSubTotalHeader>
					{/*<span>Total</span>*/}
					{/*<p>{displayCurrency(props.cart.originalPrice)}</p>*/}
				</CartSubTotalHeader>
			</CartHeader>

			{/* CartList Items */}
			<CartPageContainer id={'cartPageContainer'}>
				<CartListInner>
					<CartList/>
				</CartListInner>
				<CartCheckoutNav id={'cartCheckoutNav'}
												 width={width}
												 fixed={fixed}
												 offsetLeft={offsetLeft}>
					<div className='inner'>
						<h3>Order Summery</h3>
						<CartSubTotal>
							<span>Total</span>
							<p>{displayCurrency(props.cart.originalPrice)}</p>
						</CartSubTotal>
						<ButtonStyled
							data-testid='checkout'
							onClick={toggleCheckout}
							disabled={props.cart.totalItems < 1}
							outline={false}
							color={colors.teal.i500}
							hoverColor={colors.teal.i800}
							hoverTextColor={'#fff'}
						>
							<span>Proceed To Checkout</span>
							<span>{renderSvg(svgs.Cart)}</span>
						</ButtonStyled>
					</div>
				</CartCheckoutNav>

			</CartPageContainer>

			{/*CheckOut*/}
			<CheckoutSlide
				ref={CheckoutSliderRef}
				pose={checkoutOpen ? 'open' : 'closed'}
				onPoseComplete={(type: OnPoseComplete) => {
					if (type === 'open') {
						// CheckoutSliderRef.current.style.overflowY = `scroll`
					}
				}}
			>
				<CheckoutPage
					total={cart.totalPrice}
					cartItems={cart.items}
					coupon={cart.coupon}
					initialLoad='stripe'
					toggleCheckout={toggleCheckout}
					handleChangeType={props.changeCheckout}
					user={props.user}
					freeCheckout={props.cart.totalPrice === 0 && (isPWYWItemInCart(props.cart.items, props.products) || props.cart.paymentType === 'pwyw')}
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
				</CheckoutPage>
			</CheckoutSlide>

		</CartWrapper>
	)
}

const mapStateToProps = (state: IState): any => {
	return {
		cart: state.cart,
		products: state.products,
		modal: state.modal,
		user: state.user
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

const ButtonStyled = styled(ButtonReg)`
	display: flex;
	flex-direction: row;
	width: 100%;
	align-items: center;
	margin: 0;
	text-align: left;
	
	span{
		&:nth-child(1){
			flex:1;
		}
		&:nth-child(2){
			width: 25px;
			display: flex;
			margin-left: 25px;
			align-items: center;
			svg{
				width: 100%;
			}
			path{
				fill: #fff;
			}
		}
	}
	
	&:disabled{
		background: ${colors.grey.i600};
	}
	
	@media ${device.tablet} {
		width: auto;
	}
	@media ${device.laptop} {
		cursor: pointer;
		font-size: 14px;
		span{
			&:nth-child(2){
				margin-left: 15px;
			}
		}
	}
`
const CheckoutPose = posed.div({
	open: {
		// opacity: 1,
		x: '0%',
		transition: CartSliderTransition.enter
	},
	closed: {
		// opacity: 0,
		// overflowY: 'hidden',
		x: '-100%',
		transition: CartSliderTransition.exit
	}
})
const CartCheckoutNav = styled.div<{ width: number, fixed: boolean, offsetLeft: number }>`
	background: ${colors.grey.i200};
	position: fixed;
	z-index: 2;
	bottom: 0;
	width: 100%;
	left: 0;
	border-top: 1px solid ${colors.grey.i300};
	display: flex;
	
	.inner{
		padding: 15px 20px;
		display: flex;
		flex-direction: row;
		width: 100%;
	}
	
	h3{
		display: none;
	}
	
	@media ${device.laptop} {
		z-index: 1;
		bottom: auto;
		border: none;
		grid-column: 10 / 14;
		position: relative;

		.inner{
			max-width: 293px;
			position: ${props => props.fixed ? 'fixed' : 'relative'};
			top: ${props => props.fixed ? '20px' : '0'};
			left: ${props => props.fixed ? `${props.offsetLeft}px` : 'auto'};
			width: ${props => props.fixed ? `${props.width}px` : 'auto'};
			flex-direction: column;
			background: #fff;
			border-radius: 15px;
			 ${shadowStyles.shadow3};
			justify-content: center;
			align-items: center;
		}
		
		h3{
			${Sentinel.reg};
			font-weight: 800;
			color: ${colors.grey.i800};
			font-size: 24px;
			display: flex;
			text-align: center;
		}
	}
`
const CheckoutSlide = styled(CheckoutPose)`
	position: fixed;
	top: 0;
	transform: translateX(-100%);
	background: #F7F8FC;
	width: 100%;
	height: 100%;
	z-index: 3;
	overflow-y: scroll;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
	
	@media ${device.laptop} {
		background: ${colors.grey.i200};
		overflow-y: hidden;
		//padding-right: 15px;
	}
	
	@media ${device.laptopL} {
		background: ${colors.grey.i200};
		//padding-right: 15px;
	}
		
`
const CartListInner = styled.div`
	grid-column: 2 / 4;
	margin-bottom: 80px;
	@media ${device.tablet} {
		grid-column: 2 / 14;
	}
	
	@media ${device.laptop} {
		grid-column: 2 / 10;
		position: relative;
    z-index: 3;
    margin: 0;
	}
	
`
const CartSubTotal = styled.div`
	display: none;
	span{
			color: ${colors.secondary.text};
			font-size: 16px;
			text-transform: uppercase;
			font-weight: 400;
			margin-right: 20px;
	}
	p{
		${Sentinel.semiboldItalic};
		color: ${colors.grey.i800};
		font-size: 32px;
		line-height: 32px;
		margin: 0;
	}
	@media ${device.tablet} {
		display: flex;
		flex: 1;
		flex-direction: row;
		align-items: center;    
	}
	@media ${device.laptop} {
		margin-bottom: 25px;
		width: 100%;
		justify-content: space-between;
		p{
			line-height: 34px;
		}	    
	}
		
`
const CartSubTotalHeader = styled.div`
	display: flex;
	flex-direction: column;
	text-align: right;
	width: 56px;
	
	span{
		color: ${colors.secondary.text};
		font-size: 14px;
		text-transform: uppercase;
	}
	p{
		${Sentinel.semiboldItalic};
		color: ${colors.grey.i800};
		font-weight: 600;
		font-size: 18px;
		line-height: 18px;
		margin: 0;
	}
	
	@media ${device.tablet} {
		display: none;
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
	-webkit-overflow-scrolling: touch;
	background: ${colors.grey.i200};
	display: flex;
	flex-direction: column;
	//transform:translateY(0) translateX(0);
	z-index: 5;
	//transition: all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
`

