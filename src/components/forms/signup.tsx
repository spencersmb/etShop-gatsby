import FacebookSubmitBtn from '@components/buttons/facebookSubmitBtn'
import SubmitButton from '@components/buttons/submitButton'
import RxEmailField from '@components/forms/inputs/asyncEmail'
import asyncEmailValidate from '@components/forms/userEmailValidation'
import validate from '@components/forms/validate'
import ReduxValidation from '@components/forms/validations'
import GatsbyImgMedium from '@components/images/gatsbyImgMedium'
import { IFacebookUserCreate } from '@et/types/User'
import { colors } from '@styles/global/colors'
import {
	FacebookWrapper,
	FormHeader1,
	FormWrapper,
	FormInput,
	Form1,
	FormGroup,
	FormImg, FormContent, Arrow
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

export const SignUpForm = (props: any) => {
	const { handleSubmit, submitSucceeded, poseRef, submitting, invalid, handleUserSubmit, handleFacebookSubmit, manualSubmitting, setManualSubmit, setFacebookError, facebookError } = props

	const { required } = ReduxValidation
	const responseFacebook = async (response: ReactFacebookLoginInfo) => {
		console.log('response', response)

		handleFacebookSubmit(response)
	}

	return (
		<FormWrapper data-testid='signUp-form' ref={poseRef}>
			<FormContent>
				<FormHeader1>
					<h3 className={'signUp'}>Create an account and save 10% on your first purchase</h3>
					{/*<p className='signup__subhead'>*/}
					{/*	Save 10% on your first purchse when you create an account*/}
					{/*</p>*/}
					<p data-testid='switchAccounts-btn' className='form__switchAccounts' data-form='signin'
						 onClick={props.changeForm}>Already have an account? Sign
						in <Arrow>{renderSvg(svgs.ChevronLeft)}</Arrow></p>
				</FormHeader1>
				<Form1 onSubmit={handleSubmit(handleUserSubmit)}>
					<FormGroup data-testid={'formGroup'} column={true}>
						<FormInput fullWidth={true}>
							<ReduxFieldExt
								name='signupFirstName'
								type='text'
								component={RenderField}
								placeholder=''
								validate={[required]}
								label='First Name'
								svg={svgs.CreditCard}
							/>
						</FormInput>
						<FormInput fullWidth={true}>
							<ReduxFieldExt
								name='signupLastName'
								type='text'
								component={RenderField}
								placeholder=''
								validate={[required]}
								label='Last Name'
								svg={svgs.CreditCard}
							/>
						</FormInput>
						<FormInput fullWidth={true}>
							<ReduxFieldExt
								name='signupEmail'
								type='email'
								component={RxEmailField}
								placeholder=''
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
						invalid={invalid}
					/>

				</Form1>
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
			<FormImg type={'1'}>
				<GatsbyImgMedium imgName={'color-tray-round.png'} altTag={'Sign In and get access to tons of assets'}/>
			</FormImg>
		</FormWrapper>
	)
}

export const RegisterSignupForm = reduxForm<{}, IPropsPublic>({
	destroyOnUnmount: true, // <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
	form: 'SignUpForm',
	validate,
	asyncValidate: asyncEmailValidate,
	asyncBlurFields: ['signupEmail']
})(SignUpForm)

export default RegisterSignupForm


