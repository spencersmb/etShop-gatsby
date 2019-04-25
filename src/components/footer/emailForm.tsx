import SubmitButton from '@components/buttons/submitButton'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { SentinelFamily } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	handleSubmit: (e: any) => void
	completed: boolean
	hasError: boolean
	submitting: boolean
	error: boolean | null
	handleTextInput: (e: any) => void
}

const PinkEmailForm = (props: IProps) => {
	const { handleSubmit, handleTextInput, completed, error, hasError, submitting } = props
	return (
		<EmailBox
			data-testid='emailBox'
			onSubmit={handleSubmit}
			completed={completed}>
			<EmailBoxLeft>
				<EmailIconSmall>
					{renderSvg(svgs.Email)}
				</EmailIconSmall>

				{!completed && <input
          data-testid='email-input'
          type='email'
          required={true}
          onChange={handleTextInput}
          placeholder='Enter your email address'/>}

				{completed &&
        <div data-testid='success' className='success'>
          Success! Please check your email to confirm subscription.
        </div>}
				{hasError &&
        <div data-testid='error' className='error'>
          There was a problem with your email. Please try again.
        </div>}
			</EmailBoxLeft>
			<EmailBoxRight completed={completed}>
				<SubmitButton
					submitting={submitting}
					completed={completed}
					error={error}
				/>
			</EmailBoxRight>
			<SvgBig>
				{renderSvg(svgs.Email)}
			</SvgBig>
		</EmailBox>
	)
}

interface ICompleted {
	completed: boolean
}

const EmailBox = styled.form<ICompleted>`
	position: relative;
	background: ${props => props.completed ? colors.teal.i300 : colors.primary.pink};
	width: 100%;
	border-radius: 15px;
	box-shadow: ${shadowStyles.shadow3alt};
	max-width: 85%;
	will-change: max-width, background;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	padding: 50px 45px;
	overflow: hidden;
	z-index: 1;
	transition: .4s ease-in-out;
	transform: translateZ(0);
	@media ${device.tablet}{
		max-width: ${props => props.completed ? '500px' : '720px'};
		flex-direction: row;
		height: 150px;
		margin: 0 auto;
	}
	
	@media ${device.laptop}{
		max-width: ${props => props.completed ? '700px' : '1120px'};
	}
	
`
const EmailBoxLeft = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	z-index: 1;
	padding-bottom: 20px;
	
	input{
		font-size: 21px;
		font-style: italic;
		font-weight: 600;
		${SentinelFamily};
		color: white;
		margin-bottom: 0;
		opacity: 1;
		background: transparent;
		border: none;
		text-align: center;
		&:focus{
			outline: none;
		}
		&::placeholder{
			color: white;
		}
	}
	
	.success{
		color: ${colors.teal.i800};
		font-size: 21px;
		font-style: italic;
		font-weight: 600;
		${SentinelFamily};
		position: relative;
		text-align: center;
		z-index: 2;
	}
	.error{
		text-align: center;
		color: ${colors.red.i800};
		padding: 15px 0;
	}
	
	@media ${device.tablet}{
		flex-direction: row;
		height: 50px;
		padding-bottom: 0;
		input{
			text-align: left;
		}
		.success{
			text-align: left;
		}
		.error{
			text-align: left;
			position: absolute;
			top: 35px;
			//top: 50px;
		}
	}
`
const EmailIconSmall = styled.div`
	width: 40px;
	height: 40px;
	@media ${device.tablet}{
		margin-right: 25px;
	}
	svg{
		width: 100%;
		path{
			fill: white;
		}
	}
`
const EmailBoxRight = styled.div<ICompleted>`
	display: ${props => props.completed ? 'none' : 'flex'};
	justify-content: center;
	position: relative;
	z-index: 2;
`
const SvgBig = styled.div`
	z-index: 0;
	position: absolute;
	top:50%;
	left: 50%;
	transform: translateX(-50%)translateY(-50%);
	
	svg{
		transform: rotate(-30deg);
		opacity: .3;
		width: 300px;
		path{
			fill: white;
		}
	}
`
export default PinkEmailForm