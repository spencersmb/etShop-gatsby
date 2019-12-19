import { OnPoseComplete } from '@et/types/Modal'
import { bodyScrollBar } from '@utils/windowUtils'
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
	cartIsOpen: boolean
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
	const { show, component, cartIsOpen } = props
	const modalContentRef: RefObject<any> = useRef(null)
	const target: any = useRef(null)
	const scrollPos: any = useRef(0)

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
		target.current = document.querySelector('#___gatsby')
	}, [])

	useEffect(() => {

		// on close - render body before modal closes to stop safari from blinking text
		if (!show && target.current && !cartIsOpen) {

			// delay by 300 to allow modal to animate out with scrollbar issue
			bodyScrollBar.remove(target.current)

			document.documentElement.scrollTop = document.body.scrollTop = scrollPos.current
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
					id={'overlay'}
					data-testid='overlay'
					key='overlay'
					showOverlay={props.options.hasBackground}
					onClick={handleOnOutsideClick}
					onPoseComplete={(type: OnPoseComplete) => {
						if (type === 'enter') {
							// 1. Check if TOP is already set and get the value
							const topExists = getComputedStyle(target.current).top || 'auto'
							const topReverse = parseInt(topExists, 10) * -1
							// console.log('top', isNaN(topReverse))

							// 2. check if top has a value to start with instead of looking up body scroll position
							const hasTop = !isNaN(topReverse)

							scrollPos.current = hasTop
								? topReverse
								: document.body.scrollTop || document.documentElement.scrollTop || 0

							bodyScrollBar.show(target.current, scrollPos.current)
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
		cartIsOpen: state.cart.isOpen,
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
		opacity: 1,
		position: 'relative',
		zIndex: 7
	},
	enter: {
		opacity: 1,
		position: 'relative',
		zIndex: 7
	}
})
const Shade = styled.div`
		background: #333f4fcc;
		height: 100%;
		left: 0;
		position: absolute;
		will-change: opacity;
		backface-visibility: hidden;
		//perspective: 1000;
		transform: translate3d(0, 0, 0);
		top: 0;
		bottom: 0;
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
		// delay: 300
	}
})

