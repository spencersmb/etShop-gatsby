import { CartPricingConfig } from '@components/cart/cartStatics'
import NumberDial from '@components/forms/inputs/numberDial'
import LicenseSelect from '@components/forms/inputs/productSelect'
import { IState } from '@et/types/State'
import {
	changeLicenseType,
	removeProductFromCart,
	updateCartItemQty as updateCartItem
} from '@redux/actions/cartActions'
import { checkForCoupon } from '@utils/cartUtils'
import { calcCouponDiscount, displayCurrency, getPrice } from '@utils/priceUtils'
import React, { useEffect, useRef, useState } from 'react'
import { IProduct, IProducts } from '@et/types/Products'
import { ICartState, IChangeLicenseData, IChangeQty } from '@et/types/Cart'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

// import styled from 'styled-components'

/**
 * CartItem properties.
 */
interface IProps {
	cartIndex: string;
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
 * 	itemSlug: this.props.cartIndex, // primary Slug name to look up the same item
 * 	extended: isExtended, // which license type are we trying to select?
 * 	products: this.props.products, // Full list of products to ref and get the new license + pricing data for
 * 	currentCartItem: this.selectedCartItem // current cart item to get the current qty selected
 * }
 *
 * Item total calculates the coupon discount on the fly so when a user saves the cart we dont save the discount
 * Same thing is done for the total cart, we check for the coupon on the fly when creating the total
 */
export function CartItem (props: IProps & IReduxProps & IReduxPropActions) {
	const { cart, cartIndex, products, changeLicense, removeItem, updateCartItemQty } = props
	const [bulkDiscount, setBulkDiscount] = useState(false)
	const selectedProduct = useRef<IProduct>(products[cartIndex])

	useEffect(() => {
		if (cart.items[cartIndex].qty > CartPricingConfig.minQuantity) {
			setBulkDiscount(true)
		}
	}, [])

	function handleLicenseChange (e: any) {
		changeLicense({
			currentCartItem: cart.items[cartIndex], // item in cart
			extended: e.target.value === 'extended', // value from dropdown
			cartItemIndex: cartIndex, // redundent?
			products, // all our products
			bulkDiscount // is bulkdiscount enabled
		})
	}

	function handleNumberDialInputChange (total: number | string) {
		const cartItemRef = cart.items[cartIndex]
		const isBulkPricing = total >= CartPricingConfig.minQuantity
		setBulkDiscount(isBulkPricing)
		updateCartItemQty({
			key: cartIndex,
			cartItem: {
				...cartItemRef,
				qty: total
			},
			bulkDiscount: isBulkPricing,
			regularPrice: getPrice(products[cartItemRef.slug])
		})

	}

	function hasCoupon (): boolean {
		return checkForCoupon(cart.coupon.product_ids, cart.items[cartIndex].id)
	}

	function calcDiscount (): string {
		const price = parseInt(cart.items[cartIndex].price, 10)
		return displayCurrency(calcCouponDiscount(cart.coupon, price))
	}

	function handleRemoveItem () {
		removeItem(cartIndex)
	}

	return (
		<div>
			<div data-testid='productName'>{products[cartIndex].name}</div>
			{/*<div>*/}
			{/*<LicenseSelect*/}
			{/*onChange={handleLicenseChange}*/}
			{/*selectedLicense={cart.items[cartIndex].extended ? 'extended' : 'standard'}*/}
			{/*showDropdown={products[cartIndex].license.hasExtendedLicense}*/}
			{/*/>*/}
			{/*</div>*/}
			{bulkDiscount &&
      <span data-testid='bulkDiscount'>Bulk discount of {CartPricingConfig.bulkDiscount} applied</span>}
			<NumberDial
				label='Quantity'
				qty={cart.items[cartIndex].qty}
				inputOnChange={handleNumberDialInputChange}
				disableInput={selectedProduct.current.pwyw}
			/>

			<div>Item:</div>
			<div data-testid='productPrice'>{displayCurrency(cart.items[cartIndex].price)}</div>
			{hasCoupon() &&
      <div>
        <div>Item discount:</div>
        <div className='jestDiscount'>-{calcDiscount()}</div>
      </div>}

			<button onClick={handleRemoveItem} data-testid='removeItemBtn'>Remove Item</button>
			<hr/>
		</div>
	)
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
		updateCartItemQty: bindActionCreators(updateCartItem, dispatch)
	}
}

export default connect<IReduxProps, IReduxPropActions, IProps, IState>(mapStateToProps, mapDispatchToProps)(CartItem)

