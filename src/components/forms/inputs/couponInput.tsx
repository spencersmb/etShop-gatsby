import { ICouponState } from '@et/types/Cart'
import { IState } from '@et/types/State'
import { submitCouponCode } from '@redux/actions/couponActions'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'

interface IReduxActions {
	checkCoupon: (couponCode: string) => void
}

interface IProps {
	coupon: ICouponState
}

export function CouponInput (props: IProps & IReduxActions) {
	const [input, setInput] = useState('')
	const { coupon, checkCoupon } = props

	useEffect(() => {
		if (coupon.valid) {
			setInput(coupon.code)
		}
	}, [])

	function handleSubmit (e: any) {
		e.preventDefault()
		if (input !== '') {
			checkCoupon(input)
		}
	}

	function handleInputChange (e: any) {
		setInput(e.target.value)
	}

	return (
		<form onSubmit={handleSubmit}>
			{coupon.valid && <span data-testid='valid-notice'>Valid code!</span>}
			{!coupon.valid && coupon.submitted && <span data-testid='invalid-notice'>Invalid code!</span>}
			<label htmlFor='coupon'>Coupon</label>
			<input
				aria-label={'coupon'}
				type='text'
				onChange={handleInputChange}
				data-testid='couponInput'
				value={input}
				readOnly={coupon.loading}/>
			<button type='submit' data-testid='couponSubmitBtn'
							disabled={coupon.loading || input === ''}>{coupon.loading ? 'Checking...' : 'Submit'}</button>
		</form>
	)
}

const mapStateToProps = (state: IState): { coupon: ICouponState } => {
	return {
		coupon: state.cart.coupon
	}
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		checkCoupon: bindActionCreators(submitCouponCode, dispatch)
	}
}
export default connect<IProps, IReduxActions, {}, IState>(mapStateToProps, mapDispatchToProps)(CouponInput)