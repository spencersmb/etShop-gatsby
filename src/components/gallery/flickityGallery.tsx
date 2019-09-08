import GalleryModal from '@components/gallery/flickityGalleryModal'
import ThumbnailGallery from '@components/gallery/thumbnailGallery'
import { Image } from '@et/types/Products'
import { IShowModalAction } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import Img from 'gatsby-image'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import Flickity from 'flickity-fullscreen'
import React, { Component } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

interface IProps {
	items: Image[]
	showModal: IShowModalAction
	subSelector?: boolean
}

const itemStyle = {
	width: '100%',
	margin: 0
}

class Selector extends Component<IProps> {
	state = {
		selectedIndex: 0,
		subSelector: false,
		loaded: false
	}

	flkty: Flickity | null = null
	scrollAt = 1
	wrapper: Element | null = null
	dragStarted = false

	componentDidMount () {

		const { subSelector, items } = this.props
		console.log('items', items)
		this.scrollAt = 1 / (items.length)
		if (subSelector) {
			this.setState({
				subSelector: true
			})
		}

		setTimeout(this.initFlickity, 0)
		setTimeout(() => {
			if (this.flkty) {
				this.flkty.resize()
			}
		}, 300)
	}

	componentWillUnmount () {
		if (this.flkty) {
			this.flkty.destroy()
		}
	};

	initFlickity = (loader: any) => {
		const options = {
			cellSelector: '.item',
			cellAlign: 'left',
			contain: false,
			initialIndex: 0,
			accessibility: false,
			pageDots: true,
			setGallerySize: true,
			prevNextButtons: false,
			percentPosition: false
		}

		if (this.wrapper) {
			this.flkty = new Flickity(this.wrapper, options)
			this.flkty.on('dragStart', this.dragStart)
			this.flkty.on('dragEnd', this.dragEnd)
			this.flkty.on('settle', this.onSettle)
			this.flkty.on('scroll', this.onChange)
			this.flkty.on('staticClick', this.staticClick)
		}

	}

	staticClick = () => {
		this.props.showModal({
			modal: GalleryModal,
			options: {
				closeModal: true,
				hasBackground: true,
				data: {
					selectedIndex: this.state.selectedIndex,
					onSettle: this.onSubSettle,
					items: this.props.items
				}
			}
		})
	}

	onChange = () => {
		if (!this.flkty) {
			return
		}
		const selectedIndex = this.flkty.selectedIndex

		if (this.state.selectedIndex !== selectedIndex) {

			this.setState({
				selectedIndex
			})
		}
	}

	onSettle = () => {
		if (!this.flkty) {
			return
		}
		const selectedIndex = this.flkty.selectedIndex

		if (this.state.selectedIndex !== selectedIndex) {

			this.setState({
				selectedIndex
			})
		}
	}

	slideTo = (index: number, updateState = true) => {
		if (!this.flkty) {
			return
		}
		this.flkty.selectCell(index)

		if (updateState) {
			this.setState({
				selectedIndex: index
			})
		}
	}

	onSubSettle = (index: number) => {
		if (!this.flkty) {
			return
		}
		if (this.flkty.selectedIndex !== index) {
			this.slideTo(index, false)
		}
	}

	dragStart = (e: any) => {
		this.dragStarted = true
	}

	dragEnd = (e: any) => {
		this.dragStarted = false
	}

	render () {
		const { items } = this.props
		return (
			<FlickityWrapper initialPose='exit' pose='enter'>
				<div ref={c => this.wrapper = c} className={`carousel`}>
					{items.map((item: Image, index: number) =>
						<div key={index} style={itemStyle} className='item carousel-cell'>
							<FullScreenIcon>
								{renderSvg(svgs.MagnifyGlass)}
							</FullScreenIcon>
							{/*<picture>*/}
							{/*	<source*/}
							{/*		srcSet={`*/}
							{/*		${item.localFile.childImageSharp.thumbnail.src} 1x,*/}
							{/*		${item.localFile.childImageSharp.thumbnail_2x.src} 2x*/}
							{/*		`}*/}
							{/*		media='(min-width: 992px)'/>*/}
							{/*	<source*/}
							{/*		srcSet={`*/}
							{/*		${item.localFile.childImageSharp.thumbnail.src} 1x*/}
							{/*		`}*/}
							{/*		media='(min-width: 768px)'/>*/}
							{/*	<source*/}
							{/*		srcSet={`*/}
							{/*		${item.localFile.childImageSharp.thumbnail.src} 2x*/}
							{/*		`}*/}
							{/*		media='(min-width: 375px)'/>*/}
							{/*	<img src={item.localFile.childImageSharp.thumbnail_mobile.src}*/}
							{/*			 alt={item.alt}/>*/}
							{/*</picture>*/}
							<Img
								critical={true}
								fadeIn={false}
								fluid={item.localFile.childImageSharp.fluid}
								alt={item.alt}/>
						</div>
					)}
				</div>
				<div>
					{this.state.subSelector &&
          <ThumbnailGallery
            onSettle={this.onSubSettle}
            slideTo={this.slideTo}
            selectedIndex={this.state.selectedIndex}
            items={items}
          />
					}
				</div>
			</FlickityWrapper>
		)
	}
}

const FullScreenIcon = styled.span`
	background: #333f4fa3;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateY(-50%)translateX(-50%);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 5;
	svg{
		width: 100%;
		max-width: 56px;
		padding: 10px;
		path{
			fill: #fff;
		}
	}
`

const ContainerPose = posed.div({
	exit: {
		opacity: 0,
		transition: {
			default: { duration: 150, ease: 'easeOut' }
		}
	},
	enter: {
		opacity: 1,
		delay: 0,
		transition: {
			default: { duration: 300, ease: 'easeOut' }
		}
	}
})
const FlickityWrapper = styled(ContainerPose)`
	box-shadow: ${shadowStyles.shadow5};
	max-width: 687px;
	margin: 0 auto;
	position: relative;
	width: 100%;
	
	@media ${device.tablet} {
			overflow: hidden;
	}
		
	//height: 186px; // remember to remove
	//background: #87DEDF;
`
export default Selector

