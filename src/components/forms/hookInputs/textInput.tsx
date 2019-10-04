import { InputError } from '@styles/modules/SignInUpModals'
import React, { useEffect, useRef, useState } from 'react'

interface IProps {
	type?: string
	name: string
	label: string
	disabled: boolean
	placeholderText: string
	value: string
	onChange: any
	onBlur: any
	errors: any
}

const messageTest = (error: string) => {
	return (
		<span>{error}</span>
	)
}
const RenderHookInput = ({ type = 'text', name, label, disabled = false, placeholderText, onChange, value, onBlur, errors }: IProps) => {
	const inputRef = useRef(null)
	const [active, setActive] = useState(false)

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.addEventListener('focus', () => {
				console.log('focus')
				setActive(true)
			})
			inputRef.current.addEventListener('blur', () => {
				console.log('blur')
				setActive(false)
			})
		}
	}, [])
	console.log('render', name)
	console.log('active', active)
	const isFocused = active ? 'hasFocus' : 'noFocus'
	const isValid = !errors[name] ? 'valid' : 'invalid'
	return (
		<>
			<div className={
				`formGroup ${isFocused} ${isValid}`
			}>
				<label
					htmlFor={name}
					className={'renderLabel'}
				>{label}</label>
				<input
					ref={inputRef}
					name={name}
					id={name}
					aria-label={label}
					type={type}
					disabled={disabled}
					readOnly={disabled}
					onChange={onChange}
					onBlur={onBlur}
					value={value}

				/>
				{/*{showIcon()}*/}
				{/*{messageTest(warning)}*/}

			</div>

			{errors[name] && <InputError>{messageTest(errors[name])}</InputError>}

		</>
	)
}

export default RenderHookInput
