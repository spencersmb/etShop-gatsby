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
import { reduceChildrenByDataType } from '@utils/genUtils'
import { renderSvg } from '@utils/styleUtils'
import React, { useLayoutEffect, useRef, useState } from 'react'
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
	calcCheckoutType: (key: string) => void
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
 * onInitialize - first set tabs to passed in initializer and default stripe
 * onInitialize - check if pwyw is enabled and set that payment type via redux
 *
 * onReRender - only runs if the component has been mounted previously
 * This checks the state once an item has been removed/added, a coupon has changed to determin the
 * correct payment type.
 * Update price happens in the coupon redux action or the add/remove item action.
 *
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
	const { total, coupon, cartItems, handleChangeType, calcCheckoutType } = props
	const [key, setKey] = useState('stripe')
	const [showCouponInput, setShowCouponInput] = useState(false)
	const mountedCount = useRef(false)

	// onMount
	useLayoutEffect(() => {

		if (props.initialLoad && !props.freeCheckout) {
			setKey(props.initialLoad)
			handleChangeType(props.initialLoad)
		} else if (props.freeCheckout) {
			handleChangeType('pwyw')
		} else {
			// default to
			setKey('stripe')
			handleChangeType('stripe')
		}

	}, [])

	// on re-render
	// example if we add or remove an item or a coupon gets changed
	// we also updatePrice here to make sure it stays in-sync and the correct
	// payment type gets selected
	useLayoutEffect(() => {
		if (mountedCount.current) {
			calcCheckoutType(key)
		}
		// const cartItemKeys = Object.keys(cartItems)
		// if (mountedCount.current && cartItemKeys.length > 0) {
		//
		// 	if (total === 0 && coupon.product_ids.length > 0) {
		// 		const isFound = checkCartForItemMatchingCoupon(coupon.product_ids, cartItems)
		// 		const firstItem: ICartItem = cartItems[cartItemKeys[0]]
		// 		const isItemPwyw = firstItem.price === '0'
		//
		// 		// if the item in the cart is paid but the coupon is for 100% off
		// 		//  change the type to PWYW so the server knows its free
		// 		if (isFound && !isItemPwyw) {
		// 			// console.log('100% off')
		// 			handleChangeType('pwyw')
		// 		}
		//
		// 		// if the item is not found in possible coupon added but is a free item
		// 		// it still should change to PWYW
		// 		if (!isFound && isItemPwyw) {
		// 			// console.log('has coupon in DB but not used, but item is free')
		// 			handleChangeType('pwyw')
		// 		}
		// 	}
		//
		// 	// if the total === 0 and there is a coupon but it has no exclusions
		// 	// make it PWYW
		// 	if (total === 0 && coupon.product_ids.length === 0) {
		// 		handleChangeType('pwyw')
		// 	}
		//
		// 	// if we switch back, set it to the key that was last selected
		// 	if (total !== 0) {
		// 		props.handleChangeType(key)
		// 	}
		// }

	}, [coupon, cartItems, total])

	useLayoutEffect(() => {
		mountedCount.current = true

		return () => {
			mountedCount.current = false
		}
	}, [])

	function onTabClick (itemKey: string) {

		// setState callback done with useEffects hooks in new version
		if (key !== itemKey) {
			setKey(itemKey)
			handleChangeType(reduceChildrenByDataType(itemKey, props.children, 'data-payment'))
		}
	}

	return (
		<div>
			<CartHeader>
				<div className={`cartHeader__inner`}>
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
				</div>

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
