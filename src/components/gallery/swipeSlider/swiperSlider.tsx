import { device } from '@styles/global/breakpoints'
import { shadowStyles } from '@styles/global/shadows'
import { CodyUtils } from '@utils/codyUtils'
import { useSetState } from '@utils/stateUtils'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import posed from 'react-pose'
import { value, spring } from 'popmotion'
import debounce from 'lodash/debounce'
import styled from 'styled-components'

const VELOCITY_THRESHOLD = 600
const DISTANCE_PERCENTILE_THRESHOLD = 0.3

interface IProps {
	handleSlideChange: (nextSlide: string) => void
	selectedSlide: number
	slides: any[]
}

const SwipeSlider = (props: IProps) => {
	const [state, setState] = useSetState<any, any>({
		loaded: false,
		root: null,
		offset: 0,
		width: 0,
		selectedSlide: 1
	})
	const rootElement = useRef<HTMLDivElement | null>(null)
	const preventClick = useRef<boolean>(false)
	const prevState = useRef(state)
	const prevSelectedSlide = useRef(props.selectedSlide)
	const xRef: any = useRef(value(0))
	const valuesMap = { x: xRef.current }

	useEffect(() => {
		window.addEventListener('resize', adjustCurrentBox)
		if (rootElement.current) {
			// const { slideIndex } = state.selectedSlide
			setState({
				root: rootElement.current,
				// ...childrenBox(rootElement.current, state.selectedSlide)
				...childrenBox(rootElement.current, props.selectedSlide)
			})
		}
		return () => {
			window.removeEventListener('resize', adjustCurrentBox)
		}

	}, [])
	useEffect(() => {
		prevSelectedSlide.current = props.selectedSlide
	}, [props.selectedSlide])
	useLayoutEffect(() => {
		prevState.current = state
	}, [state])

	function adjustCurrentBox () {
		if (rootElement.current) {
			setState({
				root: rootElement.current,
				...childrenBox(rootElement.current, props.selectedSlide)
			})
		}
	}

	function childrenBox (root: any, index: any) {
		const rootWidth = root.clientWidth
		const el = root
		return {
			offset: el.offsetLeft,
			width: el.offsetWidth
		}
	}

	function onDragStart (e: any) {
		preventClick.current = false
		// props.onDragStart();
	}

	function next () {
		props.handleSlideChange('next')
	}

	function prev () {
		props.handleSlideChange('prev')
	}

	function onDragEnd (e: any) {
		const { width } = prevState.current
		const zerBaseIndex = prevSelectedSlide.current - 1
		const newOffset = zerBaseIndex * width
		const start: any = -newOffset
		const distance: any = xRef.current.get() - start
		const velocity = xRef.current.getVelocity()

		if (distance !== 0) {
			// prevents click from firing in onClickCapture
			preventClick.current = true

			const threshold = DISTANCE_PERCENTILE_THRESHOLD * width
			// console.log('threshold', threshold)

			if (distance < -threshold || velocity < -VELOCITY_THRESHOLD) {
				console.log('next')
				// goToNextSlide()
				next()
			} else if (distance > threshold || velocity > VELOCITY_THRESHOLD) {
				console.log('prev')
				prev()
			}
		}
		// this.props.onDragEnd();
	}

	// const index = state.selectedSlide - 1
	const zeroIndex = props.selectedSlide - 1

	return (
		<DragContainer
			ref={rootElement}
			values={valuesMap}
			offset={zeroIndex * state.width}
			onClickCapture={(e: any) => {
				if (preventClick.current) {
					e.stopPropagation()
				}
			}}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onPoseComplete={() => {
				console.log('Complete')
			}}
			poseKey={zeroIndex * state.width}
			pose={'rest'}
		>

			{/*	{children}*/}
			{props.slides.map((b, index) => (
				<Slide
					key={index}
					className='slide'
					style={{ backgroundColor: b }}
					// onClick={() => this.setSlideIndex(index)}
				/>
			))}
		</DragContainer>

	)
}
const Draggable = posed.div({
	draggable: 'x',
	rest: {
		x: (digits: { offset: number }) => {
			// console.log('offsett in Pose Div', digits)
			return -digits.offset
		},
		transition: { ease: 'easeOut', duration: 500 }
	},
	dragEnd: {
		transition: ({ from, to, velocity, offset }: any) => {
			return spring({ from, to: -offset, velocity })
		}
	}
})
const DragContainer = styled(Draggable)`
	display: flex;
	height: 100%;
	width: 100%;
	flexWrap: nowrap;
`
const Slide = styled.div`
	min-width: 100%;
  cursor: pointer;
`
export default SwipeSlider


