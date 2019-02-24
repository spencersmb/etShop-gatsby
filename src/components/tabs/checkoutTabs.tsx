import CheckoutTab from '@components/tabs/checkoutTab'
import { IState } from '@et/types/State'
import { displayCurrency } from '@utils/priceUtils'
import React, { useEffect, useRef, useState } from 'react'
import { ICartState } from '@et/types/Cart'
// import {convertTotalUSD} from '@et/utils/cartUtils'
// import CouponCodeInput from '@et/forms/inputs/couponCode'

// import styled from 'styled-components'

/**
 * TabsList properties.
 */
export interface IProps {
	/** children description */
	children: any;
	freeCheckout: boolean;
	initialLoad?: string;
	cartTotal: number;
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
	const prevState = useRef(key)
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

	// onState change
	// useEffect(() => {
		// console.log('total change')
		// props.handleChangeType(getItemType(key))
	// }, [props.cartTotal])

	useEffect(() => {
		prevState.current = key
	})

	function onTabClick (itemKey: string) {

		// setState callback done with useEffects hooks in new version
		if (prevState.current !== itemKey) {
			setKey(itemKey)
			props.handleChangeType(getItemType(itemKey))
		}
	}

	function getItemType (type: string): string {

		// convert children to an array
		const items = React.Children.toArray(props.children)

		return items.reduce((prev: any, curr: any) => {
			switch (type) {
				case curr.props['data-payment']:
					return curr.props['data-payment']
				default:
					return prev.props['data-payment']
			}
		})
	}

	console.log('render test', key)
	return (
		<>
			<ul className='tabs__Nav'>
				{React.Children.toArray(props.children)
					.map((child: any, index: number) =>
						<CheckoutTab
							key={index}
							selectedTab={key}
							paymentType={child.props['data-payment']}
							handleClick={onTabClick}
						/>
					)}
			</ul>

			<div>
				<h3>Order Summery Title</h3>
				<div className='jestTotal'>Order Total: {displayCurrency(props.cartTotal)}</div>
			</div>
			{/*Possible dropdown for country code selecttion goes here*/}
			{/*<div>*/}
			{/*<CouponCodeInput/>*/}
			{/*</div>*/}

			{/*Render Matching Content*/}
			{!props.freeCheckout &&
      <div className='tabs__Content'>
				{React.Children.toArray(props.children)
					.map((child: any) => {
							return child.props['data-payment'] === key ? child.props.children : null
						}
					)}
      </div>
			}
			{props.freeCheckout && <div className='freeCheckout'>Free item checkout</div>}
		</>
	)
}

export default CheckoutTabs
