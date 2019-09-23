import Receipt from '@components/modals/receipt'
import { ICartState } from '@et/types/Cart'
import { IState } from '@et/types/State'
import { IUser } from '@et/types/User'
import { ILogoutAction, logout as logoutAction } from '@redux/actions/authActions'
import { cartToggle } from '@redux/actions/cartActions'
import { clearPagination } from '@redux/actions/paginationActions'
import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React, { useEffect, useRef, useState } from 'react'
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
	CartCount, MobileCartWrapper
} from '@styles/modules/nav'

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
		clearPaginationAction()
		setTimeout(() => {
			logout()
		}, 100)
	}

	function navToggle () {
		setIsOpen(!isOpen)
	}

	function cartToggleEvent () {

		if (!isOpen && target.current) {
			bodyScrollPos.current = document.body.scrollTop || document.documentElement.scrollTop || 0
			target.current.style.width = `100%`
			target.current.style.top = `-${bodyScrollPos.current}px`
			target.current.style.bottom = `0`
			target.current.style.padding = `0 15px 0 0`
			target.current.style.position = 'fixed'
		} else if (isOpen && target.current) {
			target.current.style.removeProperty('position')
			target.current.style.removeProperty('top')
			target.current.style.removeProperty('bottom')
			target.current.style.removeProperty('padding')
			document.documentElement.scrollTop = document.body.scrollTop = bodyScrollPos.current
		}
		props.cartToggle()

	}

	useEffect(() => {
		target.current = document.querySelector('#___gatsby')
	})

	return (
		<Nav data-testid='navbar'>
			<Logo data-testid='nav-logo'>
				<LogoContainer>
					<Link
						to='/'>
						{renderSvg(svgs.ETLogo)}
					</Link>
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
				Button
			</Hamburger>

			<NavLinks isOpen={isOpen}>
				<CloseButton
					data-testid='nav-close'
					onClick={navToggle}>Close</CloseButton>
				<NavCenter data-testid='nav-center'>
					<li>
						<Link
							to='/'>
							Products
						</Link>
					</li>
					<li>
						<a href='https://every-tuesday.com' rel='noreferrer' target='_blank'>Blog</a>
					</li>
					<li>
						<Link
							to='/support'>
							Support
						</Link>
					</li>
					{/*<li onClick={receipt}>Receipt test</li>*/}
				</NavCenter>
				<NavRight>
					{!user &&
          <LoginStatus>
            <SignInButton
              outline={false}
              color='transparent'
              textColor={colors.purple.i500}
              hoverColor='transparent'
              hoverTextColor={colors.purple.i600}
              onClick={openSignInModal('signin')}>Sign In</SignInButton>
            <JoinButton
              outline={false}
              color={colors.purple.i500}
              hoverColor={colors.purple.i600}
              onClick={openSignInModal('signup')}>Join Now</JoinButton>
          </LoginStatus>
					}
					{user &&
          <LoginStatus>
            <MyAccount>
              <Link to='/account'>
                <img src={`https://www.gravatar.com/avatar/${user.gravatar}`} alt='user gravatar image'/>
                <span>
									My account
								</span>
              </Link>
            </MyAccount>
            <SignOutBtn
              outline={false}
              color='transparent'
              textColor={colors.primary.pink}
              hoverColor='transparent'
              hoverTextColor={colors.primary.pink}
              onClick={signOut}>Sign Out</SignOutBtn>
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
