import HeaderBlockOneBCrumb from '@components/headers/headerBlockOneBreadcrumb'
import Layout from '@components/layout'
import SEO from '@components/seo'
import SupportCategoryList from '@components/support/supportCategoryItems'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { createStandardJSONLD, facebookDefaultMeta, socialConfig, twitterDefaultMeta } from '@utils/socialUtils'
import React from 'react'
import { graphql, Link, navigate } from 'gatsby'
import styled from 'styled-components'
import { SupportPageContainer } from '../pages/support'

const SupportCategoryPage = (props: any) => {
	const { data: { wpgraphql: { categories } }, pageContext } = props
	const { site, featureImage } = props.data
	const category = categories.nodes[0]
	const { pageNumber } = pageContext
	// show 10 per page - page Count also defined in ./gatsby/createCatsPages.js
	const totalPagesCount = Math.ceil(category.count / 10)
	const totalPages = new Array(totalPagesCount).fill(totalPagesCount)
	const nextPage = async () => {
		const nextPageNumber = pageContext.pageNumber + 1
		await navigate(`support/category/${category.slug}/page/${nextPageNumber}`)
	}
	const prevPage = async () => {
		const prevPageNumber = pageContext.pageNumber - 1
		await navigate(`support/category/${category.slug}/page/${prevPageNumber}`)
	}
	const onPageSelect = async (event: any) => {
		event.preventDefault()
		const currentPage = event.target.getAttribute('data-currentpage')
		if (currentPage === pageNumber.toString()) {
			return
		}
		await navigate(`support/category/${category.slug}/page/${currentPage}`)
	}

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
					{pageContext.questions &&
          <SupportCategoryList
            supportQuestions={pageContext.questions}/>
					}

					<PaginationContainer>
						{pageContext.hasPrevPage &&
            <PageBtn position={`left`} onClick={prevPage}>Prev</PageBtn>}
						{totalPagesCount > 1 && totalPages.map((page, index) => {
							const currentPage = index + 1
							return (
								<NumbersBtn
									isSelected={currentPage === pageNumber}
									data-currentpage={currentPage}
									onClick={onPageSelect}
									key={index}>{currentPage}</NumbersBtn>
							)
						})}
						{pageContext.hasNextPage &&
            <PageBtn position={`right`} onClick={nextPage}>Next</PageBtn>}
					</PaginationContainer>

				</SupportPageContainer>
			</Layout>
		</>
	)
}

export default SupportCategoryPage
export const pageCatQuery = graphql`
    query GET_PAGES_BY_CAT($cat: [String]!, $catId: ID!) {
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
                    id
                    name
                    slug
                }
            }
            category(id: $catId){
                name
                slug
                id
                count
            }

        }
    }
`
const NumbersBtn = styled.div<{ isSelected: boolean }>`
	padding: 0 10px;
	transition: .3s;
	${props => props.isSelected ? `
		color:${colors.teal.i500};
		font-weight: bold;
		&:hover{
			cursor: default;
		}
	` : `
		&:hover{
			cursor: pointer;
			color: ${colors.teal.i500};
		}
	`}
	
`
const PageBtn = styled.div<{ position?: string }>`
	transition: .3s;
	${props => {
	if (props.position === 'right') {
		return `margin-left: 15px;`
	}
	if (props.position === 'left') {
		return `margin-right: 15px;`
	}
}}
	&:hover{
		cursor: pointer;
		color: ${colors.teal.i500};
	}
`
const BackgroundBar = styled.div`
	grid-column: 1 / -1;
	background: #fae7e7;
	grid-row:1;
`
const PaginationContainer = styled.div`
	grid-column: 1 / -1;
	display: flex;
	flex-direction: row;
	margin: 0 0 40px;
	justify-content: center;
	align-items: center;
	color: ${colors.primary.headline};
	@media ${device.tablet} {
		grid-column: 4 / 12;
	}
		
`
