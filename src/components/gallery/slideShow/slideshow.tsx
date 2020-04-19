import { IGalleryItem } from '@et/types/Products'
import { CustomWindow } from '@et/types/Winodw'
import { IShowModalAction } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { shadowStyles } from '@styles/global/shadows'
import { CodyUtils } from '@utils/codyUtils'
import { useSetState } from '@utils/stateUtils'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

declare let window: CustomWindow

interface IProps {
	items: IGalleryItem[]
	navigation: boolean
	swipe: boolean
	showModal: IShowModalAction
}

interface IState {
	selectedSlide: number,
	loaded: boolean,
	supportAnimation: boolean,
	animating: false,
	animationType: string
	dir: string
}

interface INewState {
	selectedSlide?: number,
	loaded?: boolean
	animating?: boolean,
	dir?: string
}

// ADD UTILS
const image = 'https://codyhouse.co/app/assets/img/slideshow-img-1.jpg'
const item1 = () => {
	return (
		<div className='text-component'>
			<h1>Slide Number One</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quo dolores dolor treprehenderit iure
				laborum atque.</p>
		</div>
	)
}
const item2 = () => {
	return (
		<>
			<div className='text-component'>
				<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
					expedita
					eius eos maiores consectetur autem ratione voluptatem sequi, id eveniet.
				</p>
			</div>
			<div className='margin-top-md'>
				<div className='flex flex-wrap flex-center gap-sm'>
					<a href='#0' className='btn btn--primary'>Download</a>
					<a href='#0' className='color-inherit'>Learn more</a>
				</div>
			</div>
		</>
	)
}
const GallerySlideshow = (props: IProps) => {
	const animatingClass = 'slideshow--is-animating'
	const galleryItems = [
		{
			content: item1
		},
		{
			content: item2
		},
		{
			content: item1
		}
	]
	const [state, setState] = useSetState<IState, INewState>({
		loaded: false,
		selectedSlide: 1,
		animating: false,
		supportAnimation: CodyUtils.cssSupports('transition', 'all'),
		animationType: 'slide',
		thumbnails: false,
		dir: ''
	})
	const slideShowRef = useRef<HTMLDivElement | null>(null)
	const controls = useRef<HTMLUListElement | null>(null)
	const slideshowItems = useRef<HTMLUListElement | null>(null)
	const prevSelectedIndex = useRef(0)

	function initSlideShow (slideShowEl: HTMLElement) {
		console.log('slideShowRef', slideShowRef)
		console.log('state', state)
		initSwipe()
	}

	function initSwipe () {

		if (window && window.SwipeContent && slideShowRef.current) {

			const swipe = new window.SwipeContent(slideShowRef.current)

			// const swipe = new SwipeContent(slideshow.element)
			slideShowRef.current.addEventListener('swipeLeft', (event) => {
				console.log('swipeLeft')
				showNext()
			})
			slideShowRef.current.addEventListener('swipeRight', (event) => {
				// slideshow.showPrev()
				showPrev()
				console.log('swipeRight')
			})
		}

	}

	function handleClick (event: React.MouseEvent) {
		event.preventDefault()
		if (event.currentTarget.getAttribute('data-dir') === 'left') {
			console.log('left')
			showPrev()
		} else {
			console.log('right')
			showNext()
		}

	}

	function handleChangeSlide (index: number, dir: string) {
		const nextSlide = dir === 'next' ? index + 1 : index - 1
		if (nextSlide <= 0 || nextSlide > galleryItems.length) {return}
		console.log('nextSlide', nextSlide)
		console.log('index', index)
		setState({
			selectedSlide: nextSlide,
			dir
		})
		// animateItemsInOut(nextSlide, index, dir)
	}

	function animateItemsInOut (next: number, prev: number, dir: string) {
		if (slideshowItems.current && slideshowItems.current.children.length > 1) {
			const nextItem = slideshowItems.current.children[next - 1]
			// add class to next item
			setTimeout(() => {
				nextItem.classList.add('slideshow__item--' + state.animationType + '-in-right')
			}, 1000)
			console.log('nextItem', nextItem)

			// CodyUtils.addClass(nextItem, 'slideshow__item--' + state.animationType + '-in-right')
		}
	}

	function getAnimatingClass (itemIndex: number) {

		// const dir = state.selectedSlide > prevSelectedIndex.current ? 'next' : 'prev'
		// if (state.selectedSlide === prevSelectedIndex.current) {
		// 	return
		// }
		// console.log('dir', dir)
		//
		// if (state.selectedSlide === itemIndex && dir === 'next') {
		// 	return 'slideshow__item--' + state.animationType + '-in-right'
		// } else if (state.selectedSlide === itemIndex && dir === 'prev') {
		// 	return 'slideshow__item--' + state.animationType + '-in-left'
		// }
		//
		// if (prevSelectedIndex.current === itemIndex && dir === 'next') {
		// 	return 'slideshow__item--' + state.animationType + '-out-right'
		// } else {
		// 	return 'slideshow__item--' + state.animationType + '-out-left'
		// }
		// if selected index matches then add animated class in
		// if prevSelected index matches then add exti animation class

	}

	function showNext () {
		handleChangeSlide(state.selectedSlide, 'next')
	}

	function showPrev () {
		handleChangeSlide(state.selectedSlide, 'prev')
	}

	useEffect(() => {
		if (slideShowRef.current) {
			initSlideShow(slideShowRef.current)
		}
	}, [])
	useLayoutEffect(() => {
		prevSelectedIndex.current = state.selectedSlide
	}, [state.selectedSlide])

	return (
		<Wrapper>
			<div ref={slideShowRef} className='slideshow js-slideshow slideshow--transition-slide' data-swipe='on'>
				<p className='sr-only'>Slideshow Items</p>
				<ul className='slideshow__content' ref={slideshowItems}>
					{galleryItems.map((item, index) => (
						<li key={index}
								aria-hidden={index + 1 === state.selectedSlide ? 'false' : 'true'}
								className={`slideshow__item js-slideshow__item 
								${index + 1 === state.selectedSlide ? 'slideshow__item--selected' : ''}
								
								`}>
							<div className='container max-width-sm'>
								{item.content()}
							</div>
						</li>
					))}
				</ul>
				{galleryItems.length >= 2
					?
					<ul ref={controls}>
						<li className='slideshow__control js-slideshow__control'>
							<button className='reset slideshow__btn js-tab-focus' onClick={handleClick} data-dir={`left`}>
								<svg className='icon' viewBox='0 0 32 32'><title>Show previous slide</title>
									<path
										d='M20.768,31.395L10.186,16.581c-0.248-0.348-0.248-0.814,0-1.162L20.768,0.605l1.627,1.162L12.229,16 l10.166,14.232L20.768,31.395z'/>
								</svg>
							</button>
						</li>
						<li className='slideshow__control js-slideshow__control'>
							<button className='reset slideshow__btn js-tab-focus' onClick={handleClick} data-dir={`right`}>
								<svg className='icon' viewBox='0 0 32 32'><title>Show next slide</title>
									<path
										d='M11.232,31.395l-1.627-1.162L19.771,16L9.605,1.768l1.627-1.162l10.582,14.813 c0.248,0.348,0.248,0.814,0,1.162L11.232,31.395z'/>
								</svg>
							</button>
						</li>
					</ul>
					: ''}
				<div className='sr-only js-slideshow__aria-live' aria-live='polite' aria-atomic='true'>
					{`Item ${state.selectedSlide} of ${galleryItems.length}`}
				</div>
			</div>
		</Wrapper>
	)
}
const SlidePose = posed.div({})
const Slide = styled.div<{ selected: boolean }>`
		display: flex;
		align-items: center;
		justify-content: center;
		height: var(--slideshow-height);
		background-color: var(--color-bg);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		visibility: hidden;
	
		&:focus {
			outline: none;
		}
		
		${props => props.selected ? `
			position: relative;
			z-index: 3;
			visibility: visible;
			
			& > * {
				visibility: visible;
			}
		` : ''}
`
const Wrapper = styled.div`

	@keyframes slide-in-left {
		0% {
			visibility: visible;
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(0);
		}
	}
	
	@keyframes slide-in-right {
		0% {
			visibility: visible;
			transform: translateX(100%);
		}
		100% {
			transform: translateX(0);
		}
	}
	
	@keyframes slide-out-left {
		0% {
			visibility: visible;
			transform: translateX(0);
		}
		100% {
			transform: translateX(100%);
		}
	}
	
	@keyframes slide-out-right {
		0% {
			visibility: visible;
			transform: translateX(0);
		}
		100% {
			transform: translateX(-100%);
		}
	}
	
	box-shadow: ${shadowStyles.shadow5};
	max-width: 335px;
	margin: 0 auto;
	position: relative;
	width: 100%;
	background: grey;
	display: flex;
	flex-direction: column;
	
	ul{
		margin: 0;
	}
	
	@media ${device.tablet} {
			max-width: 600px;
			overflow: hidden;
	}
	
	.sr-only {
		position: absolute;
		clip: rect(1px,1px,1px,1px);
		-webkit-clip-path: inset(50%);
		clip-path: inset(50%);
		width: 1px;
		height: 1px;
		overflow: hidden;
		padding: 0;
		border: 0;
		white-space: nowrap
	}
	
	// slide
	.slideshow__item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: var(--slideshow-height);
		background-color: var(--color-bg);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
	
		&:focus {
			outline: none;
		}
	}
	
	// slideshow basic style
	.slideshow {	
			position: relative;
			z-index: 1;
			overflow: hidden;
		}
	
	.slideshow__content {
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

	.slideshow__item {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		//visibility: hidden;
	}
	
	.slideshow__item--selected {
		position: relative;
		z-index: 3;
		visibility: visible;
	}
	// slide-in animation
	.slideshow--transition-slide .slideshow__item {
		animation-duration: var(--slideshow-slide-transition-duration);
		animation-fill-mode: forwards;
		animation-timing-function: var(--ease-out);
	
		> * { // hide content of not-visible items so that they are not focusable 
			//visibility: hidden;
		}
	} 
	
  
  .slideshow--transition-slide .slideshow__item--selected > * { // show content of selected item 
    visibility: visible;
  }

  .slideshow--transition-slide .slideshow__item--slide-in-left { // visible item - enter from left to right
    animation-name: slide-in-left;
  }

  .slideshow--transition-slide .slideshow__item--slide-in-right { // visible item - enter from right to left
    animation-name: slide-in-right;
  }

  .slideshow--transition-slide .slideshow__item--slide-out-left { // leaving item - leave from left to right
    animation-name: slide-out-left;
  }
  
  .slideshow--transition-slide .slideshow__item--slide-out-right { // leaving item - leave from right to left
    animation-name: slide-out-right;
  }

  .slideshow--transition-slide .slideshow__item--slide-out-left, 
  .slideshow--transition-slide .slideshow__item--slide-out-right {
		z-index: 2;
	}

	&.slideshow__item--selected {
		z-index: 3; // fix bug on browsers not supporting CSS animations
	}

	> * {
		visibility: visible;
	}
	
	
	// slideshow arrow controls
	.slideshow__control {
		display: none;
	}
	
  .slideshow[data-controls="hover"] .slideshow__control {
    opacity: 0; // hide arrows
    transition: opacity .3s;
  }

  .slideshow[data-controls="hover"]:hover .slideshow__control {
    opacity: 1; // show arrows on hover
  }
  
	// touch swipe enabled
  .slideshow[data-swipe="on"]{
		.slideshow__control {
			display: none; // hide arrows on mobile if swipe is enabled
			@media ${device.md}{
				display: block; // show arrow controls
			}
		}
		.slideshow__content {
			user-select: none;
		
			img {
				pointer-events: none;
			}
		}
  }

  .slideshow__control {
		display: block;
		position: absolute;
		z-index: 4;
		top: 50%;
		transform: translateY(-50%);
		
		&.is-hidden{
		
		}
			
		&:first-of-type {
			left: var(--slideshow-btn-offset);
		}
		
		&:last-of-type {
			right: var(--slideshow-btn-offset);
		}
		}
		
	.slideshow__btn {
		display: block;
		background-color: alpha(var(--color-black), 0.75); // IE fallback
		height: var(--slideshow-btn-height);
		width: var(--slideshow-btn-width);
		border-radius: var(--radius-md);
		cursor: pointer;
		outline: none;
		border: none;
		padding: 0;
		transition: background .2s, transform 0.2s;
	
		&:hover {
			background-color: #414144;
	
			.icon {
				fill: var(--color-bg);
			}
		}
	
		.slideshow:not(.slideshow--is-animating) &:active { // active effect
			transform: scale(0.95);
		}
	
		.icon {
			display: block;
			width: var(--slideshow-btn-icon-size);
			height: var(--slideshow-btn-icon-size);
			margin: 0 auto;
			transition: color .2s;
			fill: var(--color-white); // IE fallback
		}
	
		@supports (grid-area: auto) {
			background-color: transparent; // button color
	
			.icon {
				color: var(--color-contrast-higher); // icon color
			}
		}
	}
	
	// slideshow navigation
	.slideshow__navigation { // created in JS
		position: absolute;
		z-index: 4;
		bottom: 0;
		width: 100%;
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: transparent;
	}
	
	.slideshow__nav-item {
		display: inline-block; // flex fallback
		margin: 0 var(--space-xxxs);
	
		button { // dot
			display: block;
			position: relative;
			font-size: 8px; // dot size
			color: var(--color-contrast-high); // dot color
			height: 1em;
			width: 1em;
			border-radius: 50%;
			background-color: currentColor;
			opacity: 0.4;
			cursor: pointer;
			transition: background .3s;
	
			&::before { // focus circle
				content: '';
				position: absolute;
				top: calc(50% - 0.5em);
				left: calc(50% - 0.5em);
				height: 1em;
				width: 1em;
				font-size: 14px;
				border-radius: inherit;
				border: 1px solid var(--color-contrast-high);
				opacity: 0;
				transform: scale(0);
				transition: 0.3s;
			}
	
			&:focus {
				outline: none;
	
				&::before {
					opacity: 1;
					transform: scale(1);
				}
			}
		}
	}
	
	.slideshow__nav-item--selected button {
		opacity: 1;
	}
	
	@media ${device.md}{
		.slideshow__navigation {
			height: 40px;
		}
	
		.slideshow__nav-item {
			button {
				font-size: 10px; // dot size
	
				&::before { // focus circle
					font-size: 16px;
				}
			}
		}
	}
`
export default GallerySlideshow

// <li key={index}
// aria-hidden={index + 1 === state.selectedSlide ? 'false' : 'true'}
// className={`slideshow__item js-slideshow__item
// 								${index + 1 === state.selectedSlide ? 'slideshow__item--selected' : ''}`}>
// <div className='container max-width-sm'>
// 	{item.content()}
// </div>
// </li>
