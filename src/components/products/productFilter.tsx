import React from 'react'

interface IProps {
	handleClick: (filter: string) => void
}

interface IFilterItem {
	slug: string,
	name: string
}

const filterItems: IFilterItem[] = [
	{
		slug: 'textures',
		name: 'Textures'
	},
	{
		slug: 'fonts',
		name: 'Fonts'
	}
]

function ProductFilter (props: IProps) {
	const { handleClick } = props

	function elementClick (e: any) {
		// console.log('target', e.target.getAttribute('data-filtertype'))
		handleClick(e.target.getAttribute('data-filtertype'))
	}

	return (
		<div>
			Filter items
			<ul>
				{filterItems.map((item: IFilterItem) => (
					<li
						key={item.slug}
						data-testid='filterItems'
						onClick={elementClick}
						data-filtertype={item.slug}>
						{item.name}
					</li>
				))}
				<li data-testid='filterItems' onClick={elementClick} data-filtertype=''>
					View all
				</li>
			</ul>
		</div>
	)
}

export default ProductFilter