import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React, { useEffect, useRef, useState } from 'react'
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

function ProductFilter (props: IProps) {
	const { handleClick } = props
	const [fixed, setFixed] = useState(false)
	const prevFixed = useRef(fixed)
	const filterContainerRef = useRef(null)

	function elementClick (e: any) {
		e.preventDefault()
		if (prevFixed.current && filterContainerRef.current) {
			// @ts-ignore
			filterContainerRef.current.scrollIntoView()
		}
		handleClick(e.currentTarget.getAttribute('data-filtertype'))
	}

	function getWindowSize () {
		const width = window.innerWidth
		if (width < 767) {
			return 'mobile'
		} else if (width <= 1024) {
			return 'tablet'
		} else {
			return 'desktop'
		}
	}

	function getNavSize (windowSize: string) {
		if (windowSize === 'desktop') {
			return 87
		} else {
			return 75 - 65
		}
	}

	const checkNav = (headerHeight: number) => () => {

		const fromTop = window.scrollY
		const windowDevice = getWindowSize()
		const size = windowDevice === 'desktop' ? headerHeight + getNavSize(windowDevice) : headerHeight - getNavSize(windowDevice)

		if (fromTop >= size && !prevFixed.current) {
			// console.log('sticky')
			setFixed(true)

		} else if (fromTop < size && prevFixed.current) {
			// link.classList.remove("current");
			setFixed(false)
			// console.log('unStick')
		}
	}

	useEffect(() => {

		const header = document.getElementById('header')
		const headerHeight = header ? header.getBoundingClientRect().height : 0

		window.addEventListener('scroll', checkNav(headerHeight))

		return () => {
			window.removeEventListener('scroll', checkNav(headerHeight))
		}
	}, [])

	useEffect(() => {
		prevFixed.current = fixed
	}, [fixed])

	return (
		<FilterContainer ref={filterContainerRef}>
			<Filter fixed={fixed}>
				<FilterInner>
					<FilterHeader>
					<span>
						{renderSvg(svgs.Filter)}
					</span>
						<h4>
							Filter
						</h4>
					</FilterHeader>
					<ul>
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
					</ul>
					<FilterViewAll
						data-testid='filterItems'
						onClick={elementClick}
						selectedFilter={props.filter === ''}
						data-filtertype=''>
						View all
					</FilterViewAll>
				</FilterInner>
			</Filter>
		</FilterContainer>
	)
}

const FilterContainer = styled.div`
	grid-column:1 / -1;
	grid-row: 1;
	z-index: 2;
	position:relative;
	height: 74px;
`
const Filter = styled.div<{ fixed: boolean }>`
	position: ${props => props.fixed ? 'fixed' : ''};
	width: 100%;
	top: 75px;
	background: ${colors.grey.i200};
	padding: 5px 0;
	z-index: 2;
	
	@media ${device.laptop} {
		top: 0;
	}
		
	
`
const FilterInner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	width: 100%;
	ul{
		margin:0;
		padding: 0;
		flex: 1px;
		display: flex;
		flex-direction: row;
		justify-content: center;
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
	margin: 20px 20px 20px;
	padding: 0;
	font-size: 15px;
	font-weight: 500;
	text-transform: uppercase;
	color: ${props => props.selectedFilter ? colors.teal.i500 : colors.primary.headline};
	transition: color .3s;
	position: relative;
	
	&:first-child{
		padding-top: 0;
	}
	
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
			fill: ${props => props.selectedFilter ? colors.teal.i500 : colors.primary.headline};
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
	}
	path{
		fill: ${colors.primary.headline};
	}
`
const FilterViewAll = styled.div<IFilterListItem>`
	padding: 20px;
	text-transform: uppercase;
	font-weight: 500;
	color: ${props => props.selectedFilter ? colors.teal.i500 : colors.primary.headline};
	cursor: pointer;
`
export default ProductFilter
