import { useSetState } from '@components/account/dashboard'
import GalleryModal from '@components/gallery/flickityGalleryModal'
import ThumbnailGallery from '@components/gallery/thumbnailGallery'
import { device } from '@styles/global/breakpoints'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import Img from 'gatsby-image'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Image } from '@et/types/Products'
import { IShowModalAction } from '@redux/actions/modalActions'
import posed from 'react-pose'
import styled from 'styled-components'
// import Flickity from 'flickity'
const Flickity =
	typeof window !== 'undefined'
		? require('flickity')
		: () => null

interface IProps {
	items: Image[]
	showModal: IShowModalAction
	subSelector?: boolean
}

const itemStyle = {
	width: '100%',
	margin: 0
}

const FlickityGalleryContext = (props: IProps) => {
	const { items, subSelector } = props
	const [state, setState] = useSetState({
		selectedIndex: 0,
		subSelector: false,
		loaded: false
	})
	const flkty = useRef<Flickity | null>(null)
	const scrollAt = useRef(1)
	const wrapper = useRef<HTMLDivElement>(null)
	const prevSelectedIndex = useRef(0)

	useEffect(() => {
		scrollAt.current = 1 / (items.length)
		if (subSelector) {
			setState({
				subSelector: true
			})
		}
		if (Flickity) {
			setTimeout(initFlickity, 0)
		}

	}, [])

	useLayoutEffect(() => {
		prevSelectedIndex.current = state.selectedIndex
	}, [state.selectedIndex])

	function initFlickity () {
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

		if (wrapper.current) {
			flkty.current = new Flickity(wrapper.current, options)

			// @ts-ignore
			flkty.current.on('settle', onSettle)
			// @ts-ignore
			flkty.current.on('scroll', onChange)
			// @ts-ignore
			flkty.current.on('staticClick', staticClick)

			setTimeout(() => {
				if (flkty.current) {
					flkty.current.resize()
				}
			}, 300)
		}
	}

	function staticClick () {
		props.showModal({
			modal: GalleryModal,
			options: {
				closeModal: true,
				hasBackground: true,
				data: {
					selectedIndex: prevSelectedIndex.current,
					onSettle: onSubSettle,
					items: props.items
				}
			}
		})
	}

	function onChange () {
		if (!flkty.current) {
			return
		}
		const selectedIndex = flkty.current.selectedIndex

		if (prevSelectedIndex.current !== selectedIndex) {

			setState({
				selectedIndex
			})
		}
	}

	function onSettle () {
		if (!flkty.current) {
			return
		}
		const selectedIndex = flkty.current.selectedIndex

		if (prevSelectedIndex.current !== selectedIndex) {

			setState({
				selectedIndex
			})
		}
	}

	function slideTo (index: number, updateState = true) {
		if (!flkty.current) {
			return
		}
		flkty.current.selectCell(index)

		if (updateState) {
			setState({
				selectedIndex: index
			})
		}
	}

	function onSubSettle (index: number) {
		if (!flkty.current) {
			return
		}
		if (flkty.current.selectedIndex !== index) {
			slideTo(index, false)
		}
	}

	return (
		<FlickityWrapper initialPose='exit' pose='enter'>
			<div ref={wrapper} className={`carousel`}>
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
				{state.subSelector &&
        <ThumbnailGallery
          onSettle={onSubSettle}
          slideTo={slideTo}
          selectedIndex={state.selectedIndex}
          items={items}
        />
				}
			</div>
		</FlickityWrapper>
	)
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
`
export default FlickityGalleryContext
