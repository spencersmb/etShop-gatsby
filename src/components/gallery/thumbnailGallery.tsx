import { device } from '@styles/global/breakpoints'
import React, { Component, useEffect, useState } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

const Flickity =
	typeof window !== 'undefined'
		? require('flickity')
		: () => null

interface IProps {
	slideTo: (index: number, updateState?: boolean) => void
	selectedIndex: number
	onSettle: any
	items: any[]
}

const itemStyle = {
	width: `100%`,
	background: '#FFF'
}

/*
 * * How it works
 * onLoad event on IMG tags adds up all the images. Once they are all loaded, set the state
 * as loaded and fade the whole slider in. Once all the images are loaded, the component
 * re-sizes itself if any images are small to readjust the height.
 */
export default class SubSelector extends Component<IProps> {
	state = {
		selectedIndex: 0,
		totalImages: this.props.items.length,
		allImagesLoaded: false,
		galleryLoaded: false
	}
	flkty: Flickity | null = null
	scrollAt = 0
	dragStarted = false
	wrapper: Element | null = null
	imagesLoaded = 0

	constructor (props: any) {
		super(props)
		this.loadImage = this.loadImage.bind(this)
		this.checkSize = this.checkSize.bind(this)
	}

	componentDidMount () {
		const { items } = this.props
		this.scrollAt = 1 / (items.length)
		if (Flickity) {
			this.initFlickity()
		}
	}

	initFlickity = () => {
		const options = {
			cellSelector: '.carousel-cell-nav',
			contain: true,
			initialIndex: 0,
			dragThreshold: 10,
			pageDots: false,
			setGallerySize: true,
			prevNextButtons: false,
			percentPosition: false,
			imagesLoaded: true,
			lazyLoad: 5,
			on: {
				ready: () => {
					this.setState({
						galleryLoaded: true
					})
				}
			}
		}

		if (this.wrapper) {
			this.flkty = new Flickity(this.wrapper, options)
			if (this.flkty) {
				this.flkty.on('dragStart', this.dragStart)
				this.flkty.on('dragEnd', this.dragEnd)
				this.flkty.on('staticClick', this.staticClick)
				this.flkty.on('settle', this.props.onSettle)
			}
		}
	}

	checkSize (element: Element, gallery: any) {
		const containerHeight = element.children[0].getBoundingClientRect().height
		// console.log('containerHeight', containerHeight)

		if (containerHeight < 136) {
			// console.log('resize')
			// gallery.resize()
			gallery.reloadCells()
		}
	}

	componentWillReceiveProps (nextProps: IProps) {
		if (!this.flkty) {
			return
		}
		this.flkty.selectCell(nextProps.selectedIndex)
	};

	staticClick = (event: any, pointer: any, cellElement: any, cellIndex: any) => {
		if (!this.flkty) {
			return
		}
		this.props.slideTo(cellIndex, false)
		this.flkty.selectCell(cellIndex)
	}

	dragStart = () => {
		this.dragStarted = true
	}

	dragEnd = () => {
		this.dragStarted = false
	}

	loadImage () {
		this.imagesLoaded = this.imagesLoaded + 1
		console.log('this.imagesLoaded', this.imagesLoaded)

		if (this.imagesLoaded === 4) {
			console.log('all images loaded')

			if (this.wrapper) {
				this.checkSize(this.wrapper, this.flkty)
			}
			this.setState({
				allImagesLoaded: true
			})
		}
	}

	render () {
		const { items } = this.props

		return (
			<GallerySubNav>
				<GalleryItems pose={this.state.galleryLoaded ? 'open' : 'close'}>
					<div ref={c => this.wrapper = c}>
						{items.map((item: any, index: number) =>
							<div key={index} style={itemStyle} className='carousel-cell-nav'>

								<LazyLoadImg
									base={item.localFile.childImageSharp.thumbnail_mobile.base64}
									src={item.localFile.childImageSharp.thumbnail_mobile.src}
									alt={item.alt}
									// onLoad={this.loadImage}
									{...item}
								/>

								{/*Flickity lazy with srcset*/}
								{/*<img*/}
								{/*	src={item.localFile.childImageSharp.thumbnail_mobile.base64}*/}
								{/*	data-flickity-lazyload-srcset={item.localFile.childImageSharp.thumbnail_mobile.srcSet}*/}
								{/*	sizes={item.localFile.childImageSharp.thumbnail_mobile.sizes}*/}
								{/*	onLoad={(e, i) => {*/}
								{/*		console.log('load', e)*/}
								{/*		console.log('i', i)*/}
								{/*	}}*/}
								{/*	alt={item.alt}*/}
								{/*/>*/}

								{/*Original img use*/}
								{/*<img*/}
								{/*	src={item.localFile.childImageSharp.thumbnail_mobile.src}*/}
								{/*	alt={item.alt}*/}
								{/*	// loading='lazy'*/}
								{/*	onLoad={this.loadImage}*/}
								{/*/>*/}

								{/*Observable attempt*/}
								{/*<ExternalImage*/}
								{/*	// loadImage={this.loadImage}*/}
								{/*	src={item.localFile.childImageSharp.thumbnail_mobile.src}*/}
								{/*	alt={item.alt}/>*/}
								{/*{this.createImage(item.localFile.childImageSharp.thumbnail_mobile.src, item.alt)}*/}
							</div>
						)}
					</div>
				</GalleryItems>
			</GallerySubNav>
		)
	}
}
const ContainerPose = posed.div({
	close: {
		opacity: 0,
		transition: {
			default: { duration: 150, ease: 'easeOut' }
		}
	},
	open: {
		opacity: 1,
		delay: 300,
		transition: {
			default: { duration: 300, ease: 'easeOut' }
		}
	}
})
const GalleryItems = styled(ContainerPose)`
		height: 100%;
		position: relative;
		opacity: 0;
		z-index: 2;
`
const GallerySubNav = styled.div`
	display: none;
	position: relative;
	
	@media ${device.tablet} {
		display: block;	
	}
`

function LazyLoadImg ({ base, src, alt, ...rest }: any) {

	// const [loaded, setLoaded] = useState(false)
	// const onLoad = (e: any) => {
	// 	console.log('manual load', e.target)
	// 	setLoaded(true)
	// }

	return (
		<img
			style={{ width: '205px', height: '136px' }}
			src={base}
			data-flickity-lazyload-src={src}
			// onLoad={onLoad}
			alt={alt}
		/>
	)
}

function ExternalImage ({ src, alt }: any) {
	const [imageSrc, setImageSrc] = useState('')
	const [imageRef, setImageRef] = useState()

	const onLoad = (event: any) => {
		console.log('loaded')

		event.target.classList.add('loaded')
	}

	const onError = (event: any) => {
		event.target.classList.add('has-error')
	}

	useEffect(() => {
		let observer: any
		let didCancel = false

		if (imageRef && imageSrc !== src) {
			if (IntersectionObserver) {
				observer = new IntersectionObserver(
					entries => {
						entries.forEach(entry => {
							if (
								!didCancel &&
								(entry.intersectionRatio > 0 || entry.isIntersecting)
							) {
								setImageSrc(src)
								observer.unobserve(imageRef)
							}
						})
					},
					{
						threshold: 0.01,
						rootMargin: '75%'
					}
				)
				observer.observe(imageRef)
			} else {
				// Old browsers fallback
				setImageSrc(src)
			}
		}
		return () => {
			didCancel = true
			// on component cleanup, we remove the listner
			if (observer && observer.unobserve) {
				observer.unobserve(imageRef)
			}
		}
	}, [src, imageSrc, imageRef])
	return (
		<img
			ref={setImageRef}
			src={imageSrc}
			alt={alt}
			onLoad={onLoad}
			onError={onError}
		/>
	)
}
