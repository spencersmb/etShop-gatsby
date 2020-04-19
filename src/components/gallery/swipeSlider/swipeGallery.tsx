import SwipeSlider from '@components/gallery/swipeSlider/swiperSlider'
import SwipeThumbs from '@components/gallery/swipeSlider/swiperThumbs'
import { device } from '@styles/global/breakpoints'
import { shadowStyles } from '@styles/global/shadows'
import { useSetState } from '@utils/stateUtils'
import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const slides = ['blue', 'red', 'yellow', 'green', 'purple', 'orange']
const SwipeGallery = () => {
	// const [state, setState] = useSetState<any, any>({
	// 	loaded: false,
	// 	selectedSlide: 1
	// })
	const [selectedSlide, setSelectedSlide] = useState(1)
	const prevState = useRef(selectedSlide)
	useLayoutEffect(() => {
		prevState.current = selectedSlide
	}, [selectedSlide])

	function handleSlideChange (dir: string) {
		console.log('nextSlide handleChange', dir)
		// setState({
		// 	selectedSlide: nextSlide
		// })

		if (dir === 'next' && prevState.current + 1 <= slides.length) {
			setSelectedSlide(prevState.current + 1)
		}
		if (dir === 'prev' && prevState.current - 1 > 0) {
			setSelectedSlide(prevState.current - 1)
		}
	}

	function thumbnailClick (slideIndex: number) {
		setSelectedSlide(slideIndex)
	}

	console.log('selectedSlide in parent', selectedSlide)

	return (
		<Wrapper>
			<SwipeSlider
				slides={slides}
				selectedSlide={selectedSlide}
				handleSlideChange={handleSlideChange}
			/>
			<ThumbsWrapper>
				<SwipeThumbs
					handleSlideChange={thumbnailClick}
					selectedSlide={selectedSlide}
					slides={slides}/>
			</ThumbsWrapper>
		</Wrapper>
	)
}
const ThumbsWrapper = styled.div`
-ms-touch-action: pan-y;
	touch-action: pan-y;
	box-shadow: ${shadowStyles.shadow5};
	margin: 0 auto;
	position: relative;
	width: 100%;
	background: grey;
	display: flex;
	flex-direction: column;
	height: 100px;
	overflow: hidden;
`
const Wrapper = styled.div`
	-ms-touch-action: pan-y;
	touch-action: pan-y;
	box-shadow: ${shadowStyles.shadow5};
	max-width: 335px;
	margin: 0 auto;
	position: relative;
	width: 100%;
	background: grey;
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	
	@media ${device.tablet} {
			max-width: 600px;
	}

`

export default SwipeGallery
