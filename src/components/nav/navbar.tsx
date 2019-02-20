import { ICartState } from '@et/types/Cart'
import { IState } from '@et/types/State'
import { IUser } from '@et/types/User'
import { ILogoutAction, logout as logoutAction } from '@redux/actions/authActions'
import { cartToggle } from '@redux/actions/cartActions'
import React from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import styled from 'styled-components'
import Login from '../modals/login'

interface IPropsState {
	user: IUser | null,
	cart: ICartState
}

interface IPropsActions {
	showModal: IShowModalAction,
	logout: ILogoutAction,
	cartToggle: () => void
}

function Navbar (props: IPropsActions & IPropsState) {
	const { user, logout } = props

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
			<UlStyled>
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
				<li onClick={props.cartToggle}>Cart ({props.cart.totalItems})</li>
			</UlStyled>
		</div>
	)
}

const UlStyled = styled.ul`
	display: flex;
	flex-direction: row;
	margin: 0;
	li{
		list-style: none;
		margin: 0 10px;
	}
`
const mapStateToProps = (state: IState): { user: IUser | null, cart: ICartState } => {
	return {
		cart: state.cart,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		showModal: bindActionCreators(showModal, dispatch),
		logout: bindActionCreators(logoutAction, dispatch),
		cartToggle: bindActionCreators(cartToggle, dispatch)
	}
}
// export default Navbars
export default connect<IPropsState, IPropsActions, {}, IState>(
	mapStateToProps,
	mapDispatchToProps
)(Navbar)
export { Navbar }