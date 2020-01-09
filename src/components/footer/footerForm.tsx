import SubmitButton from '@components/buttons/submitButton'
import { colors } from '@styles/global/colors'
import { placeholderColor } from '@styles/global/mixins'
import { fakeApiCall } from '@utils/apiUtils'
import { useSetState } from '@utils/stateUtils'
import fetched from 'isomorphic-unfetch'
import React from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

interface ILocalState {
	email: string,
	submitting: boolean,
	completed: boolean,
	submitted: boolean,
	error: null | boolean,
	hasError: boolean
}

interface INewState {
	email?: string,
	submitting?: boolean,
	completed?: boolean,
	submitted?: boolean,
	error?: null | boolean,
	hasError?: boolean
}

const FooterForm = () => {
	const [state, setState] = useSetState<ILocalState, INewState>({
		email: '',
		submitting: false,
		completed: false,
		submitted: false,
		error: null,
		hasError: false
	})

	async function handleSubmit (e: any) {
		e.preventDefault()
		setState({ submitting: true, error: null })

		const url = 'https://api.convertkit.com/v3/forms/969010/subscribe'
		const formData = new FormData()
		formData.append('api_key', process.env.GATSBY_CONVERTKIT_KEY || '')
		formData.append('email', state.email)

		try {
			const testResult = fakeApiCall()
			await testResult

			// WORKING DATA
			const result = await fetched(
				url,
				{
					body: formData,
					method: 'POST'
				}
			)
			const resultData = await result.json()
			setState({
				submitting: false,
				hasError: false,
				completed: true
			})
			console.log('result', resultData)

		} catch (error) {
			console.error('error', error)
			setState({
				completed: false,
				submitting: false,
				hasError: true,
				error: true
			})
		}

		if (state.error) {

		}
	}

	function handleTextInput (e: any) {
		setState({
			email: e.target.value
		})
	}

	return (
		<>
			<ErrorWrapper
				id='footerForm-error'
				className='etForm-error etForm-hidden'
				pose={state.error ? 'open' : 'closed'}
			>
				<div className={'error-container'}>
					<p>
						There was an error. Please try again.
					</p>
				</div>
			</ErrorWrapper>
			<FormContainer
				id='footerForm-form'
				className='tt-freebieDark__form tt-form'
				onSubmit={handleSubmit}
			>
				<ButtonWrapper pose={state.completed && !state.error ? 'closed' : 'open'}>
					<input id='footerForm-input-email'
								 onChange={handleTextInput}
								 className=''
								 type='email' name='email' placeholder='ENTER EMAIL ADDRESS' required={true}/>
					{/*<button*/}
					{/*	id='footerForm-submitBtn'*/}
					{/*	type='submit'*/}
					{/*	className='btn-submit'>*/}
					{/*	<span className='btn-submit__text'>Submit</span>*/}
					{/*	<span id='footerForm-spinner' className='submit__spinner'>*/}
					{/*				<svg className='spinner' viewBox='0 0 50 50'>*/}
					{/*						<circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='6'/>*/}
					{/*				</svg>*/}
					{/*		</span>*/}
					{/*</button>*/}
					<SubmitButton
						textColor={'#fff'}
						buttonText={'Sign up!'}
						backgroundColor={colors.purple.i500}
						spinnerColor={colors.teal.i500}
						submitting={state.submitting}
						invalid={state.email.length < 0}
					/>
				</ButtonWrapper>

			</FormContainer>
			<SuccessWrapper
				id='footerForm-success'
				className='etForm-success etForm-hidden'
				pose={state.completed && !state.error ? 'open' : 'closed'}>
				<h2>
					Congrats!
				</h2>
				<p>
					Check your email for details.
				</p>
			</SuccessWrapper>
		</>
	)
}

export default FooterForm

const ErrorPose = posed.div({
	open: {
		height: 'auto',
		transition: {
			height: { duration: 300, delay: 300 }
		}
	},
	closed: {
		height: 0
	}
})
const ErrorWrapper = styled(ErrorPose)`
	color: ${colors.red.warning};
	font-size: 18px;
	position: relative;
	overflow: hidden;
	.error-container{
		position: relative;
		padding-bottom: 15px;
	}
	p{
		margin-bottom:0;
	}
`
const FormContainer = styled.form`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.submitButton__wrapper{
		width: 100%;
		max-width: 200px;
	}
	
	input{
		background: transparent;
		color: ${colors.purple.i500};
		border: 3px solid ${colors.purple.i500};
		border-radius: 50px;
		padding: 0 20px;
		text-align: center;
		font-size: 16px;
		height: 50px;
	  word-wrap: break-word;
    word-break: break-all;
    width: 100%;
    max-width: 600px;
    margin-bottom: 15px;
		&:focus{
			outline: none;
		}
		${placeholderColor(colors.grey.i600)}
	}
`
const ButtonWrapperPose = posed.div({
	open: {
		height: 'auto',
		transition: {
			height: { duration: 300 }
		}
	},
	closed: {
		height: 0

	}
})
const ButtonWrapper = styled(ButtonWrapperPose)`
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`
const SuccessWrapper = styled(ErrorPose)`
	font-size: 18px;
	position: relative;
	overflow: hidden;
	.etForm-success{
		position: relative;
	}
	h2{
		color: ${colors.teal.i500};
	}
	p{
		color: ${colors.primary.headline};
		margin-bottom:0;
	}
`
