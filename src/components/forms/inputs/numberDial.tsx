import React, { ChangeEvent, useEffect, useState } from 'react'

/**
 * NumberDial properties.
 */
export interface IProps {

	/** prop1 description */
	qty: number | string;
	inCart: boolean;
	inputOnChange: (total: number | string) => void
	className?: string
}

function NumberDial ({ qty = 0, inputOnChange, inCart, className }: IProps) {
	const [value, setValue] = useState<string | number>(qty)
	const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		// Match OBJECT for unit testing purposes
		if (e.target instanceof HTMLInputElement || typeof e.target === 'object'
		) {
			const inputValue: string = e.target.value

			let currentNumber: number | string = 0
			if (inputValue) {
				currentNumber = parseInt(e.target.value, 10)
			}

			if (inputValue.length > 3) {
				return
			}

			if (inputValue === '') {
				currentNumber = ''
			}

			// this.setState({currentSize: currentNumber}) // Change state and value on user screen
			// if (inputOnChange) {
			// 	setValue(currentNumber) // change value in redux
			// }
			console.log('currentNumber', typeof inputValue)

			setValue(currentNumber)
		}
	}
	const onBlurChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === '') {
			inputOnChange(1)
			setValue(1)
		} else {
			inputOnChange(e.target.value)
		}
	}
	useEffect(() => {

	}, [value])

	return (
		<div className={className}>
			<label htmlFor='numberDial'>Select number of license</label>
			<input
				data-testid='numberDial'
				id='numberDial'
				type='number'
				className='numberInput'
				onChange={handleInputOnChange}
				onBlur={onBlurChange}
				value={value}
				readOnly={inCart}
			/>
		</div>
	)
}

export default NumberDial
