import { IState } from '@et/types/State'
import { device } from '@styles/global/breakpoints'
import { ButtonReg } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { chooseDiscountPercentage, displayPercent } from '@utils/priceUtils'
import styled from 'styled-components'
import { addProductToCart, cartToggle as cartToggleAction, IAddProductAction } from '../../state/actions/cartActions'
import React from 'react'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ICartState } from '@et/types/Cart'
import { IProduct } from '@et/types/Products'

interface IPropsPublic {
	handleAddToCartState: () => void;
	isInCart: boolean;
	slug: string;
	selectedProduct: IProduct;
	licenseQty: number | string;
	price: string
	total: string
	bulkDiscount: boolean,
	selectedLicense: string
}

interface IPropsReduxActions {
	addToCart: IAddProductAction,
	cartToggle: () => void,
}

interface IPropsPrivate {
	cart: ICartState,
}

export function AddToCartBtn (props: IPropsPublic & IPropsPrivate & IPropsReduxActions) {
	const { addToCart, bulkDiscount, selectedProduct, handleAddToCartState, licenseQty, price, slug, cartToggle, isInCart, total, selectedLicense } = props
	const disabled = (licenseQty === 0) || (typeof licenseQty === 'string')

	async function handleAddToCart () {
		// secure check for 0 licenses
		if (typeof licenseQty !== 'string') {
			handleAddToCartState()
			// addToCart(selectedProduct, cart.items, slug, licenseQty, price)
			addToCart(selectedProduct, slug, licenseQty, price, bulkDiscount, selectedLicense)
		}
	}

	function getButton () {
		if (isInCart) {
			return (
				<ButtonStyled
					data-testid='checkout'
					onClick={cartToggle}
					color={colors.teal.i500}
					hoverColor={colors.teal.i600}
					hoverTextColor={'#fff'}
					outline={false}
				>
					Checkout
				</ButtonStyled>
			)
		}
		return (
			<>
				<ButtonStyled
					data-testid='addToCart'
					onClick={handleAddToCart}
					disabled={disabled}
					outline={false}
					color={colors.teal.i500}
					hoverColor={colors.teal.i800}
					hoverTextColor={'#fff'}
				>
					I want this
				</ButtonStyled>
			</>
		)
	}

	return (
		<CheckoutWrapper className={'checkoutWrapper'}>
			<ButtonsWrapper className={'buttonWrapper'}>
				{bulkDiscount && <SavePercent data-testid='discount'>
          Save {displayPercent(chooseDiscountPercentage(licenseQty))}%
        </SavePercent>
				}
				<Total className={'addToCart__total'} data-testid='total'>
					<div className={'total_title'}>Total</div>
					{total}
				</Total>
				{getButton()}
			</ButtonsWrapper>
		</CheckoutWrapper>
	)

}

const SavePercent = styled.div`
	color: ${colors.primary.pink};
	line-height: 18px;
	flex: 1;
	margin: 0 0 15px;
	font-size: 18px;
	font-weight: bold;
	
	.checkoutNavBar & {
		display: none;
	}
	
	@media ${device.tablet} {
		margin:0 10px 0;
		flex: 1;
		text-align: right;
	}
		
`
const CheckoutWrapper = styled.div`
display: flex;
flex-direction: column;
max-width: 484px;
margin: 0 auto;
padding-top: 15px;
border-top: 1px solid ${colors.grey.i600};

	.checkoutNavBar & {
		border: none;
		padding:0;
	}
`
const ButtonsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;

	@media ${device.tablet} {
		flex-wrap: inherit;
	}
	
`
const Total = styled.div`
	${Sentinel.semiboldItalic};
	margin:0 15px 15px 0;
	font-size: 21px;
	color: ${colors.primary.text};
	flex: 1;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	.total_title{
		font-size: 14px;
		text-transform: uppercase;
		font-family: inherit;
		margin-right: 10px;
	}
	
	@media ${device.tablet} {
		margin:0 15px 0;
		text-align: right;
		flex: 0;
	}
`
const ButtonStyled = styled(ButtonReg)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0;
	flex: 1 100%;
	
	span{
		${Sentinel.italic};	
		font-weight: 500;
		font-size: 24px;
		line-height: 24px;
		margin-left: 15px; 
	}
	
	@media ${device.tablet} {
		flex:inherit;
	}
		
`

const mapStateToProps = (state: IState): { cart: ICartState } => {
	return {
		cart: state.cart
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		addToCart: bindActionCreators(addProductToCart, dispatch),
		cartToggle: bindActionCreators(cartToggleAction, dispatch)
	}
}

export default connect<IPropsPrivate, IPropsReduxActions, IPropsPublic, IState>(mapStateToProps, mapDispatchToProps)(AddToCartBtn)
