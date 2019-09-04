import { IState } from '@et/types/State'
import { ButtonReg } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
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
}

interface IPropsReduxActions {
	addToCart: IAddProductAction,
	cartToggle: () => void,
}

interface IPropsPrivate {
	cart: ICartState,
}

export function AddToCartBtn (props: IPropsPublic & IPropsPrivate & IPropsReduxActions) {
	const { addToCart, cart, selectedProduct, handleAddToCartState, licenseQty, price, slug, cartToggle, isInCart, total } = props
	const disabled = (licenseQty === 0) || (typeof licenseQty === 'string')

	async function handleAddToCart () {
		// secure check for 0 licenses
		if (typeof licenseQty !== 'string') {
			handleAddToCartState()
			addToCart(selectedProduct, cart.items, slug, licenseQty, price)
		}
	}

	function getButton () {
		if (isInCart) {
			return (
				<ButtonStyled
					data-testid='checkout'
					onClick={cartToggle}
					color={colors.teal.i500}
					hoverColor={colors.teal.i800}
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
					hoverColor={colors.teal.i500}
					hoverTextColor={'#fff'}
				>
					I want this
				</ButtonStyled>
			</>
		)
	}

	return (
		<CheckoutWrapper>
			<ButtonsWrapper>
				<Total data-testid='total'>{total}</Total>
				{getButton()}
			</ButtonsWrapper>
		</CheckoutWrapper>
	)

}

const CheckoutWrapper = styled.div`
display: flex;
flex-direction: column;
`
const ButtonsWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
`
const Total = styled.div`
	${Sentinel.italic};
	margin-right: 15px;
	font-size: 21px;
	color: ${colors.primary.text};
`
const ButtonStyled = styled(ButtonReg)`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0;
	
	span{
		${Sentinel.italic};	
		font-weight: 500;
		font-size: 24px;
		line-height: 24px;
		margin-left: 15px; 
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
