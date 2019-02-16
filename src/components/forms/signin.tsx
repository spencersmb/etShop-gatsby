import ReduxValidation from '@components/forms/validations'
import { svgs } from '@svg'
import styled from 'styled-components'
import React, { RefObject } from 'react'
import { reduxForm } from 'redux-form'
import ReduxFieldExt from '@components/forms/inputs/reduxFieldExt'
import RenderField from '@components/forms/inputs/renderField'

// import CreditCardsvg from '@et/svgs/icons/GenericCreditCard.svg'
// import {toastr} from 'react-redux-toastr'
// import {IUser} from '@et/types/User'


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

	const {handleSubmit, poseRef, firstRender, submitting, invalid, handleUserSubmit} = props
	const {required, email} = ReduxValidation

	return (
		<FormWrapper data-testid='signIn-form' ref={poseRef} firstRender={firstRender}>
			<form onSubmit={handleSubmit(handleUserSubmit)}>
				<h3>Sign In</h3>
				<div>
					<ReduxFieldExt
						name='email'
						type='email'
						component={RenderField}
						placeholder=''
						validate={[ required, email ]}
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
						validate={[ required, minLength5 ]}
						withRef={true}
						warn={tooOld}
						svg={svgs.CreditCard}
					/>
				</div>
				<button type='submit' disabled={invalid || submitting}>Submit</button>
			</form>

			<button type='button' onClick={props.changeForm} data-form='signup'>Sign Up</button>
		</FormWrapper>
	)
}

export const RegisterLoginForm = reduxForm<{}, IPropsPublic>({
	destroyOnUnmount: true, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'LoginForm',
})(SignInForm)

export default RegisterLoginForm

export const FormWrapper = styled.div`
	position: absolute;
	//opacity: ${(props: { firstRender: boolean }) => props.firstRender ? `1!important` : 0};
	//transform: translateY(0);
`
