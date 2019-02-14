import { IState } from '@et/types/State'
import { login } from '@redux/actions/authActions'
import { svgs } from '@svg'
import styled from 'styled-components'
import React, { RefObject, useState } from 'react'
import {reduxForm, InjectedFormProps} from 'redux-form'
import validate from '@components/forms/validations'
import ReduxFieldExt from '@components/forms/inputs/reduxFieldExt'
import RenderField from '@components/forms/inputs/renderField'
import {connect} from 'react-redux'
import {Action, bindActionCreators, Dispatch} from 'redux'

// import CreditCardsvg from '@et/svgs/icons/GenericCreditCard.svg'
// import {toastr} from 'react-redux-toastr'
// import {IUser} from '@et/types/User'

interface IPropsPublic {
	// changeForm: (formName: string)=>(e: any) => void;
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

export const SignInForm = (props: MixedFormProps & IpropsReduxActions & IPropsPublic) => {

	const userSubmit = async (formProps: any) => {
		console.log('formProps', formProps)

		// try {
		// 	const user: IUser = await props.login(formProps)
		// 	toastr.removeByType('error')
		// 	toastr.success(`Welcome ${user.firstName}`, 'you\'ve successfully logged in.')
		// 	props.closeModal()
		// } catch (e) {
		// 	console.log('user login fail:', e)
		// }
	}

	const {handleSubmit, poseRef, firstRender, submitting} = props


	return (
		<FormWrapper data-testid='signIn-form' ref={poseRef} firstRender={firstRender}>
			<form onSubmit={handleSubmit(userSubmit)}>
				<h3>Sign In</h3>
				<div>
					<ReduxFieldExt
						name='email'
						type='email'
						component={RenderField}
						placeholder=''
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
						// svg={CreditCardsvg}
					/>
				</div>
				<button type='button' disabled={submitting}>Submit</button>
			</form>

			<button onClick={props.changeForm} data-form='signup'>Sign Up</button>
		</FormWrapper>
	)
}

export const RegisterLoginForm = reduxForm<{}, IPropsPublic & IpropsReduxActions>({
	destroyOnUnmount: true, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'LoginForm',
	validate
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
