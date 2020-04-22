import { IModal, Merge } from '@et/types/Modal'
import { IGalleryItem } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import posed from 'react-pose'
import YouTube, { Options } from 'react-youtube'
import styled from 'styled-components'

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
			x: direction > 0 ? 1000 : -1000,
			opacity: 0
		}
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0
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

	const [[page, direction], setPage] = useState([props.options.data.selectedSlide, 0])
	const hasScrollBar = document.querySelector('.hasScrollBar')
	const [axis, setAxis] = useState<boolean | 'x' | 'y'>('x')
	const images = props.options.data.items
	const [height, setHeight] = useState(0)
	const imgRef = useRef<HTMLDivElement>(null)
	const prevStateHeight = useRef(0)
	const imageIndex = wrap(0, images.length, page)

	// We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
	// then wrap that within 0-2 to find our image ID in the array below. By passing an
	// absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
	// detect it as an entirely new image. So you can infinitely paginate as few as 1 images.

	const paginate = (newDirection: number) => {
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
		setTimeout(() => {
			getHeight(1)
		}, 0)
	}, [])
	useLayoutEffect(() => {
		setTimeout(() => {
			getHeight(1)
		}, 300)
	}, [page])

	const getHeight = (index: number) => {
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
			console.log('rect', boundingClient)
			if (prevStateHeight.current !== boundingClient.height) {
				console.log('new height')

				setHeight(boundingClient.height)
			}
		}

	}

	function dragDirection (myAxis: any) {
		if (height > window.innerHeight && !isVideoItem(imageIndex)) {
			console.log(myAxis)
			setAxis(myAxis)
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

		if (isVideoItem(page)) {
			console.log('play Video')

			// this.playVideo()
		}
	}

	function videoCheck (item: IGalleryItem) {
		if (item.video) {
			console.log('item', item)

			return (
				<YoutubeGalleryItem key={'tubemodal'}>
					<YoutubeContainer>
						<YouTube
							videoId={item.video.id}
							opts={opts}
							onReady={_onReadyYouTube}
						/>
						{/*<iframe*/}
						{/*	src='https://www.youtube.com/embed/2TGOJ0_ssuo'*/}
						{/*	frameBorder='0'*/}
						{/*	allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'*/}
						{/*	allowFullScreen={true}/>*/}
					</YoutubeContainer>
				</YoutubeGalleryItem>
			)
		}
		return (<img src={images[imageIndex].localFile.childImageSharp.fullWidth.src} alt='alt'/>)
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

	console.log('sttate', [page, direction])
	console.log('sttate', axis)
	return (
		<Main
			key={'main'}>
			<Container
				isLoaded={true}
				height={height}
				hasScrollbar={!!hasScrollBar}
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
							console.log('exited, go to slide', page)
							props.options.data.goToSlide(page + 1) // because the gallery is not zerobased
						}}>
							<motion.div
								key={page}
								className={'fm-divImage'}
								custom={direction}
								variants={variants}
								// style={{ width: '100%', maxWidth: 800 }}
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
			<BtnLeft onClick={prevSlide} disabled={page === 0}>
				<svg className='icon' viewBox='0 0 32 32'><title>Show previous slide</title>
					<path
						d='M20.768,31.395L10.186,16.581c-0.248-0.348-0.248-0.814,0-1.162L20.768,0.605l1.627,1.162L12.229,16 l10.166,14.232L20.768,31.395z'/>
				</svg>
			</BtnLeft>
			<BtnRight onClick={nextSlide} disabled={page + 1 === images.length}>
				<svg className='icon' viewBox='0 0 32 32'><title>Show next slide</title>
					<path
						d='M11.232,31.395l-1.627-1.162L19.771,16L9.605,1.768l1.627-1.162l10.582,14.813 c0.248,0.348,0.248,0.814,0,1.162L11.232,31.395z'/>
				</svg>
			</BtnRight>
			<CloseBtn onClick={props.closeModal}>{renderSvg(svgs.Close)}</CloseBtn>
		</Main>
	)

}
export default FmGalleryModal

const YoutubeGalleryItem = styled.div`
	width: 100%;
	margin: 0;
	height: 390px;
	@media ${device.laptop} {
		height: 480px;
		max-width: 1275px;
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
const Container = styled.div<{ isLoaded: boolean, hasScrollbar: boolean, height: number }>`
	// width: 100%;
	// height: 100%;
	// position: relative;
	// display: flex;
	// flex-direction: column;
	// justify-content: center;
	// transition: opacity .3s .3s;
	// opacity: ${props => props.isLoaded ? 1 : 0};
	//  width: 100vw;
	//// height: 100vh;
	//	position: relative;
	//	display: flex;
	//	justify-content: center;
		transition: height .3s;
	//	img {	
	//		position: absolute;
	//		//max-width: 100vw;
	//		top: 0;
	//		width: 100%;
	//		opacity: 1;
	//		transform: none;
	//		user-select: none;
	//		z-index: 1;
	//	}
		height: ${props => props.height}px;
		
		&.hasVideo{
			height: 100% !important;
			position: relative;
			z-index: 3;
			transition: height 0s;
		}

		@media ${device.laptop}{
			position: relative;
			z-index: 2;
			overflow: hidden;
			${props => props.height > 800 ? 'overflow-y: scroll;' : 'overflow: hidden;'}
			${props => props.hasScrollbar ? `margin-right: 15px;` : null};
		}
`
const Inner = styled.div`
	// width: 100%;
	// height: 100%;
	// position: relative;
	// display: flex;
	// flex-direction: column;
	// justify-content: center;
		
	// transition: opacity .3s .3s;
	  width: 100vw;
		position: relative;
		display: flex;
		justify-content: center;
		transition: height .3s;
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
		}		
		img{
			width: 100%;
		}
		//img {	
		//	position: absolute;
		//	top: 0;
		//	width: 100%;
		//	opacity: 1;
		//	transform: none;
		//	user-select: none;
		//	z-index: 1;
		//}
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
	z-index: 4;
	
	&[disabled]{
		opacity: 0;
	}
	
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
