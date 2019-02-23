import NumberDial from '@components/forms/inputs/numberDial'
import LicenseSelect from '@components/forms/inputs/productSelect'
import { IState } from '@et/types/State'
import { changeLicenseType, removeProductFromCart, updateCartItemQty } from '@redux/actions/cartActions'
import { displayCurrency } from '@utils/priceUtils'
import React, { Component } from 'react'
import { IProduct, IProducts } from '@et/types/Products'
import { ICartState, IChangeLicenseData, IChangeQty } from '@et/types/Cart'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import config from '../../../gatsby-config'
// import {updateCartItemQty, changeLicenseType, removeProductFromCart} from '@et/actions/cartActions'
// import {calcDiscount, checkForCoupon, convertTotalUSD} from '@et/utils/cartUtils'
// import {IChangeLicenseData, IChangeQty} from '@et/types/Actions'
// import NumberDial from '@et/forms/inputs/numberDial'
// import {testCart, testProducts} from '@et/utils/testData'

// import styled from 'styled-components'

/**
 * CartItem properties.
 */
interface IProps {
	cartSlug: string;
}

interface IReduxProps {
	cart: ICartState;
	products: IProducts;
}

interface IReduxPropActions {
	updateCartItemQty: (data: IChangeQty) => void;
	changeLicense: (data: IChangeLicenseData) => void;
	removeItem: (slug: string) => void;
}

/**
 * CartItem.
 *
 * How it works:
 * The cart item controls what license is selected. It determines if a license is standard or extended based off of
 * whether the item in the cart has a property "extended" as either true or false.
 *
 * To change the value, we look at what value was selected by the user and pass the object to our action to change it in redux.
 * The change is then reflected in the UI.
 * {
 * 	itemSlug: this.props.cartSlug, // primary Slug name to look up the same item
 * 	extended: isExtended, // which license type are we trying to select?
 * 	products: this.props.products, // Full list of products to ref and get the new license + pricing data for
 * 	currentCartItem: this.selectedCartItem // current cart item to get the current qty selected
 * }
 *
 * Item total calculates the coupon discount on the fly so when a user saves the cart we dont save the discount
 * Same thing is done for the total cart, we check for the coupon on the fly when creating the total
 */
type All = IProps & IReduxProps & IReduxPropActions

interface IStatePrivate {
	bulkDiscount: boolean
}

function getPrice (product: IProduct) {
	return product.on_sale ? product.sale_price : product.price
}

export class CartItem extends Component<All, IStatePrivate> {
	selectedProduct: IProduct

	constructor (props: All) {
		super(props)
		// must wrap this way to test correctly
		this.handleLicenseChange = this.handleLicenseChange.bind(this)
		this.selectedProduct = this.props.products[this.props.cartSlug]
		this.state = {
			bulkDiscount: this.props.cart.items[this.props.cartSlug].qty >= config.siteMetadata.pricing.minQuantity
		}
	}

	handleLicenseChange (e: any) {
		const { cart, cartSlug, products, changeLicense } = this.props
		// setState({
		// 	selectedLicense: e.target.value
		// })
		changeLicense({
			currentCartItem: cart.items[cartSlug],
			extended: e.target.value === 'extended',
			itemSlug: cartSlug,
			products,
			bulkDiscount: this.state.bulkDiscount
		})
	}

	handleNumberDialInputChange = (total: number | string) => {

		const { cartSlug, cart } = this.props
		const cartItem = cart.items[cartSlug]
		const isBulkPricing = total >= config.siteMetadata.pricing.minQuantity

		this.setState(() => {
			return {
				bulkDiscount: isBulkPricing
			}
		}, () => {
			this.props.updateCartItemQty({
				key: cartSlug,
				cartItem: {
					...cartItem,
					qty: total
				},
				bulkDiscount: this.state.bulkDiscount,
				regularPrice: getPrice(this.props.products[cartItem.slug])
			})
		})

	}

	handleRemoveItem = () => {
		this.props.removeItem(this.props.cartSlug)
	}

	// hasCoupon = (): boolean => {
	// 	const {cart, cartSlug} = this.props
	// 	return checkForCoupon(cart.couponCode.product_ids, cart.items[cartSlug].id)
	// }

	// calcDiscount = () => {
	// 	const {cart, cartSlug} = this.props
	// 	const price = parseInt(cart.items[cartSlug].price, 10)
	//
	// 	return convertTotalUSD(calcDiscount(cart.couponCode, price))
	// }

	render () {
		const { cart, cartSlug } = this.props

		// place item error here
		return (
			<div>
				<div className='jestName'>{this.selectedProduct.name}</div>
				<div>
					<LicenseSelect
						onChange={this.handleLicenseChange}
						selectedLicense={cart.items[cartSlug].extended ? 'extended' : 'standard'}
						showDropdown={this.selectedProduct.license.hasExtendedLicense}
					/>
				</div>
				{this.state.bulkDiscount && <span>Bulk discount of {config.siteMetadata.pricing.discount} applied</span>}
				<NumberDial
					label='Quantity'
					qty={cart.items[cartSlug].qty}
					inputOnChange={this.handleNumberDialInputChange}
					disableInput={this.selectedProduct.pwyw}
				/>
				{/*<NumberDial*/}
				{/*qty={cart.items[cartSlug].qty}*/}
				{/*addItem={this.handleAddItem}*/}
				{/*removeItem={this.handleSubtractItem}*/}
				{/*inputOnChange={this.handleNumberDialInputChange}*/}
				{/*>*/}
				{/*{({add, subtract, inputOnChange}) => {*/}
				{/*return (*/}
				{/*<div>*/}
				{/*<div className="jestAdd" onClick={add}>add</div>*/}
				{/*<input*/}
				{/*type='number'*/}
				{/*className='numberInput'*/}
				{/*onChange={inputOnChange}*/}
				{/*onBlur={this.testFocus}*/}
				{/*value={cart.items[cartSlug].qty}/>*/}
				{/*<div onClick={subtract}>sub</div>*/}
				{/*</div>*/}
				{/*)*/}
				{/*}}*/}
				{/*</NumberDial>*/}

				{/*Do we want to show the final price after discount???*/}
				<div>Item:</div>
				<div className='jestPrice'>{displayCurrency(cart.items[cartSlug].price)}</div>
				{/*{this.hasCoupon() &&*/}
				{/*<div>*/}
				{/*<div>Item discount:</div>*/}
				{/*<div className='jestDiscount'>-{this.calcDiscount()}</div>*/}
				{/*</div>}*/}

				<button onClick={this.handleRemoveItem}>Remove Item</button>
				<hr/>
			</div>
		)
	}
}

const mapStateToProps = (state: IState): { cart: ICartState, products: IProducts } => {
	return {
		cart: state.cart,
		products: state.products
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
	return {
		changeLicense: bindActionCreators(changeLicenseType, dispatch),
		removeItem: bindActionCreators(removeProductFromCart, dispatch),
		updateCartItemQty: bindActionCreators(updateCartItemQty, dispatch)
	}
}

export default connect<IReduxProps, IReduxPropActions, IProps, IState>(mapStateToProps, mapDispatchToProps)(CartItem)

