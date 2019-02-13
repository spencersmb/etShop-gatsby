interface IReduxValues {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;

}

interface IReduxErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
}

const validate = (values: IReduxValues) => {
	const errors: IReduxErrors = {}

	if (!values.firstName) {
		errors.firstName = 'Required'
	}
	if (!values.lastName) {
		errors.lastName = 'Required'
	}
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}

	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length < 4) {
		errors.password = 'password must be longer than 4'
	}

	return errors
}

export default validate
