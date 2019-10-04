import useSignUpForm from '@components/forms/formHooks/useSignUpForm'
import RenderHookInput from '@components/forms/hookInputs/textInput'
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

export const SignUpForm = (props: any) => {
	const { poseRef, handleUserSubmit } = props
	const signUp = () => {
		console.log(`User Created!
		Name: ${inputs.firstName}`)
	}
	const { inputs, handleInputChange, handleSubmit, errors, checkError } = useSignUpForm(signUp)
	console.log('errors', errors)
	console.log('inputs', inputs)

	return (
		<FormWrapper data-testid='signUp-form' ref={poseRef}>
			<FormHeader1>
				<div className='FormHeader1__icon'>
					{renderSvg(svgs.User)}
				</div>
				<h3>Create Account</h3>
				<p>or <span onClick={props.changeForm} data-form='signin'>sign in</span></p>
			</FormHeader1>
			<Form1 onSubmit={handleSubmit}>
				<FormInput>
					{/*<ReduxFieldExt*/}
					{/*	name='firstName'*/}
					{/*	type='text'*/}
					{/*	component={RenderField}*/}
					{/*	placeholder=''*/}
					{/*	validate={[required]}*/}
					{/*	label='First Name:'*/}
					{/*	svg={svgs.CreditCard}*/}
					{/*/>*/}
					{React.useMemo(() => (
						<RenderHookInput
							name={'firstName'}
							label={'First Name:'}
							disabled={false}
							placeholderText={'First Name'}
							onChange={handleInputChange}
							value={inputs.firstName}
							onBlur={checkError}
							errors={errors}
						/>
					), [errors.firstName, inputs.firstName])}
				</FormInput>
				<FormInput>
					{React.useMemo(() => (
						<RenderHookInput
							name={'lastName'}
							label={'Last Name:'}
							disabled={false}
							placeholderText={'Last Name'}
							onChange={handleInputChange}
							onBlur={checkError}
							value={inputs.lastName}
							errors={errors}
						/>
					), [errors.lastName, inputs.lastName])}

				</FormInput>
				<button
					type='submit'
					// disabled={invalid || submitting || emailTaken}
				>
					Submit
				</button>

			</Form1>

		</FormWrapper>
	)
}

// export const RegisterSignupForm = reduxForm<{}, IPropsPublic>({
// 	destroyOnUnmount: true, // <------ preserve form data
// 	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
// 	form: 'SignUpForm',
// 	validate,
// 	asyncValidate: asyncEmailValidate,
// 	asyncBlurFields: ['email']
// })(SignUpForm)

export default SignUpForm


