import BrushesImg from '@components/images/brushesImage'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { SentinelFamily } from '@styles/global/fonts'
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
				<FilterBackground>
					<span>PRODUCTS</span>
					<ImgWrapper>
						<BrushesImg/>
					</ImgWrapper>
				</FilterBackground>
				<ProductsListLayout filter={selectedFilter}/>
			</ProductListContainer>
		</StickyContainer>
	)
}

const FilterBackground = styled.div`
	display: none;
	span{
		position: absolute;
		font-size: 220px;
		color:${colors.grey.i400};
		transform: rotate(-90deg);
		top: 460px;
		right: -220px;
		${SentinelFamily};
		z-index: 0;
	}
	@media ${device.laptop} {
		display: block;
		background: white;
		grid-column: 1 / 6;
		grid-row: 1;
		z-index: 0;
		position: relative;
	}
`

const ImgWrapper = styled.div`
    position: absolute;
    top: 360px;
    right: 230px;
    z-index: 1;
    width: 100%;
    max-width: 440px;
    transform: rotate(30deg);
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