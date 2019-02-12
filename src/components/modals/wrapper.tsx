import React, {
  ComponentType,
  RefObject,
  useState,
  useRef,
  useEffect
} from 'react'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { hideModal } from '@redux/actions/modalActions'
import { connect } from 'react-redux'
import posed from 'react-pose'
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
  const [isVisible, setIsVisible] = useState(false)
  const modalContentRef: RefObject<any> = useRef(null)

  function forceClose () {
    setIsVisible(false)
    props.hideModalAction()
  }

  function animateClose () {
    // on animate complete fires on both open and close,
    // so we check to make sure to only hide modal when isVisible is set to false
    if (!isVisible) {
      props.hideModalAction()
    }
  }

  function handleOnOutsideClick (e: any)  {
    if (isChildOf(e.target, modalContentRef.current)) {
      setIsVisible(false)
    }
  }

  function handleOnCloseClick () {
    setIsVisible(false)
  }

  function renderModal (ModalComponent: ComponentType<any>) {
    if (!ModalComponent) {
      return (<div>No Modal Found</div>)
    }
    return <ModalComponent
      showModal={props.show}
      // showLoadingBar={props.showLoadingBarAction}
      // hideLoadingBar={props.hideLoadingBarAction}
      closeModal={handleOnCloseClick}
      // isLoading={props.isLoading}
      confirm={props.options.confirm}
      content={props.options.content}/>
  }

  useEffect(()=>{
    console.log('render')
    // first pass modal is null so no render
    // but when props change - it will render

    // render if not null
    if (modalContentRef.current && props.show) {
      setIsVisible(true)
    }

    // if (prevProps.breakpoint !== this.props.breakpoint && this.modalContentRef.current !== null && this.props.show) {
    // 	// resized
    // 	this.forceClose()
    // }

  }, [show])

  return (
    show && component &&
    <>
      <ModalPose
        ref={modalContentRef}
        pose={isVisible ? 'visible' : 'hidden'}
      >
        {renderModal(component)}
      </ModalPose>
      <Overlay
        data-testid='overlay'
        onClick={handleOnOutsideClick}
        onPoseComplete={animateClose}
        pose={isVisible ? 'visible' : 'hidden'}/>
    </>
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
  hidden: {
    opacity: 0,
    transition: {
      default: { duration: 300 },
      y: { ease: 'easeOut' }
    },
    x: `-50%`,
    // y: (props: any) => -props.top + 24,
    y: `-60%`
  },
  visible: {
    opacity: 1,
    transition: {
      default: { duration: 100 },
      y: { type: 'spring', stiffness: 1500, damping: 35 }
    },
    x: `-50%`,
    // y: (props: any) => -props.top,
    y: `-50%`
  }
})
const Shade = styled.div`
		background: red;
		height: 100vh;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: ${depth};
`
const Overlay = posed(Shade)({
  hidden: {
    opacity: 0,
    transition: {
      default: { delay: 100 }
    }
  },
  visible: { opacity: 1 }
})

