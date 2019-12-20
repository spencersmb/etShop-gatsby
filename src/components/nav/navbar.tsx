import Receipt from '@components/modals/receipt'
import { INavToggle } from '@et/types/Actions'
import { ICartState } from '@et/types/Cart'
import { INavState } from '@et/types/Modal'
import { IState } from '@et/types/State'
import { IUser } from '@et/types/User'
import { IReceipt, IRefund } from '@et/types/WC_Order'
import { ILogoutAction, logout as logoutAction } from '@redux/actions/authActions'
import { cartToggle } from '@redux/actions/cartActions'
import { INavAction, toggleNav as toggleNavAction } from '@redux/actions/navActions'
import { clearPagination } from '@redux/actions/paginationActions'
import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { toastrOptions } from '@utils/apiUtils'
import { isUserValid } from '@utils/authUtils'
import { getUserImage } from '@utils/genUtils'
import { renderSvg } from '@utils/styleUtils'
import { getWindowSize } from '@utils/windowUtils'
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { Link, navigate } from 'gatsby'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
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
	CartCount, MobileCartWrapper, NavItem, SignOut
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

const fakeData: IReceipt = {
	id: 962,
	total: '179.09',
	date: '12-16-2019',
	status: 'completed',
	transactionId: 'ch_1FqVX9I4y1PxdHL7vI00d1s9',
	refund: null,
	payment_type: 'Credit Card',
	order_id: '962',
	email: 'teelacunningham@gmail.com',
	date_completed: 'December 16, 2019',
	totals: '179.09',
	subtotal: '267.3',
	cardType: 'Visa',
	discounts: '88.21',
	discount_reverse: 88.21,
	coupon_used: [
		'percentage-test'
	],
	downloads: {
		exp_date: 1576634862,
		products: [
			{
				id: 799,
				name: 'Skinny Jeans Extended',
				subtitle: 'Font Trio: Script, Caps + Symbols',
				sku: '',
				total: '179.09',
				qty: 33,
				filename: 'Skinny-Jeans-Ext.zip',
				url: 'https://wc-products.s3.amazonaws.com/Skinny-Jeans-Ext.zip?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJFVJM7XVRJPMVXBA%2F20191218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20191218T020442Z&X-Amz-SignedHeaders=host&X-Amz-Expires=120&X-Amz-Signature=99bb37ab7b7ce1d5d26ab7533f4bb2164ad5f08577bc048de024bdd2311ed76d'
			},
			{
				id: 29,
				name: 'Skinny Jeans Extended',
				subtitle: 'Font Trio: Script, Caps + Symbols',
				sku: '',
				total: '179.09',
				qty: 33,
				filename: 'Skinny-Jeans-Ext.zip',
				url: 'https://wc-products.s3.amazonaws.com/Skinny-Jeans-Ext.zip?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJFVJM7XVRJPMVXBA%2F20191218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20191218T020442Z&X-Amz-SignedHeaders=host&X-Amz-Expires=120&X-Amz-Signature=99bb37ab7b7ce1d5d26ab7533f4bb2164ad5f08577bc048de024bdd2311ed76d'
			},
			{
				id: 99,
				name: 'Skinny Jeans Extended',
				subtitle: 'Font Trio: Script, Caps + Symbols',
				sku: '',
				total: '179.09',
				qty: 33,
				filename: 'Skinny-Jeans-Ext.zip',
				url: 'https://wc-products.s3.amazonaws.com/Skinny-Jeans-Ext.zip?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJFVJM7XVRJPMVXBA%2F20191218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20191218T020442Z&X-Amz-SignedHeaders=host&X-Amz-Expires=120&X-Amz-Signature=99bb37ab7b7ce1d5d26ab7533f4bb2164ad5f08577bc048de024bdd2311ed76d'
			},
			{
				id: 199,
				name: 'Skinny Jeans Extended',
				subtitle: 'Font Trio: Script, Caps + Symbols',
				sku: '',
				total: '179.09',
				qty: 33,
				filename: 'Skinny-Jeans-Ext.zip',
				url: 'https://wc-products.s3.amazonaws.com/Skinny-Jeans-Ext.zip?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJFVJM7XVRJPMVXBA%2F20191218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20191218T020442Z&X-Amz-SignedHeaders=host&X-Amz-Expires=120&X-Amz-Signature=99bb37ab7b7ce1d5d26ab7533f4bb2164ad5f08577bc048de024bdd2311ed76d'
			}
		]
	}
}

function Navbar (props: IPropsActions & IPropsState) {
	const { user, logout, toggleNav, nav } = props
	// const {src, alt} = getUserImage(user)
	const target = useRef<HTMLElement | null>(null)

	useEffect(() => {
		// USER EXPIRED CHECK
		if (user && !isUserValid(user.token)) {
			toastr.error('User Expired:', 'Please login again.', toastrOptions.noHover)
			signOut()
		}
	}, [])

	function openSignInModal (name: string) {
		return () => {
			props.showModal({
				modal: Login,
				// modal: Receipt,
				options: {
					closeModal: true,
					hasBackground: true,
					name
				}
			})
		}
	}

	function receipt () {
		props.showModal({
			modal: Receipt,
			options: {
				closeModal: true,
				hasBackground: false,
				data: fakeData
			}
		})
	}

	function signOut () {
		setTimeout(() => {
			logout()
			if (nav.isOpen) {
				toggleNav()
			}
		}, 100)
	}

	function navToggle () {
		toggleNav()
	}

	function cartToggleEvent () {
		props.cartToggle()

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
					<a onClick={receipt}>Receipt</a>
					{user && <NavItem hideOnDesktop={true} className={`accountTop`}>
            <MyAccount>
              <a
                href='/account'
                onClick={changePage('/account')}>
                <img src={getUserImage(user).src} alt={getUserImage(user).alt}/>
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
                  <img src={getUserImage(user).src} alt={getUserImage(user).alt}/>
                  <span>
									Account
								</span>
                </a>
              </MyAccount>
            </NavItem>
            <NavItem>
              <SignOut onClick={signOut}>
                Sign Out
              </SignOut>
							{/*<button className={'signOut'} onClick={signOut}>Sign Out</button>*/}
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
