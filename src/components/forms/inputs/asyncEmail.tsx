import { CheckoutApi } from '@api/checkoutApi'
import { ICouponApiResponse } from '@et/types/Cart'
import { InputError, SvgValidation } from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import { useSetState } from '@utils/stateUtils'
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
	const [state, setState] = useSetState({
		loading: false,
		response: false
	})
	console.log('props async', props)

	const { loading, response } = state
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
		meta: { asyncValidating, pristine, touched, invalid, active, dirty, error, warning }
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

	const showIcon = () => {

		return !pristine || touched
			? (invalid)
				? <SvgValidation isValid={false}>
					{renderSvg(svgs.Close)}
				</SvgValidation>
				: <SvgValidation isValid={true}>
					{renderSvg(svgs.Checkmark)}
				</SvgValidation>
			: null
	}

	const isFocused = active ? 'hasFocus' : 'noFocus'
	const isValid = !invalid ? 'valid' : 'invalid'
	const isEmpty = input.value === '' ? 'empty' : 'has-value'

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
				<div style={{ position: 'absolute', right: 0, top: 0 }}>{JSON.stringify(asyncValidating)}</div>

				{!loading && showIcon()}
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
