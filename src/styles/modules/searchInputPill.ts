import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import posed from 'react-pose'
import styled from 'styled-components'

export const SearchFilledContainer = styled.div`
	display: flex;
	flex-direction: column;
	.search__wrapper{
		position: relative;
		overflow: hidden;
	}
	input{
		position: relative;
		width: 100%;
		border: 3px solid #fff;
		border-radius: 50px;
		padding: 10px 25px;
		transition: .3s;
		
		&.searchInput__selected{
			border-color: ${colors.db.primary};
		}
		
		&:focus{
			outline: none;
			border-color: ${colors.db.primary};
		}
		
		@media ${device.tablet} {
			width: 385px;
			}
			
	}
	
`
export const SearchInputSpinner = styled.div<{ submitting: boolean, spinnerColor: string }>`
	position: absolute;
	opacity: ${props => props.submitting ? 1 : 0};
	width: 30px;
	height: 30px;
	top: 50%;
	transform: translateY(-50%);
	right: 15px;
	
	.spinner {
		animation: rotate 2s linear infinite;
		z-index: 2;
  
  & .path {
    stroke: ${props => props.spinnerColor};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

`
const PillWrapper = styled.div`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 100%;
`
export const PillPose = posed(PillWrapper)({
	exit: {
		opacity: 0,
		y: `55%`
	},
	enter: {
		opacity: 1,
		y: `-50%`
	}
})

export const Pill = styled.div`
	color: #fff;
	font-weight: 500;
	background: ${colors.db.primary};
	border-radius: 50px;
	padding: 7px 15px;
	margin: 9px 7px;
	position: relative;
	
	span{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 10px;
		width: 30px;
		height: 30px;
		&:hover{
			cursor: pointer;
		}
		rect{
			fill: #fff;
		}
	}
`
