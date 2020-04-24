import { useGalleryResizeEffect } from '@utils/galleryUtils'
import Img from 'gatsby-image'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import posed from 'react-pose'
import { value, spring } from 'popmotion'
import styled from 'styled-components'

interface IProps {
	handleSlideChange: (slideIndex: number) => void
	selectedSlide: number
	slides: any[]
}

const SwipeThumbs = (props: IProps) => {

	const rootElement = useRef<HTMLDivElement | null>(null)
	const preventClick = useRef<boolean>(false)
	const prevSelectedSlide = useRef(props.selectedSlide)
	const xRef: any = useRef(value(0))
	const valuesMap = { x: xRef.current }
	const zeroIndex = props.selectedSlide - 1

	const [galleryState] = useGalleryResizeEffect(rootElement.current, 4)
	const goToSlide = (slideIndex: number) => (e: any) => {
		props.handleSlideChange(slideIndex + 1)
	}

	useEffect(() => {
		prevSelectedSlide.current = props.selectedSlide
	}, [props.selectedSlide])

	function onDragStart (e: any) {
		preventClick.current = false
		// props.onDragStart();
	}

	function onDragEnd (e: any) {
		console.log('e', e)

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

	return (
		<DragContainer
			selectedSlide={props.selectedSlide}
			width={galleryState.width}
			sliderWidth={props.slides.length}
			ref={rootElement}
			values={valuesMap}
			offset={zeroIndex * galleryState.width}
			onDragEnd={onDragEnd}
			onDragStart={onDragStart}
			poseKey={zeroIndex * galleryState.width}
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

			// IF we are on the last slide make sure it stays in the 4th position
			if (digits.selectedSlide === digits.sliderWidth) {
				// calc the position of the 2nd to last slide and force the last slide to not move after click
				const lastSlideCount = digits.selectedSlide - 4
				return -(digits.width * lastSlideCount)
			}
			// if selectedSlide is past the 3rd starting position, start sliding over each time
			if (digits.selectedSlide > 3) {
				const newIndex = digits.selectedSlide - 3 // subtract the first three items because they dont move
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
		transition: 'spring'
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


