import ReduxValidation from '@components/forms/validations'
import { FormHeader1, FormWrapper } from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import styled from 'styled-components'
import React, { RefObject } from 'react'
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

export const SignInForm = (props: any) => {

	const { handleSubmit, poseRef, firstRender, submitting, invalid, handleUserSubmit } = props
	const { required, email } = ReduxValidation

	return (
		<FormWrapper
			data-testid='signIn-form'
			ref={poseRef}>
			<FormHeader1>
				<div className='FormHeader1__icon'>{renderSvg(svgs.User)}</div>
				<h3>Sign In</h3>
				<p>or <span onClick={props.changeForm} data-form='signup'>create an account</span></p>
			</FormHeader1>
			<form onSubmit={handleSubmit(handleUserSubmit)}>
				<div>
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
				<div>
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
				</div>
				<button type='submit' disabled={invalid || submitting}>Submit</button>
			</form>
		</FormWrapper>
	)
}

export const RegisterLoginForm = reduxForm<{}, IPropsPublic>({
	destroyOnUnmount: true, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'LoginForm'
})(SignInForm)

export default RegisterLoginForm


