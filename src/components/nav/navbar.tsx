import Receipt from '@components/modals/receipt'
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
import Login from '@components/modals/login'

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
				// modal: Receipt,
				options: {
					closeModal: true,
					hasBackground: true,
					name
				}
			})
		]
	}

	function receipt () {
		props.showModal({
			modal: Receipt,
			options: {
				closeModal: true,
				hasBackground: false,
				data: {
					total: '16',
					orderId: '430',
					email: 'spencer@gmail.com',
					type: 'Stripe',
					date: '1551315228792',
					downloads: [
						{
							download_url: 'http://shopeverytuesday.local/?download_file=222&order=wc_order_WACJ4jqOmzcx5&uid=48005c9bfbb9cc0aa69d683a821861fbfa5929e61e7bb4d52aa9268db9893836&key=831ced27-6944-4747-a419-99c292de9c0c',
							product_id: 222,
							product_name: 'Watercolor texture kit Vol. 1',
							product_url: 'http://shopeverytuesday.local/product/watercolor-texture-kit-vol-1/',
							order_id: 430,
							downloads_remaining: '',
							access_expires: null
						}
					]
				}
			}
		})
	}

	return (
		<div data-testid='navbar'>
			<UlStyled>
				<li>Home</li>
				<li><Link to='/account'>your profile</Link></li>
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
				<li onClick={receipt}>Receipt test</li>
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