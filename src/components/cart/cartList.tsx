import CartItem from '@components/cart/cartItem'
import { ICartState } from '@et/types/Cart'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import React from 'react'
import { connect } from 'react-redux'

interface IProps {
	cart: ICartState,
	products: IProducts
}

export function CartList (props: any) {
	const { cart } = props
	const itemsKeyArray: string[] = Object.keys(cart.items)

	if (itemsKeyArray.length < 1) {
		return (
			<div/>
		)
	}
	return (
		<div>
			<p>Itemized List of items in cart</p>
			{itemsKeyArray
				.map((slug, index) =>
					<CartItem
						cartSlug={slug}
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