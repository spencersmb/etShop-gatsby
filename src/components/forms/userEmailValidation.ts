import { CheckoutApi } from '@api/checkoutApi'

const asyncEmailValidate = async (values: any, dispatch: any, props: any): Promise<any> => {

	const checkEmail = await CheckoutApi.checkEmail(values.email)
	if (checkEmail.data.emailTaken) {
		throw { email: 'That email is taken' }
	}
}

export default asyncEmailValidate
