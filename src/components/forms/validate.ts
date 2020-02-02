const validate = (values: any) => {
	// console.log('validate', values.signupEmail)

	const errors: any = {}
	if (!values.email) {
		errors.email = 'Required'
	}
	if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}
	if (!values.signupEmail) {
		errors.signupEmail = 'Required'
	}
	if (values.signupEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.signupEmail)) {
		errors.signupEmail = 'Invalid email address'
	}
	return errors
}

export default validate
