import { colors } from '@styles/global/colors'
import { SentinelFamily } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React, { LiHTMLAttributes, ReactHTML } from 'react'
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

	function elementClick (e: any) {
		e.preventDefault()
		handleClick(e.currentTarget.getAttribute('data-filtertype'))
	}

	return (
		<FilterContainer>
			<Filter>
				<FilterHeader>
					<h4>
						Filter
					</h4>
					<span>
						{renderSvg(svgs.Filter)}
					</span>
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
			</Filter>
		</FilterContainer>
	)
}

const FilterContainer = styled.div`
	grid-column: 2 / 5;
	grid-row: 1;
	z-index: 1;
	position: relative;
`
const Filter = styled.div`
	background: ${colors.purple.i600};
	border-radius: 15px;
	box-shadow: 0 30px 40px rgba(45, 45, 45, 0.26), 0px 10px 20px rgba(161,161,161,0.37);
	padding: 15px 0 0 0;
	display: flex;
	flex-direction: column;
	ul{
		margin:0;
		padding: 20px 0 10px;
		border-bottom: 2px solid ${colors.purple.i700};
		flex: 1px;
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
	margin: 20px 0 20px 20px;
	padding: 0;
	font-size: 15px;
	font-weight: 400;
	text-transform: uppercase;
	color: ${props => props.selectedFilter ? 'white' : colors.purple.i400};
	transition: color .3s;
	position: relative;
	
	&:first-child{
		padding-top: 0;
	}
	
	&:hover{
		color: white;
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
	margin-bottom: 4px;
`
const Svg = styled.span<IFilterListItem>`
	width: 20px;
	height: 20px;
	margin-right: 15px;
	svg{
		path{
			transition: .3s;
			fill: ${props => props.selectedFilter ? colors.teal.i500 : colors.purple.i400};
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
	h4{
		${SentinelFamily};
		font-weight: 600;
		font-style: italic;
		font-size: 20px;
		color: white;
		text-transform: uppercase;
	}
	span{
		width: 22px;
	}
`
const FilterViewAll = styled.div<IFilterListItem>`
	padding: 20px;
	text-transform: uppercase;
	color: ${props => props.selectedFilter ? 'white' : colors.purple.i400};
	cursor: pointer;
`
export default ProductFilter