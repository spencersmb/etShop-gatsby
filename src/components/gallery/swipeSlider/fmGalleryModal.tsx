import { IModal, Merge } from '@et/types/Modal'
import { IGalleryItem } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { FmGalleryBtnLeft, FmGalleryBtnRight } from '@styles/modules/fmGallery'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import Img from 'gatsby-image'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import posed from 'react-pose'
import YouTube, { Options } from 'react-youtube'
import styled from 'styled-components'
import debounce from 'lodash/debounce'

const opts: Options = {
	height: '390',
	width: '640',
	playerVars: { // https://developers.google.com/youtube/player_parameters
		autoplay: 0,
		enablejsapi: 1
	}
}
const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 500 : -500,
			opacity: 0,
			transition: {
				ease: 'easeIn',
				// type: 'linear',
				// damping: 1600,
				// stiffness: 5,
				// velocity: 200,
				// ease: [0.17, 0.67, 0.83, 0.67],
				duration: .3
			}
		}
	},
	center: {
		zIndex: 1,
		x: 0,
		y: 0,
		opacity: 1,
		transition: {
			ease: 'easeInOut',
			// ease: [0.17, 0.67, 0.83, 0.67]
			// type: 'spring',
			// damping: 600,
			// stiffness: 200,
			// velocity: 200,
			duration: .3
		}
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 500 : -500,
			opacity: 0,
			transition: {
				ease: 'easeOut',
				// type: 'easeOut',
				// ease: [0.17, 0.67, 0.83, 0.67],
				// damping: 5,
				// stiffness: 600,
				// velocity: 200,
				duration: .2
			}
		}
	}
}
type IProps = Merge<IModal, {
	options: {
		data: {
			items: IGalleryItem[],
			// items: any
			goToSlide: (index: number) => void,
			selectedSlide: number
		}
	}
}>

const FmGalleryModal = (props: IProps) => {
	const mounted = useRef(false)
	const [[page, direction], setPage] = useState([props.options.data.selectedSlide, 0])
	const hasScrollBarRef = useRef(document.querySelector('.hasScrollBar'))
	const [axis, setAxis] = useState<boolean | 'x' | 'y'>('x')
	const images = props.options.data.items
	const [height, setHeight] = useState(0)
	const imgRef = useRef<HTMLDivElement>(null)
	const fmModalContainerRef = useRef<HTMLDivElement>(null)
	const prevStateHeight = useRef(0)
	const imageIndex = wrap(0, images.length, page)

	// We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
	// then wrap that within 0-2 to find our image ID in the array below. By passing an
	// absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
	// detect it as an entirely new image. So you can infinitely paginate as few as 1 images.

	const paginate = (newDirection: number) => {
		if (axis === 'y') {
			return
		}
		if (page === 0 && newDirection === -1) {
			return
		}
		if (page + 1 === images.length && newDirection === 1) {
			return
		}
		setPage([page + newDirection, newDirection])
	}
	useEffect(() => {
		prevStateHeight.current = height
	})
	useEffect(() => {
		window.addEventListener('resize', adjustLayout)
		setTimeout(() => {
		}, 200)

		return () => {
			window.removeEventListener('resize', adjustLayout)
		}

	}, [])

	const adjustLayout = debounce(() => {
		hasScrollBarRef.current = document.querySelector('.hasScrollBar')
		if (fmModalContainerRef.current) {
			getHeightTest2()
		}
	}, 250)
	const getHeightOg = () => {
		if (isVideoItem(imageIndex)) {
			return
		}
		if (imgRef.current) {
			const slides = imgRef.current.children
			const newSlide = slides[imgRef.current.children.length - 1] // last item

			console.log('newSlide', newSlide)

			// if (imageSelectetd.tagName !== 'img') {
			// 	imageSelectetd = imgRef.current.children[0]
			// }
			const boundingClient = newSlide.getBoundingClientRect()
			// if (window && boundingClient.height > window.innerHeight) {
			// 	console.log('scrollTop')
			// 	window.scrollTo(0, fmModalContainerRef.current.offsetTop)
			// }
			// console.log('rect', boundingClient)
			if (prevStateHeight.current > window.outerHeight) {
				if (window) {
					console.log('scroll top')

					window.scrollTo({ top: 0, behavior: 'smooth' })
				}
			}
			if (prevStateHeight.current !== boundingClient.height) {
				console.log('new height')

				setHeight(boundingClient.height)

			}
		}

	}
	const getHeightTest2 = () => {
		if (isVideoItem(imageIndex)) {
			return
		}
		if (fmModalContainerRef.current) {
			const slides = fmModalContainerRef.current.children
			const newSlide = slides[fmModalContainerRef.current.children.length - 1] // last item

			// console.log('newSlide', newSlide)

			// if (imageSelectetd.tagName !== 'img') {
			// 	imageSelectetd = imgRef.current.children[0]
			// }
			const boundingClient = newSlide.getBoundingClientRect()
			// if (window && boundingClient.height > window.innerHeight) {
			// 	console.log('scrollTop')
			// 	window.scrollTo(0, fmModalContainerRef.current.offsetTop)
			// }
			// console.log('rect', boundingClient)
			if (prevStateHeight.current > window.outerHeight) {
				if (window) {
					// console.log('scroll top')

					window.scrollTo({ top: 0, behavior: 'smooth' })
				}
			}
			if (prevStateHeight.current !== boundingClient.height) {
				// console.log('new height')

				setHeight(boundingClient.height)

			}
		}

	}

	function dragDirection (myAxis: any) {
		if (height > window.innerHeight && !isVideoItem(imageIndex)) {
			console.log(myAxis)
			setAxis(myAxis)
		} else {
			setAxis('x')
		}
	}

	function prevSlide () {
		paginate(-1)
	}

	function nextSlide () {
		paginate(1)
	}

	function isVideoItem (index: number): boolean {
		const items = props.options.data.items
		return typeof items[index].video !== 'undefined'
	}

	function _onReadyYouTube () {
		mounted.current = true
		if (isVideoItem(page)) {
			console.log('play Video')

			// this.playVideo()
		}
	}

	function videoCheck (item: IGalleryItem) {
		if (item.video) {
			return (
				<YoutubeGalleryItem key={'tubemodal'}>
					<YoutubeContainer>
						<YouTube
							videoId={item.video.id}
							opts={opts}
							onReady={_onReadyYouTube}
						/>
					</YoutubeContainer>
				</YoutubeGalleryItem>
			)
		}
		return (
			<Img
				fluid={images[imageIndex].localFile.childImageSharp.fullWidth}
				alt={images[imageIndex].alt}/>
		)
	}

	/**
	 * Experimenting with distilling swipe offset and velocity into a single variable, so the
	 * less distance a user has swiped, the more velocity they need to register as a swipe.
	 * Should accomodate longer swipes and short flicks without having binary checks on
	 * just distance thresholds and velocity > 0.
	 */
	const swipeConfidenceThreshold = 10000
	const swipePower = (offset: number, velocity: number) => {
		return Math.abs(offset) * velocity
	}

	const backup = () => {
		return (
			<Main
				height={window.outerHeight}
				key={'main'}>
				<Container
					ref={fmModalContainerRef}
					height={height}
					hasScrollbar={!!hasScrollBarRef.current}
					className={isVideoItem(imageIndex) ? 'hasVideo' : ''}>
					<Inner>
						<div
							className={'height-container'}
							ref={imgRef}
							style={{
								display: 'flex',
								width: '100%',
								justifyContent: 'center'
							}}
						>
							<AnimatePresence initial={false} custom={direction} onExitComplete={() => {
								props.options.data.goToSlide(page + 1) // because the gallery is not zerobased
							}}>
								<motion.div
									key={page}
									className={'fm-divImage'}
									custom={direction}
									variants={variants}
									initial='enter'
									animate='center'
									exit='exit'
									dragDirectionLock={true}
									onDirectionLock={(dirAxis: string) => dragDirection(dirAxis)}
									transition={{
										x: { type: 'spring', stiffness: 300, damping: 200 },
										opacity: { duration: 0.2 }
									}}
									drag={axis}
									dragConstraints={{
										left: 0,
										right: 0,
										bottom: 0,
										top: -(height - window.innerHeight)
									}}
									dragElastic={0.3}
									onDragEnd={(e, { offset, velocity }) => {
										const swipe = swipePower(offset.x, velocity.x)

										if (swipe < -swipeConfidenceThreshold) {
											paginate(1)
										} else if (swipe > swipeConfidenceThreshold) {
											paginate(-1)
										}
									}}
								>
									{videoCheck(images[imageIndex])}
									{/*<img src={images[imageIndex].localFile.childImageSharp.fullWidth.src} alt='alt'/>*/}
								</motion.div>
							</AnimatePresence>
						</div>
					</Inner>
				</Container>
				<FmGalleryBtnLeft onClick={prevSlide} disabled={page === 0}>
					<svg className='icon' viewBox='0 0 32 32'><title>Show previous slide</title>
						<path
							d='M20.768,31.395L10.186,16.581c-0.248-0.348-0.248-0.814,0-1.162L20.768,0.605l1.627,1.162L12.229,16 l10.166,14.232L20.768,31.395z'/>
					</svg>
				</FmGalleryBtnLeft>
				<FmGalleryBtnRight onClick={nextSlide} disabled={page + 1 === images.length}>
					<svg className='icon' viewBox='0 0 32 32'><title>Show next slide</title>
						<path
							d='M11.232,31.395l-1.627-1.162L19.771,16L9.605,1.768l1.627-1.162l10.582,14.813 c0.248,0.348,0.248,0.814,0,1.162L11.232,31.395z'/>
					</svg>
				</FmGalleryBtnRight>
				<CloseBtn onClick={props.closeModal}>{renderSvg(svgs.Close)}</CloseBtn>
			</Main>
		)
	}

	return (
		<Main
			height={window.outerHeight}
			key={'main'}>
			<ContainerTest2 ref={fmModalContainerRef}
											height={height}
											className={isVideoItem(imageIndex) ? 'hasVideo' : ''}>
				<AnimatePresence initial={false} custom={direction} onExitComplete={() => {
					getHeightTest2()
					props.options.data.goToSlide(page + 1) // because the gallery is not zerobased
				}}>
					{images[imageIndex].video ?
						<motion.div
							key={page}
							className={'test2 youtubeVideo'}
							custom={direction}
							variants={variants}
							initial='enter'
							animate='center'
							exit='exit'
							dragDirectionLock={true}
							onDirectionLock={(dirAxis: string) => dragDirection(dirAxis)}
							transition={{
								x: { type: 'spring', stiffness: 600, damping: 200 }
								// x: { ease: [0.17, 0.67, 0.83, 0.67] },
								// opacity: { duration: 0.2 }
							}}
							drag={axis}
							dragConstraints={{
								left: 0,
								right: 0,
								bottom: 0,
								top: -(height - window.innerHeight)
							}}
							dragElastic={0.2}
							onDragEnd={(e, { offset, velocity }) => {
								console.log('e', e)

								const swipe = swipePower(offset.x, velocity.x)

								if (swipe < -swipeConfidenceThreshold) {
									paginate(1)
								} else if (swipe > swipeConfidenceThreshold) {
									paginate(-1)
								}
							}}
						>
							{videoCheck(images[imageIndex])}
							{/*<img src={images[imageIndex].localFile.childImageSharp.fullWidth.src} alt='alt'/>*/}
						</motion.div>
						: <motion.div
							key={page}
							// src={images[imageIndex].localFile.childImageSharp.fullWidth.src}
							className={'test2'}
							custom={direction}
							variants={variants}
							initial='enter'
							animate='center'
							exit='exit'
							onLoad={(e) => {
								console.log('loaded')
								if (!mounted.current) {
									getHeightTest2()
								}
								mounted.current = true
							}}
							dragDirectionLock={true}
							onDirectionLock={(dirAxis: string) => dragDirection(dirAxis)}
							transition={{
								x: { type: 'spring', stiffness: 600, damping: 200 }
								// x: { ease: [0.17, 0.67, 0.83, 0.67] },
								// opacity: { duration: 0.2 }
							}}
							drag={axis}
							dragConstraints={{
								left: 0,
								right: 0,
								bottom: 0,
								top: -(height - window.innerHeight)
							}}
							dragElastic={0.2}
							onDragEnd={(e, { offset, velocity }) => {
								const swipe = swipePower(offset.x, velocity.x)

								if (swipe < -swipeConfidenceThreshold) {
									paginate(1)
								} else if (swipe > swipeConfidenceThreshold) {
									paginate(-1)
								}
							}}
						>
							{videoCheck(images[imageIndex])}
							{/*<img src={images[imageIndex].localFile.childImageSharp.fullWidth.src} alt='alt'/>*/}
						</motion.div>
					}
				</AnimatePresence>
			</ContainerTest2>
			<FmGalleryBtnLeft onClick={prevSlide} disabled={page === 0}
												background={{ hover: colors.grey.i800, color: '#ffffff69' }}>
				<svg className='icon' viewBox='0 0 32 32'><title>Show previous slide</title>
					<path
						d='M20.768,31.395L10.186,16.581c-0.248-0.348-0.248-0.814,0-1.162L20.768,0.605l1.627,1.162L12.229,16 l10.166,14.232L20.768,31.395z'/>
				</svg>
			</FmGalleryBtnLeft>
			<FmGalleryBtnRight onClick={nextSlide} disabled={page + 1 === images.length}
												 background={{ hover: colors.grey.i800, color: '#ffffff69' }}
												 hasScrollbar={!!hasScrollBarRef.current}>
				<svg className='icon' viewBox='0 0 32 32'><title>Show next slide</title>
					<path
						d='M11.232,31.395l-1.627-1.162L19.771,16L9.605,1.768l1.627-1.162l10.582,14.813 c0.248,0.348,0.248,0.814,0,1.162L11.232,31.395z'/>
				</svg>
			</FmGalleryBtnRight>
			<CloseBtn onClick={props.closeModal}>{renderSvg(svgs.Close)}</CloseBtn>
		</Main>
	)

}
export default FmGalleryModal
const ContainerTest2 = styled.div<{ height: number }>`
		//transition: height 5.3s;
		width: 100%;
		height: ${props => props.height}px;
		${props => props.height > window.outerHeight ? 'transition: height .9s .2s;' : 'transition: height .3s;'};
		//transition: height .3s;
		position: relative;
		transform-origin: center center;
    z-index: 2;
    display: flex;
    justify-content: center;
		
		&.hasVideo{
			height: 100% !important;
			position: relative;
			z-index: 3;
			transition: height 0s;
		}

		@media ${device.laptop}{
			overflow: hidden;
			${props => props.height > 800 ? 'overflow-y: scroll;' : ''}
		}
`
const YoutubeGalleryItem = styled.div`
	width: 100%;
	margin: 0;
	height: 390px;
	@media ${device.laptop} {
		//height: 480px;
		//max-width: 1275px;
		height: 640px;
    max-width: 1140px;
	}
	@media ${device.laptopL} {
		height: 720px;
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
	right: 15px;
	width: 50px;
	height: 50px;
	background: #fff;
	border-radius: 50%;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	z-index: 7;
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
const Container = styled.div<{ hasScrollbar: boolean, height: number }>`
		//transition: height 5.3s;
		height: ${props => props.height}px;
		transition: height .2s;
    z-index: 2;
		
		&.hasVideo{
			height: 100% !important;
			position: relative;
			z-index: 3;
			transition: height 0s;
		}

		@media ${device.laptop}{
			overflow: hidden;
			${props => props.height > 800 ? 'overflow-y: scroll;' : ''}
			${props => props.hasScrollbar ? `margin-right: 15px;` : null};
		}
		
		.test2{
			position: absolute;
		}
`
const Inner = styled.div`
	  width: 100vw;
		position: relative;
		display: flex;
		justify-content: center;
		.hasVideo & {
			transition: height 0;
			height: 100%;
			.fm-divImage{
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
		.fm-divImage {	
			position: absolute;
			top: 0;
			width: 100%;
			max-width: 800px;
			opacity: 1;
			transform: none;
			user-select: none;
			z-index: 1;
			
			@media ${device.laptop}{
				max-width: 1167px;
			}
		}		
		img{
			width: 100%;
		}
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
	
	.test2{
		position: absolute;
		width: 100%;
		max-width: 1200px;

	}
	.youtubeVideo{
		width: 100%;
		display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
	}
`
