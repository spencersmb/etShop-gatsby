import { CheckoutApi } from '@api/checkoutApi'

const asyncEmailValidate = async (values: any, dispatch: any, props: any): Promise<any> => {
	// console.log('values', values)
	// console.log('props', props)
	if (values.signupEmail) {
		const checkEmail = await CheckoutApi.checkEmail(values.signupEmail)
		if (checkEmail.data.emailTaken) {
			throw { signupEmail: 'That email is taken' }
		}
	}

}

export default asyncEmailValidate
