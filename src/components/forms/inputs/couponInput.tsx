import { CheckoutApi } from '@api/checkoutApi'
import { ICartItemWithKey, ICartState, ICouponApiResponse, ICouponRaw, ICouponState } from '@et/types/Cart'
import { IState } from '@et/types/State'
import { changeCheckoutType, updateCartPrice } from '@redux/actions/cartActions'
import {
	ICouponSuccessAction,
	loadCouponInvalid,
	loadCouponSuccess,
	submitCoupon as submitCouponAction,
	submitCouponCode
} from '@redux/actions/couponActions'
import { colors } from '@styles/global/colors'
import { CheckoutFormLabel, CouponContainer, InputSpinner } from '@styles/modules/checkout'
import { FormGroup, FormInput, SvgValidation } from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import { toastrOptions } from '@utils/apiUtils'
import { checkCartForItemMatchingCoupon } from '@utils/cartUtils'
import { renderSvg } from '@utils/styleUtils'
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { Observable, from, fromEvent } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, switchMap, filter } from 'rxjs/operators'
import { Subscription } from 'rxjs/src/internal/Subscription'
import { toastr } from 'react-redux-toastr'

interface IReduxActions {
	checkCoupon: (couponCode: string) => void
	loadCoupon: ICouponSuccessAction
	invalidCoupon: () => void
	submitCoupon: () => void
	updatePrice: () => void
	changeCheckout: (type: string) => void
}

interface IProps {
	coupon: ICouponState
	total: number
	cart: ICartState
}

export function CouponInput (props: IProps & IReduxActions) {
	const [input, setInput] = useState('')
	const [active, setActive] = useState(false)
	const [pristine, setPristine] = useState(true)
	const { coupon, submitCoupon, invalidCoupon, loadCoupon, updatePrice, total, cart, changeCheckout } = props
	const inputRef = useRef<HTMLInputElement | null>(null)
	const prevTotal = useRef(total)

	useEffect(() => {
		prevTotal.current = total
	})

	useEffect(() => {
		if (coupon.valid) {
			setActive(true)
			setPristine(false)
		}
	}, [])

	// useEffect(() => {
	// 	if (total === parseInt(coupon.discount, 10) && coupon.type !== 'percent') {
	// 		const isFound = checkCartForItemMatchingCoupon(coupon.product_ids, cartItems)
	// 		if (isFound) {
	// 			changeCheckout('pwyw')
	// 		}
	// 	}
	// })

	useEffect(() => {
		let inputSubscribe: Subscription
		if (inputRef.current) {
			const inputObsv: Observable<any> = fromEvent(inputRef.current, 'input')
			const inputPipe: any = inputObsv.pipe(
				map((e: any) => e.target.value),
				filter((e: string) => e !== ''),
				debounceTime(2000),
				distinctUntilChanged(),
				switchMap((target: string) => {
					if (target.length < 4) {
						return {
							data: {
								error: true
							}
						}.toString()
					}
					submitCoupon()
					toastr.clean()
					return from(CheckoutApi.checkCoupon(target))
				})
			)
			inputSubscribe = inputPipe
				.subscribe((x: ICouponApiResponse | string) => {

					if (typeof x === 'string') {
						return
					}

					const newCoupon: ICouponRaw = x.data.coupon

					// console.log('newCoupon', newCoupon)
					if (!newCoupon) {
						toastr.error('Invalid', 'Invalid Coupon', toastrOptions.noHover)
						invalidCoupon()
						// Sync up total and and prevTotal Ref locally
						updatePrice()
						if (total !== prevTotal.current) {
						}

						// focus back into the input
						if (inputRef.current) {
							// inputRef.current.blur()
						}
						return
					}

					// check if valid server response but no coupon found or expired or invalid types fall into this category
					if (newCoupon.error) {

						toastr.error('Invalid', newCoupon.error.message, toastrOptions.noHover)
						invalidCoupon()
						// Sync up total and and prevTotal Ref locally
						if (total !== prevTotal.current) {
							updatePrice()
						}

						// focus back into the input
						if (inputRef.current) {
							inputRef.current.focus()
						}
						return
					}

					// if there is no error check if a coupon applies to a product in the cart and add it in if found, or reject if not found
					// if (newCoupon.discount_type === 'fixed_product') {
					// 	const isFound = checkCartForItemMatchingCoupon(newCoupon.product_ids, cartItems)
					// 	if (!isFound) {
					// 		toastr.warning('Coupon Item', 'Coupon added but no items matching it are in the cart.', toastrOptions.noHover)
					// 	}
					// }

					loadCoupon(newCoupon)
					updatePrice()
					const isFound = checkCartForItemMatchingCoupon(newCoupon.product_ids, cart.items)
					if (!isFound && newCoupon.product_ids.length > 0) {
						toastr.warning('Coupon Item', 'Coupon added but no items matching it are in the cart.', toastrOptions.noHover)
					}
					if (inputRef.current) {
						inputRef.current.blur()
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
		// console.log('coupon.submitted', coupon.submitted)

		return !pristine && coupon.submitted && !coupon.loading
			? !coupon.valid
				? <SvgValidation className={'svgValidation svgValidation--inValid'}
												 isValid={false}>
					{renderSvg(svgs.Close)}
				</SvgValidation>
				: <SvgValidation className={'svgValidation svgValidation--valid'} isValid={true}>
					{renderSvg(svgs.Checkmark)}
				</SvgValidation>
			: null
	}

	return (
		<CouponContainer>
			<CheckoutFormLabel>
				COUPON
			</CheckoutFormLabel>
			<form>
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
		total: state.cart.totalPrice,
		cart: state.cart
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
	return {
		checkCoupon: bindActionCreators(submitCouponCode, dispatch),
		submitCoupon: bindActionCreators(submitCouponAction, dispatch),
		loadCoupon: bindActionCreators(loadCouponSuccess, dispatch),
		invalidCoupon: bindActionCreators(loadCouponInvalid, dispatch),
		updatePrice: bindActionCreators(updateCartPrice, dispatch),
		changeCheckout: bindActionCreators(changeCheckoutType, dispatch)

	}
}

export default connect<IProps, IReduxActions, {}, IState>(mapStateToProps, mapDispatchToProps)(CouponInput)
