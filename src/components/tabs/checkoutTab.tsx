import React, { Component } from 'react'

// import styled from 'styled-components'

/**
 * Tab properties.
 */
export interface IProps {
	/** itemIndex description */
	paymentType: string;
	handleClick: any;
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
		this.props.handleClick(this.props.paymentType)
	}

	render () {
		return (
			<li data-testid={`tab-${this.props.paymentType}`} onClick={this.tabClick}>
				<span>{this.props.paymentType.toUpperCase()}</span>
			</li>
		)
	}
}

export default CheckoutTab
