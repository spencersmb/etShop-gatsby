import React from 'react'

interface IProps {
	handleClick: (filter: string) => void
}

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
				<li data-testid='filterItems' onClick={elementClick} data-filtertype='textures'>
					Textures
				</li>
				<li data-testid='filterItems' onClick={elementClick} data-filtertype='fonts'>
					Fonts
				</li>
				<li data-testid='filterItems' onClick={elementClick} data-filtertype=''>
					View all
				</li>
			</ul>
		</div>
	)
}

export default ProductFilter