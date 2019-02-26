import ReduxFieldExt from '@components/forms/inputs/reduxFieldExt'
import RenderField from '@components/forms/inputs/renderField'
import ReduxValidation from '@components/forms/validations'
import { svgs } from '@svg'
import React from 'react'

export function GuestBilling (props: any) {
	const { required, email } = ReduxValidation

	return (
		<div>
			<ReduxFieldExt
				name='firstName'
				type='text'
				component={RenderField}
				placeholder='First Name'
				label='First Name:'
				svg={svgs.CreditCard}
			/>
			<ReduxFieldExt
				name='lastName'
				type='text'
				component={RenderField}
				placeholder='Last Name'
				label='Last Name:'
				svg={svgs.CreditCard}
			/>
			<ReduxFieldExt
				name='email'
				type='email'
				component={RenderField}
				placeholder=''
				validate={[required, email]}
				label='Email:'
				svg={svgs.CreditCard}
			/>
		</div>
	)
}

export default GuestBilling