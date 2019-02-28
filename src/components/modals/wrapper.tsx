import React, {
	ComponentType,
	RefObject,
	useRef,
	useEffect
} from 'react'
import { Action, bindActionCreators, Dispatch } from 'redux'
import { hideModal } from '@redux/actions/modalActions'
import { connect } from 'react-redux'
import posed, { PoseGroup } from 'react-pose'
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
	} else { return child.parentNode !== null }
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
	const { show, component } = props
	const modalContentRef: RefObject<any> = useRef(null)
	const target: any = useRef(null)
	const scrollPos: any = useRef(0)
	const overlayMounted: any = useRef(false)

	function handleOnOutsideClick (e: any) {
		if (isChildOf(e.target, modalContentRef.current)) {
			props.hideModalAction()
		}
	}

	function handleOnCloseClick () {
		props.hideModalAction()
	}

	function renderModal (ModalComponent: ComponentType<any>): any {
		if (!ModalComponent) {
			return (<div>No Modal Found</div>)
		}
		return <ModalComponent
			key='modal'
			options={props.options}
			closeModal={handleOnCloseClick}
			// showLoadingBar={props.showLoadingBarAction}
			// hideLoadingBar={props.hideLoadingBarAction}
			// isLoading={props.isLoading}
		/>
	}

	// on mount get body
	useEffect(() => {
		console.log(' mounted')
		target.current = document.querySelector('#___gatsby')
		// bodyRef.current = document.getElementsByTagName('body')
	}, [])

	useEffect(() => {
		// if props.show means the modal should be open
		if (show && target.current) {
			scrollPos.current = document.body.scrollTop || document.documentElement.scrollTop || 0
			target.current.style.width = `100%`
			target.current.style.top = `-${scrollPos.current}px`
			target.current.style.position = 'fixed'
		}

		if (target.current && !show) {
			// target.current.style.removeProperty('position')
			// target.current.style.removeProperty('top')
			// document.documentElement.scrollTop = document.body.scrollTop = scrollPos.current
		}

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
					showOverlay={props.options.hasBackground}
					onClick={handleOnOutsideClick}
					onPoseComplete={() => {
						overlayMounted.current = !overlayMounted.current
						if (!overlayMounted.current) {
							console.log('complete')

							// bodyRef.current[0].setAttribute('style', 'overflow: visible; height: auto;')
							target.current.style.removeProperty('position')
							target.current.style.removeProperty('top')
							document.documentElement.scrollTop = document.body.scrollTop = scrollPos.current
						}
					}}
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

const ModalPose = posed.div({
	exit: {
		opacity: 1
	},
	enter: {
		opacity: 1
	}
})
const Shade = styled.div`
		background: red;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: ${depth};
`
const Overlay = posed(Shade)({
	exit: {
		opacity: 0,
		transition: {}
	},
	enter: {
		opacity: (props: any) => (props.showOverlay ? 1 : 0)
	}
})

