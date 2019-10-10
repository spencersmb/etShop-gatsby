import FacebookSubmitBtn from '@components/buttons/facebookSubmitBtn'
import SubmitButton from '@components/buttons/submitButton'
import ReduxValidation from '@components/forms/validations'
import GatsbyImgMedium from '@components/images/gatsbyImgMedium'
import { IFacebookUserCreate } from '@et/types/User'
import { navigate } from '@reach/router'
import { colors } from '@styles/global/colors'
import {
	Arrow,
	FacebookWrapper,
	ForgotPassword, FormContent,
	FormGroup,
	FormHeader1, FormImg,
	FormInput,
	FormWrapper
} from '@styles/modules/SignInUpModals'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import { ReactFacebookLoginInfo } from 'react-facebook-login'
import React, { Dispatch, RefObject, SetStateAction } from 'react'
import { reduxForm } from 'redux-form'
import ReduxFieldExt from '@components/forms/inputs/reduxFieldExt'
import RenderField from '@components/forms/inputs/renderField'
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

interface IPropsPublic {
	handleUserSubmit: (props: any) => void
	changeForm: (event: any) => void;
	closeModal: () => void;
	firstRender: boolean;
	poseRef: RefObject<any>;
	handleFacebookSubmit: (props: IFacebookUserCreate) => void
	facebookError: { message: string } | null
	manualSubmitting: boolean
	setManualSubmit: Dispatch<SetStateAction<boolean>>
	setFacebookError: Dispatch<SetStateAction<null>>
}

const minLength5 = ReduxValidation.minLength(5)
const tooOld = (value: any) =>
	value && value > 65 ? 'You might be too old for this' : undefined

export const SignInForm = (props: any) => {

	const { handleSubmit, poseRef, submitSucceeded, submitting, invalid, handleUserSubmit, setFacebookError, facebookError, manualSubmitting, setManualSubmit, handleFacebookSubmit } = props
	const { required, email } = ReduxValidation
	const responseFacebook = async (response: ReactFacebookLoginInfo) => {
		handleFacebookSubmit(response)
	}
	const forgotPassword = () => {
		navigate('/forgotPassword')
	}

	return (
		<FormWrapper
			data-testid='signIn-form'
			ref={poseRef}>
			<FormContent>
				<FormHeader1>
					<div className='FormHeader1__icon'>{renderSvg(svgs.User)}</div>
					<h3>Sign In</h3>
					<p style={{ margin: 0 }} data-testid='switchAccounts-btn' className='form__switchAccounts' data-form='signup'
						 onClick={props.changeForm}>Save 10% with a new account and Sign
						up! <Arrow>{renderSvg(svgs.ChevronLeft)}</Arrow></p>
				</FormHeader1>
				<form onSubmit={handleSubmit(handleUserSubmit)}>
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
					</FormGroup>
					<SubmitButton
						textColor={'#fff'}
						buttonText={'Sign In'}
						backgroundColor={colors.teal.i500}
						spinnerColor={colors.teal.i500}
						submitting={submitting}
						completed={submitSucceeded}
						invalid={invalid}
					/>
					<ForgotPassword onClick={forgotPassword}>Forgot Password?</ForgotPassword>
				</form>
				{process.env.NODE_ENV !== 'test' && <FacebookLogin
          appId='317306965764273'
          autoLoad={false}
          fields='first_name,email,picture,last_name,name'
          disableMobileRedirect={true}
          state={
						JSON.stringify({ facebookLogin: true })
					}
          callback={responseFacebook}
          onClick={() => {
						if (facebookError) {
							setFacebookError(null)
						}
						setManualSubmit(true)
					}}
          render={(renderProps: any) => (
						<FacebookWrapper>
							<FacebookSubmitBtn
								error={facebookError}
								submitting={manualSubmitting}
								handleClick={renderProps.onClick}>This is my custom FB button</FacebookSubmitBtn>
						</FacebookWrapper>
					)}
        />}
			</FormContent>
			<FormImg>
				<GatsbyImgMedium
					imgName={'outlined-brushes-full.png'}
					altTag={'Sign In and get access to tons of assets'}/>
			</FormImg>
		</FormWrapper>
	)
}

export const RegisterLoginForm = reduxForm<{}, IPropsPublic>({
	destroyOnUnmount: true, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'LoginForm'
})(SignInForm)

export default RegisterLoginForm


