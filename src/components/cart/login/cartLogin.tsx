import Login from '@components/modals/login'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import { ButtonReg } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { CartLoginAd, LoginAdButtons, LoginAdLeft, LoginRight } from '@styles/modules/checkout'
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
		? (
			<>
				<hr/>
				Users {user.firstName}
				<hr/>
			</>
		)
		: (
			<CartLoginAd>
				<LoginAdLeft>
					Ad left
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
							hoverColor={colors.teal.i500}
							hoverTextColor={'#fff'}
							outline={false}
						>
							Sign Up
						</ButtonStyled>
						<ButtonStyled
							data-testid='signin'
							onClick={login('signin')}
							color={colors.teal.i500}
							hoverColor={colors.teal.i500}
							hoverTextColor={'#fff'}
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
