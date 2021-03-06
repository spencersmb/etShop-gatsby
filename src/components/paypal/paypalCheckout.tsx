import RegisterPaypalForm from '@components/paypal/paypalCheckoutForm'
import { ICartState } from '@et/types/Cart'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import React from 'react'
import { connect } from 'react-redux'

interface IProps {
	cart: ICartState
	products: IProducts
	user: IUserState
}

export function PaypalCheckout (props: IProps) {
	return <RegisterPaypalForm
		{...props}/>
}

const mapStateToProps = (state: IState): any => {
	return {
		cart: state.cart,
		products: state.products,
		user: state.user
	}
}
export default connect<IProps, {}, {}, IState>(mapStateToProps)(PaypalCheckout)