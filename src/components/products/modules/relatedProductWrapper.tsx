import ProductListItem from '@components/products/productListItem'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const RelatedProduct = ({ slug, data }: { slug: string, data?: any }) => (
	<StaticQuery
		query={
			graphql`
				query {
					allWcProduct{
						edges{
							node{
								name
								id
								slug
								sub_header
								price
								featuredImage{
									alt
									localFile{
										childImageSharp {
											fluid(maxWidth: 835) {
												...GatsbyImageSharpFluid
											}
										}
									}
								}
							}
						}
					}
				}
			`
		}
		render={data => {
			const product = data.allWcProduct.edges.find(
				(edge: any) =>
					edge.node.slug === slug
			)
			if (!product) {
				return null
			}
			return <ProductListItem {...product.node}/>
		}}
	/>
)

export default RelatedProduct
