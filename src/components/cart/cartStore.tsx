import PoseHoc, { IPoseHoc } from '@components/animations/poseHoc'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { media } from '@styles/global/breakpoints'
import * as React from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import styled from 'styled-components'
// import CartCheckout from '@et/cart/checkout'
// import {getLocalStorageCart} from '@et/utils/cartUtils'
// import {cartLoadedComplete, cartToggle, updateCartState} from '@et/actions/cartActions'
import posed, { PoseGroup } from 'react-pose'
import { ICartState } from '@et/types/Cart'
import Cart from '@components/cart/cartLayout'

interface IPropsReduxState {
	cart: ICartState;
	products: IProducts;
}

interface IPropsReduxActions {
	// cartLoadedComplete: () => void;
	cartToggle: () => void;
	// updateCartState(cart: ILocalStorageCart): void;
}

interface IProps {
	defaultOpenState?: boolean
}

interface IComponentState {
	isOpen: boolean
}

export class MyShoppingCart extends React.Component<IProps & IPropsReduxState & IPropsReduxActions, IComponentState> {

	constructor (props: IProps & IPropsReduxState & IPropsReduxActions) {
		super(props)
		this.getState = this.getState.bind(this)
	}

	getState (): void {
		if (this.props.defaultOpenState) {
			// open by defautl
			this.props.cartToggle()
		}
	}

	componentDidMount () {
		// check for items in cart on page refresh
		// const localStateCart: ILocalStorageCart = getLocalStorageCart()
		//
		// if (Object.keys(localStateCart).length > 0) {
		// 	// init redux
		// 	this.props.updateCartState(localStateCart)
		// }
		//
		// this.props.cartLoadedComplete()
		// this.getState()
	}

	render () {
		return (
			<CartStyled style={{ position: 'relative', zIndex: 3 }}>
				<PoseGroup>
					{this.props.cart.isOpen &&
          <CartPose key='cart'>
						{({ ref }: IPoseHoc) => (
							<Cart poseRef={ref}/>
						)}
          </CartPose>
					}
				</PoseGroup>
			</CartStyled>
		)
	}
}

const mapStateToProps = (state: IState): any => {
	return {
		cart: state.cart,
		products: state.products
	}
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		// cartLoadedComplete: bindActionCreators(cartLoadedComplete, dispatch),
		// cartToggle: bindActionCreators(cartToggle, dispatch)
		// updateCartState: bindActionCreators(updateCartState, dispatch)
	}
}

export default connect<IPropsReduxState, IPropsReduxActions, IProps, IState>(mapStateToProps, mapDispatchToProps)(MyShoppingCart)

// Styles
const CartStyled = styled.div`
	p{
		color: red;
		${media.tablet`
			color: green;
		`}
	}
`

// animations
const CartPose = posed(PoseHoc)({
	enter: {
		opacity: 1
	},
	exit: {
		opacity: 0
	}
})
