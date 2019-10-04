import { InputError, SvgValidation } from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import React from 'react'
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
	autoComplete?: boolean
}

//
// const upperCaseFirstLetter = (element: string) => {
// 	return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
// }
// const removeDotFromName = (name: string) => {
// 	// return name.split('.')[0]
// }
export const RenderField = (props: IProps) => {
	const {
		key,
		input,
		label,
		type,
		disabled,
		placeholder,

		// autoComplete,
		svg,
		meta: { pristine, touched, invalid, active, dirty, error, warning }
	} = props

	const renderSvgColor: string = !pristine || touched
		? invalid
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

	const showIcon = () => {

		return !pristine || touched
			? invalid
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

	const messageTest = (errorObj: {} | string) => {
		if (typeof errorObj === 'string') {
			return (
				<span>{error}</span>
			)
		}
	}

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
					{...input}
					aria-label={label}
					placeholder={placeholder}
					type={type}
					disabled={disabled}
					readOnly={disabled}
				/>
				{showIcon()}
				{/*{messageTest(warning)}*/}

			</div>

			{touched && <InputError>{messageTest(error)}</InputError>}

		</>
	)
}

export default RenderField

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
