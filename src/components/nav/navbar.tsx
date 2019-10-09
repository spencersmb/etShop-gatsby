import Receipt from '@components/modals/receipt'
import { INavToggle } from '@et/types/Actions'
import { ICartState } from '@et/types/Cart'
import { INavState } from '@et/types/Modal'
import { IState } from '@et/types/State'
import { IUser } from '@et/types/User'
import { ILogoutAction, logout as logoutAction } from '@redux/actions/authActions'
import { cartToggle } from '@redux/actions/cartActions'
import { INavAction, toggleNav as toggleNavAction } from '@redux/actions/navActions'
import { clearPagination } from '@redux/actions/paginationActions'
import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import { getWindowSize } from '@utils/windowUtils'
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { Link, navigate } from 'gatsby'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import Login from '@components/modals/login'
import {
	Nav,
	Hamburger,
	Logo,
	LogoContainer,
	NavLinks,
	CloseButton,
	NavCenter,
	NavRight,
	LoginStatus,
	JoinButton,
	SignInButton,
	MyAccount,
	SignOutBtn,
	CartWrapper,
	CartSvg,
	CartCount, MobileCartWrapper, NavItem
} from '@styles/modules/nav'

interface IPropsState {
	user: IUser | null,
	cart: ICartState,
	nav: INavState
}

interface IPropsActions {
	showModal: IShowModalAction,
	logout: ILogoutAction,
	clearPaginationAction: () => void,
	cartToggle: () => void
	toggleNav: INavAction
}

function Navbar (props: IPropsActions & IPropsState) {
	const { user, logout, toggleNav, nav } = props
	const target = useRef<HTMLElement | null>(null)
	const bodyScrollPos = useRef(0)

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
		setTimeout(() => {
			logout()
		}, 100)
	}

	function navToggle () {
		toggleNav()
	}

	function cartToggleEvent () {
		if (!nav.isOpen && target.current) {
			// bodyScrollPos.current = document.body.scrollTop || document.documentElement.scrollTop || 0
			// target.current.style.width = `100%`
			// target.current.style.top = `-${bodyScrollPos.current}px`
			// target.current.style.bottom = `0`
			// target.current.style.padding = `0 15px 0 0`
			// target.current.style.position = 'fixed'
		} else if (nav.isOpen && target.current) {
			// target.current.style.removeProperty('position')
			// target.current.style.removeProperty('top')
			// target.current.style.removeProperty('bottom')
			// target.current.style.removeProperty('padding')
			// document.documentElement.scrollTop = document.body.scrollTop = bodyScrollPos.current
		}
		props.cartToggle()

	}

	function getUserImage (currentUser: IUser) {
		if (currentUser.fbProfilePic) {
			return (
				<img src={currentUser.fbProfilePic} alt='facebook image'/>
			)
		}
		return (
			<img src={`https://www.gravatar.com/avatar/${currentUser.gravatar}`} alt='user image'/>
		)

	}

	const changePage = (href: string) => (e: any) => {
		e.preventDefault()
		if (nav.isOpen) {
			toggleNav()
			setTimeout(() => {
					navigate(href)
				}, 300
			)
		} else {
			navigate(href)
		}
	}

	useEffect(() => {
		target.current = document.querySelector('#___gatsby')
	})

	return (
		<Nav data-testid='navbar'>
			<Logo data-testid='nav-logo'>
				<LogoContainer>
					<a
						href='/'
						onClick={changePage('/')}
					>
						{renderSvg(svgs.ETLogo)}
					</a>
				</LogoContainer>
			</Logo>
			<MobileCartWrapper onClick={cartToggleEvent}>
				<CartSvg>{renderSvg(svgs.Cart)}</CartSvg>
				{props.cart.totalItems > 0 && <CartCount data-testid='cart-count'>
							<span>
								{props.cart.totalItems}
							</span>
        </CartCount>}
			</MobileCartWrapper>
			<Hamburger
				data-testid='hamburger'
				onClick={navToggle}>
				{nav.isOpen ? renderSvg(svgs.HamburgerClose) : renderSvg(svgs.Hamburger)}
			</Hamburger>

			<NavLinks
				isMobile={getWindowSize() !== 'desktop'}
				pose={nav.isOpen ? 'open' : 'closed'}
			>

				<NavCenter data-testid='nav-center' user={user}>
					{user && <NavItem hideOnDesktop={true} className={`accountTop`}>
            <MyAccount>
              <a
                href='/account'
                onClick={changePage('/account')}>
								{getUserImage(user)}
                <span>
									My account
								</span>
              </a>
            </MyAccount>
          </NavItem>}
					<NavItem>
						<a
							href='/'
							onClick={changePage('/')}>
							Products
						</a>
					</NavItem>
					<NavItem>
						<a href='https://every-tuesday.com' rel='noreferrer' target='_blank'>Blog</a>
					</NavItem>
					<NavItem>
						<a
							href='/support'
							onClick={changePage('/support')}>
							Support
						</a>
					</NavItem>
					{/*<li onClick={receipt}>Receipt test</li>*/}
				</NavCenter>
				<NavRight>
					{!user &&
          <LoginStatus>
            <NavItem>
              <SignInButton
                outline={false}
                color='transparent'
                textColor={colors.purple.i500}
                hoverColor='transparent'
                hoverTextColor={colors.purple.i600}
                onClick={openSignInModal('signin')}>Sign In</SignInButton>
            </NavItem>
            <NavItem>
              <JoinButton
                outline={false}
                color={colors.purple.i500}
                hoverColor={colors.purple.i600}
                onClick={openSignInModal('signup')}>Join Now</JoinButton>
            </NavItem>
          </LoginStatus>
					}
					{user &&
          <LoginStatus>
            <NavItem hideOnMobile={true}>
              <MyAccount>
                <a
                  href='javascript:void(0)'
                  onClick={changePage('/account')}>
									{getUserImage(user)}
                  <span>
									My account
								</span>
                </a>
              </MyAccount>
            </NavItem>
            <NavItem>
              <button className={'signOut'} onClick={signOut}>Sign Out</button>
            </NavItem>

          </LoginStatus>
					}
					<CartWrapper onClick={cartToggleEvent}>
						<CartSvg>{renderSvg(svgs.Cart)}</CartSvg>
						<CartCount data-testid='cart-count'>
							<span>
								{props.cart.totalItems > 0 ? props.cart.totalItems : ''}
							</span>
						</CartCount>
					</CartWrapper>
				</NavRight>

			</NavLinks>
		</Nav>
	)
}

const mapStateToProps = (state: IState): { user: IUser | null, cart: ICartState, nav: INavState } => {
	return {
		cart: state.cart,
		user: state.user,
		nav: state.nav
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		showModal: bindActionCreators(showModal, dispatch),
		logout: bindActionCreators(logoutAction, dispatch),
		cartToggle: bindActionCreators(cartToggle, dispatch),
		clearPaginationAction: bindActionCreators(clearPagination, dispatch),
		toggleNav: bindActionCreators(toggleNavAction, dispatch)
	}
}
// export default Navbars
export default connect<IPropsState, IPropsActions, {}, IState>(
	mapStateToProps,
	mapDispatchToProps
)(Navbar)
export { Navbar }
