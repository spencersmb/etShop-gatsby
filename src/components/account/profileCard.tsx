import { IState } from '@et/types/State'
import { IUser } from '@et/types/User'
import { logout } from '@redux/actions/authActions'
import { colors } from '@styles/global/colors'
import {
	CheckoutFormLabel, ProfileCardContainer,
	LoginUserWrapper,
	SignOutBtn,
	UserContent,
	UserEmail,
	UserName
} from '@styles/modules/checkout'
import { getUserImage } from '@utils/genUtils'
import React from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'

interface IProps {
	desktop?: boolean
}

interface IReduxState {
	user: IUser
}

interface IReduxActions {
	logUserOut: any
}

const ProfileCard = ({ user, desktop = false, logUserOut }: IProps & IReduxState & IReduxActions) => {
	const { firstName, email } = user

	return (
		<ProfileCardContainer desktop={desktop}>
			<CheckoutFormLabel>
				MY ACCOUNT
			</CheckoutFormLabel>
			<LoginUserWrapper desktop={desktop}>
				{getUserImage(user)}
				<UserContent desktop={desktop}>
					<UserName>
						{firstName}
					</UserName>
					<UserEmail>
						{email}
					</UserEmail>
					<SignOutBtn
						desktop={desktop}
						color={colors.purple.i500}
						textColor={colors.purple.i500}
						hoverColor={colors.purple.i700}
						hoverTextColor={'#fff'}
						outline={true}
						onClick={logUserOut}
					>
						Sign Out
					</SignOutBtn>
				</UserContent>
			</LoginUserWrapper>
		</ProfileCardContainer>
	)
}
const mapStateToProps = (state: IState): any => {
	return {
		user: state.user
	}
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		logUserOut: bindActionCreators(logout, dispatch)
	}
}

export default connect<IReduxState, IReduxActions, {}, IState>(mapStateToProps, mapDispatchToProps)(ProfileCard)
