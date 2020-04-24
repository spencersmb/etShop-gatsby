import FmGalleryModal from '@components/gallery/swipeSlider/fmGalleryModal'
import { IGalleryItem } from '@et/types/Products'
import { IShowModalAction } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { useGalleryResizeEffect } from '@utils/galleryUtils'
import { renderSvg } from '@utils/styleUtils'
import Img from 'gatsby-image'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import posed from 'react-pose'
import { value, spring } from 'popmotion'
import styled from 'styled-components'

const VELOCITY_THRESHOLD = 600
const DISTANCE_PERCENTILE_THRESHOLD = 0.3

interface IProps {
	handleSlideChange: (nextSlide: string) => void
	goToSlide: (index: number) => void
	selectedSlide: number
	slides: IGalleryItem[],
	showModal: IShowModalAction
}

const SwipeSlider = (props: IProps) => {
	const rootElement = useRef<HTMLDivElement | null>(null)
	const preventClick = useRef<boolean>(false)
	const prevSelectedSlide = useRef(props.selectedSlide)
	const xRef: any = useRef(value(0))
	const valuesMap = { x: xRef.current }
	const [galleryState] = useGalleryResizeEffect(rootElement.current)
	const prevState = useRef(galleryState)

	useEffect(() => {
		prevSelectedSlide.current = props.selectedSlide
	}, [props.selectedSlide])
	useLayoutEffect(() => {
		prevState.current = galleryState
	}, [galleryState])

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

	function goToSlide (slideIndex: number) {
		console.log('go to index', slideIndex)
		props.goToSlide(slideIndex)
	}

	function staticClick () {
		props.showModal({
			modal: FmGalleryModal,
			options: {
				closeModal: true,
				hasBackground: true,
				background: colors.grey.i800,
				data: {
					selectedSlide: props.selectedSlide - 1, // because the modal is zerobased
					goToSlide,
					items: props.slides
				}
			}
		})
	}

	const zeroIndex = props.selectedSlide - 1

	return (
		<DragContainer
			ref={rootElement}
			values={valuesMap}
			offset={zeroIndex * galleryState.width}
			onClickCapture={(e: any) => {
				if (preventClick.current) {
					e.stopPropagation()
				}
			}}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			// onPoseComplete={null}
			poseKey={zeroIndex * galleryState.width}
			pose={'rest'}
		>

			{props.slides.map((slide, index) => {
				if (slide.video) {
					return (
						<Slide
							key={index}
							className='slide'
							onClick={staticClick}
						>
							<YoutubeIcon className={'youtubeIcon'}>
								{renderSvg(svgs.Youtube)}
							</YoutubeIcon>
							<Img
								loading={'eager'}
								fadeIn={false}
								fluid={slide.localFile.childImageSharp.fluid}
								alt={slide.alt}/>
						</Slide>
					)
				}
				return (
					<Slide
						key={index}
						className='slide'
						onClick={staticClick}
					>
						<FullScreenIcon>
							{renderSvg(svgs.MagnifyGlass)}
						</FullScreenIcon>
						<EnlargeIcon>
							{renderSvg(svgs.Enlarge)}
						</EnlargeIcon>
						<Img
							loading={'eager'}
							fadeIn={false}
							fluid={slide.localFile.childImageSharp.fluid}
							alt={slide.alt}/>
					</Slide>
				)
			})
			}
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

const FullScreenIcon = styled.span`
	background: #333f4fa3;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateY(-40%)translateX(-50%);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 5;
	opacity: 0;
	transition: opacity .2s, transform .2s;
	svg{
		width: 100%;
		max-width: 56px;
		padding: 10px;
		path{
			fill: #fff;
		}
	}
`
const YoutubeIcon = styled(FullScreenIcon)`
	opacity: 1;
	transform: translateY(-50%)translateX(-50%);
	svg{
		max-width: 100px;
		padding: 20px;
	}
`
const EnlargeIcon = styled.div`
	position: absolute;
	top:10px;
	right: 10px;
	display: flex;
	align-items: center;
	z-index: 5;
	max-width: 46px;
	border-radius: 8px;
	width: 100%;
	background: #e2eaf28a;
	padding: 8px;
	path{
		fill: #111;
	}
	@media ${device.laptop} {
		display: none;
		z-index: 1;
	}	
`
const Slide = styled.div`
	min-width: 100%;
  cursor: pointer;
  position: relative;
  
  @media ${device.laptop}{
  &:hover{
  	${FullScreenIcon}{
  		opacity: 1;
			transform: translateY(-50%)translateX(-50%);
  	}
  }
  }
`
export default SwipeSlider


