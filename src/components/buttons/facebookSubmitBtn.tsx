import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

interface IProps {
	submitting: boolean
	error: { message: string } | null
	children: any
	handleClick: () => void
}

const FacebookSubmitBtn = (props: IProps) => {

	const { submitting, error, handleClick } = props

	return (
		<ButtonWrapper
			data-testid='submitBtn'
			submitting={submitting}
		>
			<SubmitBtn
				onClick={handleClick}
				pose={submitting ? 'submitting' : 'notSubmitting'}
				submitting={submitting}
				disabled={submitting}
				data-testid='button'>
				<div className='buttonText'>Log in with Facbook</div>
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
}

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
		background: '#1877F2'
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
		opacity: ${props => props.submitting ? 0 : 1};
		transition: .2s;
		width: 100%;
		color: #fff;
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
    stroke: #1877F2;
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

export default FacebookSubmitBtn
