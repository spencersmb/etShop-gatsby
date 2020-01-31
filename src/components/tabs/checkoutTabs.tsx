import ProfileCard from '@components/account/profileCard'
import CheckoutTotal from '@components/cart/checkout/checkoutTotal'
import CartLogin from '@components/cart/login/cartLogin'
import FreeCheckoutForm from '@components/forms/freeItem-checkout'
import CouponInput from '@components/forms/inputs/couponInput'
import CheckoutTab from '@components/tabs/checkoutTab'
import { OnPoseComplete } from '@et/types/Modal'
import { IUserState } from '@et/types/User'
import { device } from '@styles/global/breakpoints'
import { GridFluid } from '@styles/global/cssGrid'
import { CartHeader, CartHeaderTitle } from '@styles/modules/cart'
import { CartInner, CheckoutFormLabel, CheckoutTabs, CouponWrapper } from '@styles/modules/checkout'
import { svgs } from '@svg'
import { checkCartForItemMatchingCoupon } from '@utils/cartUtils'
import { reduceChildrenByDataType } from '@utils/genUtils'
import { renderSvg } from '@utils/styleUtils'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

/**
 * TabsList properties.
 */
export interface IProps {
	/** children description */
	children: any;
	freeCheckout: boolean;
	initialLoad?: string;
	handleChangeType: (type: string) => void
	toggleCheckout: () => void
	user: IUserState
	total: any
	coupon: any
	cartItems: any
}

/**
 * TabsList
 *
 * How it works:
 * onInitialize - first set to passed in initializer or default stripe
 * onInitialize - check if pwyw is enabled and set that payment type via redux
 * Render Tabs: map over component children and render a tab item for each one
 * Render Tab content: maps over each child and matches state to the item[data-payment]
 *
 * Interactions:
 * When a Tab item gets clicked we fire a clickHandler like usual.
 * The difference is we have an extra function that needs to get called from a child element, which is not the
 * element that is getting clicked initially. So we map over each child element, take clickHandler1 and
 * pass it to the Tab component. When the tab component gets clicked, we fire clickHandler2 that then
 * calls clickHandler1 with a value.
 */

export const CheckoutPage = (props: IProps) => {
	const { total, coupon, cartItems, handleChangeType } = props
	const [key, setKey] = useState('stripe')
	const [showCouponInput, setShowCouponInput] = useState(false)

	// onMount
	useEffect(() => {

		if (!props.initialLoad) {
			setKey('stripe')
		} else {

			setKey(props.initialLoad)
			props.handleChangeType(props.initialLoad)
		}
		// onload check if there is a free item in the cart and the total is 0
		// set the payment type to pwyw
		if (props.freeCheckout) {
			props.handleChangeType('pwyw')
		}

	}, [])

	useEffect(() => {
		console.log('total', total)
		console.log('coupon', coupon)

		if (total === 0 && coupon.product_ids.length > 0) {
			const isFound = checkCartForItemMatchingCoupon(coupon.product_ids, cartItems)
			if (isFound) {
				handleChangeType('pwyw')
			}
		}
		if (total === 0 && coupon.product_ids.length === 0) {
			handleChangeType('pwyw')
		}
	}, [coupon, cartItems, total])

	function onTabClick (itemKey: string) {

		// setState callback done with useEffects hooks in new version
		if (key !== itemKey) {
			setKey(itemKey)
			props.handleChangeType(reduceChildrenByDataType(itemKey, props.children, 'data-payment'))
		}
	}

	return (
		<div>
			<CartHeader>
				<div
					data-testid='close-btn'
					className='closeCheckoutBtn jestCloseCheckout'
					onClick={props.toggleCheckout}>
					{renderSvg(svgs.ArrowLeft)}
				</div>
				<CartHeaderTitle>
					<h2>Checkout</h2>
				</CartHeaderTitle>
				<div className='spacer' style={{ width: '56px' }}/>
			</CartHeader>
			<CheckOutContainer>

				<CartLogin/>

				<CartInner>

					<CheckoutTotal
						showCouponInput={showCouponInput}
						setShowCouponInput={setShowCouponInput}
					/>

					{!props.freeCheckout &&
          <CheckoutTabs data-testid='tabs__Nav'>
            <CheckoutFormLabel>
              SELECT PAYMENT
            </CheckoutFormLabel>
            <div className='inner'>
							{React.Children.toArray(props.children)
								.map((child: any, index: number) =>
									<CheckoutTab
										key={index}
										selected={child.props['data-payment'] === key}
										paymentType={child.props['data-payment']}
										handleClick={onTabClick}
									/>
								)}
            </div>
          </CheckoutTabs>
					}

					<CouponWrapper
						pose={showCouponInput ? 'show' : 'hide'}
						className={showCouponInput ? 'couponOpen' : 'couponhide'}
						onPoseComplete={(type: OnPoseComplete) => {
							if (type === 'open') {

								// check width for laptop or larger to do the padding issue
								// bodyScrollPos.current = document.body.scrollTop || document.documentElement.scrollTop || 0
								// bodyScrollBar.show(CheckoutSliderRef.current, bodyScrollPos.current)
								// if (window.innerWidth > 1024) {
								// 	// CheckoutSliderRef.current.style.padding = `0px`
								// }
							}
						}
						}>
						<CouponInput/>
					</CouponWrapper>

					{props.user && <ProfileCard/>}


					{/*Render Matching Payment Form Content*/}
					{!props.freeCheckout &&
          <div data-testid='tabs__Content' style={{ flex: 1 }}>
						{React.Children.toArray(props.children)
							.map((child: any) => {
									return child.props['data-payment'] === key ? child.props.children : null
								}
							)}
          </div>
					}
					{props.freeCheckout && <FreeCheckoutForm/>}


				</CartInner>

			</CheckOutContainer>
		</div>

	)
}
const CheckOutContainer = styled(GridFluid)`
 margin: 0 auto;
 width: 100%;
 align-items: flex-start;
 @supports(display: grid){
 	padding: 0;
 	grid-row-gap: 0;
	height: 100%;
	grid-template-rows: auto auto 1fr;
 }
 
 @media ${device.laptop} {
 	max-width: 1050px;
 	margin: 0 auto;
 }
 	
`
export default CheckoutPage
