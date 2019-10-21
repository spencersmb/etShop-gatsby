import SubmitButton from '@components/buttons/submitButton'
import ReduxFieldExt from '@components/forms/inputs/reduxFieldExt'
import RenderField from '@components/forms/inputs/renderField'
import ReduxValidation from '@components/forms/validations'
import { forgotPassword as forgotPasswordAction } from '@redux/actions/authActions'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import {
	FormGroup,
	FormHeader1,
	FormInput
} from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import * as React from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'

export const ForgotPasswordForm = (props: any) => {
	const { handleSubmit, submitting, submitSucceeded, invalid, forgotPassword } = props
	const { required, email } = ReduxValidation
	const submitForm = async (formProps: { email: string }) => {
		try {
			await forgotPassword(formProps.email)

		} catch (e) {
			console.error('e', e)
		}
	}

	return (
		<FormWrapperContainer>
			<FormHeader1>
				<div className='FormHeader1__icon'>{renderSvg(svgs.Lock)}</div>
				<h3>Forgot Your Password?</h3>
				<p>Enter your email address below and we'll send a special reset password link to your inbox.
				</p>
			</FormHeader1>
			{!submitSucceeded && <form onSubmit={handleSubmit(submitForm)}>
        <FormGroup data-testid={'formGroup'}>
          <FormInput>
            <ReduxFieldExt
              name='email'
              type='email'
              component={RenderField}
              placeholder=''
              validate={[required, email]}
              label='Email:'
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
          completed={submitSucceeded}
          invalid={invalid}
        />
      </form>}
			{submitSucceeded &&
      <>
        <SuccessHeader>
          Success!
        </SuccessHeader>
        <Success>A email has been sent to your account with instructions to reset your password</Success>
      </>}
		</FormWrapperContainer>
	)
}
const Success = styled.div`
	${Sentinel.semiboldItalic};
	color:${colors.teal.i500};
	font-size: 18px;
	text-align: center;
`
const SuccessHeader = styled(Success)`
	font-size: 24px;
	font-weight: 500;
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

export const ReduxForgotPasswordForm = reduxForm<{}, {}>({
	destroyOnUnmount: true, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'ForgotPasswordForm'
})(ForgotPasswordForm)

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		forgotPassword: bindActionCreators(forgotPasswordAction, dispatch)
	}
}
export default connect(null, mapDispatchToProps)(ReduxForgotPasswordForm)
