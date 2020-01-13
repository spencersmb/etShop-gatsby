import HeaderBlockOne from '@components/headers/headerBlockOne'
import Layout from '@components/layout'
import DesignHero from '@components/pageHeaders/designHero'
import ProductsDisplay from '@components/products/productsDisplay'
import SEO from '@components/seo'
import SupportCategory from '@components/support/supportCategory'
import SupportLink from '@components/support/supportLink'
import { IGatsbyConfig } from '@et/types/Gatsby'
import { Image, IProductFeaturedImage } from '@et/types/Products'
import { ICategory } from '@et/types/Support'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { facebookDefaultMeta, reArrangeItems, socialUtils, twitterDefaultMeta } from '@utils/genUtils'
import { graphql, Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface IData extends IGatsbyConfig {
	wpgraphql: {
		categories: {
			nodes: ICategory[]
		}
	}
}

interface IProps {
	data: IData
}

const SupportPage = (props: IProps) => {
	const { data: { wpgraphql: { categories: { nodes } }, site, featureImage } } = props
	console.log('props', props)
	const jsonld = {
		['@context']: 'http://schema.org',
		['@type']: 'Organization',
		['name']: 'Every Tuesday',
		['logo']: `${site.siteMetadata.siteUrl}/${featureImage.childImageSharp.fluid.src}`,
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
	const categories = reArrangeItems(nodes)
	return (
		<Layout whiteFooter={true}>
			<SEO
				title='Support'
				description={`${props.data.site.siteMetadata.description}`}
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
				<link rel='canonical' href={process.env.GATSBY_FRONTEND_URL}/>
				<script type='application/ld+json'>{JSON.stringify(jsonld)}</script>
			</SEO>
			<SupportPageContainer>
				<div className={'headerContainer'}>
					<HeaderBlockOne headline={'How can we help?'}/>
				</div>
				<SupportItemsContainer>
					{categories.map((cat: ICategory) => {
						return (
							<SupportCategory key={cat.slug} {...cat}/>
						)
					})}
				</SupportItemsContainer>

			</SupportPageContainer>
		</Layout>
	)
}
export const SupportPageContainer = styled(GridFluid)`
	padding: 0;
	background: #fff;
	flex: 1;
		
	.headerContainer{
		grid-column: 1 / -1;
		grid-row: 1;
		background: #E4D8FD;
	}
	
	@media ${device.tablet} {
		padding:0;
	}
`
const SupportItemsContainer = styled.div`
	padding: 20px 0;
	grid-column: 2 / 4;
	display: grid;
	
	@media ${device.tablet} {
	  grid-template-columns: repeat(12, 1fr);
		grid-column: 2 / 14;
		margin: 0 -15px 0;
		padding: 50px 0;
	}
	
`
export default SupportPage

export const query = graphql`
    query supportPageQuery {
        site {
            siteMetadata {
                title
                siteUrl
                description
                authorUrl
                frontEndUrl
            }
        }
        featureImage: file(relativePath: { eq: "color-palette.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1024) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        wpgraphql{
            categories{
                nodes{
                    name
                    slug
                    supportQuestions{
                        nodes{
                            title
                            slug
                            excerpt
                            acfSupportQuestions{
                                popularity
                            }
                        }
                    }
                }
            }
        }
    }
`
