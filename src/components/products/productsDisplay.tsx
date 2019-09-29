import BrushesImg from '@components/images/brushesImage'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { Sentinel } from '@styles/global/fonts'
import React, { useState } from 'react'
import styled from 'styled-components'
import ProductFilter from '@components/products/productFilter'
import ProductsListLayout from '@components/products/productsListLayout'
import { StickyContainer, Sticky } from 'react-sticky'

function ProductsDisplay () {
	const [selectedFilter, setFilterState] = useState('')

	function handleFilterClick (filter: string) {
		setFilterState(filter)
	}

	return (
		<StickyContainer>
			<ProductListContainer>
				<ProductFilter
					filter={selectedFilter}
					handleClick={handleFilterClick}/>
				<ProductsListLayout filter={selectedFilter}/>
			</ProductListContainer>
		</StickyContainer>
	)
}

const ProductListContainer = styled(GridFluid)`
	position: relative;
	padding: 0;
	grid-row-gap: 0 !important;
	@media ${device.tablet} {
	padding: 0;
	    
	}
		
`

export default ProductsDisplay
