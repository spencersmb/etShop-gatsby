import RxEmailField from '@components/forms/inputs/asyncEmail'
import asyncEmailValidate from '@components/forms/userEmailValidation'
import validate from '@components/forms/validate'
// import RxEmailField from '@components/forms/inputs/rxjsEmail_input'
import ReduxValidation from '@components/forms/validations'
import { FormHeader1, FormWrapper, FormInput, Form1 } from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import styled from 'styled-components'
import React, { RefObject, useState } from 'react'
import { reduxForm } from 'redux-form'
import ReduxFieldExt from '@components/forms/inputs/reduxFieldExt'
import RenderField from '@components/forms/inputs/renderField'

interface IPropsPublic {
	handleUserSubmit: (props: any) => void
	changeForm: (event: any) => void;
	closeModal: () => void;
	firstRender: boolean;
	poseRef: RefObject<any>;
}

const minLength5 = ReduxValidation.minLength(5)
const tooOld = (value: any) =>
	value && value > 65 ? 'You might be too old for this' : undefined

export const SignUpForm = (props: any) => {
	const [emailTaken, setEmailTaken] = useState(false)
	const { handleSubmit, poseRef, firstRender, submitting, invalid, handleUserSubmit } = props
	console.log('props signup form', props)

	const { required, email } = ReduxValidation

	return (
		<FormWrapper data-testid='signUp-form' ref={poseRef}>
			<FormHeader1>
				<div className='FormHeader1__icon'>
					{renderSvg(svgs.User)}
				</div>
				<h3>Create Account</h3>
				<p>or <span onClick={props.changeForm} data-form='signin'>sign in</span></p>
			</FormHeader1>
			<Form1 onSubmit={handleSubmit(handleUserSubmit)}>
				<FormInput>
					<ReduxFieldExt
						name='firstName'
						type='text'
						component={RenderField}
						placeholder=''
						validate={[required]}
						label='First Name:'
						svg={svgs.CreditCard}
					/>
				</FormInput>
				<FormInput>
					<ReduxFieldExt
						name='lastName'
						type='text'
						component={RenderField}
						placeholder=''
						validate={[required]}
						label='Last Name:'
						svg={svgs.CreditCard}
					/>
				</FormInput>
				<FormInput>
					<ReduxFieldExt
						name='email'
						type='email'
						component={RxEmailField}
						placeholder=''
						// validate={[required, email]}
						label='Email:'
						svg={svgs.CreditCard}
					/>
				</FormInput>
				<FormInput>
					<ReduxFieldExt
						name='password'
						type='password'
						component={RenderField}
						placeholder=''
						label='Password:'
						validate={[required, minLength5]}
						withRef={true}
						warn={tooOld}
						svg={svgs.CreditCard}
					/>
				</FormInput>
				<button
					type='submit'
					disabled={invalid || submitting || emailTaken}>
					Submit
				</button>

			</Form1>

		</FormWrapper>
	)
}

export const RegisterSignupForm = reduxForm<{}, IPropsPublic>({
	destroyOnUnmount: true, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'SignUpForm',
	validate,
	asyncValidate: asyncEmailValidate,
	asyncBlurFields: ['email']
})(SignUpForm)

export default RegisterSignupForm


