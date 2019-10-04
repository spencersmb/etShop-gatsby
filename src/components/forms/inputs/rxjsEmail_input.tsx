import { CheckoutApi } from '@api/checkoutApi'
import { ICouponApiResponse } from '@et/types/Cart'
import { InputError, SpinnerContainer, SvgValidation } from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import { useSetState } from '@utils/stateUtils'
import React, { useEffect, useRef, useState } from 'react'
import { from, fromEvent, Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators'
import { Subscription } from 'rxjs/src/internal/Subscription'
import styled from 'styled-components'
import { renderSvg } from '@utils/styleUtils'

interface InputField {
	name: string,
	onBlur: () => void,
	onChange: (el: any) => void,
	onDragStart: () => void,
	onDrop: () => void,
	onFocus: () => void,
	value: any
}

export interface InputMeta {
	active: boolean,
	asyncValidating: boolean,
	autofilled: boolean,
	dirty: boolean,
	dispatch: () => void,
	error: any,
	form: string,
	initial: any,
	invalid: boolean,
	pristine: boolean,
	submitFailed: boolean,
	submitting: boolean,
	touched: boolean,
	valid: boolean,
	warning: any
}

interface IProps {
	input: InputField,
	label: string,
	meta: InputMeta,
	type: string,
	className?: string,
	value?: any,
	id?: string,
	name?: string,
	key?: string,
	placeholder?: string,
	disabled?: boolean,
	svg?: string,
	price?: string,
	autoComplete?: boolean,
	setEmailTaken: (state: boolean) => void
	emailTaken: boolean
	loading: value
	setLoading: (state: boolean) => void
}

export const RxEmailField = (props: IProps) => {
	const [state, setState] = useSetState({
		loading: false,
		response: false
	})
	const prevState = useRef(state)
	const { response } = state
	const inputRef = useRef<HTMLInputElement | null>(null)
	const {
		key,
		input,
		label,
		type,
		disabled,
		placeholder,
		svg,
		setEmailTaken,
		emailTaken,
		meta: { pristine, touched, invalid, active, dirty, error, warning }
	} = props

	// console.log('error', error)
	// console.log('pristine', pristine)
	// console.log('invalid', invalid)
	// console.log('touched', touched)
	console.log('props', props)

	const messageTest = (errorObj: {} | string) => {
		if (typeof errorObj === 'string') {
			return (
				<span>{error}</span>
			)
		}
	}

	// useEffect(() => {
	// 	prevState.current = state
	// })

	useEffect(() => {
		// Only send to server if valid email address using filter

		let inputSubscribe: Subscription
		if (inputRef.current) {
			const inputObsv: Observable<any> = fromEvent(inputRef.current, 'input')
			const inputPipe: any = inputObsv.pipe(
				map((e: any) => {
					console.log('e target', e.srcElement.value)
					console.log('e target', e)

					return e.target.value
				}),
				filter((e: string) => {
					console.log('filter', e)

					// if (prevState.current.response) {
					// 	prevState.current.response = false
					// }

					const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)
					console.log('validEmail', validEmail)

					if (e === '' || !validEmail && !emailTaken) {
						// setEmailTaken(false)
					}

					return e !== '' && validEmail
				}),

				debounceTime(300),
				distinctUntilChanged(),
				switchMap((target: string) => {
					console.log('target', target)
					// setState({
					// 	loading: true
					// })
					// setLoading(true)
					// setEmailTaken(false)
					// submitCoupon()
					return from(CheckoutApi.checkEmail(target))
				})
			)
			inputSubscribe = inputPipe.subscribe((x: { code: number, data: { emailTaken: boolean } }) => {
				// console.log('x', x)
				switch (x.code) {
					case 200:
						if (x.data.emailTaken) {
							setEmailTaken(true)
						} else {
							setEmailTaken(false)
						}
						// setState({
						// 	response: true,
						// 	loading: false
						// })
						setLoading(false)
						break
					default:
						setEmailTaken(false)
						// setState({
						// 	response: true,
						// 	loading: false
						// })
						setLoading(false)
				}
			})
		}

		return () => {
			if (inputSubscribe) {
				console.log('unsubscribe rx')

				inputSubscribe.unsubscribe()
			}
		}
	}, [])

	const showIcon = () => {
		if (!pristine || touched) {

			if (invalid || !invalid && emailTaken) {
				return (
					<SvgValidation isValid={false}>
						{renderSvg(svgs.Close)}
					</SvgValidation>
				)
			}

			if (!invalid && !emailTaken && response && !isLoading) {
				return (
					<SvgValidation isValid={true}>
						{renderSvg(svgs.Checkmark)}
					</SvgValidation>
				)
			}
		}
	}

	const isFocused = active ? 'hasFocus' : 'noFocus'
	const isValid = !invalid ? 'valid' : 'invalid'
	const isEmpty = input.value === '' ? 'empty' : 'has-value'
	console.log('loading', isLoading)

	return (
		<>
			<div key={key} className={
				`formGroup ${isFocused} ${isValid} ${isEmpty}`
			}>
				<label
					htmlFor={input.name}
					className={'renderLabel'}
				>{label}</label>
				<input
					id={input.name}
					ref={inputRef}
					{...input}
					aria-label={label}
					placeholder={placeholder}
					type={type}
					disabled={disabled}
					readOnly={disabled}
				/>
				<SpinnerContainer show={isLoading}>
					<svg className='spinner' viewBox='0 0 50 50'>
						<circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='6'/>
					</svg>
				</SpinnerContainer>

				{!isLoading && showIcon()}
				{/*{messageTest(warning)}*/}
			</div>
			{!invalid && emailTaken && <InputError>
        <span>Sorry, email is already in use</span>
      </InputError>}
			{touched && <InputError>{messageTest(error)}</InputError>}
		</>
	)
}

export default RxEmailField

// Optional Styled-Components
// const Label = styled<ILabelProps, 'label'>('label')`
// 	display: block;
// 	color: ${(props) => props.active ? 'red' : 'blue'};
// `
// had to export this to test
