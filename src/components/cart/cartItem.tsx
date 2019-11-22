import { CartPricingConfig } from '@components/cart/cartStatics'
import { ICartState, IChangeLicenseData, IChangeQty, LicenseEnum } from '@et/types/Cart'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { removeProductFromCart, updateCartItemQty as updateCartItem } from '@redux/actions/cartActions'
import {
	CartItemBorder,
	CartItemContainer,
	CartItemContent,
	CartItemDashedBorder,
	CartItemDetail,
	CartItemDetails,
	CartItemDiscount,
	CartItemHeader,
	CartItemLicense,
	CartItemTitle,
	RemoveItemDesktop,
	RemoveItemMobile,
	VolumeDiscountPin
} from '@styles/modules/cartItem'
import { checkForCoupon } from '@utils/cartUtils'
import { calcCouponDiscount, displayCurrency, displayPercent } from '@utils/priceUtils'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'

// import styled from 'styled-components'

/**
 * CartItem properties.
 */
interface IProps {
	cartIndex: string;
	itemIndex: number
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
	const { cart, cartIndex, products, removeItem } = props
	const [bulkDiscount, setBulkDiscount] = useState(false)
	const cartItem = cart.items[cartIndex]
	const total = parseFloat(cartItem.price) * cartItem.qty

	useEffect(() => {
		if (cart.items[cartIndex].qty > CartPricingConfig.minQuantity) {
			setBulkDiscount(true)
		}
	}, [])

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

	function showLicenseType () {

		switch (cart.items[cartIndex].licenseType) {
			case LicenseEnum.standard:
				return(
					<CartItemLicense
						type={'standard'}>
						Standard License
					</CartItemLicense>
				)
			case LicenseEnum.extended:
				return (
					<CartItemLicense
						type={'extended'}>
						Extended License
					</CartItemLicense>
				)
			case LicenseEnum.server:
				return (
					<CartItemLicense
						type={'server'}>
						Server License
					</CartItemLicense>
				)
		}
	}

	function displaySavings () {
		const originalTotal = parseInt(products[cartItem.slug].price, 10) * cartItem.qty
		return displayCurrency(originalTotal - total)
	}

	function displayOriginalTotal () {
		return displayCurrency(parseInt(products[cartItem.slug].price, 10) * cartItem.qty)
	}

	return (
		<CartItemContainer>
			<CartItemBorder className={props.itemIndex === 0 ? 'top' : ''}>
				<svg viewBox='0 0 709 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path fillRule='evenodd' clipRule='evenodd'
								d='M331 0C331 4.41827 327.418 8 323 8C318.582 8 315 4.41827 315 0H15C8.46889 0 2.91269 4.17401 0.853516 10H708.146C706.087 4.17401 700.531 0 694 0H331Z'
								fill='#525252'/>
				</svg>
			</CartItemBorder>

			<CartItemContent>
				<CartItemHeader>
					<CartItemTitle data-testid='productName'>
						{products[cartIndex].name}
					</CartItemTitle>

					{showLicenseType()}

					<RemoveItemDesktop>
						<button onClick={handleRemoveItem} data-testid='removeItemBtn'>
							Remove Item
						</button>
					</RemoveItemDesktop>
				</CartItemHeader>

				<CartItemDashedBorder>
					<svg viewBox='0 0 2 186' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path d='M1 0L0.999992 186' stroke='#DADADA' strokeDasharray='5 5'/>
					</svg>

				</CartItemDashedBorder>

				<CartItemDetails>

					{/*Price Per License*/}
					<CartItemDetail>
						<span>Price per license</span>
						<p data-testid='productPrice'>{displayCurrency(cart.items[cartIndex].price)}</p>
					</CartItemDetail>

					{/*License Qty*/}
					<CartItemDetail>
						<span>License Qty</span>
						<p>{cart.items[cartIndex].qty}</p>
					</CartItemDetail>

					{/*Discount*/}
					{bulkDiscount &&
          <>
            <CartItemDiscount>
              <span>Original Total</span>
              <p>{displayOriginalTotal()}</p>
            </CartItemDiscount>
            <CartItemDiscount>
              <span className={'discountLabel'}>{displayPercent(CartPricingConfig.bulkDiscount)}% Savings</span>
              <div className={'discountPin'}>
                <VolumeDiscountPin>
                  Volume Discount
                </VolumeDiscountPin>
              </div>
              <div className={'discount'}>-{displaySavings()}</div>
            </CartItemDiscount>
          </>
					}

					{/*Total*/}
					<CartItemDetail total={true}>
						<span className={'totalLabel'}>total</span>
						<div className={'total'}>{displayCurrency(total)}</div>
					</CartItemDetail>
				</CartItemDetails>

				<RemoveItemMobile>
					<button onClick={handleRemoveItem} data-testid='removeItemBtn'>
						Remove Item
					</button>
				</RemoveItemMobile>
			</CartItemContent>

			<CartItemBorder bottom={true}>
				<svg viewBox='0 0 709 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path fillRule='evenodd' clipRule='evenodd'
								d='M0.853516 0C2.91269 5.82599 8.46889 10 15 10H315C315 5.58173 318.582 2 323 2C327.418 2 331 5.58173 331 10H694C700.531 10 706.087 5.82599 708.146 0H0.853516Z'
								fill='#525252'/>
				</svg>
			</CartItemBorder>
		</CartItemContainer>
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
		removeItem: bindActionCreators(removeProductFromCart, dispatch),
		updateCartItemQty: bindActionCreators(updateCartItem, dispatch)
	}
}

export default connect<IReduxProps, IReduxPropActions, IProps, IState>(mapStateToProps, mapDispatchToProps)(CartItem)

