import { ICartState } from '@et/types/Cart'
import { IModal, INavState } from '@et/types/Modal'
import { IState } from '@et/types/State'
import { IFacebookUserCreate } from '@et/types/User'
import {
	createUserFacebook as createUserFacebookAction,
	createUser as createUserAction,
	login as loginAction
} from '@redux/actions/authActions'
import { INavAction, toggleNav as toggleNavAction } from '@redux/actions/navActions'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { toastrOptions } from '@utils/apiUtils'
import { renderSvg } from '@utils/styleUtils'
import { getWindowSize } from '@utils/windowUtils'
import posed, { PoseGroup } from 'react-pose'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Action, bindActionCreators, Dispatch } from 'redux'
import styled from 'styled-components'
import SignInForm from '@components/forms/signin'
import SignUpForm from '@components/forms/signup'
import { navigate } from 'gatsby'
import React, { useState, useEffect, useRef } from 'react'
import PoseHoc, { IPoseHoc } from '@components/animations/poseHoc'

/*
 * LoginModal
 * This is a container holding two form components, Login and SignUp, that display depending
 * on what link was clicked.
 * The link passes in the name of the component to match against.
 *
 * Then the element animates in. Pose component also has a firstRender variable on it if this is the
 * first time the component has displayed so we bypass the intro animation and the component just displays immediately.
 *
 * ShouldComponentUpdate is used to cut down on extra renders using Pose in the Parent Modal 'Core' component when it updates state
 *
 */

interface IpropsReduxActions {
	loginAction: (formData: IFormProps) => any,
	createUser: (data: any) => any
	createUserFacebook: (data: IFacebookUserCreate) => any
	navToggle: INavAction
}

interface IPropsReduxState {
	nav: INavState
	cart: ICartState
}

interface IFormProps {
	email: string,
	password: string
}

type MixedFormProps = IModal & IpropsReduxActions & IPropsReduxState

export const LoginModal = (props: MixedFormProps) => {
	const { options, closeModal, nav, navToggle, cart } = props
	const [name, setName] = useState(options.name)
	const [submitting, setSubmitting] = useState(false)
	const [facebookError, setFacebookError] = useState(null)
	const firstRender = useRef(true)

	useEffect(() => {

		return () => {
			firstRender.current = true
		}
	}, [])

	function changeForm (event: any) {
		const formName = event.target.getAttribute('data-form')
		setName(formName)
		firstRender.current = false
	}

	const userSubmit = async (formProps: any) => {

		try {
			const loginResponse: { firstName: string } = await props.loginAction(formProps)
			toastr.removeByType('error')
			toastr.success(`Welcome ${loginResponse.firstName}`, 'you\'ve successfully logged in.', toastrOptions.standard)
			closeModal()
			if (!cart.isOpen) {
				navigate(`/account/`)
			}
		} catch (e) {
			console.error('user login fail:', e)
		}
	}

	const userSignUp = async (formProps: any) => {
		try {
			const response: { firstName: string } = await props.createUser(formProps)
			if (nav.isOpen) {
				navToggle()
			}
			closeModal()
			toastr.removeByType('error')
			toastr.success(`Welcome ${response.firstName}`, 'you\'ve successfully logged in.', toastrOptions.standard)
			if (!cart.isOpen) {
				navigate(`/account/`)
			}

		} catch (e) {
			console.error('user signup fail:', e)
		}
	}

	const facebookSignUp = async (formProps: IFacebookUserCreate) => {
		try {
			const response: { firstName: string } = await props.createUserFacebook(formProps)
			setSubmitting(false)

			if (nav.isOpen) {
				navToggle()
			}
			closeModal()
			toastr.removeByType('error')
			toastr.success(`Welcome ${response.firstName}`, 'you\'ve successfully logged in.', toastrOptions.standard)
			if (!cart.isOpen) {
				navigate(`/account/`)
			}

		} catch (e) {
			console.error('user facebook signup fail:', e)
			setFacebookError(e)
			setSubmitting(false)
		}
	}

	return (
		<ModalPose
			animateOnMount={true}
			key='loginmodal'
			modal={name}
			device={getWindowSize()}
		>
			<LoginModalWrapper>
				<LoginModalContent>
					<ContentContainer modalHeight={name}>

						<PoseGroup>
							{/*SignIn Form*/}
							{name === 'signin' &&
              <SignInPose key='signIn' firstRender={firstRender.current}>
								{({ ref }: IPoseHoc) => (
									<SignInForm
										handleUserSubmit={userSubmit}
										changeForm={changeForm}
										closeModal={closeModal}
										firstRender={firstRender.current}
										poseRef={ref}
										setFacebookError={setFacebookError}
										facebookError={facebookError}
										setManualSubmit={setSubmitting}
										manualSubmitting={submitting}
										handleFacebookSubmit={facebookSignUp}
									/>
								)}
              </SignInPose>}

							{/*SignUp Form*/}
							{name === 'signup' &&
              <SignInPose key='signUp' firstRender={firstRender.current}>
								{({ ref }: IPoseHoc) => (
									<SignUpForm
										handleUserSubmit={userSignUp}
										changeForm={changeForm}
										closeModal={closeModal}
										firstRender={firstRender.current}
										poseRef={ref}
										setFacebookError={setFacebookError}
										facebookError={facebookError}
										setManualSubmit={setSubmitting}
										manualSubmitting={submitting}
										handleFacebookSubmit={facebookSignUp}
									/>
								)}
              </SignInPose>
							}

						</PoseGroup>
					</ContentContainer>
				</LoginModalContent>


			</LoginModalWrapper>
		</ModalPose>
	)
}

// export default LoginModal
const mapStateToProps = (state: IState): { nav: INavState, cart: ICartState } => {
	return {
		nav: state.nav,
		cart: state.cart
	}
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
	return {
		loginAction: bindActionCreators(loginAction, dispatch),
		createUserFacebook: bindActionCreators(createUserFacebookAction, dispatch),
		navToggle: bindActionCreators(toggleNavAction, dispatch),
		createUser: bindActionCreators(createUserAction, dispatch)
	}
}

export default connect<IPropsReduxState, IpropsReduxActions, IModal, IState>(mapStateToProps, mapDispatchToProps)(LoginModal)
const depth = 6
const ModalStyled = styled.div`
		position: fixed;
		// Double the top position so I can animate the Y transform for smoother animation. Does a reverse animation essentially
		// top: ${(props: any) => props.top * 2}px;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		transform: translateY(-50%) translateX(-50%);
		background: #fff;
		z-index: ${depth + 1};
		opacity: 0;
		overflow: hidden;
		
		@media ${device.tablet} {
			border-radius: 15px;
			box-shadow: 0 20px 45px -6px rgba(0,0,0,.2);
			width: 710px;
			height: auto;
		}
`
const ModalPose = posed(ModalStyled)({
	exit: {
		zIndex: 7,
		opacity: 0,
		transition: {
			default: { duration: 200 },
			y: { ease: 'easeOut' }
		},
		// width: 0,
		// height: 0,
		x: `-50%`,
		y: `-60%`
	},
	enter: {
		zIndex: 7,
		opacity: 1,
		delay: 300,
		transition: {
			default: { duration: 300 },
			height: {
				duration: 300,
				ease: [1, 0, 0, 1]
			},
			// y: { type: 'spring', stiffness: 1500, damping: 15 },
			y: { type: 'spring', stiffness: 1500, damping: 35 }
		},
		x: `-50%`,
		y: `-50%`
		// width: `100%`,
		// height: (props: any) => {
		// 	console.log('props', props)
		//
		// 	if (props.modal === 'signin') {
		// 		return props.device === 'mobile' ? '100%' : 697
		// 	} else {
		// 		return props.device === 'mobile' ? '100%' : 617
		// 	}
		// }
	}
})
const LoginModalWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	background: #fff;
	width: 100%;
	height: 100%;
		
`
const LoginModalContent = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	flex: 1;
`
const LeftContent = styled.div`
	display: none;
`
const ContentContainer = styled.div<any>`
	position: relative;
	//width: 320px;
	width: 100%;
	transition: height .2s;
	//transition-delay: .3s;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: ${(props) => props.modalHeight === 'signup' ? `flex-start` : `center`};
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	
	@media ${device.tablet} {
		justify-content: center;
		overflow: hidden;	
		height: ${(props) => props.modalHeight === 'signup' ? `617px` : `617px`};
	}
		
`
const CloseBtn = styled.div`
	width: 45px;
	height: 45px;
	position: absolute;
	top: 10px;
	right: 10px;
	display: flex;
	cursor:pointer;
	svg{
		width: 100%
	}
	path{
		fill: ${colors.grey.i800};
	}

		
`
// animations
//   ...(flag1 && { optionalKey1: 5 }),
// How it works
// We pass in our HOC component to pass down the ref to the inner component that needs to animate in/out
// The size of the box animation is controlled by ContentContainer and we delay it to look like the animation is staggered
const SignInPose = posed(PoseHoc)({
	enter: {
		// delay: ((props: any) => props.firstRender ? 0 : 150),

		duration: ((props: any) => props.firstRender ? 0 : 50),
		opacity: 1,
		y: `0px`
	},
	exit: {
		opacity: 0,
		y: `-25px`
	}
})


