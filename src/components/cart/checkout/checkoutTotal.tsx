import { CartPricingConfig } from '@components/cart/cartStatics'
import CouponInput from '@components/forms/inputs/couponInput'
import { ICartState, ICouponState } from '@et/types/Cart'
import { IState } from '@et/types/State'
import { CartItemDetail, CartItemDiscount } from '@styles/modules/cartItem'
import {
	CouponButton,
	CouponButtonWrapper,
	DiscountSummary,
	OrderSummery,
	TotalSummery
} from '@styles/modules/checkout'
import { svgs } from '@svg'
import { checkCartForItemMatchingCoupon, checkForCoupon } from '@utils/cartUtils'
import { calcCouponDiscount, displayCurrency, displayPercent } from '@utils/priceUtils'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import { connect } from 'react-redux'

interface IProps {
	cart: ICartState
}

interface ILocalState {
	showCouponInput: boolean
	setShowCouponInput: any
}

function calcSavings (cart: ICartState) {
	const { coupon, originalPrice, totalPrice } = cart
	if (coupon.product_ids.length > 0) {
		return originalPrice - totalPrice
	} else {
		return calcCouponDiscount(coupon, originalPrice)
	}
}

export function CheckoutTotal (props: IProps & ILocalState) {
	const { cart, showCouponInput, setShowCouponInput } = props
	const getDiscountText = () => {
		if (cart.coupon.type === 'percent') {
			const discountToDecimal = parseInt(cart.coupon.discount, 10) / 100
			return (
				<span className={'discountLabel'}>{displayPercent(discountToDecimal)}% discount</span>
			)
		}
		return (
			<span className={'discountLabel'}>Discount applied</span>
		)
	}
	const showDiscount = (): boolean => {
		const { coupon } = cart
		// console.log('update discount', checkCartForItemMatchingCoupon(coupon.product_ids, cart.items))

		// if (coupon.type === 'fixed_product') {
		// 	// check if cart has the item listed in coupon
		// 	// returns boolean
		// 	return checkCartForItemMatchingCoupon(coupon.product_ids, cart.items)
		//
		// }
		// if (coupon.type === 'percent') {
		// 	return checkCartForItemMatchingCoupon(coupon.product_ids, cart.items)
		// }
		return checkCartForItemMatchingCoupon(coupon.product_ids, cart.items)
	}

	return (
		<OrderSummery>
			<h3>Order Summary</h3>

			<TotalSummery hasDiscount={showDiscount()}>

				{showDiscount() &&
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
					<div data-testid='orderTotal' className={'orderTotal__numbers'}>
						<span className='orderTotal__name'>Total</span>
						{displayCurrency(cart.totalPrice)}
					</div>
				</div>

			</TotalSummery>

			<CouponButtonWrapper pose={showCouponInput ? 'hide' : 'show'}>
				<CouponButton
					onClick={() => setShowCouponInput(true)}>
					<span>{renderSvg(svgs.Coupon)}</span>
					<span>Have coupon?</span>
				</CouponButton>
			</CouponButtonWrapper>

		</OrderSummery>
	)
}

const mapStateToProps = (state: IState): { cart: ICartState } => {
	return {
		cart: state.cart
	}
}
export default connect<IProps, ILocalState, {}, IState>(mapStateToProps)(CheckoutTotal)
