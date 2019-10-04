import React, { ChangeEvent, FormEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'

const parse = (object, selected) => {
	const errors = {}
	if (selected === 'firstName' && (!object.firstName || object.firstName === '')) {
		errors.firstName = 'Required'
	}
	if (selected === 'lastName' && (!object.lastName || object.lastName === '')) {
		errors.lastName = 'Required'
	}
	return errors
}
const useSignUpForm = (userSubmitCallback: any) => {
	const firstRender = useRef(false)
	const [inputs, setInputs] = useState({
		firstName: '',
		lastName: ''
	})
	const [errors, setErrors] = useState({})
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		console.log('submit')

		event.preventDefault()
		userSubmitCallback()
	}
	const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
		console.log('inputChange')
		event.persist()
		checkError(event)
		setInputs(stateInputs => ({ ...stateInputs, [event.target.name]: event.target.value }))
	}

	const checkError = (e) => {
		const selectedInput = e.target.name
		const targetValue = e.target.value
		const objToParse = {
			[selectedInput]: targetValue
		}
		console.log('objToParse', objToParse)

		const parsed = parse(objToParse, selectedInput)
		console.log('parsed errors', parsed)

		setErrors(stateErrors => (
				{
					...parsed
				}
			)
		)
	}

	useLayoutEffect(() => {
		// watch for errors
		console.log('setError', inputs)

	}, [inputs])

	useLayoutEffect(() => {
		firstRender.current = true
	}, [])

	return {
		errors,
		inputs,
		checkError,
		handleInputChange,
		handleSubmit
	}

}

export default useSignUpForm
