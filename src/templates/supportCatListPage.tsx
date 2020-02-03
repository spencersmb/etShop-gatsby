import HeaderBlockOneBCrumb from '@components/headers/headerBlockOneBreadcrumb'
import Layout from '@components/layout'
import SEO from '@components/seo'
import SupportCategoryList from '@components/support/supportCategoryItems'
import { orderByPopularity } from '@utils/genUtils'
import { createStandardJSONLD, facebookDefaultMeta, socialConfig, twitterDefaultMeta } from '@utils/socialUtils'
import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { SupportPageContainer } from '../pages/support'

const SupportCategoryPage = (props: any) => {
	const { data: { wpgraphql: { categories } } } = props
	const { site, featureImage } = props.data
	const category = categories.nodes[0]
	// console.log('Category page props', props.data.wpgraphql.categories)

	return (
		<>
			<SEO
				title={`Support - ${categories.nodes[0].name}`}
				description={`${site.siteMetadata.description}`}
				keywords={[`gatsby`, `application`, `react`]}
				meta={[
					{
						property: `og:type`,
						content: `website`
					},
					...facebookDefaultMeta([
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
					]),
					...twitterDefaultMeta([
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
					])
				]}
			>
				<link rel='canonical' href={process.env.GATSBY_FRONTEND_URL}/>
				<script type='application/ld+json'>{JSON.stringify(createStandardJSONLD({
					siteUrl: site.siteMetadata.siteUrl,
					featureImgSrc: featureImage.childImageSharp.fluid.src
				}))}</script>
			</SEO>
			<Layout whiteFooter={true}>
				<SupportPageContainer>
					<BackgroundBar/>
					<HeaderBlockOneBCrumb headline={category.name}/>
					{category.supportQuestions &&
          <SupportCategoryList
            supportQuestions={category.supportQuestions.nodes.sort(orderByPopularity)}/>
					}
				</SupportPageContainer>
			</Layout>
		</>
	)
}

export default SupportCategoryPage
export const pageCatQuery = graphql`
    query GET_PAGES_BY_CAT($cat: [String]!) {
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
            categories(where: {name: $cat}) {
                nodes{
                    count
                    name
                    slug
                    supportQuestions {
                        nodes {
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
const BackgroundBar = styled.div`
	grid-column: 1 / -1;
	background: #E4D8FD;
	grid-row:1;
`
