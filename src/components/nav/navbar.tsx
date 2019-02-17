import { IState } from '@et/types/State'
import { IUser } from '@et/types/User'
import { ILogoutAction, logout as logoutAction } from '@redux/actions/authActions'
import React from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import Login from '../modals/login'

interface IPropsState {
	user: IUser | null,
}

interface IPropsActions {
	showModal: IShowModalAction,
	logout: ILogoutAction
}

function Navbar (props: IPropsActions & IPropsState) {
	const { user, logout } = props

	function openModal () {
		toastr.error(`Welcome`, 'you\'ve successfully logged')
	}

	function openSignInModal (name: string) {
		return () => [
			props.showModal({
				modal: Login,
				options: {
					closeOutsideModal: true,
					content: 'my Content',
					hasBackground: true,
					name
				}
			})
		]
	}

	return (
		<div data-testid='navbar'>
			<ul>
				<li>Home</li>
				<li><Link to='/account/profile'>your profile</Link></li>
				{!user &&
        <>
          <li onClick={openSignInModal('signin')}>Sign In</li>
          <li onClick={openSignInModal('signup')}>Sign Up</li>
        </>
				}
				{user &&
        <li onClick={logout}>Sign Out</li>
				}
				<li onClick={openModal}>Toaster</li>
			</ul>
		</div>
	)
}

const mapStateToProps = (state: IState): { user: IUser | null } => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		showModal: bindActionCreators(showModal, dispatch),
		logout: bindActionCreators(logoutAction, dispatch)
	}
}
// export default Navbars
export default connect<IPropsState, IPropsActions, {}, IState>(
	mapStateToProps,
	mapDispatchToProps
)(Navbar)
export { Navbar }