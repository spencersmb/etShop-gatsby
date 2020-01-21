import DefaultSpinner from '@components/spinners/defaultSpinner'
import { Image } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import React, { Component } from 'react'
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
	items: Image[]
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
		if (containerHeight < 136) {
			gallery.resize()
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

	loadImage = () => {
		this.imagesLoaded = this.imagesLoaded + 1
		console.log('this.imagesLoaded', this.imagesLoaded)

		if (this.imagesLoaded === this.state.totalImages) {
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
		console.log('this.state', this.state)
		const { items } = this.props

		return (
			<GallerySubNav>
				<SpinnerWrapper>
					<DefaultSpinner
						submitting={!this.state.galleryLoaded || !this.state.allImagesLoaded}
						color={colors.purple.i500}
						size={'55px'}/>
				</SpinnerWrapper>
				<GalleryItems pose={this.state.galleryLoaded && this.state.allImagesLoaded ? 'open' : 'close'}>
					<div ref={c => this.wrapper = c}>
						{items.map((item: Image, index: number) =>
							<div key={index} style={itemStyle} className='carousel-cell-nav'>
								<img src={item.localFile.childImageSharp.thumbnail_mobile.src} alt={item.alt} onLoad={this.loadImage}/>
							</div>
						)}
					</div>
				</GalleryItems>
			</GallerySubNav>
		)
	}
}
const SpinnerWrapper = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
`
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
	max-height: 136px;
	min-height: 136.44px;
	position: relative;
	
	@media ${device.tablet} {
		display: block;	
	}
`
