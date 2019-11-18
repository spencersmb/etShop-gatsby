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
	const getDiscountText = () => {
		if(cart.coupon.type === 'percent'){
			const discountToDecimal = parseInt(cart.coupon.discount, 10) / 100
			return(
				<span className={'discountLabel'}>{displayPercent(discountToDecimal)}% discount</span>
			)
		}
		return(
			<span className={'discountLabel'}>Discount applied</span>
		)
	}
	return (
		<OrderSummery>
			<h3>Order Summery</h3>

			<TotalSummery>

				{cart.coupon.valid &&
        <DiscountSummary>
          <CartItemDetail>
            <span>Original total</span>
            <p>{displayCurrency(cart.originalPrice)}</p>
          </CartItemDetail>
          <CartItemDiscount>
						{getDiscountText()}
            <div className={'discount'}>-{displayCurrency(calcSavings(cart)).substring(1)}</div>
          </CartItemDiscount>
        </DiscountSummary>
				}

				<div className={'orderTotal__wrapper'}>
					<div data-testid='orderTotal' className={'orderTotal__numbers'}>{displayCurrency(cart.totalPrice)}</div>

					<CouponButtonWrapper pose={showCouponInput ? 'hide' : 'show'}>
						<CouponButton
							onClick={() => setShowCouponInput(true)}>
							<span>{renderSvg(svgs.Coupon)}</span>
							<span>Have coupon?</span>
						</CouponButton>
					</CouponButtonWrapper>
				</div>


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
