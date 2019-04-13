import { IModal } from '@et/types/Modal'
import { createUser as createUserAction, login as loginAction } from '@redux/actions/authActions'
import { toastrOptions } from '@utils/apiUtils'
import posed, { PoseGroup } from 'react-pose'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Action, bindActionCreators, Dispatch } from 'redux'
import styled from 'styled-components'
import SignInForm from '@components/forms/signin'
import SignUpForm from '@components/forms/signup'
import { navigate } from 'gatsby'
// import SignUpForm from '@et/forms/signUp'
import React, { useState, useEffect, useRef } from 'react'
import PoseHoc, { IPoseHoc } from '@components/animations/poseHoc'

/*
 * LoginModal
 * This is a container holding two form components, Login and SignUp, that display depending
 * on what link was clicked.
 * The link passes in the name of the component to match against.
 *
 * Then the element animates in. Pose component also has a firstRender variable on it if this is the
 * first time the component has displayed so we bypass the intro animation and the component just displays normally.
 *
 * ShouldComponentUpdate is used to cut down on extra renders using Pose in the Parent Modal 'Core' component when it updates state
 *
 */

interface IpropsReduxActions {
	loginAction: (formData: IFormProps) => any,
	createUser: (data: any) => any
}

interface IFormProps {
	email: string,
	password: string
}

type MixedFormProps = IModal & IpropsReduxActions

export const LoginModal = (props: MixedFormProps) => {
	const { options, closeModal } = props

	const [name, setName] = useState(options.name)
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
			navigate(`/account/`)
		} catch (e) {
			console.error('user login fail:', e)
		}
	}

	const userSignUp = async (formProps: any) => {
		console.log('formProps', formProps)

		try {
			const response: { firstName: string } = await props.createUser(formProps)
			toastr.removeByType('error')
			toastr.success(`Welcome ${response.firstName}`, 'you\'ve successfully logged in.', toastrOptions.standard)
			closeModal()
			navigate(`/account/`)
		} catch (e) {
			console.error('user signup fail:', e)
		}
	}

	return (
		<ModalPose
			animateOnMount={true}
			key='loginmodal'
		>
			<LoginModalWrapper>
				<LoginModalContent>
					<div style={{ background: '#7ACC28' }} className='content'>
						TEst left content
					</div>
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
									/>
								)}
              </SignInPose>
							}

						</PoseGroup>
					</ContentContainer>
				</LoginModalContent>

				<button className='jestCartToggle' onClick={closeModal}>Close</button>
			</LoginModalWrapper>
		</ModalPose>
	)
}

// export default LoginModal

const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
	return {
		loginAction: bindActionCreators(loginAction, dispatch),
		createUser: bindActionCreators(createUserAction, dispatch)
	}
}

const actions: any = {
	loginAction,
	createUserAction
}

export default connect<null, IpropsReduxActions, IModal, MixedFormProps>(null, mapDispatchToProps)(LoginModal)
const depth = 6
const ModalStyled = styled.div`
		border-radius: 15px;
		box-shadow: 0 20px 45px -6px rgba(0,0,0,.2);
		position: fixed;
		// Double the top position so I can animate the Y transform for smoother animation. Does a reverse animation essentially
		// top: ${(props: any) => props.top * 2}px;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
		background: #fff;
		z-index: ${depth + 1};
		opacity: 0;
		overflow: hidden;
`
const ModalPose = posed(ModalStyled)({
	exit: {
		opacity: 0,
		transition: {
			default: { duration: 150 },
			y: { ease: 'easeOut' }
		},
		x: `-50%`,
		y: `-60%`
	},
	enter: {
		opacity: 1,
		delay: 300,
		transition: {
			default: { duration: 300 },
			// y: { type: 'spring', stiffness: 1500, damping: 15 },
			y: { type: 'spring', stiffness: 1500, damping: 35 }
		},
		x: `-50%`,
		y: `-50%`
	}
})
const LoginModalWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	background: #fff;
`
const LoginModalContent = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	flex: 1;
`
const ContentContainer = styled.div<any>`
	position: relative;
	width: 320px;
	transition: height .2s;
	//transition-delay: .3s;
	height: ${(props) => props.modalHeight === 'signup' ? `500px` : `280px`};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
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


