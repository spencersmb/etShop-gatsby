import Receipt from '@components/modals/receipt'
import GuestBilling from '@components/stripe/guestBilling'
import { ICartState } from '@et/types/Cart'
import { IProducts } from '@et/types/Products'
import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import { IBillingWc, IOrderDetails, IOrderResponse } from '@et/types/WC_Order'
import { cartToggle, emptyCart } from '@redux/actions/cartActions'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import { createOrder, ICreateOrderAction } from '@redux/actions/orderActions'
import { wc_createBilling, wc_createOrder } from '@utils/orderUtils'
import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { reduxForm, InjectedFormProps, reset } from 'redux-form'

interface IPropsPublic {
	stripCheckoutSubmit: (formData: any) => Promise<IOrderResponse | null>
	onSuccess: (completedOrder: IOrderResponse) => void
	onFail: () => void
}

interface IProps {
	cart: ICartState
	products: IProducts
	user: IUserState
}

interface IReduxActions {
	submitOrder: ICreateOrderAction
	closeCart: () => void
	emptyCart: () => void
	showModal: IShowModalAction
}

type AllProps = IProps & IReduxActions

export function FreeCheckoutForm (props: AllProps & InjectedFormProps<{}, AllProps>) {
	const { submitting, invalid, valid, pristine, cart, handleSubmit, user, products } = props

	async function submit (formData: any) {

		// form logic here

		// create billing depending on if user is logged in
		// get user data or return data from forms
		const billing: IBillingWc = wc_createBilling(user, formData)

		// Create the WC order for DB
		const wcOrder: IOrderDetails = wc_createOrder(cart, billing, products)

		try {
			// send order to DB
			// returns us back the order object
			const completedOrder = await props.submitOrder(wcOrder)

			console.log('completedOrder', completedOrder)
			const { order } = completedOrder
			props.showModal({
				modal: Receipt,
				options: {
					closeModal: true,
					hasBackground: false,
					data: {
						type: 'Pay What you Want',
						orderId: order.order_id,
						date: order.date,
						email: order.email,
						downloads: order.downloads,
						total: order.total
					}
				}
			})
			props.emptyCart()
			props.reset() // clear form
			setTimeout(() => {
				props.closeCart()
			}, 500)

		} catch (e) {
			console.error('DB error', e)
			return null
		}

	}

	return (
		<div data-testid='freeCheckout'>
			<form onSubmit={handleSubmit(submit)}>
				{!user && <GuestBilling/>}
				<div>
					{submitting && <div data-testid='checkoutSpinner'>Spinner</div>}
					{!submitting && <button data-testid='checkoutBtn'
            disabled={invalid || valid && pristine}
          >Purchase</button>}
				</div>
			</form>
		</div>
	)
}

export const RegisterFreeCheckoutForm = reduxForm<{}, AllProps>({
	destroyOnUnmount: false, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'freeCheckoutForm'
})(FreeCheckoutForm)

const mapStateToProps = (state: IState): any => {
	return {
		cart: state.cart,
		products: state.products,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
	return {
		submitOrder: bindActionCreators(createOrder, dispatch),
		emptyCart: bindActionCreators(emptyCart, dispatch),
		closeCart: bindActionCreators(cartToggle, dispatch),
		showModal: bindActionCreators(showModal, dispatch)
	}
}

export default connect<IProps, IReduxActions, {}, IState>(mapStateToProps, mapDispatchToProps)(RegisterFreeCheckoutForm)
