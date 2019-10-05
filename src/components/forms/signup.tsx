import SubmitButton from '@components/buttons/submitButton'
import RxEmailField from '@components/forms/inputs/asyncEmail'
import asyncEmailValidate from '@components/forms/userEmailValidation'
import validate from '@components/forms/validate'
import ReduxValidation from '@components/forms/validations'
import { IFacebookUserCreate } from '@et/types/User'
import { colors } from '@styles/global/colors'
import { FormHeader1, FormWrapper, FormInput, Form1, FormGroup } from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import FacebookLogin from 'react-facebook-login'
import styled from 'styled-components'
import React, { RefObject } from 'react'
import { reduxForm } from 'redux-form'
import ReduxFieldExt from '@components/forms/inputs/reduxFieldExt'
import RenderField from '@components/forms/inputs/renderField'

interface IPropsPublic {
	handleUserSubmit: (props: any) => void
	handleFacebookSubmit: (props: IFacebookUserCreate) => void
	changeForm: (event: any) => void;
	closeModal: () => void;
	firstRender: boolean;
	poseRef: RefObject<any>;
	signupError: { message: string } | null
}

const minLength5 = ReduxValidation.minLength(5)
const tooOld = (value: any) =>
	value && value > 65 ? 'You might be too old for this' : undefined

export const SignUpForm = (props: any) => {
	const { handleSubmit, submitSucceeded, poseRef, signupError, firstRender, submitting, invalid, handleUserSubmit, handleFacebookSubmit } = props

	const { required } = ReduxValidation
	const responseFacebook = (response: IFacebookUserCreate) => {
		handleFacebookSubmit(response)
	}

	return (
		<FormWrapper data-testid='signUp-form' ref={poseRef}>
			<FormHeader1>
				<h3>Create an account and save 10%</h3>
				<p className='signup__subhead'>
					Save 10% on your first purchse when you create an account
				</p>
				<p className='form__switchAccounts' data-form='signin' onClick={props.changeForm}>Already have an account? Sign
					in</p>
			</FormHeader1>
			<Form1 onSubmit={handleSubmit(handleUserSubmit)}>
				<FormGroup>
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
							name='email'
							type='email'
							component={RxEmailField}
							placeholder=''
							label='Email'
							svg={svgs.CreditCard}
						/>
					</FormInput>
					<FormInput>
						<ReduxFieldExt
							name='password'
							type='password'
							component={RenderField}
							placeholder=''
							label='Password'
							validate={[required, minLength5]}
							withRef={true}
							// warn={tooOld}
							svg={svgs.CreditCard}
						/>
					</FormInput>
				</FormGroup>
				<SubmitButton
					textColor={'#fff'}
					buttonText={'Create Account!'}
					backgroundColor={colors.teal.i500}
					spinnerColor={colors.teal.i500}
					submitting={submitting}
					completed={submitSucceeded}
					error={signupError}
					invalid={invalid}
				/>

			</Form1>
			<FacebookLogin
				appId='317306965764273'
				autoLoad={false}
				fields='name,email,picture'
				disableMobileRedirect={true}
				state={
					JSON.stringify({ facebookLogin: true })
				}
				callback={responseFacebook}/>
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


