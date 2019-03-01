import Login from '@components/modals/login'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import React from 'react'
import { connect } from 'react-redux'

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
					closeOutsideModal: true,
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
				User {user.firstName}
				<hr/>
			</>
		)
		: (
			<>
				<hr/>
				<button onClick={login('signin')}>Login</button>
				<button onClick={login('signup')}>Sign Up</button>
				<hr/>
			</>
		)
}

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