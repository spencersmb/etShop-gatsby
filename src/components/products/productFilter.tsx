import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import { getWindowSize } from '@utils/windowUtils'
import React, { Ref, useEffect, useRef, useState } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

interface IProps {
	handleClick: (filter: string) => void
	filter: string
}

interface IFilterItem {
	slug: string,
	name: string,
	icon: string
}

const filterItems: IFilterItem[] = [
	{
		slug: 'fonts',
		name: 'Fonts',
		icon: 'Fonts'
	},
	{
		slug: 'textures',
		name: 'Textures',
		icon: 'Textures'
	},
	{
		slug: 'templates',
		name: 'Templates',
		icon: 'Templates'
	}
]

function getNavSize (windowSize: string) {

	if (windowSize === 'desktop') {
		return 87
	} else {
		return 75 - 65
	}
}

const useScrollEvent = () => {
	const [fixed, setFixed] = useState(false)
	const [mq, setMq] = useState('')
	const prevFixed = useRef(fixed)
	const prevMQ = useRef(mq)

	useEffect(() => {
		prevFixed.current = fixed
	}, [fixed])

	useEffect(() => {
		prevMQ.current = mq
	}, [mq])

	useEffect(() => {
		const header = document.getElementById('header')
		const cartCheck = document.getElementById('cart-Container')
		let carthasChildren = cartCheck ? cartCheck.children.length > 0 : false
		let headerHeight = 0
		let windowDevice = getWindowSize()
		let size = windowDevice === 'desktop' ? headerHeight + getNavSize(windowDevice) : headerHeight - getNavSize(windowDevice)

		const reqAnim = () => {
			requestAnimationFrame(watchNav)
		}
		const watchNav = () => {
			const fromTop = window.scrollY
			windowDevice = getWindowSize()
			// console.log('windowDevice', windowDevice)
			// console.log('prevMQ.current', prevMQ.current)

			if (prevMQ.current !== windowDevice) {
				carthasChildren = cartCheck ? cartCheck.children.length > 0 : false
				headerHeight = header ? header.getBoundingClientRect().height : 0
				size = windowDevice === 'desktop' ? headerHeight + getNavSize(windowDevice) : headerHeight - getNavSize(windowDevice)
				setMq(windowDevice)
				// console.log('change', windowDevice)
			}

			if (fromTop >= size && !prevFixed.current) {
				// console.log('sticky')
				setFixed(true)

			} else if (fromTop < size && prevFixed.current && carthasChildren) {
				// link.classList.remove("current");
				setFixed(true)
				// console.log('Sticky cart')
			} else if (fromTop < size && prevFixed.current) {
				// link.classList.remove("current");
				setFixed(false)
				// console.log('unStick')
			}
		}

		window.addEventListener('scroll', reqAnim)

		return () => {
			window.removeEventListener('scroll', reqAnim)
		}
	}, [])

	return [fixed]
}

/*
 * Filter Feature - HOW IT WORKS
 * This sticky nav uses a custom useEffect hook to add a window listener on the scroll event to and returns a boolean on if the
 * Nav should be sticky or not based on the headers height. Should be updated to just detect where the nav is on the page. Works for now though.
 *
 * The Element Clicked function checks if the nav is sticky to determine where to scroll back up to after someone clicks a filter.
 * Essentially we want the user to be rescrolled to the top of the newly filtered content so that nothing is cut off when a filter is clicked.
 *
 * Inside it we check the device width to account for the mobile sticky nav height if on tablet or phone.
 * Additionally if the nav is open we close it to show the content after a filter is clicked.
 *
 *
 */
function ProductFilter (props: IProps) {
	const { handleClick } = props
	const [isOpen, setIsOpen] = useState(false)
	const [fixed] = useScrollEvent()
	const filterContainerRef = useRef(null)
	const headerRef: any = useRef<HTMLElement>(null)

	useEffect(() => {
		headerRef.current = document.getElementById('header')
	}, [])

	function elementClick (e: any) {
		e.preventDefault()
		if (fixed && filterContainerRef.current) {
			const y = headerRef.current ? headerRef.current.getBoundingClientRect().height : 0
			const deviceWidth = getWindowSize()
			// nav height used because its added onto a 2nd sticky nav when in mobile else use 0 because there isnt anything else above
			const filterNavHeight = deviceWidth === 'desktop' ? 0 : 74
			const navHeight = deviceWidth === 'desktop' ? 87 : 75
			// console.log('y', y)
			// console.log('window.scrollY', window.scrollY)

			window.scrollTo(0, (y + navHeight) - filterNavHeight)
		}
		if (isOpen) {
			setIsOpen(false)
		}
		handleClick(e.currentTarget.getAttribute('data-filtertype'))
	}

	function handleToggle () {
		setIsOpen(!isOpen)
	}

	return (
		<FilterContainer ref={filterContainerRef} id={'filterContainer'}>
			<Filter fixed={fixed}>
				<FilterInner>
					<FilterHeader onClick={handleToggle}>
					<span>
						{renderSvg(svgs.Filter)}
					</span>
						<h4>
							Filter
						</h4>
					</FilterHeader>
					<FilterList pose={isOpen ? 'open' : 'closed'}>
						{filterItems.map((item: IFilterItem) => (
							<FilterListItem
								key={item.slug}
								selectedFilter={props.filter === item.slug}
								data-testid='filterItems'
								onClick={elementClick}
								data-filtertype={item.slug}
							>
								<FilterContent>
									<Svg selectedFilter={props.filter === item.slug}>
										{renderSvg(svgs[item.icon])}
									</Svg>
									{item.name}
								</FilterContent>
								<Slider className='slider' selectedFilter={props.filter === item.slug}/>
							</FilterListItem>
						))}
						<FilterListItem
							key={'view-all'}
							selectedFilter={props.filter === ''}
							data-testid='filterItems'
							onClick={elementClick}
							data-filtertype={''}
						>
							<FilterContent>
								View all
							</FilterContent>
							<Slider className='slider' selectedFilter={props.filter === ''}/>
						</FilterListItem>
					</FilterList>
					<FilterViewAll
						data-testid='filterItems'
						onClick={elementClick}
						selectedFilter={props.filter === ''}
						data-filtertype=''>
						<FilterContent>
							View all
						</FilterContent>
						<Slider className='slider' selectedFilter={props.filter === ''}/>
					</FilterViewAll>
				</FilterInner>
			</Filter>
		</FilterContainer>
	)
}

const ListPosed = posed.ul({
	closed: {
		height: '0px',
		transition: {
			default: {
				ease: 'easeOut'
			}
		}
	},
	open: {
		height: 'auto',
		transition: {
			default: {
				ease: 'backInOut'
			}
		}
	}
})
const FilterList = styled(ListPosed)`
	background-color: ${colors.grey.i400};
	margin:0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
	@media ${device.laptop} {
		flex-direction: row;
		height: auto !important;
	}
`
const FilterContainer = styled.div`
	grid-column:1 / -1;
	grid-row: 1;
	z-index: 2;
	position:relative;
	height: 74px;
	//overflow: hidden;
`
const Filter = styled.div<{ fixed: boolean }>`
	position: ${props => props.fixed ? 'fixed' : ''};
	width: 100%;
	top: 75px;
	background: ${colors.grey.i400};
	z-index: 2;
	
	@media ${device.laptop} {
		top: 0;
	}
`
const FilterInner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	width: 100%;

	@media ${device.laptop} {
		flex-direction: row;
		justify-content: space-between;
	}
		
`

interface IFilterListItem {
	selectedFilter: boolean
}

const FilterListItem = styled.li<IFilterListItem>`
	list-style: none;
	display: flex;
	flex-direction: column;
	cursor: pointer;
	padding: 20px 20px 20px;
	margin: 0;
	font-size: 15px;
	font-weight: 500;
	text-transform: uppercase;
	color: ${props => props.selectedFilter ? `#fff` : colors.primary.headline};
	transition: color .3s;
	position: relative;
	background: ${props => props.selectedFilter ? colors.teal.i500 : 'transparent'};
	
	@media ${device.laptop} {
		color: ${props => props.selectedFilter ? colors.teal.i500 : colors.primary.headline};
		background: transparent;
		&:hover{
			color: ${colors.teal.i500};
			border-color: ${colors.teal.i500};
			
			svg{
				path{
					fill: ${colors.teal.i500};
				}
			}
			
			.slider{
				background: ${colors.teal.i500};
				width: 100%;
			}
		}			
		&:last-child{
			display: none;
		}
	}
		
`
const FilterContent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`
const Svg = styled.span<IFilterListItem>`
	width: 20px;
	height: 20px;
	margin-right: 5px;
	svg{
		path{
			transition: .3s;
			fill: ${props => props.selectedFilter ? `#fff` : colors.primary.headline};
		}
	}
	@media ${device.laptop} {
		svg{
			path{
				transition: .3s;
				fill: ${props => props.selectedFilter ? colors.teal.i500 : colors.primary.headline};
			}
		}
	}
		
`
const Slider = styled.span<IFilterListItem>`
	height: 2px;
	width: ${props => props.selectedFilter ? '100%' : '0%'};
	display: block;
	background: ${colors.teal.i500};
	transition: color .3s, width .4s;
	position: absolute;
	bottom: 0;
	left: 0;
`
const FilterHeader = styled.div`
	padding: 0 20px 0 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 13px 0 10px;
	h4{
		${Sentinel.reg};
		font-weight: 600;
		font-style: italic;
		font-size: 20px;
		color: ${colors.primary.headline};
		text-transform: uppercase;
		margin-bottom: 0;
	}
	span{
		width: 22px;
		margin-right: 15px;
		display: flex;
		align-items: center;
	}
	svg{
		width: 100%;
	}
	path{
		fill: ${colors.primary.headline};
	}
	
	@media ${device.laptop} {
		margin: 0;    
	}
		
`
const FilterViewAll = styled(FilterListItem)<IFilterListItem>`
	// padding: 20px;
	// text-transform: uppercase;
	// font-weight: 500;
	// color: ${props => props.selectedFilter ? colors.teal.i500 : colors.primary.headline};
	// cursor: pointer;
	display: none;
	
	
	@media ${device.laptop} {
		display: flex;
		&:last-child{
		display: flex;
		}	    
	}
		
`
export default ProductFilter
