import { IModal, Merge } from '@et/types/Modal'
import { Image } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import Flickity from 'flickity'
import React, { Component } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

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

export default class GalleryModal extends Component<IProps> {

	state = {
		selectedIndex: this.props.options.data.selectedIndex
	}

	flkty: Flickity | null = null
	scrollAt = 1
	wrapper: Element | null = null
	dragStarted = false

	componentDidMount () {

		this.scrollAt = 1 / (this.props.options.data.items.length)

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
			cellSelector: '.item-fullscreen',
			cellAlign: 'center',
			contain: false,
			initialIndex: this.props.options.data.selectedIndex,
			accessibility: false,
			pageDots: true,
			setGallerySize: true,
			prevNextButtons: true,
			percentPosition: false,
			adaptiveHeight: true
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
		const { onSettle } = this.props.options.data
		const selectedIndex = this.flkty.selectedIndex

		if (this.state.selectedIndex !== selectedIndex) {
			onSettle(selectedIndex)
			this.setState({
				selectedIndex
			})
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

	dragStart = (e: any) => {
		this.dragStarted = true
	}

	dragEnd = (e: any) => {
		this.dragStarted = false
	}

	render () {
		console.log('this.props in Gallery Modal', this.props)

		return (
			<Main>
				<Container>
					<div ref={c => this.wrapper = c} className={'carousel-modal'}>
						{this.props.options.data.items.map((item: Image, index: number) =>
							<div key={index} style={itemStyle} className='item-fullscreen'>
								<img src={item.localFile.childImageSharp.fullWidth.src}
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
	width: 50px;
	height: 50px;
	padding: 7px;
	path{
		transition: .3s;
		fill: ${colors.primary.text};
	}
}
`
const Container = styled.div`
	//margin: 50px 0 0;
	height: 100%;
	overflow-y: scroll;
	width: 100%;
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
	overflow-x: hidden;
	z-index: 7;
	justify-content: center;
	align-items: center;
	//padding: 50px;
`
