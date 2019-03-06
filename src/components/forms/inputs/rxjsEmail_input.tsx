import { CheckoutApi } from '@api/checkoutApi'
import { ICouponApiResponse } from '@et/types/Cart'
import React, { useEffect, useRef, useState } from 'react'
import { from, fromEvent, Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators'
import { Subscription } from 'rxjs/src/internal/Subscription'
// import {colors} from '@et/styles/base/colors'
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
}

export const RxEmailField = (props: IProps) => {
	const [loading, setLoading] = useState(false)
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

	const renderSvgColor: string = !pristine || touched
		? invalid || emailTaken
			? 'red'
			: 'green'
		: 'grey' // silver

	// console.log('error', error)
	// console.log('pristine', pristine)
	// console.log('invalid', invalid)
	// console.log('touched', touched)

	const showLabel = (): boolean => {
		if (active) {
			return true
		} else if ((dirty && !pristine) || input.value) {
			return true
		}
		return false
	}

	const messageTest = (errorObj: {} | string) => {
		if (typeof errorObj === 'string') {
			return (
				<span>{error}</span>
			)
		}
	}

	useEffect(() => {
		// Only send to server if valid email address using filter
		let inputSubscribe: Subscription
		if (inputRef.current) {
			const inputObsv: Observable<any> = fromEvent(inputRef.current, 'input')
			const inputPipe: any = inputObsv.pipe(
				map((e: any) => e.target.value),
				filter((e: string) => {
					const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)
					if (e === '' || !validEmail && !emailTaken) {
						setEmailTaken(false)
					}
					return e !== '' && validEmail
				}),
				debounceTime(1000),
				distinctUntilChanged(),
				switchMap((target: string) => {
					console.log('target', target)
					setLoading(true)
					// setEmailTaken(false)
					// submitCoupon()
					return from(CheckoutApi.checkEmail(target))
				})
			)
			inputSubscribe = inputPipe.subscribe((x: { code: number, data: { emailTaken: boolean } }) => {
				console.log('x', x)
				setLoading(false)
				switch (x.code) {
					case 200:
						if (x.data.emailTaken) {
							setEmailTaken(true)
						} else {
							setEmailTaken(false)
						}
						break
					default:
						setEmailTaken(false)
				}
			})
		}

		return () => {
			if (inputSubscribe) {
				inputSubscribe.unsubscribe()
			}
		}
	}, [])

	return (
		<div key={key} style={{ position: 'relative' }}>
			<input
				ref={inputRef}
				{...input}
				aria-label={label}
				placeholder={placeholder}
				type={type}
				disabled={disabled}
				readOnly={disabled}
			/>
			<div>{JSON.stringify(loading)}</div>
			<Label className={'renderLabel'} active={showLabel()}>{label}</Label>
			{svg && <Svg className={'renderInputSvg'} color={renderSvgColor}>
				{renderSvg(svg)}
      </Svg>}

			{!invalid && emailTaken && <div>Sorry, email is already in use.</div>}
			{touched && messageTest(error)}
			{messageTest(warning)}

		</div>
	)
}

export default RxEmailField

export const Svg = styled.div`
	path, rect{
		fill: ${(props: any) => props.color};
	}
	width: 25px;
`

interface ILabelProps {
	active: boolean;
	spencer?: string;
}

// Optional Styled-Components
// const Label = styled<ILabelProps, 'label'>('label')`
// 	display: block;
// 	color: ${(props) => props.active ? 'red' : 'blue'};
// `
// had to export this to test
export const Label = styled.label`
	display: block;
	color: ${(props: ILabelProps) => props.active ? 'green' : 'blue'};
`
