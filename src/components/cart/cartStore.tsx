import PoseHoc, { IPoseHoc } from '@components/animations/poseHoc'
import { OnPoseComplete } from '@et/types/Modal'
import { IState } from '@et/types/State'
import { cartLoadedComplete as cartLoaded, cartToggle, updateCartState } from '@redux/actions/cartActions'
import { CartSliderTransition } from '@styles/modules/cart'
import { getLocalStorageCart } from '@utils/cartUtils'
import { bodyScrollBar } from '@utils/windowUtils'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { ILocalStorageCart } from '@et/types/Cart'
import Cart from '@components/cart/cartLayout'

interface IPropsPrivate {
	cartIsOpen: boolean;
}

interface IPrivateActions {
	cartLoadedComplete: () => any;
	updateCartState: (cart: ILocalStorageCart) => any,
	openCart: () => void
}

interface IPropsPublic {
	defaultOpenState?: boolean
}

export const MyShoppingCart = (props: IPropsPrivate & IPrivateActions & IPropsPublic) => {
	const target = useRef<HTMLElement | null>(null)
	const bodyScrollPos = useRef(0)
	const { cartIsOpen } = props
	// onComponent mount
	useLayoutEffect(() => {
		target.current = document.querySelector('#___gatsby')

		const localStateCart: ILocalStorageCart = getLocalStorageCart()

		if (Object.keys(localStateCart).length > 0) {
			// update Cart with data from local storage
			props.updateCartState(localStateCart)
		}
		props.cartLoadedComplete()

		if (props.defaultOpenState) {
			props.openCart()
		}

	}, [])
	useEffect(() => {
		if (cartIsOpen && target.current) {
			bodyScrollPos.current = document.body.scrollTop || document.documentElement.scrollTop || 0
			bodyScrollBar.show(target.current, bodyScrollPos.current)
		}
	}, [cartIsOpen])

	return (
		<CartStyled id='cart-Container' style={{ position: 'relative', zIndex: 4 }}>
			<PoseGroup>
				{cartIsOpen &&
        <CartPose key='cart' onPoseComplete={(type: OnPoseComplete) => {

					const overlayOpen = document.querySelector('#overlay')
					if (type === 'enter' && !overlayOpen && target.current) {
						// MOVED TO USEEFFECT ABOVE
						// bodyScrollPos.current = document.body.scrollTop || document.documentElement.scrollTop || 0
						// bodyScrollBar.show(target.current, bodyScrollPos.current)
					}

					if (type === 'exit' && !overlayOpen && target.current) {
						bodyScrollBar.remove(target.current)

						document.documentElement.scrollTop = document.body.scrollTop = bodyScrollPos.current
					}

				}}>
					{({ ref }: IPoseHoc) => (
						<Cart poseRef={ref}/>
					)}
        </CartPose>
				}
			</PoseGroup>
		</CartStyled>
	)
}

const mapStateToProps = (state: IState): { cartIsOpen: boolean } => {
	return {
		cartIsOpen: state.cart.isOpen
	}
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): IPrivateActions => {
	return {
		cartLoadedComplete: bindActionCreators(cartLoaded, dispatch),
		openCart: bindActionCreators(cartToggle, dispatch),
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
		// opacity: 1,
		x: 0,
		transition: CartSliderTransition.enter
	},
	exit: {
		// opacity: 0,
		x: '-100%',
		transition: CartSliderTransition.exit
	}
})
