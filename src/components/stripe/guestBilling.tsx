import ReduxFieldExt from '@components/forms/inputs/reduxFieldExt'
import RenderField from '@components/forms/inputs/renderField'
import ReduxValidation from '@components/forms/validations'
import { FormGroup, FormInput } from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import React from 'react'

export function GuestBilling (props: any) {
	const { required, email } = ReduxValidation

	return (
		<FormGroup data-testid={'formGroup'}>
			<FormInput>
				<ReduxFieldExt
					name='firstName'
					type='text'
					component={RenderField}
					placeholder=''
					validate={[required]}
					label='First Name'
					svg={svgs.CreditCard}
				/>
			</FormInput>
			<FormInput>
				<ReduxFieldExt
					name='lastName'
					type='text'
					component={RenderField}
					validate={[required]}
					placeholder=''
					label='Last Name'
					svg={svgs.CreditCard}
				/>
			</FormInput>
			<FormInput removeMargin={true}>
				<ReduxFieldExt
					name='email'
					type='email'
					component={RenderField}
					placeholder=''
					validate={[required, email]}
					label='Email'
					svg={svgs.CreditCard}
				/>
			</FormInput>
		</FormGroup>
	)
}

export default GuestBilling
