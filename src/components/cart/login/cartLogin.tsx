import ProfileCard from '@components/account/profileCard'
import Login from '@components/modals/login'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { ButtonReg, ButtonSmall } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import {
	CartLoginAd,
	CheckoutFormLabel,
	CheckoutTabs,
	LoginAdButtons,
	LoginAdLeft, ProfileCardContainer,
	LoginRight, LoginUserWrapper, SignOutBtn, UserContent, UserEmail, UserName
} from '@styles/modules/checkout'
import { getUserImage } from '@utils/genUtils'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

interface IReduxState {
	user: IUserState
}

interface IReduxActions {
	showModal: IShowModalAction
}

export function CartLogin (props: IReduxState & IReduxActions) {
	const { user } = props

	function login (name: string) {
		return () => {
			props.showModal({
				modal: Login,
				options: {
					closeModal: true,
					hasBackground: true,
					name
				}
			})
		}
	}

	return user
		? (<ProfileCard desktop={true}/>)
		: (
			<CartLoginAd>
				<LoginAdLeft>
					<span>Save</span>
					<div className={`percent`}>10%</div>
					<span>now</span>
					<div className='circle large'/>
					<div className='circle med'/>
					<div className='circle med outline'/>
					<div className='circle med-lrg'/>
				</LoginAdLeft>
				<LoginRight>
					<h5>Create an account and save 10% on your purchase.</h5>
					<p>Already a member? Login!</p>
					<LoginAdButtons>
						<ButtonStyled
							data-testid='signup'
							onClick={login('signup')}
							color={'#FFEE93'}
							textColor={colors.teal.i600}
							hoverColor={colors.primary.headline}
							hoverTextColor={'#fff'}
							outline={false}
						>
							Sign Up
						</ButtonStyled>
						<ButtonStyled
							data-testid='signin'
							onClick={login('signin')}
							color={colors.teal.i500}
							hoverColor={'#fff'}
							hoverTextColor={colors.teal.i500}
							textColor={'#fff'}
							outline={true}
						>
							Login
						</ButtonStyled>
					</LoginAdButtons>
				</LoginRight>
			</CartLoginAd>
		)
}

const ButtonStyled = styled(ButtonReg)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0;
	
	span{
		${Sentinel.italic};	
		font-weight: 500;
		font-size: 24px;
		line-height: 24px;
		margin-left: 15px; 
	}
`
const mapStateToProps = (state: IState): any => {
	return {
		user: state.user
	}
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		showModal: bindActionCreators(showModal, dispatch)
	}
}
export default connect<IReduxState, IReduxActions, {}, IState>(mapStateToProps, mapDispatchToProps)(CartLogin)
