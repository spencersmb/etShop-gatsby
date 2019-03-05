import RxEmailField from '@components/forms/inputs/rxjsEmail_input'
import ReduxValidation from '@components/forms/validations'
import { svgs } from '@svg'
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
	const { required, email } = ReduxValidation

	return (
		<FormWrapper data-testid='signUp-form' ref={poseRef} firstRender={firstRender}>
			<form onSubmit={handleSubmit(handleUserSubmit)}>
				<h3>Sign up</h3>
				<div>
					<ReduxFieldExt
						name='firstName'
						type='text'
						component={RenderField}
						placeholder=''
						validate={[required]}
						label='First Name:'
						svg={svgs.CreditCard}
					/>
				</div>
				<div>
					<ReduxFieldExt
						name='lastName'
						type='text'
						component={RenderField}
						placeholder=''
						validate={[required]}
						label='Last Name:'
						svg={svgs.CreditCard}
					/>
				</div>
				<div>
					<ReduxFieldExt
						name='email'
						type='email'
						component={RxEmailField}
						placeholder=''
						validate={[required, email]}
						label='Email:'
						svg={svgs.CreditCard}
						setEmailTaken={setEmailTaken}
						emailTaken={emailTaken}
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
				<button type='submit' disabled={invalid || submitting || emailTaken}>Submit</button>
			</form>

			<button type='button' onClick={props.changeForm} data-form='signin'>Sign In</button>
		</FormWrapper>
	)
}

export const RegisterSignupForm = reduxForm<{}, IPropsPublic>({
	destroyOnUnmount: true, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'SignUpForm'
})(SignUpForm)

export default RegisterSignupForm

export const FormWrapper = styled.div`
	position: absolute;
	//opacity: ${(props: { firstRender: boolean }) => props.firstRender ? `1!important` : 0};
	//transform: translateY(0);
`
