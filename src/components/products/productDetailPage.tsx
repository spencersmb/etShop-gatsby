import ProductLayout from '@components/products/productLayout'
import SEO from '@components/seo'
import { IGatsbyConfig } from '@et/types/Gatsby'
import { IProduct } from '@et/types/Products'
import { IMeta, IOGType } from '@et/types/SEO'
import { jsonldImages, socialUtils, twitterDefaultMeta } from '@utils/genUtils'
import { graphql } from 'gatsby'
import React, { Component } from 'react'

type Response = IGatsbyConfig & { wcProduct: IProduct }

interface IProductQuery {
	data: Response
}

// WRAP IN GRAPHQL to pass data to twitter from sitemetadata
export class ProductDetailPage extends Component<IProductQuery> {
	ogArticles: IOGType[] = []
	twitterAddons: IMeta[] = []
	jsonld: any
	price: string

	constructor (props: IProductQuery) {
		super(props)
		const { data: { wcProduct, site: { siteMetadata } } } = this.props
		this.ogArticles = wcProduct.tags.map(tag => tag.name).map(article => ({
			property: 'article:tag',
			content: `${article}`
		}))

		this.price = wcProduct.on_sale ? wcProduct.sale_price : wcProduct.price

		this.twitterAddons = [
			{
				name: `twitter:card`,
				content: `summary_large_image`
			},
			{
				name: `twitter:title`,
				content: `${wcProduct.name}`
			},
			{
				name: `twitter:description`,
				content: `${wcProduct.seo.desc}`
			},
			{
				name: `twitter:image`,
				content: `${wcProduct.images.length > 0 ? wcProduct.images[0].thumbnail.url : socialUtils.twitter.defaultImage}`
			}
		]

		this.jsonld = {
			['@context']: 'http://schema.org/',
			[`@type`]: 'Product',
			image: [
				...jsonldImages(wcProduct.images)
			],
			description: `${wcProduct.seo.desc}`,
			sku: `${wcProduct.product_id}`,
			brand: {
				'@type': 'Thing',
				'name': 'Every-Tuesday'
			},
			offers: {
				['@type']: 'Offer',
				priceCurrency: 'USD',
				priceValidUntil: '2300-02-18T23:26:37+0000',
				itemCondition: 'https://schema.org/NewCondition',
				availability: 'http://schema.org/InStock',
				seller: {
					['@type']: 'Organization',
					name: 'Every-Tuesday'
				},
				price: `${this.price}`
			},
			name: wcProduct.name
		}
	}

	render () {
		// TODO: add featured image to meta - currently the thumbnail
		// TODO: get google verification token

		const { data: { wcProduct, site: { siteMetadata } } } = this.props

		return (
			<>
				<SEO
					title='page title for product 1'
					description={`description for product1`}
					meta={[
						{
							property: `og:type`,
							content: `article`
						},
						{
							property: `og:price:amount`,
							content: this.price
						},
						{
							property: `og:price:currency`,
							content: `USD`
						},
						{
							property: `og:price:availability`,
							content: `instock`
						},
						{
							property: `og:updated_time`,
							content: `${wcProduct.date_modified_gmt}`
						},
						{
							property: `article:publisher`,
							content: `${siteMetadata.siteUrl}`
						},
						{
							property: `article:publishedTime`,
							content: `${wcProduct.date_created_gmt}`
						},
						{
							property: `article:modifiedTime`,
							content: `${wcProduct.date_modified_gmt}`
						},
						{
							property: `article:authors`,
							content: `${siteMetadata.authorUrl}`
						},
						...this.ogArticles,
						// Twitter
						...twitterDefaultMeta(this.twitterAddons)
					]}
				>

					<link rel='canonical' href={`${process.env.GATSBY_DB}/products/${wcProduct.slug}`}/>
					<script type='application/ld+json'>{JSON.stringify(this.jsonld)}</script>
				</SEO>
				<ProductLayout product={wcProduct}/>
			</>
		)
	}
}

export default ProductDetailPage

export const productQuery = graphql`
	query SingleProductQuery($slug: String!){
		site {
			siteMetadata {
				title
			}
		}
		wcProduct(
			slug:{
				eq: $slug
			}
		){
			name
			sub_header
			id
			images{
				thumbnail{
					url
				}
			}
			categories{
				name
			}
			license{
				type
				hasExtendedLicense
				standardItem{
					slug
					bullets{
						bullet_point
					}
				}
				extendedItem{
					slug
					bullets{
						bullet_point
					}
				}
			}
			date_created_gmt
			date_modified_gmt
			price
			product_id
			regular_price
			pwyw
			sale_price
			seo{
				desc
				title
			}
			slug
			tags{
				name
				slug
			}

			type
		}
	}
`