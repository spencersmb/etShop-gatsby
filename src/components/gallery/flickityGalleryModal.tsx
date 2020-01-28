import { IModal, Merge } from '@et/types/Modal'
import { Image } from '@et/types/Products'
import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React, { Component } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

const Flickity =
	typeof window !== 'undefined'
		? require('flickity')
		: () => null

type IProps = Merge<IModal, {
	options: {
		data: {
			items: Image[],
			onSettle: (index: number) => void,
			selectedIndex: number
		}
	}
}>

const itemStyle = {
	width: '100%',
	margin: '0 40px'
}

/*
 * * How it works
 * on each event onChange and subSettle we check if the image is oversized, and if it is change
 * the CSS Styles. Flickity lazyloads all the images. Each image loads 2 positions ahead.
 */

export default class GalleryModal extends Component<IProps> {

	state = {
		selectedIndex: this.props.options.data.selectedIndex,
		overSized: false,
		galleryLoaded: false
	}

	flkty: Flickity | null = null
	scrollAt = 1
	wrapper: Element | null = null
	dragStarted = false

	componentDidMount () {
		this.scrollAt = 1 / (this.props.options.data.items.length)
		this.initFlickity()
	}

	UNSAFE_componentWillMount () {
		if (this.flkty) {
			this.flkty.destroy()
		}
	}

	initFlickity = () => {
		const options = {
			cellSelector: '.item-fullscreen',
			cellAlign: 'center',
			contain: false,
			dragThreshold: 10,
			initialIndex: this.props.options.data.selectedIndex,
			accessibility: false,
			pageDots: true,
			setGallerySize: true,
			prevNextButtons: true,
			percentPosition: false,
			adaptiveHeight: true,
			imagesLoaded: true,
			lazyLoad: 2,
			on: {
				ready: () => {
					// console.log('Flickity is ready', this.state)
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
				this.flkty.on('settle', this.onSettle)
				this.flkty.on('scroll', this.onChange)
				this.checkOverSizedImage()
			}
		}
	}

	onChange = () => {
		if (!this.flkty) {
			return
		}
		const { onSettle } = this.props.options.data
		const selectedIndex = this.flkty.selectedIndex

		if (this.state.selectedIndex !== selectedIndex) {
			onSettle(selectedIndex)
			this.setState({
				selectedIndex
			})
			this.checkOverSizedImage()
		}

	}

	onSettle = () => {
		const { onSettle } = this.props.options.data
		if (!this.flkty) {
			return
		}
		const selectedIndex = this.flkty.selectedIndex

		if (this.state.selectedIndex !== selectedIndex) {
			onSettle(selectedIndex)
			this.setState({
				selectedIndex
			})
			this.checkOverSizedImage()
		}

	}

	checkOverSizedImage = () => {
		const selectedImage = document.getElementsByClassName('item-fullscreen is-selected')
		const image = selectedImage[0].firstElementChild
		if (image) {
			const boundingClient = image.getBoundingClientRect()
			if (boundingClient.height > 800 && !this.state.overSized) {

				this.setState({
					overSized: true
				})
			} else if (this.state.overSized) {
				if (window) {
					window.scrollTo({ top: 0, behavior: 'smooth' })
				}
				this.setState({
					overSized: false
				})
			}
		}
	}

	dragStart = (e: any) => {
		this.dragStarted = true
	}

	dragEnd = (e: any) => {
		this.dragStarted = false
	}

	render () {
		const overSizedStyles = {
			height: '100%',
			overflowY: 'scroll'
		}
		return (
			<Main>
				<Container isLoaded={this.state.galleryLoaded}>
					<div ref={c => this.wrapper = c} className={'carousel-modal'}
						// @ts-ignore
							 style={this.state.overSized ? overSizedStyles : {}}>
						{this.props.options.data.items.map((item: Image, index: number) =>
							<div key={index} style={itemStyle} className='item-fullscreen'>
								<img
									src={item.localFile.childImageSharp.fullWidth.base64}
									data-flickity-lazyload-srcset={item.localFile.childImageSharp.fullWidth.srcSet}
									sizes={item.localFile.childImageSharp.fullWidth.sizes}
									alt={item.alt}/>
							</div>
						)}
					</div>
					<CloseBtn onClick={this.props.closeModal}>{renderSvg(svgs.Close)}</CloseBtn>
				</Container>
			</Main>
		)
	}
}

const CloseBtn = styled.button`
	position: absolute;
	top: 15px;
	right: 15px;
	width: 50px;
	height: 50px;
	z-index: 5;
	background: #fff;
	border-radius: 50%;
	border: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	&:focus{
		outline: none;
	}
	&:hover{
		svg{
			path{
				fill: ${colors.primary.pink};
			}
		}
	}
	svg{
		height: 30px;
		width: 100%;
		max-width: 20px;
		path{
			transition: .3s;
			fill: ${colors.primary.text};
		}
	}
`
const Container = styled.div<{ isLoaded: boolean }>`
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	transition: opacity .3s;
	opacity: ${props => props.isLoaded ? 1 : 0};
`
const ModalPose = posed.div({
	exit: {
		opacity: 0,
		transition: {
			default: { duration: 150 },
			y: { ease: 'easeOut' }
		},
		x: `-50%`,
		y: `-60%`
	},
	enter: {
		opacity: 1,
		delay: 300,
		transition: {
			default: { duration: 300 },
			// y: { type: 'spring', stiffness: 1500, damping: 15 },
			y: { ease: 'easeOut' }
		},
		x: `-50%`,
		y: `-50%`
	}
})
const Main = styled(ModalPose)`
	position: fixed;
	width: 100%;
	height: 100%;
	background: transparent;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	display: flex;
	flex-direction: column;
	z-index: 7;
	justify-content: center;
	align-items: center;
`
