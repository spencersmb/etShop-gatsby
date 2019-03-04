import { CheckoutApi } from '@api/checkoutApi'
import { ICouponApiResponse, ICouponState } from '@et/types/Cart'
import { IState } from '@et/types/State'
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
import { Subject, Observable, from, fromEvent, merge } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, switchMap, filter } from 'rxjs/operators'
import { Subscription } from 'rxjs/src/internal/Subscription'

interface IReduxActions {
	checkCoupon: (couponCode: string) => void
	loadCoupon: ICouponSuccessAction
	invalidCoupon: () => void
	submitCoupon: () => void
}

interface IProps {
	coupon: ICouponState
}

export function CouponInput (props: IProps & IReduxActions) {
	const [input, setInput] = useState('')
	const { coupon, submitCoupon, invalidCoupon, loadCoupon } = props
	const inputRef = useRef<HTMLInputElement | null>(null)

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
						break
					default:
						invalidCoupon()
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

const mapStateToProps = (state: IState): { coupon: ICouponState } => {
	return {
		coupon: state.cart.coupon
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
	return {
		checkCoupon: bindActionCreators(submitCouponCode, dispatch),
		submitCoupon: bindActionCreators(submitCouponAction, dispatch),
		loadCoupon: bindActionCreators(loadCouponSuccess, dispatch),
		invalidCoupon: bindActionCreators(loadCouponInvalid, dispatch)

	}
}

export default connect<IProps, IReduxActions, {}, IState>(mapStateToProps, mapDispatchToProps)(CouponInput)