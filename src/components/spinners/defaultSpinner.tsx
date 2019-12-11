import React from 'react'
import styled from 'styled-components'

interface IProps {
	submitting: boolean
	color: string
	size: string
}

const DefaultSpinner = (props: IProps) => {
	return (
		<Spinner
			submitting={props.submitting}
			spinnerColor={props.color}
			size={props.size}
			data-testid='spinner'
			className='submit__spinner'>
			<svg className='spinner' viewBox='0 0 50 50'>
				<circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='6'/>
			</svg>
		</Spinner>
	)
}
export default DefaultSpinner

const Spinner = styled.div<{ spinnerColor: string, submitting: boolean, size: string }>`

&.submit__spinner{
		opacity: ${props => props.submitting ? 1 : 0};
		position: absolute;
		z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.size ? props.size : '35px'};
    height: ${props => props.size ? props.size : '35px'};
	}
	
	.spinner {
		animation: rotate 2s linear infinite;
		z-index: 2;
  
  & .path {
    stroke: ${props => props.spinnerColor};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
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
