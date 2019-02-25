import { IState } from '@et/types/State'
import { displayCurrency } from '@utils/priceUtils'
import React from 'react'
import { connect } from 'react-redux'

interface IProps {
	cartTotal: number
}

export function CheckoutTotal (props: IProps) {
	return (
		<div>
			<h3>Order Summery Title</h3>
			<div data-testid='orderTotal'>Order Total: {displayCurrency(props.cartTotal)}</div>
		</div>
	)
}

const mapStateToProps = (state: IState): { cartTotal: number } => {
	return {
		cartTotal: state.cart.totalPrice
	}
}
export default connect<IProps, {}, {}, IState>(mapStateToProps)(CheckoutTotal)