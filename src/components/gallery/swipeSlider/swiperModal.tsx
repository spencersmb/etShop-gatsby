import { IModal, Merge, OnPoseComplete } from '@et/types/Modal'
import { IGalleryItem, Image } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { useSetState } from '@utils/stateUtils'
import { renderSvg } from '@utils/styleUtils'
import { bodyScrollBar, windowHasScrollbar } from '@utils/windowUtils'
import Img from 'gatsby-image'
import { spring, value } from 'popmotion'
import { func } from 'prop-types'
import React, { Component, useEffect, useLayoutEffect, useRef } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'
import YouTube, { Options } from 'react-youtube'

const VELOCITY_THRESHOLD = 600
const DISTANCE_PERCENTILE_THRESHOLD = 0.3

const opts: Options = {
	height: '390',
	width: '640',
	playerVars: { // https://developers.google.com/youtube/player_parameters
		autoplay: 0,
		enablejsapi: 1
	}
}

type IProps = Merge<IModal, {
	options: {
		data: {
			// items: IGalleryItem[],
			items: any
			goToSlide: (index: number) => void,
			selectedSlide: number
		}
	}
}>

const itemStyle = {
	width: '100%',
	margin: '0 40px'
}
const overSizedStyles = {
	height: '100%',
	overflowY: 'scroll'
}

/*
 * * How it works
 * on each event onChange and subSettle we check if the image is oversized, and if it is change
 * the CSS Styles. Flickity lazyloads all the images. Each image loads 2 positions ahead.
 */
const SwipeModal = (props: IProps) => {
	const [state, setState] = useSetState<any, any>({
		loaded: false,
		overSized: false,
		root: null,
		offset: 0,
		width: 0,
		selectedSlide: props.options.data.selectedSlide
	})
	const rootElement = useRef<HTMLDivElement | null>(null)
	const preventClick = useRef<boolean>(false)
	const slides = document.getElementsByClassName('et-modal-slide')
	const hasScrollbar = document.querySelector('.hasScrollBar')
	const prevState = useRef(state)
	const prevSelectedSlide = useRef(props.options.data.selectedSlide)
	const xRef: any = useRef(value(0))
	const valuesMap = { x: xRef.current }
	const dragEl = useRef<HTMLDivElement | null>(null)
	// console.log('hasScrollbar', hasScrollbar)

	useEffect(() => {
		window.addEventListener('resize', adjustCurrentBox)
		if (rootElement.current) {
			// const { slideIndex } = state.selectedSlide
			setTimeout(() => {
				// checkOverSizedImage(0)
				setState({
					root: rootElement.current,
					loaded: true,
					...checkOverSizedImage(props.options.data.selectedSlide - 1),
					// ...childrenBox(rootElement.current, state.selectedSlide)
					...childrenBox(rootElement.current, props.options.data.selectedSlide)
				})
				mapOversizedAttr()
				testDrag()
			}, 200)
		}
		return () => {
			window.removeEventListener('resize', adjustCurrentBox)
		}

	}, [])
	useEffect(() => {
		prevSelectedSlide.current = props.options.data.selectedSlide
	}, [props.options.data.selectedSlide])
	useLayoutEffect(() => {
		prevState.current = state
	}, [state])

	function mapOversizedAttr () {
		const selectedSlides = document.getElementsByClassName('et-modal-slide')
		// tslint:disable-next-line:prefer-for-of
		for (let i = 0; i < selectedSlides.length; i++) {
			const el = selectedSlides[i]
			const gatsbyImage = el.children[0]
			console.log('gatsbyImage', gatsbyImage.clientHeight)

			if (gatsbyImage.clientHeight > 772) {
				el.setAttribute('data-oversized', 'true')
			}

		}

	}

	function adjustCurrentBox () {
		if (rootElement.current) {
			setState({
				root: rootElement.current,
				...childrenBox(rootElement.current, prevState.current.selectedSlide)
			})
		}
	}

	function childrenBox (root: any, index: any) {
		const rootWidth = root.clientWidth
		if (!window) {
			return
		}
		const el = root
		return {
			offset: el.offsetLeft,
			// width: el.clientWidth
			width: window.innerWidth
		}
	}

	function onDragStart (e: any) {
		preventClick.current = false

		// props.onDragStart();
	}

	function next () {
		if (prevState.current.selectedSlide + 1 > props.options.data.items.length) {
			return
		}
		setState({
			selectedSlide: prevState.current.selectedSlide + 1,
			...checkOverSizedImage(prevState.current.selectedSlide)
		})
	}

	function prev () {
		if (prevState.current.selectedSlide <= 1) {
			return
		}
		setState({
			selectedSlide: prevState.current.selectedSlide - 1,
			...checkOverSizedImage(prevState.current.selectedSlide - 2)
		})
	}

	function nextSlide () {
		next()
	}

	function prevSlide () {
		prev()
	}

	function dragStart (e: any) {
		console.log('e', e)

		// if (e.type === "touchstart") {
		// 	initialX = e.touches[0].clientX - xOffset;
		// 	initialY = e.touches[0].clientY - yOffset;
		// } else {
		// 	initialX = e.clientX - xOffset;
		// 	initialY = e.clientY - yOffset;
		// }
		//
		// if (e.target === dragItem) {
		// 	active = true;
		// }
	}

	function testDrag () {
		if (rootElement.current) {
			rootElement.current.addEventListener('touchstart', dragStart, false)
		}
	}

	function onDragEnd (e: any) {
		const { width } = prevState.current
		const zerBaseIndex = prevState.current.selectedSlide - 1
		const newOffset = zerBaseIndex * width
		const start: any = -newOffset
		const distance: any = xRef.current.get() - start
		const velocity = xRef.current.getVelocity()
		console.log('drag end', e)

		// if (distance !== 0) {
		// 	// prevents click from firing in onClickCapture
		// 	preventClick.current = true
		//
		// 	const threshold = DISTANCE_PERCENTILE_THRESHOLD * width
		// 	// console.log('threshold', threshold)
		//
		// 	if (distance < -threshold || velocity < -VELOCITY_THRESHOLD) {
		// 		console.log('modal next')
		// 		// goToNextSlide()
		// 		next()
		// 	} else if (distance > threshold || velocity > VELOCITY_THRESHOLD) {
		// 		console.log('modal prev')
		// 		prev()
		// 	}
		// }

		// this.props.onDragEnd();
	}

	function checkOverSizedImage (nextSlideIndex: number) {
		console.log('nextSlide', nextSlideIndex)

		const viewport = document.getElementsByClassName('carousel-modal')
		// it wont have selected just yet cus we havnt changed state
		// const selectedImage = document.getElementsByClassName('slide is-selected')
		const selectedImage = slides[nextSlideIndex]

		// const image: HTMLCollection = selectedImage[0].children
		const image: any = selectedImage.children[0]
		console.log('image', image)

		// console.log('image array', image)
		// console.log('image', image[0])
		// console.log('client height', image[0].clientHeight)
		// console.log('scroll height', image[0].scrollHeight)

		if (viewport) {
			viewport[0].scrollTop = 0
		}

		if (image) {

			const boundingClient = image.getBoundingClientRect()

			if (boundingClient.height > 800 && !prevState.current.overSized) {
				return {
					overSized: true,
					height: boundingClient.height
				}
				// setState({
				// 	overSized: true,
				// 	height: boundingClient.height
				// })
			} else if (boundingClient.height < 800 && prevState.current.overSized) {
				if (window) {
					window.scrollTo({ top: 0, behavior: 'smooth' })
				}
				return {
					overSized: false,
					height: boundingClient.height
				}
				// setState({
				// 	overSized: false,
				// 	height: boundingClient.height
				// })
				// return
			}
			if (!prevState.current.height) {
				return {
					height: boundingClient.height
				}
			}
			if (prevState.current.height !== boundingClient.height) {
				return {
					height: boundingClient.height
				}
				// setState({
				// 	height: boundingClient.height
				// })
			}

		}
	}

	function calcOffset (currentState: any) {
		const zeroIndex = currentState.selectedSlide - 1
		const windowWidth = window.innerWidth
		const windowHeight = window.innerHeight
		// console.log('slides', slides[zeroIndex])

		const isOversized = slides && slides[zeroIndex] ? slides[zeroIndex].getAttribute('data-oversized') : false
		// console.log('isOversized', isOversized)

		const width = currentState.overSized && hasScrollbar && windowWidth > 992 && windowHeight > 1024
			? currentState.width - 15 : currentState.width

		return zeroIndex * width
	}

	// console.log('props modal', props)
	console.log('state modal', state)

	return (
		<Main
			key={'main'}>
			<Container isLoaded={state.loaded}>

				<DragContainer
					values={valuesMap}
					height={state.height}
					overSized={state.overSized}
					selectedSlide={state.selectedSlide}
					offset={calcOffset(state)}
					onClickCapture={(e: any) => {
						e.preventDefault()
						if (preventClick.current) {
							e.stopPropagation()
						}
					}}
					onDragStart={onDragStart}
					onDragEnd={onDragEnd}
					onPoseComplete={() => {
						// console.log('Modal finished moving to next slide')
						props.options.data.goToSlide(state.selectedSlide)
						// checkOverSizedImage()
					}}
					poseKey={calcOffset(state)}
					pose={'rest'}
				> <CarouselModal
					ref={rootElement}
					className={`carousel-modal ${state.overSized ? 'oversized' : ''}`}
					overSized={state.overSized}
					height={state.height}
					// @ts-ignore
					// 	 style={state.overSized ? { ...overSizedStyles, height: state.height } : { height: state.height }}
				>
					{/*	{children}*/}
					{props.options.data.items.map((slide: IGalleryItem, index: any) => {
						return (
							<Slide
								key={index}
								className={`et-modal-slide slide ${index + 1 === state.selectedSlide ? 'is-selected' : ''}`}
							>
								<Img
									fluid={slide.localFile.childImageSharp.fullWidth}
									alt={slide.alt}/>
								{/*<img*/}
								{/*	src={slide.localFile.childImageSharp.fullWidth.src}*/}
								{/*	alt={slide.alt}/>*/}
							</Slide>
						)
					})}
				</CarouselModal>

				</DragContainer>
				<BtnLeft onClick={prevSlide}>
					<svg className='icon' viewBox='0 0 32 32'><title>Show previous slide</title>
						<path
							d='M20.768,31.395L10.186,16.581c-0.248-0.348-0.248-0.814,0-1.162L20.768,0.605l1.627,1.162L12.229,16 l10.166,14.232L20.768,31.395z'/>
					</svg>
				</BtnLeft>
				<BtnRight onClick={nextSlide}>
					<svg className='icon' viewBox='0 0 32 32'><title>Show next slide</title>
						<path
							d='M11.232,31.395l-1.627-1.162L19.771,16L9.605,1.768l1.627-1.162l10.582,14.813 c0.248,0.348,0.248,0.814,0,1.162L11.232,31.395z'/>
					</svg>
				</BtnRight>
				<CloseBtn onClick={props.closeModal}>{renderSvg(svgs.Close)}</CloseBtn>
			</Container>
		</Main>
	)
}

export default SwipeModal
const CarouselModal = styled.div<{ height: number, overSized: boolean }>`
	height: ${props => props.height}px;
	transition: height .4s ease-out;
	
	&.oversized{
	}

	${props => props.overSized
	? `
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		`
	: null};
`
const Draggable = posed.div({
	draggable: 'x',
	rest: {
		x: (digits: { offset: number, selectedSlide: number, overSized: boolean }) => {
			return -digits.offset
		},
		transition: { ease: 'easeOut', duration: 500 }
	},
	dragBounds: (digits: any) => {
		return { top: -(digits.height - window.innerHeight), bottom: 0 }
	},
	dragEnd: {
		transition: ({ from, to, velocity, offset, key }: any) => {
			if (key === 'x') {
				return spring({ from, to: -offset, velocity })
			} else {
				return spring({ from, to, velocity })
			}
		}
		// transition: (digits: any) => {
		// 	console.log('gesture', digits)
		// 	return spring({ from: digits.from, to: digits.to, velocity: digits.velocity })
		// }
	}
})
const DragContainer = styled(Draggable)`
	display: flex;
	height: 100%;
	width: 100%;
	flex-wrap: nowrap;
	
	position: relative;
`
const Slide = styled.div`
	min-width: 100%;
  cursor: pointer;
	overflow: hidden;
	transition: .3s;
	text-align: center;
	transform: translateZ(0);
	backface-visibility: hidden;
	&.is-selected{
		overflow: visible;	
	}
  img, .gatsby-image-wrapper{
  	width: 100%;
  	max-width: 1160px;
  	margin: 0 auto;
  }
`

const SliderButton = styled.button`
	position: absolute;
	top: 50%;
	left: 10px;
	transform: translateX(0) translateY(-50%);
	outline: none;
	display: none;
	height: 64px;
	width: 45px;
	border-radius: 8px;
	cursor: pointer;
	transition: background .2s,transform .2s,-webkit-transform .2s;
	background-color: transparent;
	padding: 0;
	border: 0;
	visibility: hidden;
	
	path{
		transition: .2s;
		fill: #fff;
	}
	
	&:focus{
		outline: none;
	}
	
	@media ${device.laptop}{
		display: block;
		visibility: visible;
		
		&:hover{
			path{
				fill: ${colors.teal.i500};
			}
		}
	}
	

`
const BtnLeft = styled(SliderButton)`

`
const BtnRight = styled(SliderButton)`
	right: 10px;
	left: auto;
`

const YoutubeGalleryItem = styled.div`
	width: 100%;
	margin: 0 40px;
	height: 390px;
	
	@media ${device.laptop} {
		height: 720px;
		max-width: 1275px;
	}
		
`
const YoutubeContainer = styled.div`
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    
    iframe{
			position: absolute;
			top: 50%;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: 0;
			transform: translateY(-50%);
    }

    	
`

const CloseBtn = styled.button`
	position: absolute;
	top: 15px;
	right: 30px;
	width: 50px;
	height: 50px;
	z-index: 5;
	background: #fff;
	border-radius: 50%;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	&:focus{
		outline: none;
	}
	&:hover{
		svg{
			path{
				fill: ${colors.primary.pink};
			}
		}
	}
	svg{
		height: 30px;
		width: 100%;
		max-width: 20px;
		path{
			transition: .3s;
			fill: ${colors.primary.text};
		}
	}
`
const Container = styled.div<{ isLoaded: boolean }>`
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	transition: opacity .3s .3s;
	opacity: ${props => props.isLoaded ? 1 : 0};
`
const ModalPose = posed.div({
	exit: {
		opacity: 0
		// transition: {
		// 	default: { duration: 150 },
		// 	y: { ease: 'easeOut' }
		// },
		// x: `-50%`,
		// y: `-50%`
	},
	enter: {
		opacity: 1
		// delay: 0,
		// transition: {
		// 	default: { duration: 200 },
		// 	// y: { type: 'spring', stiffness: 1500, damping: 15 },
		// 	y: { ease: 'easeOut' }
		// },
		// x: `-50%`,
		// y: `-50%`
	}
})
const Main = styled(ModalPose)`
	position: fixed;
	width: 100%;
	height: 100%;
	background: transparent;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%) translateZ(0);
	display: flex;
	flex-direction: column;
	z-index: 7;
	justify-content: center;
	align-items: center;
	backface-visibility: hidden;
`
