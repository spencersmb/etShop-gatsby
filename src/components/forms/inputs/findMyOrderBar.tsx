import AuthApi from '@api/authApi'
import SubmitButton from '@components/buttons/submitButton'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { placeholderColor } from '@styles/global/mixins'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { fakeApiCall } from '@utils/apiUtils'
import { useSetState } from '@utils/stateUtils'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

interface IProps {
	handleSubmit: any
	handleInputChange: any
	state: any
}

const FindMyOrderBar = (props: IProps) => {
	const { state } = props

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		props.handleSubmit()
	}

	return (
		<FindOrderWrapper>
			<form onSubmit={handleSubmit}>
				<div className='formInner'>
					<div className={`inputWrapper`}>
						<span>
							{renderSvg(svgs.Tag)}
						</span>
						<input
							required={true}
							type='text'
							value={state.orderId}
							placeholder={`Order number`}
							onChange={props.handleInputChange}
							data-input={`orderId`}/>
					</div>
					<div className={`inputWrapper`}>
						<span>
							{renderSvg(svgs.Email)}
						</span>
						<input
							required={true}
							type='email'
							value={state.email}
							placeholder={`Email Address`}
							onChange={props.handleInputChange}
							data-input={`email`}/>
					</div>
				</div>
				<div className='buttonWrapper'>
					<SubmitButton
						textColor={'#fff'}
						buttonText={'Search'}
						backgroundColor={colors.db.primary}
						spinnerColor={colors.teal.i500}
						spinnerBgColor={colors.db.primary}
						submitting={state.submitting}
						invalid={state.submitting}
						theme={{
							submitButton: {
								size: 'large',
								font: `${Sentinel.semiboldItalic}`
							}
						}}
					/>
				</div>
			</form>
		</FindOrderWrapper>
	)
}

export default FindMyOrderBar

const FindOrderWrapper = styled.div`
	margin-top: 30px;
	margin-bottom: 30px;
	position: relative;
	z-index: 3;

	form{
		display: flex;
		flex-direction: column;
		@media ${device.tablet} {
			box-shadow: ${shadowStyles.shadow6};
			flex-direction: row;
			border-radius: 50px;
			overflow: hidden;
			background: #fff;
			padding: 0 10px;
		}
		
		@media ${device.laptop} {
			padding-left: 15px;
		}
			
	}
	.formInner{
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 15px;
		overflow: hidden;
		box-shadow: ${shadowStyles.shadow6};
		
		@media ${device.tablet} {
			flex-direction: row;
			box-shadow: none;
			border-radius: 0;
			flex: 1;
		}
	}
	
	.buttonWrapper{
		margin-top: 20px;
		
		@media ${device.tablet} {
			margin-top: 0;
			padding: 10px 0;
		}
	}
	
	.inputWrapper{
		position: relative;
		padding-left: 35px;
		flex: 1;
		span{
			top: 50%;
			left: 12px;
			transform: translateY(-50%);
			position: absolute;
			width:30px;
			height:30px;
			svg{
				width: 100%;
			}		
			path{
				fill: ${colors.purple.i500};
			}
		}
		&:first-child{
			border-bottom: 1px solid #ddd;
		}
		
		@media ${device.tablet} {
			display: flex;
			&:first-child{
				border-bottom: none;
				flex: .7;
				border-right: 1px solid #ddd;
			}	
		    
		}
		
		@media ${device.laptop} {
			margin-left: 10px;
			&:first-child{
				flex: .5;
			}	
		}
			
			
	}
	
	input{
		border: none;
		margin: 0;
		width: 100%;
		padding: 20px 15px;
		${placeholderColor(colors.secondary.text)};
		${Sentinel.semiboldItalic};
		color: ${colors.primary.headline};
		&:focus{
			outline: none;
		}
		
		@media ${device.tablet} {
			padding: 15px;
		}
	}
`
