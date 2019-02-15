import ReduxValidation from '@components/forms/validations'
import { login } from '@redux/actions/authActions'
import { svgs } from '@svg'
import styled from 'styled-components'
import React, { RefObject } from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form'
import ReduxFieldExt from '@components/forms/inputs/reduxFieldExt'
import RenderField from '@components/forms/inputs/renderField'
import {connect} from 'react-redux'
import {Action, bindActionCreators, Dispatch} from 'redux'

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

interface IpropsReduxActions {
	login: (formData: IFormProps) => any
}

interface IFormProps {
	email: string,
	password: string
}

type MixedFormProps = InjectedFormProps<{}, IPropsPublic & IpropsReduxActions>

const minLength5 = ReduxValidation.minLength(5)
const tooOld = (value: any) =>
	value && value > 65 ? 'You might be too old for this' : undefined

export const SignInForm = (props: MixedFormProps & IpropsReduxActions & IPropsPublic) => {

	const {handleSubmit, poseRef, firstRender, submitting, invalid, handleUserSubmit} = props
	const {required, numberCheck, email} = ReduxValidation
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
						withRef={true}
						svg={svgs.CreditCard}
					/>
				</div>
				<button type='submit' disabled={invalid || submitting}>Submit</button>
			</form>

			<button type='button' onClick={props.changeForm} data-form='signup'>Sign Up</button>
		</FormWrapper>
	)
}

export const RegisterLoginForm = reduxForm<{}, IPropsPublic & IpropsReduxActions>({
	destroyOnUnmount: true, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'LoginForm',
})(SignInForm)

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		login: bindActionCreators(login, dispatch)
	}
}

export default connect<null, IpropsReduxActions, IPropsPublic, MixedFormProps>(null, mapDispatchToProps)(RegisterLoginForm)

export const FormWrapper = styled.div`
	position: absolute;
	//opacity: ${(props: { firstRender: boolean }) => props.firstRender ? `1!important` : 0};
	//transform: translateY(0);
`
