import Receipt from '@components/modals/receipt'
import { ICartState } from '@et/types/Cart'
import { IState } from '@et/types/State'
import { IUser } from '@et/types/User'
import { ILogoutAction, logout as logoutAction } from '@redux/actions/authActions'
import { cartToggle } from '@redux/actions/cartActions'
import { clearPagination } from '@redux/actions/paginationActions'
import { device } from '@styles/global/breakpoints'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
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
	clearPaginationAction: () => void,
	cartToggle: () => void
}

function Navbar (props: IPropsActions & IPropsState) {
	const { user, logout, clearPaginationAction } = props
	const [isOpen, setIsOpen] = useState(false)

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

	function signOut () {
		navigate('/')
		clearPagination()
		setTimeout(() => {
			logout()
		}, 100)
	}

	function navToggle () {
		setIsOpen(!isOpen)
	}

	console.log('isOpen', isOpen)

	return (
		<Nav data-testid='navbar'>
			<Logo>
				<LogoContainer>
					<Link
						to='/'>
						{renderSvg(svgs.ETLogo)}
					</Link>
				</LogoContainer>
			</Logo>
			<Hamburger onClick={navToggle}>
				Button
			</Hamburger>
			<NavInner isOpen={isOpen}>
				<LogoDesktop>
					<LogoContainer>
						<Link
							to='/'>
							{renderSvg(svgs.ETLogo)}
						</Link>
					</LogoContainer>
				</LogoDesktop>
				<NavCenter>
					<li>Products</li>
					<li>Blog</li>
					<li>Support</li>
					{/*<li onClick={receipt}>Receipt test</li>*/}
				</NavCenter>
				<NavRight>
					{!user &&
          <>
            <li onClick={openSignInModal('signin')}>Sign In</li>
            <li onClick={openSignInModal('signup')}>Sign Up</li>
          </>
					}
					{user &&
          <>
            <li><Link to='/account'>your profile</Link></li>
            <li onClick={signOut}>Sign Out</li>
          </>
					}
					<li onClick={props.cartToggle}>Cart ({props.cart.totalItems})</li>
				</NavRight>
			</NavInner>
		</Nav>
	)
}

const Hamburger = styled.div`
	display: block;
	@media ${device.tablet} {
		display: none;
	}
`
const Nav = styled.nav`
	background: green;
	//height: 100%;
	//height: 100vh;
	height: 55px;
	width: 100%;
	//flex-direction: column;
	
	@media ${device.tablet} {
		position: relative;
		height: auto;
		flex-direction: row;
		display: flex;
	}
`

const NavInner = styled.div`
	position: absolute;
	top: ${props => props.isOpen ? 70 : 0}px;
	left: 0;
	width: 100%;
	display: ${props => props.isOpen ? 'flex' : 'none'};
	flex-direction: column;
	
	@media ${device.tablet} {
		position: relative;
		top: 0;
		display: flex;
		flex-direction: row;
		flex: 1;
	}
	
`

const Logo = styled.div`
	flex: 0 33.3333%;
	@media ${device.tablet}{
		display: none;
	}
`
const LogoDesktop = styled.div`
	flex: 0;
	display: none;
	svg{
		width: 100%;
	}

	@media ${device.tablet}{
		flex: 1;
		display: block;
	}
`
const LogoContainer = styled.div`
		max-width: 140px;
	@media ${device.tablet}{
		max-width: 234px;
	}
`
const NavCenter = styled.ul`
	flex: 2;
	display: flex;
	flex-direction: row;
	margin: 0;
	background: olivedrab;
	padding: 0;
	li{
		list-style: none;
		margin: 0 10px;
	}
	
	@media ${device.tablet}{
		align-items: center;
    justify-content: center;
	}
	
`

const NavRight = styled.div`
	flex: 1;
	background: red;
	li{
		list-style: none;
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
		cartToggle: bindActionCreators(cartToggle, dispatch),
		clearPaginationAction: bindActionCreators(clearPagination, dispatch)
	}
}
// export default Navbars
export default connect<IPropsState, IPropsActions, {}, IState>(
	mapStateToProps,
	mapDispatchToProps
)(Navbar)
export { Navbar }