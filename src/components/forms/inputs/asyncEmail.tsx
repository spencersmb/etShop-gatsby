import { InputError, SpinnerContainer, SvgValidation } from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import React, { useRef } from 'react'
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

	const inputRef = useRef<HTMLInputElement | null>(null)
	const {
		key,
		input,
		label,
		type,
		disabled,
		placeholder,
		meta: { asyncValidating, pristine, touched, invalid, active, dirty, error, warning }
	} = props

	// console.log('error', error)
	// console.log('pristine', pristine)
	// console.log('invalid', invalid)
	// console.log('touched', touched)

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
				<SpinnerContainer show={asyncValidating}>
					<svg className='spinner' viewBox='0 0 50 50'>
						<circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='6'/>
					</svg>
				</SpinnerContainer>

				{(!asyncValidating && !active) || (error) ? showIcon() : null}
				{/*{messageTest(warning)}*/}
			</div>
			{/*{!invalid && emailTaken && <InputError>*/}
			{/*  <span>Sorry, email is already in use</span>*/}
			{/*</InputError>}*/}
			{touched && error && <InputError>{messageTest(error)}</InputError>}
		</>
	)
}

export default RxEmailField

