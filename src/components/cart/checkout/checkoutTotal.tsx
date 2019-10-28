import { CartPricingConfig } from '@components/cart/cartStatics'
import CouponInput from '@components/forms/inputs/couponInput'
import { ICartState, ICouponState } from '@et/types/Cart'
import { IState } from '@et/types/State'
import { CartItemDetail, CartItemDetails, CartItemDiscount, VolumeDiscountPin } from '@styles/modules/cartItem'
import {
	CouponButton, CouponButtonWrapper,
	CouponContainer,
	CouponWrapper,
	DiscountSummary,
	OrderSummery,
	TotalSummery
} from '@styles/modules/checkout'
import { svgs } from '@svg'
import { calcCouponDiscount, displayCurrency, displayPercent } from '@utils/priceUtils'
import { renderSvg } from '@utils/styleUtils'
import React, { useState } from 'react'
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
	const [showCouponInput, setShowCouponInput] = useState(false)
	return (
		<OrderSummery>
			<h3>Order Summery</h3>

			<TotalSummery>

				<span>Total</span>

				{cart.coupon.valid &&
        <DiscountSummary>
          <CartItemDetail>
            <span>Original total</span>
            <p>{displayCurrency(cart.originalPrice)}</p>
          </CartItemDetail>
          <CartItemDiscount>
            <span className={'discountLabel'}>Discount applied</span>
            <div className={'discount'}>-{displayCurrency(calcSavings(cart)).substring(1)}</div>
          </CartItemDiscount>
        </DiscountSummary>
				}

				<div data-testid='orderTotal' className={'orderTotal'}>{displayCurrency(cart.totalPrice)}</div>

				<CouponButtonWrapper pose={showCouponInput ? 'hide' : 'show'}>
					<CouponButton
						onClick={() => setShowCouponInput(true)}>
						<span>{renderSvg(svgs.Coupon)}</span>
						<span>Have coupon?</span>
					</CouponButton>
				</CouponButtonWrapper>


				{/*Possible dropdown for country code selecttion goes here*/}
				<CouponWrapper pose={showCouponInput ? 'show' : 'hide'}>
					<CouponInput/>
				</CouponWrapper>
			</TotalSummery>
		</OrderSummery>
	)
}

const mapStateToProps = (state: IState): { cart: ICartState } => {
	return {
		cart: state.cart
	}
}
export default connect<IProps, {}, {}, IState>(mapStateToProps)(CheckoutTotal)
