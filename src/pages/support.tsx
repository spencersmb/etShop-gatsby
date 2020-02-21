import HeaderBlockOne from '@components/headers/headerBlockOne'
import Layout from '@components/layout'
import SEO from '@components/seo'
import SupportCategory from '@components/support/supportCategory'
import { IGatsbyConfig } from '@et/types/Gatsby'
import { ICategory } from '@et/types/Support'
import { device } from '@styles/global/breakpoints'
import { GridFluid } from '@styles/global/cssGrid'
import { reArrangeItems } from '@utils/genUtils'
import { createStandardJSONLD, facebookDefaultMeta, twitterDefaultMeta } from '@utils/socialUtils'
import { graphql } from 'gatsby'
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
				<script type='application/ld+json'>{JSON.stringify(createStandardJSONLD({
					siteUrl: site.siteMetadata.siteUrl,
					featureImgSrc: featureImage.childImageSharp.fluid.src
				}))}</script>
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
		padding: 50px 0 0;
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
                    count
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
