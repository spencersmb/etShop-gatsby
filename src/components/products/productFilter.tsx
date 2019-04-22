import { colors } from '@styles/global/colors'
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
		icon: 'Fonts'
	},
	{
		slug: 'templates',
		name: 'Templates',
		icon: 'Fonts'
	}
]

function ProductFilter (props: IProps) {
	const { handleClick } = props

	function elementClick (e: any) {
		e.preventDefault()
		console.log('e.currentTarget', e.currentTarget)

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
								<Svg>
									{renderSvg(svgs[item.icon])}
								</Svg>
								{item.name}
							</FilterContent>
							<Slider className='slider'/>
						</FilterListItem>
					))}
					<li data-testid='filterItems' onClick={elementClick} data-filtertype=''>
						View all
					</li>
				</ul>
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
	${shadowStyles.shadow3};
	padding: 15px 0 20px 20px;
	ul{
		margin:0;
		padding: 20px 0 0;
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
	margin: 10px 0;
	padding-bottom: 2px;
	font-size: 15px;
	font-weight: 400;
	text-transform: uppercase;
	color: ${props => props.selectedFilter ? 'white' : colors.purple.i400};
	transition: color .3s;
	
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
`
const Svg = styled.span`
	width: 20px;
	height: 20px;
	margin-right: 15px;
	svg{
		path{
			transition: .3s;
			fill: ${colors.purple.i400};
		}
	}
`
const Slider = styled.span`
	height: 2px;
	width: 0;
	display: block;
	background: ${colors.purple.i600};
	transition: color .3s, width .4s ease-out;
	margin-top: 2px;
`
const FilterHeader = styled.div`
	padding: 0 20px 0 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	h4{
		font-family: Sentinel, serif;
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
export default ProductFilter