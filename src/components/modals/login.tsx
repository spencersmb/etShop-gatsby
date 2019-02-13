import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components'
import SignInForm from '@components/forms/signin'
// import SignUpForm from '@et/forms/signUp'
import React, { useState, useEffect, useRef, RefObject } from 'react'
import PoseHoc, { IPoseHoc } from '@components/animations/poseHoc'

interface IModalOptions {
  closeModal: () => void,
  options: {
    name: string,
    content: string
  }
}

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

export const LoginModal = ({options, closeModal}: IModalOptions) =>{
  
  const [name, setName] = useState(options.name)
  const firstRender = useRef(true)

  useEffect(()=>{
    return()=>{
      firstRender.current = true
    }
  }, [])

  function changeForm(newName: string){
    return ()=>{
      setName(newName)
      firstRender.current = false
    }
  }

  return (
    <LoginModalWrapper>
      <LoginModalContent>
        <div style={{background: '#7ACC28'}} className='content'>
          TEst left content
        </div>
        <ContentContainer modalHeight={name}>

          <PoseGroup>

            {/*SignIn Form*/}
            {name === 'signin' &&
            <SignInPose key='signIn' firstRender={firstRender.current}>
              {({ref}: IPoseHoc) => (
                <SignInForm
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
              {({ref}: IPoseHoc) => (
                <div ref={ref} key='signUp'>
                  Signup
                  <button onClick={changeForm('signin')}>Sign In</button>
                </div>
              )}
            </SignInPose>
            }

          </PoseGroup>
        </ContentContainer>
      </LoginModalContent>

      <button className='jestCartToggle' onClick={closeModal}>Close</button>
    </LoginModalWrapper>
  )
}

export default LoginModal

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


