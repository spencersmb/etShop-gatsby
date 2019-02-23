import CartItem from '@components/cart/cartItem'
import { ICartState } from '@et/types/Cart'
import { IState } from '@et/types/State'
import React from 'react'
import { connect } from 'react-redux'

interface IProps {
	cart: ICartState,
}

export function CartList (props: IProps) {
	const { cart } = props
	const itemsKeyArray: string[] = Object.keys(cart.items)

	if (itemsKeyArray.length < 1) {
		return (
			<div>Your cart is empty</div>
		)
	}
	return (
		<div data-testid='cartList'>
			{itemsKeyArray
				.map((slug, index) =>
					<CartItem
						cartIndex={slug}
						key={index}
					/>
				)}
		</div>
	)
}

const mapStateToProps = (state: IState): any => {
	return {
		cart: state.cart
	}
}

export default connect<IProps, {}, {}, IState>(mapStateToProps)(CartList)