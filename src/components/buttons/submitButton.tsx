import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	submitting: boolean
	completed: boolean
	error: boolean | null
}

const SubmitButton = (props: IProps) => {
	function handleClick () {

	}

	const { submitting, completed, error } = props

	return (
		<ButtonWrapper
			data-testid='submitBtn'
			completed={completed}
			submitting={submitting}
			error={error}
			show={completed || !!error}
		>
			<button onClick={handleClick} disabled={submitting} data-testid='button'>
				<div className='buttonText'>Submit</div>
				{completed && <Completed data-testid='success' show={completed}>{renderSvg(svgs.Checkmark)}</Completed>}
				{error && <Error data-testid='error' show={error}>{renderSvg(svgs.Close)}</Error>}
				{submitting && <div data-testid='spinner' className='submit__spinner'>
          <svg className='spinner' viewBox='0 0 50 50'>
            <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='6'/>
          </svg>
        </div>}
			</button>
		</ButtonWrapper>
	)
}

interface IButtonProps {
	submitting: boolean
	completed: boolean
	error: boolean | null
	show: boolean
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
const Error = styled(ButtonSvg)`
	background: ${colors.red.i500};
	
	svg{
		fill: ${colors.red.i800};
	}
`
const ButtonWrapper = styled.div<IButtonProps>`
	width: 160px;
	max-width: 160px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	button{
		position: relative;
		background: white;
		border-radius: ${props => props.submitting ? '50%' : '25px'};
		border: none;
		font-family: "Fira Sans", sans-serif;
		color: ${colors.primary.pink};
		font-size: 17px;
		font-weight: 500;
		text-transform: uppercase;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: ${props => props.submitting ? '50px' : '100%'};
		cursor: pointer;
		padding: ${props => props.submitting ? '25px' : '25px 80px'};
		transition: .3s;
		overflow: hidden;
		
		&:focus{
			outline: none;
		}
	}
	
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
    stroke: ${colors.teal.i500};
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