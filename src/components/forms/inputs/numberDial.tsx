import React, { ChangeEvent, useEffect, useState } from 'react'

/**
 * NumberDial properties.
 */
export interface IProps {

	/** prop1 description */
	qty: number | string;
	disableInput?: boolean;
	inputOnChange: (total: number | string) => void
	label?: string
	className?: string
}

function NumberDial ({ qty = 0, inputOnChange, disableInput, className, label = '' }: IProps) {
	const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		// Match OBJECT for unit testing purposes
		if (e.target instanceof HTMLInputElement || typeof e.target === 'object'
		) {
			const inputValue: string = e.target.value

			let currentNumber: number | string = 0

			if (inputValue.length > 3) {
				return
			}

			if (inputValue) {
				currentNumber = parseInt(inputValue, 10)
			}

			if (inputValue === '') {
				currentNumber = ''
			}

			inputOnChange(currentNumber)
		}
	}

	return (
		<div className={className}>
			<label htmlFor='numberDial'>{label}</label>
			<input
				data-testid='numberDial'
				id='numberDial'
				type='number'
				className='numberInput'
				onChange={handleInputOnChange}
				value={qty}
				onKeyPress={(e) => {
					if (e.key === '.' || e.key === '-') {
						return
					}
				}}
				readOnly={disableInput}
			/>
		</div>
	)
}

export default NumberDial
