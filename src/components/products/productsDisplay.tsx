import { device } from '@styles/global/breakpoints'
import { GridFluid } from '@styles/global/cssGrid'
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
				<StickyWrapper>
					<Sticky
						topOffset={-30}
						bottomOffset={110}
						disableCompensation={true}
					>
						{({ style, isSticky }) => {
							return (
								<div
									style={{
										...style,
										marginTop: isSticky ? 115 : 0
									}}>
									<ProductFilter
										filter={selectedFilter}
										handleClick={handleFilterClick}/>
								</div>
							)
						}}
					</Sticky>
				</StickyWrapper>
				<FilterBackground/>
				<ProductsListLayout filter={selectedFilter}/>
			</ProductListContainer>
		</StickyContainer>
	)
}

const FilterBackground = styled.div`
	display: none;
	@media ${device.laptop} {
		display: block;
		background: white;
		grid-column: 1 / 6;
		grid-row: 1;
		z-index: 0;
		position: relative;
	}
`

const ProductListContainer = styled(GridFluid)`
	position: relative;
`

const StickyWrapper = styled.div`
	display: none;
	
	@media ${device.laptop} {
		display: block;
		position: relative;
		z-index: 1;
		grid-column: 2 / 5;
		grid-row: 1;
		padding-top: 85px;
	}
		
	
`
export default ProductsDisplay