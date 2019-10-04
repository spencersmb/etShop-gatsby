const validate = values => {
	console.log('error values', values)

	const errors = {}
	if (!values.email) {
		errors.email = 'Required'
	}
	return errors
}

export default validate
