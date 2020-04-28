import { IModal, Merge } from '@et/types/Modal'
import { IGalleryItem } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { FmGalleryBtnLeft, FmGalleryBtnRight } from '@styles/modules/fmGallery'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import Img from 'gatsby-image'
import React, { useEffect, useRef, useState } from 'react'
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
	const gettingHeight = useRef(false)
	const [axis, setAxis] = useState<boolean | 'x' | 'y'>('x')
	const images = props.options.data.items
	const [height, setHeight] = useState(0)
	const fmModalContainerRef = useRef<HTMLDivElement>(null)
	const prevStateHeight = useRef(0)
	const imageIndex = wrap(0, images.length, page)

	// We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
	// then wrap that within 0-2 to find our image ID in the array below. By passing an
	// absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
	// detect it as an entirely new image. So you can infinitely paginate as few as 1 images.

	useEffect(() => {
		prevStateHeight.current = height
	})
	useEffect(() => {
		window.addEventListener('resize', adjustLayout)
		return () => {
			window.removeEventListener('resize', adjustLayout)
		}

	}, [])

	const paginate = (newDirection: number) => {
		// if the height is larger than the window height its oversized
		// scroll back to top for large images
		if (fmModalContainerRef.current) {
			fmModalContainerRef.current.scrollTop = 0
		}
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
	const adjustLayout = debounce(() => {
		hasScrollBarRef.current = document.querySelector('.hasScrollBar')
		if (fmModalContainerRef.current) {
			getHeight()
		}
	}, 250)
	const getHeight = () => {
		if (gettingHeight.current) {
			return
		}
		if (isVideoItem(imageIndex)) {
			return
		}

		// ensure this is only run once
		gettingHeight.current = true

		if (fmModalContainerRef.current) {
			// get the last item that is added into the dom
			// get its bounding box to target the height value
			const slides = fmModalContainerRef.current.children
			const newSlide = slides[fmModalContainerRef.current.children.length - 1] // last item
			const boundingClient = newSlide.getBoundingClientRect()

			// if its a different image size lets switch it
			if (prevStateHeight.current !== boundingClient.height) {
				setHeight(boundingClient.height)
			}
		}

		gettingHeight.current = false

	}

	function dragDirection (myAxis: any) {
		if (height > window.innerHeight && !isVideoItem(imageIndex)) {
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

	return (
		<Main
			height={window.outerHeight}
			key={'main'}>
			<Container ref={fmModalContainerRef}
								 height={height}
								 className={isVideoItem(imageIndex) ? 'hasVideo' : ''}>
				<AnimatePresence initial={false} custom={direction} onExitComplete={() => {
					getHeight()
					props.options.data.goToSlide(page + 1) // because the gallery is not zerobased
				}}>
					<motion.div
						key={page}
						className={isVideoItem(imageIndex) ? 'galleryItem youtubeVideo' : 'galleryItem'}
						custom={direction}
						variants={variants}
						initial='enter'
						animate='center'
						exit='exit'
						onLoad={(e) => {
							if (!mounted.current) {
								getHeight()
							}
							mounted.current = true
						}}
						dragDirectionLock={true}
						onDirectionLock={(dirAxis: string) => dragDirection(dirAxis)}
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
					</motion.div>
				</AnimatePresence>
			</Container>
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
const Container = styled.div<{ height: number }>`
		width: 100%;
		height: ${props => props.height}px;
		${props => props.height > window.outerHeight ? 'transition: height .9s .3s;' : 'transition: height .3s;'};
		position: relative;
		transform-origin: center center;
    z-index: 2;
    display: flex;
    justify-content: center;
    overflow-x: hidden;
		
		&.hasVideo{
			height: 100% !important;
			position: relative;
			z-index: 3;
			transition: height 0s;
		}

		@media ${device.laptop}{
			${props => props.height > window.outerHeight ? 'overflow-y: scroll;' : 'overflow: hidden;'}
		}
`
const YoutubeGalleryItem = styled.div`
	width: 100%;
	margin: 0;
	height: 390px;
	@media ${device.laptop} {
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
const ModalPose = posed.div({
	exit: {
		opacity: 0
	},
	enter: {
		opacity: 1
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
	
	img{
		-webkit-user-drag: none;
	}
	
	.galleryItem{
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
