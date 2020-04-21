import { IModal, Merge } from '@et/types/Modal'
import { IGalleryItem } from '@et/types/Products'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import posed from 'react-pose'
import styled from 'styled-components'

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

	const [[page, direction], setPage] = useState([0, 0])
	const [axis, setAxis] = useState<boolean | 'x' | 'y'>('x')
	const images = props.options.data.items
	const [height, setHeight] = useState(0)
	const imgRef = useRef<HTMLDivElement>(null)
	const prevStateHeight = useRef(0)

	// We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
	// then wrap that within 0-2 to find our image ID in the array below. By passing an
	// absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
	// detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
	const imageIndex = wrap(0, images.length, page)

	const paginate = (newDirection: number) => {
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
		console.log(myAxis)
		setAxis(myAxis)
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
			<Container isLoaded={true} style={{ height }}>
				<div
					className={'height-container'}
					ref={imgRef}
					style={{
						display: 'flex',
						width: '100%',
						justifyContent: 'center'
						// position: 'relative',
						// height
					}}
				>
					<AnimatePresence initial={false} custom={direction}>
						<motion.img
							key={page}
							src={images[imageIndex].localFile.childImageSharp.fullWidth.src}
							custom={direction}
							variants={variants}
							style={{ width: '100%', maxWidth: 800 }}
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
						/>
					</AnimatePresence>

				</div>
				{/*<div className='next' onClick={() => paginate(1)}>*/}
				{/*	{'‣'}*/}
				{/*</div>*/}
				{/*<div className='prev' onClick={() => paginate(-1)}>*/}
				{/*	{'‣'}*/}
				{/*</div>*/}
			</Container>
		</Main>
	)

}
export default FmGalleryModal
const Container = styled.div<{ isLoaded: boolean }>`
	// width: 100%;
	// height: 100%;
	// position: relative;
	// display: flex;
	// flex-direction: column;
	// justify-content: center;
	// transition: opacity .3s .3s;
	// opacity: ${props => props.isLoaded ? 1 : 0};
	  width: 100vw;
	// height: 100vh;
		position: relative;
		display: flex;
		justify-content: center;
		//align-items: center;
		transition: height .3s;
		img {	
			position: absolute;
			//max-width: 100vw;
			top: 0;
			width: 100%;
			opacity: 1;
			transform: none;
			user-select: none;
			z-index: 1;
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
`
