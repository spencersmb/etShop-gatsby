import { ICartState, ICouponState } from '@et/types/Cart'
import { IState } from '@et/types/State'
import { calcCouponDiscount, displayCurrency } from '@utils/priceUtils'
import React from 'react'
import { connect } from 'react-redux'

interface IProps {
	cart: ICartState
}

function calcSavings (cart: ICartState) {
	const { coupon, originalPrice, totalPrice } = cart
	if (coupon.product_ids.length > 0) {
		return originalPrice - totalPrice
	} else {
		return calcCouponDiscount(coupon, originalPrice)
	}
}

export function CheckoutTotal (props: IProps) {
	const { cart } = props
	return (
		<div>
			<h3>Order Summery Title</h3>
			<div data-testid='orderTotal'>Order Total: {displayCurrency(cart.totalPrice)}</div>
			{cart.coupon.valid && <div>
        <div>
          Original total:
					{displayCurrency(cart.originalPrice)}
        </div>
        <div>
          Discount applied:
          -{displayCurrency(calcSavings(cart)).substring(1)}
        </div>
      </div>}
		</div>
	)
}

const mapStateToProps = (state: IState): { cart: ICartState } => {
	return {
		cart: state.cart
	}
}
export default connect<IProps, {}, {}, IState>(mapStateToProps)(CheckoutTotal)