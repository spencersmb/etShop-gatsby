import React, {
  ComponentType,
  RefObject,
  useRef,
  useEffect
} from 'react'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { hideModal } from '@redux/actions/modalActions'
import { connect } from 'react-redux'
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components'
import { IState } from '@et/types/State'

interface IPropsPublic {
  key?: string
}

interface IPropsRedux {
  // breakpoint: number;
  show: boolean,
  component: any | null,
  options: any,
}

interface IPropsActions {
  hideModalAction: () => void,
}

function isChildOf (child: any, parent: any): any {
  if (child.parentNode === parent) {
    return true
  } else { return child.parentNode !== null; }
}

/**
 * Modal Wrapper:
 * This modal is a container for any modal component to pass into it.
 * The component shows depending on Redux state and if a component is passed into it
 * The animation is triggered by a Promise function to calc the center location of the component passed into it
 * The modal then animates in based on a visible and hidden state using the POSE prop and a boolean
 *
 * On Resize we close the modal.
 */
export const Modal = (props: IPropsActions & IPropsRedux) => {
  const {show, component} = props
  const modalContentRef: RefObject<any> = useRef(null)
  const bodyRef: any = useRef(null)

  function forceClose () {
    props.hideModalAction()
  }

  function handleOnOutsideClick (e: any)  {
    if (isChildOf(e.target, modalContentRef.current)) {
      props.hideModalAction()
    }
  }

  function handleOnCloseClick () {
    props.hideModalAction()
  }

  function renderModal (ModalComponent: ComponentType<any>) {
    if (!ModalComponent) {
      return (<div>No Modal Found</div>)
    }
    return <ModalComponent
      options={props.options}
      closeModal={handleOnCloseClick}
      // showLoadingBar={props.showLoadingBarAction}
      // hideLoadingBar={props.hideLoadingBarAction}
      // isLoading={props.isLoading}
      />
  }

  // on mount get body
  useEffect(()=>{
    bodyRef.current = document.getElementsByTagName('body')
  },[])


  useEffect(()=>{
    // if props.show means the modal should be open
    if(show){
      if(bodyRef.current.length > 0){
        bodyRef.current[0].setAttribute('style', 'overflow: hidden; height: 100vh;')
      }
    }

    return () => {
      if(!show && bodyRef.current && bodyRef.current.length > 0){
        bodyRef.current[0].setAttribute('style', 'overflow: visible; height: auto;')
      }
    }
    // if (prevProps.breakpoint !== this.props.breakpoint && this.modalContentRef.current !== null && this.props.show) {
    // 	// resized
    // 	this.forceClose()
    // }

  }, [show])

  return (
    <PoseGroup>
      {show && [
        <ModalPose
          key='modal'
          ref={modalContentRef}
        >
          {renderModal(component)}
        </ModalPose>,
        <Overlay
        data-testid='overlay'
        key='overlay'
        onClick={handleOnOutsideClick}
        />
      ]}
    </PoseGroup>
  )
}

const mapStateToProps = (state: IState): IPropsRedux => {
  return {
    // breakpoint: state.breakPoint,
    component: state.modal.component,
    // isLoading: state.loadingBar.isLoading,
    options: state.modal.options,
    show: state.modal.show
  }
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    hideModalAction: bindActionCreators(hideModal, dispatch)
    // hideLoadingBarAction: bindActionCreators(hideLoadingBar, dispatch),
    // showLoadingBarAction: bindActionCreators(showLoadingBar, dispatch),
  }
}

export default connect<IPropsRedux, IPropsActions, IPropsPublic, IState>(mapStateToProps, mapDispatchToProps)(Modal)

// animations
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
const Shade = styled.div`
		background: red;
		height: 100vh;
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: ${depth};
`
const Overlay = posed(Shade)({
  exit: {
    opacity: 0,
    // transition: {
    //   default: { delay: 100 }
    // }
  },
  enter: { opacity: 1 }
})

