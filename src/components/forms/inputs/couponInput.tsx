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
import { colors } from '@styles/global/colors'
import { CouponContainer, InputSpinner } from '@styles/modules/checkout'
import { FormGroup, FormInput, SvgValidation } from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
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
	const [active, setActive] = useState(false)
	const [pristine, setPristine] = useState(true)
	const { coupon, submitCoupon, invalidCoupon, loadCoupon, updatePrice, total } = props
	const inputRef = useRef<HTMLInputElement | null>(null)
	const prevTotal = useRef(total)
	useEffect(() => {
		prevTotal.current = total
	})

	useEffect(() => {
		prevTotal.current = total
	})

	useEffect(() => {
		let inputSubscribe: Subscription
		if (inputRef.current) {
			const inputObsv: Observable<any> = fromEvent(inputRef.current, 'input')
			const inputPipe: any = inputObsv.pipe(
				map((e: any) => e.target.value),
				filter((e: string) => e !== ''),
				debounceTime(500),
				distinctUntilChanged(),
				switchMap((target: string) => {
					if (target.length < 4) {
						return 'undefined'
					}
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
						if (inputRef.current) {
							inputRef.current.focus()
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

	const isFocused = active ? 'hasFocus' : 'noFocus'
	const isValid = coupon.valid ? 'valid' : 'invalid'
	const isEmpty = () => {
		if (!inputRef.current) {
			return
		}

		if (inputRef.current.value === '' || !inputRef.current.value) {
			return 'empty'
		}

		return 'has-value'
	}
	const showIcon = () => {
		// console.log('pristine', pristine)
		// console.log('isValid', coupon.valid)
		// console.log('coupon.submitted', coupon.submitted)

		return !pristine && coupon.submitted && !coupon.loading
			? !coupon.valid
				? <SvgValidation className={'svgValidation svgValidation--inValid'} isValid={false}>
					{renderSvg(svgs.Close)}
				</SvgValidation>
				: <SvgValidation className={'svgValidation svgValidation--valid'} isValid={true}>
					{renderSvg(svgs.Checkmark)}
				</SvgValidation>
			: null
	}

	return (
		<CouponContainer>
			<form>
				{/*{coupon.valid && <span data-testid='valid-notice'>Valid code!</span>}*/}
				{/*{!coupon.valid && coupon.submitted && <span data-testid='invalid-notice'>Invalid code!</span>}*/}
				{/*<div>{JSON.stringify(coupon.loading)}</div>*/}
				<FormGroup data-testid={'formGroup'} className={'formGroup__Container'}>
					<FormInput className={`formInput`}>
						<div data-testid={'formGroupTest'}
								 className={`formGroup ${isFocused} ${isValid} ${isEmpty()}`}>
							<label
								htmlFor='couponInput'
								className={'renderLabel'}>
								Enter Coupon Code
							</label>
							<input
								ref={inputRef}
								id='couponInput'
								aria-label={'coupon'}
								type='text'
								onFocus={() => {
									setActive(true)
								}}
								onBlur={() => {
									setActive(false)
								}}
								onChange={() => {
									if (pristine) {
										setPristine(false)
									}
								}}
								data-testid='couponInput'
								defaultValue={input || ''}
								disabled={coupon.loading}
								// readOnly={coupon.loading}
							/>
							{showIcon()}
							{<InputSpinner
								spinnerColor={colors.purple.i500}
								submitting={coupon.loading}
								data-testid='spinner' className='submit__spinner'>
								<svg className='spinner' viewBox='0 0 50 50'>
									<circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='6'/>
								</svg>
							</InputSpinner>}
						</div>
					</FormInput>
				</FormGroup>

			</form>
		</CouponContainer>
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
