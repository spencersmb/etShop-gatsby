import CheckoutTotal from '@components/cart/checkout/checkoutTotal'
import CartLogin from '@components/cart/login/cartLogin'
import CouponInput from '@components/forms/inputs/couponInput'
import CheckoutTab from '@components/tabs/checkoutTab'
import { reduceChildrenByDataType } from '@utils/genUtils'
import React, { useEffect, useState } from 'react'

// import styled from 'styled-components'

/**
 * TabsList properties.
 */
export interface IProps {
	/** children description */
	children: any;
	freeCheckout: boolean;
	initialLoad?: string;
	handleChangeType: (type: string) => void
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

export const CheckoutTabs = (props: IProps) => {
	const [key, setKey] = useState('stripe')
	// onMount
	useEffect(() => {
		if (props.initialLoad && props.initialLoad !== 'stripe') {
			setKey(props.initialLoad)
		}

		if (props.freeCheckout) {
			props.handleChangeType('pwyw')
		}

		return () => {
		}

	}, [])

	function onTabClick (itemKey: string) {

		// setState callback done with useEffects hooks in new version
		if (key !== itemKey) {
			setKey(itemKey)
			props.handleChangeType(reduceChildrenByDataType(itemKey, props.children, 'data-payment'))
		}
	}

	return (
		<>
			<ul data-testid='tabs__Nav'>
				{React.Children.toArray(props.children)
					.map((child: any, index: number) =>
						<CheckoutTab
							key={index}
							paymentType={child.props['data-payment']}
							handleClick={onTabClick}
						/>
					)}
			</ul>

			<CheckoutTotal/>
			<CartLogin/>
			{/*Possible dropdown for country code selecttion goes here*/}
			{/*<div>*/}
			{/*<CouponCodeInput/>*/}
			<div>
				<CouponInput/>
			</div>
			{/*</div>*/}

			{/*Render Matching Content*/}
			{!props.freeCheckout &&
      <div data-testid='tabs__Content'>
				{React.Children.toArray(props.children)
					.map((child: any) => {
							return child.props['data-payment'] === key ? child.props.children : null
						}
					)}
      </div>
			}
			{props.freeCheckout && <div data-testid='freeCheckout'>Free item checkout</div>}
		</>
	)
}

export default CheckoutTabs
