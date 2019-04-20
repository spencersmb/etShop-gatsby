import DesignHero from '@components/pageHeaders/designHero'
import ProductFilter from '@components/products/productFilter'
import ProductsListLayout from '@components/products/productsListLayout'
import { colors } from '@styles/global/colors'
import { useSetFilterState } from '@utils/stateUtils'
import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

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
		console.log('filter', filter)
		if (filter === '') {
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
				<ProductFilter handleClick={handleFilterClick}/>
				<ProductsListLayout filter={state.selectedFilter}/>
				<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
					<Image/>
				</div>
			</PageContainer>
		</Layout>
	)
}
const PageContainer = styled.div`
	background: ${colors.grey.i200};
`

export default IndexPage
