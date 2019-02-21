import ProductsListLayout from '@components/products/productsListLayout'
import React from 'react'
import { Link } from 'gatsby'
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
const IndexPage = () => (
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
			<link rel='canonical' href='http://mysite.com/'/>
			<script type='application/ld+json'>{JSON.stringify(jsonld)}</script>
		</SEO>
		<h1>Hi people</h1>
		<ProductsListLayout/>
		<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
			<Image/>
		</div>
		<Link to='/page-2/'>Go to page 2</Link>
	</Layout>
)

export default IndexPage
