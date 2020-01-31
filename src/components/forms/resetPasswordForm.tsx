import SubmitButton from '@components/buttons/submitButton'
import ReduxFieldExt from '@components/forms/inputs/reduxFieldExt'
import RenderField from '@components/forms/inputs/renderField'
import ReduxValidation from '@components/forms/validations'
import { resetPassword as resetPasswordAction } from '@redux/actions/authActions'
import { colors } from '@styles/global/colors'
import { shadowStyles } from '@styles/global/shadows'
import {
	FormGroup,
	FormHeader1,
	FormInput
} from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import { toastrOptions } from '@utils/apiUtils'
import { renderSvg } from '@utils/styleUtils'
import * as React from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'
import { toastr } from 'react-redux-toastr'
import { navigate } from 'gatsby'

const { required, email, minLength } = ReduxValidation
const minLength5 = minLength(5)

export const ResetPasswordForm = (props: any) => {
	const { handleSubmit, submitting, submitSucceeded, invalid, rpKey, resetPassword } = props
	const submitForm = async (formProps: { email: string, password: string }) => {
		const submitProps = {
			email: formProps.email,
			password: formProps.password,
			rpKey
		}

		try {
			const rpResponse = await resetPassword(submitProps)
			toastr.removeByType('error')
			toastr.success(`Welcome ${rpResponse.firstName}`, 'you\'ve successfully changed your password.', toastrOptions.standard)
			await navigate(`/account/`)
		} catch (e) {
			console.error('e', e)
		}
	}
	const forgotPw = async () => {
		toastr.removeByType('error')
		await navigate('/forgotPassword')
	}

	return (
		<FormWrapperContainer>
			<FormHeader1>
				<div className='FormHeader1__icon'>{renderSvg(svgs.Lock)}</div>
				<h3>Reset Your Password</h3>
				<p>Enter your email and new password to complete the reset process.
				</p>
			</FormHeader1>
			<form onSubmit={handleSubmit(submitForm)}>
				<FormGroup data-testid={'formGroup'} column={true}>
					<FormInput fullWidth={true}>
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
					<FormInput fullWidth={true}>
						<ReduxFieldExt
							name='password'
							type='password'
							component={RenderField}
							placeholder=''
							validate={[required, minLength5]}
							label='New Password'
							svg={svgs.CreditCard}
						/>
					</FormInput>
				</FormGroup>
				<SubmitButton
					textColor={'#fff'}
					buttonText={'Reset Password'}
					backgroundColor={colors.teal.i500}
					spinnerColor={colors.teal.i500}
					submitting={submitting}
					invalid={invalid}
				/>
			</form>
			<Reset onClick={forgotPw}>Request new Reset token</Reset>
		</FormWrapperContainer>
	)
}
const Reset = styled.p`
	color:${colors.teal.i500};
	font-size: 16px;
	font-weight: 500;
	text-align: center;
	margin: 15px 0 0;
	cursor: pointer;
`
const FormWrapperContainer = styled.div`
	background: #fff;
	margin: 0 auto 0;
	max-width: 476px;
	box-shadow: ${shadowStyles.shadow3alt};
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 50px 63px;
	
	h3,p{
		text-align: center;
	}
	
	.FormHeader1__icon{
		margin: 0 auto 15px;
		width: 33px;
		svg{
			width: 100%;
		}
		path{
			fill: ${colors.teal.i500};
		}
	}
`

export const ReduxResetPasswordForm = reduxForm<{}, { rpKey: string | null }>({
	destroyOnUnmount: true, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'ResetPasswordForm'
})(ResetPasswordForm)

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		resetPassword: bindActionCreators(resetPasswordAction, dispatch)
	}
}
export default connect(null, mapDispatchToProps)(ReduxResetPasswordForm)
