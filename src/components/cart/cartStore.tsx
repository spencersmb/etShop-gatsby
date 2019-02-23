import PoseHoc, { IPoseHoc } from '@components/animations/poseHoc'
import { IState } from '@et/types/State'
import { cartLoadedComplete as cartLoaded, updateCartState } from '@redux/actions/cartActions'
import { getLocalStorageCart } from '@utils/cartUtils'
import React, { useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { ICartState, ILocalStorageCart } from '@et/types/Cart'
import Cart from '@components/cart/cartLayout'

interface IPropsPrivate {
	cart: ICartState;
}

interface IPrivateActions {
	cartLoadedComplete: () => any;
	updateCartState: (cart: ILocalStorageCart) => any
}

interface IPropsPublic {
	defaultOpenState?: boolean
}

export const MyShoppingCart = (props: IPropsPrivate & IPrivateActions & IPropsPublic) => {
	useLayoutEffect(() => {
		const localStateCart: ILocalStorageCart = getLocalStorageCart()

		if (Object.keys(localStateCart).length > 0) {
			// update Cart with data from local storage
			props.updateCartState(localStateCart)
		}
		props.cartLoadedComplete()

	}, [])
	return (
		<CartStyled style={{ position: 'relative', zIndex: 3 }}>
			<PoseGroup>
				{props.cart.isOpen &&
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

const mapStateToProps = (state: IState): { cart: ICartState } => {
	return {
		cart: state.cart
	}
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): IPrivateActions => {
	return {
		cartLoadedComplete: bindActionCreators(cartLoaded, dispatch),
		updateCartState: bindActionCreators(updateCartState, dispatch)
	}
}

export default connect<IPropsPrivate, IPrivateActions, IPropsPublic, IState>(mapStateToProps, mapDispatchToProps)(MyShoppingCart)

// Styles
const CartStyled = styled.div`
	
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
