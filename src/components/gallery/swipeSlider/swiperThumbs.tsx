import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { shadowStyles } from '@styles/global/shadows'
import { CodyUtils } from '@utils/codyUtils'
import { useSetState } from '@utils/stateUtils'
import Img from 'gatsby-image'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import posed from 'react-pose'
import { value, spring } from 'popmotion'
import debounce from 'lodash/debounce'
import styled from 'styled-components'
import { inspect } from 'util'

const VELOCITY_THRESHOLD = 600
const DISTANCE_PERCENTILE_THRESHOLD = 0.3

interface IProps {
	handleSlideChange: (slideIndex: number) => void
	selectedSlide: number
	slides: any[]
}

function LazyLoadImg ({ base, src, alt, ...rest }: any) {

	// const [loaded, setLoaded] = useState(false)
	// const onLoad = (e: any) => {
	// 	console.log('manual load', e.target)
	// 	setLoaded(true)
	// }

	return (
		<img
			style={{ width: '205px', height: '136px' }}
			src={base}
			data-flickity-lazyload-src={src}
			// onLoad={onLoad}
			alt={alt}
		/>
	)
}

function ExternalImage ({ src, alt }: any) {
	const [imageSrc, setImageSrc] = useState('')
	const [imageRef, setImageRef] = useState()

	const onLoad = (event: any) => {
		console.log('loaded')

		event.target.classList.add('loaded')
	}

	const onError = (event: any) => {
		event.target.classList.add('has-error')
	}

	useEffect(() => {
		let observer: any
		let didCancel = false

		if (imageRef && imageSrc !== src) {
			if (IntersectionObserver) {
				observer = new IntersectionObserver(
					entries => {
						entries.forEach(entry => {
							if (
								!didCancel &&
								(entry.intersectionRatio > 0 || entry.isIntersecting)
							) {
								setImageSrc(src)
								observer.unobserve(imageRef)
							}
						})
					},
					{
						threshold: 0.01,
						rootMargin: '75%'
					}
				)
				observer.observe(imageRef)
			} else {
				// Old browsers fallback
				setImageSrc(src)
			}
		}
		return () => {
			didCancel = true
			// on component cleanup, we remove the listner
			if (observer && observer.unobserve) {
				observer.unobserve(imageRef)
			}
		}
	}, [src, imageSrc, imageRef])
	return (
		<img
			ref={setImageRef}
			src={imageSrc}
			alt={alt}
			onLoad={onLoad}
			onError={onError}
		/>
	)
}

const SwipeThumbs = (props: IProps) => {
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
		window.addEventListener('resize', adjustCurrentBoxThumbnail)
		if (rootElement.current) {
			// const { slideIndex } = state.selectedSlide
			setState({
				root: rootElement.current,
				// ...childrenBox(rootElement.current, state.selectedSlide)
				...childrenBox(rootElement.current, props.selectedSlide)
			})
		}
		return () => {
			window.removeEventListener('resize', adjustCurrentBoxThumbnail)
		}

	}, [])
	useEffect(() => {
		prevSelectedSlide.current = props.selectedSlide
	}, [props.selectedSlide])
	useLayoutEffect(() => {
		prevState.current = state
	}, [state])

	function adjustCurrentBoxThumbnail () {
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
			width: el.offsetWidth / 4
		}
	}

	function onDragStart (e: any) {
		preventClick.current = false
		// props.onDragStart();
	}

	const goToSlide = (slideIndex: number) => (e: any) => {
		props.handleSlideChange(slideIndex + 1)
	}

	function onDragEnd (e: any) {
		// const { width } = prevState.current
		// const zerBaseIndex = prevSelectedSlide.current - 1
		// const newOffset = zerBaseIndex * width
		// const start: any = -newOffset
		// const distance: any = xRef.current.get() - start
		// const velocity = xRef.current.getVelocity()
		//
		// if (distance !== 0) {
		// 	// prevents click from firing in onClickCapture
		// 	preventClick.current = true
		//
		// 	const threshold = DISTANCE_PERCENTILE_THRESHOLD * width
		// 	console.log('threshold', threshold)
		//
		// 	if (distance < -threshold || velocity < -VELOCITY_THRESHOLD) {
		// 		console.log('next')
		// 		// goToNextSlide()
		// 		// next()
		// 	} else if (distance > threshold || velocity > VELOCITY_THRESHOLD) {
		// 		console.log('prev')
		// 		// prev()
		// 	}
		// }
		// this.props.onDragEnd();
	}

	// const index = state.selectedSlide - 1
	const zeroIndex = props.selectedSlide - 1

	return (
		<DragContainer
			selectedSlide={props.selectedSlide}
			width={state.width}
			sliderWidth={props.slides.length}
			ref={rootElement}
			values={valuesMap}
			offset={zeroIndex * state.width}
			// onClickCapture={(e: any) => {
			// 	// console.log('e', e.target)
			//
			// 	if (preventClick.current) {
			// 		e.stopPropagation()
			// 	}
			// }}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onPoseComplete={() => {
				console.log('Complete')
			}}
			poseKey={zeroIndex * state.width}
			pose={'rest'}
		>

			{/*	{children}*/}
			{props.slides.map((slide, index) => (
				<Slide
					key={index}
					className={`slide-thumb ${zeroIndex === index ? 'active' : ''}`}
					onClick={goToSlide(index)}
				>
					<Img
						loading={'eager'}
						fadeIn={false}
						fluid={slide.localFile.childImageSharp.fluid}
						alt={slide.alt}/>
					{/*<ExternalImage*/}
					{/*	base={slide.localFile.childImageSharp.thumbnail_mobile.base64}*/}
					{/*	src={slide.localFile.childImageSharp.thumbnail_mobile.src}*/}
					{/*	alt={slide.alt}*/}
					{/*	// onLoad={this.loadImage}*/}
					{/*	{...slide}*/}
					{/*/>*/}
				</Slide>
			))}
		</DragContainer>
	)
}
const Draggable = posed.div({
	draggable: 'x',
	rest: {
		x: (digits: { offset: number, selectedSlide: number, width: number, sliderWidth: number }) => {

			if (digits.selectedSlide === digits.sliderWidth) {
				const lastSlideCount = (digits.selectedSlide - 1) - 3 // calc the 2nd to last slide and use its positioning
				return -(digits.width * lastSlideCount)
			}
			if (digits.selectedSlide > 3) {
				const newIndex = digits.selectedSlide - 3
				return -(digits.width * newIndex)
			}
			return 0

		},
		transition: { ease: 'easeOut', duration: 500 }
	},
	dragBounds: (props: any) => {
		// Must account for the first 4 items
		// ignore the first 4 items and only add the items after that
		const itemsOffCanvas = props.sliderWidth - 4
		return { left: -(itemsOffCanvas * props.width), right: 0 }
	},
	dragEnd: {
		// transition: ({ from, to, velocity, offset }: any) => {
		// 	return spring({ from, to: -offset, velocity })
		// }
	}
})
const Slide = styled.div`
	min-width: 25%;
  cursor: pointer;
  transition: opacity .3s;
  position: relative;
  &:hover{
  	opacity: 1 !important;
  }
  &.active{
    &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(63, 75, 91, 0.45) url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg stroke-width='1.5' stroke='%23ffffff'%3E%3Cpolyline fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' points='1,9 5,13 15,3 ' %3E%3C/polyline%3E%3C/g%3E%3C/svg%3E") no-repeat center center;
    background-size: 1.25em;
    backdrop-filter: blur(5px);
  }
  }
`
const DragContainer = styled(Draggable)`
	display: flex;
	height: 100%;
	width: 100%;
	flexWrap: nowrap;
	
	&:hover{
		${Slide}{
			opacity: .6;
		}
	}
`

export default SwipeThumbs


