import { CheckoutApi } from '@api/checkoutApi'
import { ICouponApiResponse, ICouponState } from '@et/types/Cart'
import { IState } from '@et/types/State'
import { updateCartPrice } from '@redux/actions/cartActions'
import {
	ICouponSuccessAction,
	loadCouponInvalid,
	loadCouponSuccess,
	submitCoupon as submitCouponAction,
	submitCouponCode
} from '@redux/actions/couponActions'
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { Observable, from, fromEvent } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, switchMap, filter } from 'rxjs/operators'
import { Subscription } from 'rxjs/src/internal/Subscription'

interface IReduxActions {
	checkCoupon: (couponCode: string) => void
	loadCoupon: ICouponSuccessAction
	invalidCoupon: () => void
	submitCoupon: () => void
	updatePrice: () => void
}

interface IProps {
	coupon: ICouponState
	total: number
}

export function CouponInput (props: IProps & IReduxActions) {
	const [input, setInput] = useState('')
	const { coupon, submitCoupon, invalidCoupon, loadCoupon, updatePrice, total } = props
	const inputRef = useRef<HTMLInputElement | null>(null)
	const prevTotal = useRef(total)

	useEffect(() => {
		prevTotal.current = total
	})

	useEffect(() => {
		let inputSubscribe: Subscription
		if (inputRef.current) {
			const inputObsv: Observable<any> = fromEvent(inputRef.current, 'input')
			const inputPipe: any = inputObsv.pipe(
				map((e: any) => e.target.value),
				filter((e: string) => e !== '' && e.length > 4),
				debounceTime(500),
				distinctUntilChanged(),
				switchMap((target: string) => {
					submitCoupon()
					return from(CheckoutApi.checkCoupon(target))
				})
			)
			inputSubscribe = inputPipe.subscribe((x: ICouponApiResponse) => {
				switch (x.code) {
					case 200:
						loadCoupon(x.data.coupon)
						updatePrice()
						break
					default:
						invalidCoupon()
						if (total !== prevTotal.current) {
							updatePrice()
						}
				}
			})
		}

		if (coupon.valid) {
			setInput(coupon.code)
		}

		return () => {
			if (inputSubscribe) {
				inputSubscribe.unsubscribe()
			}
		}
	}, [])

	return (
		<form>
			{coupon.valid && <span data-testid='valid-notice'>Valid code!</span>}
			{!coupon.valid && coupon.submitted && <span data-testid='invalid-notice'>Invalid code!</span>}
			<label htmlFor='coupon'>Coupon</label>
			<div>{JSON.stringify(coupon.loading)}</div>
			<input
				ref={inputRef}
				id='couponInput'
				aria-label={'coupon'}
				type='text'
				// onChange={handleInputChange}
				data-testid='couponInput'
				defaultValue={input || ''}
				placeholder='Enter Promo Coupon'
				// readOnly={coupon.loading}
			/>
		</form>
	)
}

const mapStateToProps = (state: IState): any => {
	return {
		coupon: state.cart.coupon,
		total: state.cart.totalPrice
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
	return {
		checkCoupon: bindActionCreators(submitCouponCode, dispatch),
		submitCoupon: bindActionCreators(submitCouponAction, dispatch),
		loadCoupon: bindActionCreators(loadCouponSuccess, dispatch),
		invalidCoupon: bindActionCreators(loadCouponInvalid, dispatch),
		updatePrice: bindActionCreators(updateCartPrice, dispatch)

	}
}

export default connect<IProps, IReduxActions, {}, IState>(mapStateToProps, mapDispatchToProps)(CouponInput)