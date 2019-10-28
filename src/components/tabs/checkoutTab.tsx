import { PaymentTab } from '@styles/modules/checkout'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React, { Component } from 'react'

// import styled from 'styled-components'

/**
 * Tab properties.
 */
export interface IProps {
	/** itemIndex description */
	paymentType: string;
	handleClick: any;
	selected: boolean
}

/**
 * Tab li item.
 */
export class CheckoutTab extends Component<IProps, {}> {

	// When a tab item gets clicked we do the default action of controlling
	// what tab was clicked, but then we also check for the user function that
	// may also need to happen
	// This could also just get called after the handleClick
	// but because I wanted it to get called after setState, I passed it in as a CB fn
	tabClick = () => {
		if (this.props.paymentType !== 'pwyw') {
			this.props.handleClick(this.props.paymentType)
		}
	}

	renderPaypal = () => {
		return (
			<p className={'paypal'}>
				<span className={'cc-paypal'}>{renderSvg(svgs.Paypal)}</span>
			</p>
		)
	}

	renderStripe = () => {
		return (
			<p className={'stripe'}>
				<span className={'cc-svg'}>{renderSvg(svgs.CreditCard)}</span>
				<span className={'cc-text'}>Credit Card</span>
			</p>
		)
	}

	render () {
		return (
			<PaymentTab
				selected={this.props.selected}
				data-testid={`tab-${this.props.paymentType}`}
				onClick={this.tabClick}>
				{this.props.paymentType === 'stripe' && this.renderStripe()}
				{this.props.paymentType === 'paypal' && this.renderPaypal()}
			</PaymentTab>
		)
	}
}

export default CheckoutTab
