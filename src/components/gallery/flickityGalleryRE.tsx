import GalleryModal from '@components/gallery/flickityGalleryModal'
import ThumbnailGallery from '@components/gallery/thumbnailGallery'
import { device } from '@styles/global/breakpoints'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { useSetState } from '@utils/stateUtils'
import { renderSvg } from '@utils/styleUtils'
import Img from 'gatsby-image'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { IGalleryItem } from '@et/types/Products'
import { IShowModalAction } from '@redux/actions/modalActions'
import posed from 'react-pose'
import styled from 'styled-components'

const Flickity =
	typeof window !== 'undefined'
		? require('flickity')
		: () => null

interface IProps {
	items: IGalleryItem[]
	showModal: IShowModalAction
	subSelector?: boolean
}

interface IState {
	selectedIndex: number,
	loaded: boolean
}

interface INewState {
	selectedIndex?: number,
	loaded?: boolean
}

const itemStyle = {
	width: '100%',
	// height: `100%`,
	margin: 0
}

const FlickityGalleryContext = (props: IProps) => {
	const { items, subSelector } = props
	const [state, setState] = useSetState<IState, INewState>({
		selectedIndex: 0,
		galleryItems: [],
		loaded: false
	})
	const flkty = useRef<Flickity | null>(null)
	const wrapper = useRef<HTMLDivElement>(null)
	const prevSelectedIndex = useRef(0)

	useEffect(() => {

		// check if Flickity is on the dom
		if (Flickity) {
			initFlickity()
		}

	}, [])

	// on state change update the prev selected REF
	useLayoutEffect(() => {
		prevSelectedIndex.current = state.selectedIndex
	}, [state.selectedIndex])

	function initFlickity () {
		const options = {
			cellSelector: '.item',
			cellAlign: 'left',
			dragThreshold: 1,
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
			flkty.current.on('scroll', onSettle)
			// @ts-ignore
			flkty.current.on('staticClick', staticClick)

			if (flkty.current) {
				flkty.current.resize()
				setState({
					loaded: true
				})
			}
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

		// Used in the subNav
		if (updateState) {
			setState({
				selectedIndex: index
			})
		}
	}

	// subNav Settle function called with the 2nd nav
	function onSubSettle (index: number) {
		if (!flkty.current) {
			return
		}
		if (flkty.current.selectedIndex !== index) {
			slideTo(index, false)
		}
	}

	{/*<FlickityWrapper initialPose='exit' pose='enter'>*/}
	// position: absolute;
	// top: 0;
	// bottom: 0;
	// left: 0;
	// width: 100%;
	// height: 100%;
	// border: 0;

	return (
		<FlickityWrapper pose={state.loaded ? 'show' : 'hide'}>
			<div ref={wrapper} className={`carousel`}>

				{items.map((item: IGalleryItem, index: number) => {
						if (item.video) {
							return (
								<div key={'index'} style={itemStyle} className='item carousel-cell'>
									<YoutubeIcon className={'youtubeIcon'}>
										{renderSvg(svgs.Youtube)}
									</YoutubeIcon>
									<Img
										loading={'eager'}
										fadeIn={false}
										fluid={item.localFile.childImageSharp.fluid}
										alt={item.alt}/>
								</div>
							)
						}
						return (
							<div key={index} style={itemStyle} className='item carousel-cell'>
								<FullScreenIcon>
									{renderSvg(svgs.MagnifyGlass)}
								</FullScreenIcon>
								<EnlargeIcon>
									{renderSvg(svgs.Enlarge)}
								</EnlargeIcon>
								<Img
									loading={'eager'}
									fadeIn={false}
									fluid={item.localFile.childImageSharp.fluid}
									alt={item.alt}/>
							</div>
						)
					}
				)}
			</div>
			<div>
				{subSelector &&
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
const EnlargeIcon = styled.div`
	position: absolute;
	top:10px;
	right: 10px;
	display: flex;
	align-items: center;
	z-index: 5;
	max-width: 46px;
	border-radius: 8px;
	width: 100%;
	background: #e2eaf28a;
	padding: 8px;
	path{
		fill: #111;
	}
	@media ${device.laptop} {
		display: none;
		z-index: 1;
	}
			
`
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
const YoutubeIcon = styled(FullScreenIcon)`
	svg{
		max-width: 136px;
		padding: 20px;
	}
`
const ContainerPose = posed.div({
	hide: {
		opacity: 0,
		transition: {
			default: { duration: 150, ease: 'easeOut' }
		}
	},
	show: {
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
	opacity: 0;
	
	@media ${device.tablet} {
			overflow: hidden;
	}
	
	.flickity-slider{
		height: 100%;
	}
`
export default React.memo(FlickityGalleryContext)
