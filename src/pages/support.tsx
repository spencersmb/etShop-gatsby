import SupportCategory from '@components/support/supportCategory'
import SupportLink from '@components/support/supportLink'
import { IGatsbyConfig } from '@et/types/Gatsby'
import { Image, IProductFeaturedImage } from '@et/types/Products'
import { ICategory } from '@et/types/Support'
import { graphql, Link } from 'gatsby'
import React from 'react'

interface IProps {
	data: {
		featuredImage: Image
		site: IGatsbyConfig
		wpgraphql: {
			categories: {
				nodes: ICategory[]
			}
		}
	}
}

const SupportPage = (props: IProps) => {
	const { data: { wpgraphql: { categories: { nodes } } } } = props
	console.log('props', props)

	function reArrangeItems (items: any[]) {
		const initialValue: any = []
		return items.reduce((total: any, item: any) => {
			// first run through put getting started at top
			if (item.slug === 'getting-started') {
				total.unshift(item)
			} else if (item.slug === 'fonts') {
				total.splice(1, 0, item)
			} else if (item.slug === 'procreate') {
				total.splice(2, 0, item)
			} else if (item.slug === 'uncategorized') {
				return total
			} else {
				total.push(item)
			}
			return total

		}, initialValue)
	}

	const categories = reArrangeItems(nodes)
	return (
		<div>
			{categories.map((cat: ICategory) => {
				return (
					<SupportCategory key={cat.slug} {...cat}/>
				)
			})}
		</div>
	)
}
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
                        }
                    }
                }
            }
        }
    }
`
