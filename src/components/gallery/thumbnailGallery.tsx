import { Image } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import Flickity from 'flickity'
import React, { Component } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

interface IProps {
	slideTo: (index: number, updateState?: boolean) => void
	selectedIndex: number
	onSettle: any
	items: Image[]
}

const itemStyle = {
	width: `100%`,
	background: '#8C8'
}

export default class SubSelector extends Component<IProps> {
	state = {
		selectedIndex: 0
	}
	flkty: Flickity | null = null
	scrollAt = 0
	dragStarted = false
	wrapper: Element | null = null

	componentDidMount () {
		const { items } = this.props
		this.scrollAt = 1 / (items.length)
		setTimeout(this.initFlickity, 300)
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
			percentPosition: false
		}

		if (this.wrapper) {
			this.flkty = new Flickity(this.wrapper, options)
			this.flkty.on('dragStart', this.dragStart)
			this.flkty.on('dragEnd', this.dragEnd)
			this.flkty.on('staticClick', this.staticClick)
			this.flkty.on('settle', this.props.onSettle)
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

	render () {
		const { items } = this.props

		return (
			<GallerySubNav initialPose='exit' pose='enter'>
				<div ref={c => this.wrapper = c}>
					{items.map((item: Image, index: number) =>
						<div key={index} style={itemStyle} className='carousel-cell-nav'>
							<img src={item.localFile.childImageSharp.thumbnail_mobile.src} alt={item.alt}/>
						</div>
					)}
				</div>
			</GallerySubNav>
		)
	}
}
const Overlay = styled.span<{ isSelected: boolean }>`
	background: ${colors.primary.text};
	transition: opacity .3s;
	opacity: ${props => props.isSelected ? 0 : .8};
	position: absolute;
	top: 0; 
	left: 0;
	width: 100%;
	height: 100%;
	
	&:hover{
		opacity: 0;
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
		delay: 300,
		transition: {
			default: { duration: 300, ease: 'easeOut' }
		}
	}
})

const GallerySubNav = styled(ContainerPose)`
	display: none;
	
	@media ${device.tablet} {
		display: block;	
		max-height: 136px;
	}
`
// const ThumbnailGallery = (props: IProps) => {
// 	const { items, selectedIndex } = props
// 	// const [selectedIndex, setSelectedIndex] = useSetState(0)
// 	const flkty = useRef<Flickity | null>(null)
// 	const wrapper = useRef<HTMLDivElement>(null)
// 	let scrollAt = null
//
// 	// useEffect(() => {
// 	// 	setTimeout(() => {
// 	// 		const elmnt = document.getElementById('my-div')
// 	// 		if (elmnt) {
// 	// 			elmnt.scrollIntoView()
// 	// 			console.log('go to footer')
// 	// 		}
// 	// 	}, 300)
// 	//
// 	// }, [])
//
// 	useEffect(() => {
// 		scrollAt = 1 / (items.length)
//
// 		setTimeout(initFlickity, 300)
//
// 		return function cleanUp () {
// 			console.log('cleanup flickity')
// 			if (flkty.current) {
// 				flkty.current.destroy()
// 			}
//
// 		}
// 	}, [])
// 	useEffect(() => {
// 		if (flkty.current) {
// 			flkty.current.selectCell(selectedIndex)
// 		}
// 	}, [selectedIndex])
//
// 	function initFlickity () {
// 		const options = {
// 			cellAlign: 'left',
// 			cellSelector: '.carousel-cell-nav',
// 			contain: false,
// 			initialIndex: 0,
// 			pageDots: false,
// 			prevNextButtons: false
// 		}
//
// 		if (wrapper.current) {
// 			flkty.current = new Flickity(wrapper.current, options)
// 			flkty.current.on('staticClick', staticClick)
// 		}
//
// 		// this.flkty.on('dragStart', this.dragStart);
// 		// this.flkty.on('dragEnd', this.dragEnd);
// 		// this.flkty.on('scroll', this.onScroll);
// 		// this.flkty.on('settle', this.onSettle);
// 	}
//
// 	function staticClick (event: any, pointer: any, cellElement: any, cellIndex: any) {
// 		// this.allowClick = false;
// 		if (flkty.current) {
// 			props.slideTo(cellIndex, false)
// 			flkty.current.selectCell(cellIndex)
// 		}
// 	}
//
// 	console.log(' sub nav state', selectedIndex)
//
// 	return (
// 		<div ref={wrapper}>
// 			<div key={items[0].id} className='carousel-cell-nav'>
// 				<img style={itemStyle} src={items[0].localFile.childImageSharp.fullWidth.src} alt=''/>
// 			</div>
// 			<div key={items[0].id} className='carousel-cell-nav'>
// 				<img style={itemStyle} src={items[0].localFile.childImageSharp.fullWidth.src} alt=''/>
// 			</div>
// 			<div key={items[0].id} className='carousel-cell-nav'>
// 				<img style={itemStyle} src={items[0].localFile.childImageSharp.fullWidth.src} alt=''/>
// 			</div>
// 			<div key={items[0].id} className='carousel-cell-nav'>
// 				<img style={itemStyle} src={items[0].localFile.childImageSharp.fullWidth.src} alt=''/>
// 			</div>
// 			<div key={items[0].id} className='carousel-cell-nav'>
// 				<img style={itemStyle} src={items[0].localFile.childImageSharp.fullWidth.src} alt=''/>
// 			</div>
// 		</div>
// 	)
// }
//
// export default ThumbnailGallery
