import DesignHero from '@components/pageHeaders/designHero'
import ProductFilter from '@components/products/productFilter'
import ProductsDisplay from '@components/products/productsDisplay'
import ProductsListLayout from '@components/products/productsListLayout'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { facebookDefaultMeta, socialUtils, twitterDefaultMeta } from '@utils/genUtils'
import { useSetFilterState } from '@utils/stateUtils'
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import { StickyContainer, Sticky } from 'react-sticky'

const IndexPage = ({ data }: any) => {
	const { site, featureImage } = data

	const jsonld = {
		['@context']: 'http://schema.org',
		['@type']: 'Organization',
		['name']: 'Every Tuesday',
		['logo']: '[logo image url]',
		['url']: 'shop.every-tuesday.com',
		'sameAs': [
			`${socialUtils.twitter.url}`,
			`${socialUtils.facebook.url}`,
			`${socialUtils.youtube.url}`,
			`${socialUtils.instagram.url}`,
			`${socialUtils.pinterest.url}`
		]
	}
	const twitterAddons = [
		{
			name: `twitter:card`,
			content: `summary_large_image`
		},
		{
			name: `twitter:title`,
			content: `${site.siteMetadata.title}`
		},
		{
			name: `twitter:description`,
			content: `${site.siteMetadata.description}`
		},
		{
			name: `twitter:image`,
			content: `${site.siteMetadata.siteUrl}${featureImage.childImageSharp.fluid.src}`
		}
	]
	const facebookAddons = [
		{
			property: `og:title`,
			content: site.siteMetadata.title
		},
		{
			property: `og:description`,
			content: site.siteMetadata.description
		},
		{
			property: 'og:site_name',
			content: site.siteMetadata.title
		},
		{
			property: `og:url`,
			content: `${site.siteMetadata.siteUrl}`
		},
		{
			property: 'og:image',
			content: `${site.siteMetadata.siteUrl}${featureImage.childImageSharp.fluid.src}`
		},
		{
			property: 'og:image:secure_url',
			content: `${site.siteMetadata.siteUrl}${featureImage.childImageSharp.fluid.src}`
		},
		{
			property: 'og:image:alt',
			content: `${site.siteMetadata.title}`
		},
		{
			property: 'og:image:type',
			content: ' image/jpeg'
		},
		{
			property: 'og:image:width',
			content: '1024'
		},
		{
			property: 'og:image:height',
			content: '648'
		}
	]

	return (
		<Layout>
			<SEO
				title='Home'
				description={`${site.siteMetadata.description}`}
				keywords={[`gatsby`, `application`, `react`]}
				meta={[
					{
						property: `og:type`,
						content: `website`
					},
					...facebookDefaultMeta(facebookAddons),
					...twitterDefaultMeta(twitterAddons)
				]}
			>
				<link rel='canonical' href={process.env.GATSBY_DB}/>
				<script type='application/ld+json'>{JSON.stringify(jsonld)}</script>
			</SEO>
			<PageContainer>
				<DesignHero/>
				<ProductsDisplay/>
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

export default IndexPage

export const query = graphql`
	query HomePageQuery {
		site {
			siteMetadata {
				title
				siteUrl
				description
				authorUrl
			}
		}
		featureImage: file(relativePath: { eq: "color-palette.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1024) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`
