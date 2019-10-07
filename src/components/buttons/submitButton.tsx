import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

interface IProps {
	submitting: boolean
	completed: boolean
	buttonText?: string
	backgroundColor?: string
	textColor?: string
	spinnerColor?: string
	invalid: boolean
}

const SubmitButton = (props: IProps) => {

	const { submitting, completed, backgroundColor = '#fff', textColor = '#000', spinnerColor = colors.teal.i500, invalid, buttonText = 'submit' } = props

	return (
		<ButtonWrapper
			data-testid='submitBtn'
			completed={completed}
			submitting={submitting}
			spinnerColor={spinnerColor}
			show={completed}
			invalid={invalid}
		>
			<SubmitBtn
				type='submit'
				pose={submitting ? 'submitting' : 'notSubmitting'}
				textColor={textColor}
				backgroundColor={backgroundColor}
				submitting={submitting}
				disabled={submitting}
				data-testid='submitButton'>
				<div className='buttonText'>{buttonText}</div>
				{/*{completed && !error && !submitting &&*/}
        {/*<Completed data-testid='success' show={completed}>{renderSvg(svgs.Checkmark)}</Completed>}*/}
				{submitting && <div data-testid='spinner' className='submit__spinner'>
          <svg className='spinner' viewBox='0 0 50 50'>
            <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='6'/>
          </svg>
        </div>}
			</SubmitBtn>
		</ButtonWrapper>
	)
}

interface IButtonProps {
	submitting: boolean
	completed: boolean
	spinnerColor: string
	show: boolean
	invalid: boolean
}

interface ISVGProps {
	show: boolean
}

const ButtonSvg = styled.div<ISVGProps>`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%) translateZ(0);
	opacity: ${props => props.show ? 1 : 0};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 101%;
	height: 101%;
	svg{
		transition: .4s cubic-bezier(.82,-0.3,.11,1.26);
		width: 25px;
		height: 25px;
		transform: scale(${props => props.show ? 1 : 0});
	}
`
const Completed = styled(ButtonSvg)`
	background: ${colors.teal.i300};
	
	svg{
		fill: ${colors.teal.i500};
	}
`
const ErrorPosed = posed.div({
	noError: {
		height: 0,
		transition: {
			height: { duration: 0 }
		}
	},
	error: {
		height: 'auto',
		transition: {
			height: { duration: 200, delay: 300 }
		}
	}
})
const Error = styled(ErrorPosed)`
		font-size: 0.875rem;
	font-weight: normal;
	color: #E91E63;
	display: flex;
	flex-direction: column;
	//position: absolute;
	//left: 0;
	//bottom: -25px;
	span{
		padding-top: 5px;
	}
`
const PosedButton = posed.button({
	submitting: {
		width: '48px',
		background: '#fff',
		transition: {
			background: { duration: 200, delay: 200 }
		}
	},
	notSubmitting: {
		width: '100%',
		background: (props: any) => props.backgroundColor
	}
})
const SubmitBtn = styled(PosedButton)`
		position: relative;
		border-radius: 25px;
		border: none;
		font-family: "Fira Sans", sans-serif;
		color: ${props => props.textColor};
		font-size: 17px;
		font-weight: 500;
		text-transform: uppercase;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		cursor: pointer;
		padding: ${props => props.submitting ? '24px 0px' : '25px 80px'};
		overflow: hidden;
		
		&:focus{
			outline: none;
		}
`
const ButtonWrapper = styled.div<IButtonProps>`
	//width: 160px;
	//max-width: 160px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	.buttonText{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		opacity: ${props => props.submitting || props.show ? 0 : 1};
		transition: .2s;
	}
	
	.submit__spinner{
		opacity: ${props => props.submitting ? 1 : 0};
	}
	
	.spinner {
		animation: rotate 2s linear infinite;
		z-index: 2;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -25px 0 0 -25px;
		width: 50px;
		height: 50px;
  
  & .path {
    stroke: ${props => props.spinnerColor};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
`

export default SubmitButton
