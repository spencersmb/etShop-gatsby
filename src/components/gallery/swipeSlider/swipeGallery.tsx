import SwipeSlider from '@components/gallery/swipeSlider/swiperSlider'
import SwipeThumbs from '@components/gallery/swipeSlider/swiperThumbs'
import { IGalleryItem } from '@et/types/Products'
import { IShowModalAction } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { shadowStyles } from '@styles/global/shadows'
import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const slides = ['blue', 'red', 'yellow', 'green', 'purple', 'orange']

interface IProps {
	showModal: IShowModalAction
	items: IGalleryItem[]
}

const SwipeGallery = (props: IProps) => {
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

		if (dir === 'next' && prevState.current + 1 <= props.items.length) {
			setSelectedSlide(prevState.current + 1)
		}
		if (dir === 'prev' && prevState.current - 1 > 0) {
			setSelectedSlide(prevState.current - 1)
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
				<BtnLeft onClick={prevSlide} disabled={selectedSlide <= 1}>
					<svg className='icon' viewBox='0 0 32 32'><title>Show previous slide</title>
						<path
							d='M20.768,31.395L10.186,16.581c-0.248-0.348-0.248-0.814,0-1.162L20.768,0.605l1.627,1.162L12.229,16 l10.166,14.232L20.768,31.395z'/>
					</svg>
				</BtnLeft>
				<BtnRight onClick={nextSlide} disabled={selectedSlide >= props.items.length}>
					<svg className='icon' viewBox='0 0 32 32'><title>Show next slide</title>
						<path
							d='M11.232,31.395l-1.627-1.162L19.771,16L9.605,1.768l1.627-1.162l10.582,14.813 c0.248,0.348,0.248,0.814,0,1.162L11.232,31.395z'/>
					</svg>
				</BtnRight>
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
const SliderButton = styled.button`
	position: absolute;
	top: 50%;
	left: 10px;
	transform: translateX(0) translateY(-50%);
	outline: none;
	display: none;
	height: 64px;
	width: 32px;
	border-radius: 8px;
	cursor: pointer;
	transition: background .2s,transform .2s,-webkit-transform .2s, opacity .2s;
	background-color: #ffffff69;
	opacity: 1;
	padding: 0;
	border: 0;
	visibility: hidden;
	
	&[disabled]{
		opacity: 0;
	}
	
	path{
		transition: .2s;
	}
	
	&:focus{
		outline: none;
	}
	
	@media ${device.laptop}{
		display: block;
		visibility: visible;
		&:hover{
			background-color: ${colors.grey.i800};
			path{
				fill: #fff;
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

export default SwipeGallery
