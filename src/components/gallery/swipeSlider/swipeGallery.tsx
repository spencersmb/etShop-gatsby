import SwipeSlider from '@components/gallery/swipeSlider/swiperSlider'
import SwipeThumbs from '@components/gallery/swipeSlider/swiperThumbs'
import { IGalleryItem } from '@et/types/Products'
import { IShowModalAction } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { shadowStyles } from '@styles/global/shadows'
import { FmGalleryBtnLeft, FmGalleryBtnRight } from '@styles/modules/fmGallery'
import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface IProps {
	showModal: IShowModalAction
	items: IGalleryItem[]
}

const SwipeGallery = (props: IProps) => {
	const [selectedSlide, setSelectedSlide] = useState(1)
	const prevSelectedSlide = useRef(selectedSlide)

	useLayoutEffect(() => {
		prevSelectedSlide.current = selectedSlide
	}, [selectedSlide])

	/*
		Pass in dir on click to determine which way to go
		Also if you are at the end or the beginning of the slide you cant go any further
	 */
	function handleSlideChange (dir: string) {
		console.log('nextSlide handleChange', dir)

		if (dir === 'next' && prevSelectedSlide.current + 1 <= props.items.length) {
			setSelectedSlide(prevSelectedSlide.current + 1)
		}
		if (dir === 'prev' && prevSelectedSlide.current - 1 > 0) {
			setSelectedSlide(prevSelectedSlide.current - 1)
		}
	}

	function goToSlide (slideIndex: number) {
		setSelectedSlide(slideIndex)
	}

	function nextSlide () {
		handleSlideChange('next')
	}

	function prevSlide () {
		handleSlideChange('prev')
	}

	console.log('selectedSlide in parent', selectedSlide)

	return (
		<Wrapper>
			<MainGallery>
				<SwipeSlider
					slides={props.items}
					selectedSlide={selectedSlide}
					handleSlideChange={handleSlideChange}
					goToSlide={goToSlide}
					showModal={props.showModal}
				/>
				<FmGalleryBtnLeft onClick={prevSlide} disabled={selectedSlide <= 1}
													background={{ hover: colors.grey.i800, color: '#ffffff69' }}>
					<svg className='icon' viewBox='0 0 32 32'><title>Show previous slide</title>
						<path
							d='M20.768,31.395L10.186,16.581c-0.248-0.348-0.248-0.814,0-1.162L20.768,0.605l1.627,1.162L12.229,16 l10.166,14.232L20.768,31.395z'/>
					</svg>
				</FmGalleryBtnLeft>
				<FmGalleryBtnRight onClick={nextSlide} disabled={selectedSlide >= props.items.length}
													 background={{ hover: colors.grey.i800, color: '#ffffff69' }}>
					<svg className='icon' viewBox='0 0 32 32'><title>Show next slide</title>
						<path
							d='M11.232,31.395l-1.627-1.162L19.771,16L9.605,1.768l1.627-1.162l10.582,14.813 c0.248,0.348,0.248,0.814,0,1.162L11.232,31.395z'/>
					</svg>
				</FmGalleryBtnRight>
			</MainGallery>
			<ThumbsWrapper>
				<SwipeThumbs
					handleSlideChange={goToSlide}
					selectedSlide={selectedSlide}
					slides={props.items}/>
			</ThumbsWrapper>
		</Wrapper>
	)
}
const MainGallery = styled.div`
	position: relative;
`
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
	overflow: hidden;
	
	@media ${device.tablet} {
			max-width: 600px;
	}
`

export default React.memo(SwipeGallery)
