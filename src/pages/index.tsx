import DesignHero from '@components/pageHeaders/designHero'
import ProductFilter from '@components/products/productFilter'
import ProductsListLayout from '@components/products/productsListLayout'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { useSetFilterState } from '@utils/stateUtils'
import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import { StickyContainer, Sticky } from 'react-sticky'

const jsonld = {
	['@context']: 'https://schema.org',
	['@type']: 'WebSite',
	['@id']: 'https://every-tuesday.com/#website',
	url: 'https://every-tuesday.com/',
	name: 'Every-Tuesday',
	potentialAction: {
		['@type']: 'SearchAction',
		target: 'https://every-tuesday.com/?s={search_term_string}',
		['query-input']: 'required name=search_term_string'
	}
}

const IndexPage = () => {
	const [state, setFilterState] = useSetFilterState({
		selectedFilter: ''
	})

	function handleFilterClick (filter: string) {
		if (filter === state.selectedFilter) {
			return
		} else if (filter === '') {
			setFilterState({
				selectedFilter: ''
			})
		} else {
			setFilterState({
				selectedFilter: filter
			})
		}
	}

	return (
		<Layout>
			<SEO
				title='home'
				description={`description for home`}
				keywords={[`gatsby`, `application`, `react`]}
				meta={[
					{
						property: `og:type`,
						content: `website`
					}
				]}
			>
				<link rel='canonical' href={process.env.GATSBY_DB}/>
				<script type='application/ld+json'>{JSON.stringify(jsonld)}</script>
			</SEO>
			<PageContainer>
				<DesignHero/>
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
												filter={state.selectedFilter}
												handleClick={handleFilterClick}/>
										</div>
									)
								}}
							</Sticky>
						</StickyWrapper>
						<FilterBackground/>
						<ProductsListLayout filter={state.selectedFilter}/>
					</ProductListContainer>
				</StickyContainer>
			</PageContainer>
		</Layout>
	)
}
const PageContainer = styled.div`
	background: ${colors.grey.i200};
	padding-bottom: 30px;
	@media ${device.laptop} {
		padding-bottom: 70px;
	}

`
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

export default IndexPage
