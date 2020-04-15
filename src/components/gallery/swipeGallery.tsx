import { IGalleryItem } from '@et/types/Products'
import { IShowModalAction } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { shadowStyles } from '@styles/global/shadows'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-id-swiper'
import styled from 'styled-components'
import 'swiper/css/swiper.css'

interface IProps {
	items: IGalleryItem[]
	showModal: IShowModalAction
}

interface IState {
	selectedIndex: number,
	loaded: boolean
}

const SwipeGallery = (props: IProps) => {
	const [gallerySwiper, getGallerySwiper] = useState(null)
	const gallerySwiperParams = {
		// getSwiper: getGallerySwiper,
		spaceBetween: 0
		// navigation: {
		// 	nextEl: '.swiper-button-next',
		// 	prevEl: '.swiper-button-prev'
		// }
	}

	useEffect(() => {
		// if (gallerySwiper) {
		// 	gallerySwiper.controller
		// 	// gallerySwiper.controller.control = thumbnailSwiper;
		// 	// thumbnailSwiper.controller.control = gallerySwiper;
		// }
		// // }, [gallerySwiper, thumbnailSwiper]);
	}, [gallerySwiper])

	return (
		<Wrapper>
			<Swiper>
				<div className='swiper-slide' style={{ backgroundImage: 'url(http://lorempixel.com/600/600/nature/1)' }}/>
				<div className='swiper-slide' style={{ backgroundImage: 'url(http://lorempixel.com/600/600/nature/2)' }}/>
				<div className='swiper-slide' style={{ backgroundImage: 'url(http://lorempixel.com/600/600/nature/3)' }}/>
				<div className='swiper-slide' style={{ backgroundImage: 'url(http://lorempixel.com/600/600/nature/4)' }}/>
				<div className='swiper-slide' style={{ backgroundImage: 'url(http://lorempixel.com/600/600/nature/5)' }}/>
			</Swiper>
		</Wrapper>
	)
}
const Wrapper = styled.div`
	box-shadow: ${shadowStyles.shadow5};
	max-width: 687px;
	margin: 0 auto;
	position: relative;
	width: 100%;
	background: grey;
	
	@media ${device.tablet} {
			overflow: hidden;
	}
	
	.swiper-container:first-child {
    width: 100%;
    height: 20rem;
	}
	
	.swiper-slide{
		box-sizing: border-box;
    background-color: rgb(0, 234, 255);
    width: 100%;
    //height: 20rem;
    //background-image: url(/static/img/img_1.jpg);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-repeat: no-repeat;
    flex-shrink: 0;
    height: 100%;
    position: relative;
    transition-property: transform;
    background-size: cover;
    background-position: center center;
	}
`
export default SwipeGallery
