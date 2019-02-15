
class ReduxValidation {

	static required = (value: any | undefined) => value ? undefined : 'Required'
	static maxLength = (max: number) => (value: any) =>
		value && value.length > max ? `Must be ${max} characters or less` : undefined
	static minLength = (min: number) => (value: any) =>
		value && value.length < min ? `Must at least be ${min} characters long` : undefined
	static email =( value: any) =>
		value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
			'Invalid email address' : undefined
	static numberCheck = (value: number) => value && isNaN(Number(value)) ? 'Must be a number' : undefined


}

export default ReduxValidation
