import FacebookSubmitBtn from '@components/buttons/facebookSubmitBtn'
import SubmitButton from '@components/buttons/submitButton'
import RxEmailField from '@components/forms/inputs/asyncEmail'
import asyncEmailValidate from '@components/forms/userEmailValidation'
import validate from '@components/forms/validate'
import ReduxValidation from '@components/forms/validations'
import GatsbyImgMedium from '@components/images/gatsbyImgMedium'
import { IFacebookUserCreate } from '@et/types/User'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import {
	FacebookWrapper,
	FormHeader1,
	FormWrapper,
	FormInput,
	Form1,
	FormGroup,
	FormImg, FormContent, Arrow, CloseBtn
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
import styled from 'styled-components'

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
	const { handleSubmit, submitSucceeded, poseRef, submitting, invalid, handleUserSubmit, handleFacebookSubmit, manualSubmitting, setManualSubmit, setFacebookError, facebookError, closeModal } = props

	const { required } = ReduxValidation
	const responseFacebook = async (response: ReactFacebookLoginInfo) => {
		console.log('response', response)

		handleFacebookSubmit(response)
	}

	return (
		<FormWrapper data-testid='signUp-form' ref={poseRef} signup={true}>
			<CloseBtn data-testid='close-btn' className='jestCartToggle'
								onClick={closeModal}>{renderSvg(svgs.HamburgerClose)}</CloseBtn>
			<FormContentSignUp>
				<FormHeader1 className={'FormHeader1__signup'}>
					<div className='FormHeader1__icon'>{renderSvg(svgs.User)}</div>
					<h3>Create an account and save 10%</h3>
					<p className='signup__subhead'>
						Save 10% on your first purchse when you create an account
					</p>
					<p data-testid='switchAccounts-btn' className='form__switchAccounts' data-form='signin'
						 onClick={props.changeForm}>Already have an account? Sign
						in <Arrow>{renderSvg(svgs.ChevronLeft)}</Arrow></p>
				</FormHeader1>
				<Form1 onSubmit={handleSubmit(handleUserSubmit)}>
					<FormGroupSignup data-testid={'formGroup'}>
						<FormInputSignUp fullWidth={false}>
							<ReduxFieldExt
								name='signupFirstName'
								type='text'
								component={RenderField}
								placeholder=''
								validate={[required]}
								label='First Name'
								svg={svgs.CreditCard}
							/>
						</FormInputSignUp>
						<FormInputSignUp fullWidth={false}>
							<ReduxFieldExt
								name='signupLastName'
								type='text'
								component={RenderField}
								placeholder=''
								validate={[required]}
								label='Last Name'
								svg={svgs.CreditCard}
							/>
						</FormInputSignUp>
						<FormInputSignUp fullWidth={false}>
							<ReduxFieldExt
								name='signupEmail'
								type='email'
								component={RxEmailField}
								placeholder=''
								label='Email'
								svg={svgs.CreditCard}
							/>
						</FormInputSignUp>
						<FormInputSignUp fullWidth={false}>
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
						</FormInputSignUp>
					</FormGroupSignup>
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
			</FormContentSignUp>
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

const FormGroupSignup = styled.div<{ column?: boolean }>`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
	
	@media ${device.tablet} {
		flex-direction: ${props => props.column ? 'column' : 'row'};
		flex-wrap: ${props => props.column ? 'no-wrap' : 'wrap'};
	}
`
const FormContentSignUp = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	z-index: 3;
	position: relative;
`
const FormInputSignUp = styled.div<{ removeMargin?: boolean, fullWidth?: boolean }>`
	position: relative;
	margin-top: 16px;
	flex-wrap: wrap;
	${props => props.removeMargin ? `margin-bottom: 0;` : `margin-bottom: 26px;`}
	
	@media ${device.tablet} {
		${props => props.fullWidth ? '' : `
			flex: 1 0 50%;
			&:nth-child(odd){
				padding-right: 10px;
			}
			&:nth-child(even){
				padding-left: 10px;
			}
		`}
	}
		

	.formGroup{
		position: relative;
    
    &:before,
    &:after{
			display: block;
			content: "";
			position: absolute;
			bottom: 0;
    }
    
    &:before{
			height: 2px;
			background: ${colors.teal.i500};
			z-index: 1;
			width: 0;
			transition: width 0.3s;
    }
    
    &:after{
    	height: 1px;
			background: #e6e6e6;
			width: 100%;
    }
		&.valid.has-value,
		&.invalid.has-value{
			.renderLabel{
				transform: translateY(-220%) scale(0.82);
				color: ${colors.text};
			}
		}
		
    &.valid.hasFocus,
	 	&.invalid.hasFocus{
			&:before{
				width: 100%;
			}
			.renderLabel{
				transform: translateY(-220%) scale(0.82);
				color: ${colors.teal.i500};
			}
		}
		
		input{
			-webkit-appearance: none;
			appearance: none;
			border-radius: 0;
			font-family: inherit;
			border-style: solid;
			border-color: #cccccc;
			color: ${colors.primary.text};
			display: block;
			font-size: 16px;
			height: 2.3125rem;
			width: 100%;
			box-sizing: border-box;
			transition: box-shadow 0.45s, border-color 0.45s ease-in-out;
			
			border-width: 0;
			padding-left: 0;
			padding-right: 0;
			box-shadow: none;
			margin: 0;
			background: transparent;
			
			&:focus{
				outline: none;
			}
		}
		
		.renderLabel{
			font-size: 0.875rem;
			font-weight: normal;
			margin-bottom: 0;
			
			display: block;
			width: 100%;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			line-height: 1;
			cursor: text;
			color: #8996a4;
			transition: transform ease 0.3s, color ease 0.3s;
			transform-origin: 0 0;
			}
		
		.renderLabel{
		
		}
		.renderInputSvg{
		
		}
	}
`


