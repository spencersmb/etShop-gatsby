import React, {
  Component,
  ComponentType,
  RefObject
} from 'react'
import { Action, bindActionCreators, Dispatch } from 'redux'
// import {hideModal} from '@et/actions/modalActions'
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

interface ILocalState {
  visible: boolean
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
export const Modal = class extends Component<IPropsPublic & IPropsActions & IPropsRedux, ILocalState> {
  static isChildOf (child: any, parent: any): any {
    if (child.parentNode === parent) {
      return true
    } else if (child.parentNode === null) {
      return false
    } else {
      return this.isChildOf(child.parentNode, parent)
    }
  }

  wrapperRef: RefObject<any>
  modalContentRef: RefObject<any>
  state = {
    visible: false
  }

  constructor (props: IPropsPublic & IPropsActions & IPropsRedux) {
    super(props)

    this.handleOnCloseClick = this.handleOnCloseClick.bind(this)
    this.animateClose = this.animateClose.bind(this)
    // this.handleOnOutsideClick = this.handleOnOutsideClick.bind(this)
    this.wrapperRef = React.createRef()
    this.modalContentRef = React.createRef()
    this.state = {
      visible: false
    }
  }

  async componentDidMount () {
    // reset if null
    if (this.modalContentRef.current === null) {
      this.forceClose()
    }

    // re-render if not null
    if (this.modalContentRef.current !== null && this.props.show) {

      this.setState(() => {
        return {
          visible: true
        }
      })

    }

  }

  async componentDidUpdate (prevProps: IPropsPublic & IPropsActions & IPropsRedux, prevState: ILocalState) {
    if (!prevProps.show && this.modalContentRef.current !== null && this.props.show) {
      this.setState(() => {
        return {
          visible: true
        }
      })

      return
    }

    // if (prevProps.breakpoint !== this.props.breakpoint && this.modalContentRef.current !== null && this.props.show) {
    // 	// resized
    // 	this.forceClose()
    // }
  }

  handleOnOutsideClick = (e: any) => {
    if (!Modal.isChildOf(e.target, this.modalContentRef.current)) {
      this.setState(() => {
        return {
          visible: false
        }
      })
    }
  }

  handleOnCloseClick (cb: any = null, url: any = null) {
    // Callback must be the ROUTER object from NEXT
    // animations.fadeOut(this.wrapper)
    // animations.hide(this.container, () => {
    // 	this.props.hideModalAction()
    // 	if (cb && url && (typeof url === 'string')) {
    // 		cb.push(url)
    // 	}
    // })
    this.setState(() => {
      return {
        visible: false
      }
    })
  }

  animateClose () {
    if (!this.state.visible) {
      this.props.hideModalAction()
    }
  }

  forceClose () {
    this.setState(() => {
      return {
        visible: false
      }
    })
    this.props.hideModalAction()
  }

  renderModal (ModalComponent: ComponentType<any>) {
    if (!ModalComponent) {
      return (<div>No Modal Found</div>)
    }
    return <ModalComponent
      showModal={this.props.show}
      // showLoadingBar={this.props.showLoadingBarAction}
      // hideLoadingBar={this.props.hideLoadingBarAction}
      closeModal={this.handleOnCloseClick}
      // isLoading={this.props.isLoading}
      confirm={this.props.options.confirm}
      content={this.props.options.content}/>
  }

  render () {
    // Don't Forget the OPTIONS on PROPS
    const { show, component } = this.props

    // will return empty if nothing is true
    return (
      show && component &&
      <>
        <ModalPose
          ref={this.modalContentRef}
          pose={this.state.visible ? 'visible' : 'hidden'}
        >
          {this.renderModal(component)}
        </ModalPose>
        <Overlay
          onClick={this.handleOnOutsideClick}
          onPoseComplete={this.animateClose}
          pose={this.state.visible ? 'visible' : 'hidden'}/>
      </>
    )
  }
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

