import { useSetState } from '@components/account/dashboard'
import ThumbnailGallery from '@components/gallery/thumbnailGallery'
import { Image } from '@et/types/Products'
import Flickity from 'flickity-fullscreen'
import React, { Component, Ref, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

export interface IFlickitytems {
	name: string
	key: string
}

interface IProps {
	items: Image[]
	subSelector?: boolean
}

const itemStyle = {
	width: '100%',
	// height: '160px',
	background: '#8C8',
	margin: 0
}

class Selector extends Component<IProps> {
	state = {
		selectedIndex: 0,
		subSelector: false
	}

	flkty: Flickity | null = null
	scrollAt = 1
	wrapper: Element | null = null
	prevScroll = false
	dragStarted = false

	componentDidMount () {
		const { subSelector, items } = this.props
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

	initFlickity = () => {
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
			// fullscreen: true
		}

		if (this.wrapper) {
			this.flkty = new Flickity(this.wrapper, options)
			this.flkty.on('dragStart', this.dragStart)
			this.flkty.on('dragEnd', this.dragEnd)
			this.flkty.on('settle', this.onSettle)
			this.flkty.on('scroll', this.onChange)
		}

	}

	onChange = () => {
		if (!this.flkty) {
			return
		}
		const selectedIndex = this.flkty.selectedIndex
		console.log('selectedIndex', selectedIndex)
		console.log('this.state.selectedIndex', this.state.selectedIndex)

		if (this.state.selectedIndex !== selectedIndex) {

			this.setState({
				selectedIndex
			})
			console.log('change too', this.state)
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
			console.log('Settle change too', this.state)
		}
	}

	onScroll = (scroll: any, sub = false) => {

		const currentState = this.state.selectedIndex
		if (!this.dragStarted) {
			return
		}

		const initialDragStart = this.state.selectedIndex

		let direction = ''

		if (this.prevScroll) {
			direction = (scroll < this.prevScroll) ? 'right' : 'left'
		}

		console.log('direction', direction)
		console.log('this.state.selectedIndex', this.state.selectedIndex)

		const boundaries = {
			left: this.scrollAt * (this.state.selectedIndex),
			right: (this.scrollAt * (this.state.selectedIndex + 1)) - (this.scrollAt / 2)
		}

		// When you move the slider to the left
		if (scroll > boundaries.right && direction === 'left') {
			console.log('left')
			const next = this.state.selectedIndex += 1

			if ((next - initialDragStart) > 1) {
				console.log('moved twice')

			}
			this.setState({
				selectedIndex: next
			})
			//
			// if (sub) {
			//
			// 	this.slideTo(next, false)
			// }
		}

		// When you move the slider to the right
		if (scroll < boundaries.left && direction === 'right' && this.state.selectedIndex !== 0) {

			const prev = this.state.selectedIndex -= 1
			this.setState({
				selectedIndex: prev
			})
			console.log('right')
			//
			// if (sub) {
			// 	this.slideTo(prev, false)
			// }
		}

		this.prevScroll = scroll
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
			<>
				<div ref={c => this.wrapper = c} className={`carousel`}>
					{items.map((item: Image, index: number) =>
						<div key={index} style={itemStyle} className='item carousel-cell'>
							<img src={item.localFile.childImageSharp.fullWidth.src} alt=''/>
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
			</>
		)
	}
}

const GalleryContainer = styled.div`
	max-width: 700px;
	margin: 0 auto;
	overflow: hidden;
`
const FlicktyGallery = (props: IProps) => {

	const { subSelector, items } = props
	const [state, setState] = useSetState({
		selectedIndex: 0,
		subSelector: false
	})
	const { selectedIndex } = state
	const [subSelectorState, setSubSelectorState] = useState(false)
	const flktyNav = useRef<Flickity | null>(null)
	const wrapper = useRef<HTMLDivElement>(null)
	const indexRef = useRef<number>(0)
	let dragStarted = false

	useEffect(() => {
		if (subSelector) {
			setSubSelectorState(true)
		}

		setTimeout(initFlickity, 0)
		setTimeout(() => {
			if (flktyNav.current) {
				flktyNav.current.resize()
			}
		}, 300)

		return function cleanUp () {
			console.log('cleanup flickity')
			if (flktyNav.current) {
				flktyNav.current.destroy()
			}

		}
	}, [])

	useEffect(() => {
		console.log('effect')
		console.log('state', state)

	})

	function initFlickity () {
		const options = {
			cellSelector: '.item',
			cellAlign: 'left',
			contain: false,
			initialIndex: 0,
			accessibility: false,
			pageDots: false,
			setGallerySize: true,
			prevNextButtons: true,
			percentPosition: false,
			fullscreen: true
		}

		if (wrapper.current) {
			console.log('new Flickity')

			flktyNav.current = new Flickity(wrapper.current, options)
			flktyNav.current.on('dragStart', dragStart)
			flktyNav.current.on('dragEnd', dragEnd)
			flktyNav.current.on('scroll', onChange)
			flktyNav.current.on('settle', onSettle)
		}

	}

	function onChange () {
		if (!flktyNav.current) {
			return
		}
		const currentIndex = flktyNav.current.selectedIndex
		console.log('selected', currentIndex)
		console.log('indexRef', indexRef.current)

		if (indexRef.current !== currentIndex) {
			console.log('change')
			//
			setState({
				selectedIndex: currentIndex
			})
			// indexRef.current = currentIndex
		}

		// if (currentIndex === 0) {
		// 	setState({
		// 		selectedIndex: currentIndex
		// 	})
		// }
	}

	function scrollTo (index: number, updateState = true) {
		if (!flktyNav.current) {
			return
		}

		flktyNav.current.selectCell(index)

		if (updateState) {
			setState({ selectedIndex: index })
		}
		console.log('scrollTo', index)

	}

	function dragStart (e: any) {
		dragStarted = true

	}

	function dragEnd (e: any) {
		dragStarted = false
	}

	async function onSettle () {
		if (!flktyNav.current) {
			return
		}
		const currentIndex = flktyNav.current.selectedIndex

		console.log('settleIndex', selectedIndex)

		if (selectedIndex !== currentIndex) {
			setState({ selectedIndex: currentIndex })
		}
		// if (currentIndex === 0) {
		// 	setState({ selectedIndex: currentIndex })
		// }

	}

	function onSubSettle (index: number) {
		if (flktyNav.current && flktyNav.current.selectedIndex !== index) {
			scrollTo(index, false)
		}
	}

	console.log('Gallery state', state)
	return (
		<>
			<div ref={wrapper} className={`carousel`}>
				{/*{items.map(item =>*/}
				{/*	<div key={item.id} style={itemStyle} className='item carousel-cell'>*/}
				{/*		<img src={item.localFile.childImageSharp.fullWidth.src} alt=''/>*/}
				{/*	</div>*/}
				{/*)}*/}
				<div key={items[0].id} style={itemStyle} className='item carousel-cell'>
					<img src={items[0].localFile.childImageSharp.fullWidth.src} alt=''/>
				</div>
				<div key={items[0].id} style={itemStyle} className='item carousel-cell'>
					<img src={items[0].localFile.childImageSharp.fullWidth.src} alt=''/>
				</div>
				<div key={items[0].id} style={itemStyle} className='item carousel-cell'>
					<img src={items[0].localFile.childImageSharp.fullWidth.src} alt=''/>
				</div>
				<div key={items[0].id} style={itemStyle} className='item carousel-cell'>
					<img src={items[0].localFile.childImageSharp.fullWidth.src} alt=''/>
				</div>
				<div key={items[0].id} style={itemStyle} className='item carousel-cell'>
					<img src={items[0].localFile.childImageSharp.fullWidth.src} alt=''/>
				</div>

			</div>
			<div>
				{subSelectorState &&
        <ThumbnailGallery
          onSettle={onSubSettle}
          slideTo={scrollTo}
          selectedIndex={selectedIndex}
          items={items}
        />
				}
			</div>
		</>
	)
}

export default Selector
