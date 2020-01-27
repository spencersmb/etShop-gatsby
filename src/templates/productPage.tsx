import ProductLayout from '@components/products/productLayout'
import SEO from '@components/seo'
import { IGatsbyConfig } from '@et/types/Gatsby'
import { IFontPreviewFile, IFontPreviewStyles, IProduct } from '@et/types/Products'
import { IMeta, IOGType } from '@et/types/SEO'
import { facebookDefaultMeta, jsonldImages, socialConfig, twitterDefaultMeta } from '@utils/socialUtils'
import { graphql } from 'gatsby'
import React, { Component } from 'react'

type Response = IGatsbyConfig & { wcProduct: IProduct }

interface IProductQuery {
	data: Response
}

// WRAP IN GRAPHQL to pass data to twitter from sitemetadata
export class ProductDetailPage extends Component<IProductQuery> {
	ogArticles: IOGType[] = []
	facebookAddons: IOGType[] = []
	twitterAddons: IMeta[] = []
	jsonld: any
	price: string

	constructor (props: IProductQuery) {
		super(props)
		const { data: { wcProduct, site: { siteMetadata }, featureImage } } = this.props
		this.ogArticles = wcProduct.tags.map(tag => tag.name).map(article => ({
			property: 'article:tag',
			content: `${article}`
		}))
		this.facebookAddons = [
			{
				property: `og:title`,
				content: wcProduct.seo.title
			},
			{
				property: `og:description`,
				content: wcProduct.seo.desc
			},
			{
				property: 'og:site_name',
				content: `Every-Tuesday Digital Product: ${wcProduct.seo.title}`
			},
			{
				property: `og:url`,
				content: `${siteMetadata.siteUrl}/products/${wcProduct.slug}`
			},
			{
				property: 'og:image',
				content: `${siteMetadata.siteUrl}${wcProduct.featuredImage.localFile.childImageSharp.thumbnail.src}`
			},
			{
				property: 'og:image:secure_url',
				content: `${siteMetadata.siteUrl}${wcProduct.featuredImage.localFile.childImageSharp.thumbnail.src}`
			},
			{
				property: 'og:image:alt',
				content: `${wcProduct.featuredImage.alt}`
			},
			{
				property: 'og:image:type',
				content: ' image/jpeg'
			},
			{
				property: 'og:image:width',
				content: '702'
			},
			{
				property: 'og:image:height',
				content: '468'
			},
			{
				property: `og:type`,
				content: `article`
			},
			{
				property: `og:price:amount`,
				content: wcProduct.price
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
			}
		]

		this.price = wcProduct.on_sale ? wcProduct.sale_price : wcProduct.price

		this.twitterAddons = [
			{
				name: `twitter:card`,
				content: `summary_large_image`
			},
			{
				name: `twitter:title`,
				content: `${wcProduct.seo.title}`
			},
			{
				name: `twitter:description`,
				content: `${wcProduct.seo.desc}`
			},
			{
				name: `twitter:image`,
				content: `${siteMetadata.siteUrl}${wcProduct.featuredImage
					? wcProduct.featuredImage.localFile.childImageSharp.fluid.src
					: socialConfig.twitter.defaultImage}`
			}
		]

		this.jsonld = {
			['@context']: 'http://schema.org/',
			[`@type`]: 'Product',
			['logo']: `${siteMetadata.siteUrl}/${featureImage.childImageSharp.fluid.src}`,
			['url']: `${process.env.GATSBY_FRONTEND_URL}/products/${wcProduct.slug}`,
			name: wcProduct.name,
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
				price: `${this.price}`,
				priceCurrency: 'USD',
				priceValidUntil: '2300-02-18T23:26:37+0000',
				itemCondition: 'https://schema.org/NewCondition',
				availability: 'http://schema.org/InStock',
				seller: {
					['@type']: 'Organization',
					name: 'Every Tuesday, LLC'
				}
			}

		}
	}

	checkProductFontStyles (product: IProduct) {

		let cssString = ''

		product.font_preview.styles.map((style: IFontPreviewStyles) => {
			const urls = style.font_files.reduce((a, b, idx) => {
				const css = `url(${b.localFile.publicURL}) format("${b.type}")`
				return idx === 0 ? css : a + ', ' + css

			}, '')

			cssString = cssString + `
				@font-face {
					font-family: "${style.font_family}";
					font-style: normal;
					font-weight: inherit;
					src: ${urls};
				}`
		})

		return cssString
	}

	render () {
		// TODO: get google verification token

		const { data: { wcProduct } } = this.props
		console.log('wcProduct', wcProduct)

		return (
			<>
				<SEO
					title={wcProduct.seo.title}
					description={wcProduct.seo.desc}
					keywords={wcProduct.tags.map(tag => tag.name)} // change to tags from WP backend
					meta={[
						...this.ogArticles,
						...facebookDefaultMeta(this.facebookAddons),
						...twitterDefaultMeta(this.twitterAddons)
					]}
				>
					<link rel='canonical' href={`${process.env.GATSBY_FRONTEND_URL}/products/${wcProduct.slug}`}/>

					{/*Load fonts for the font previewer*/}
					{wcProduct.font_preview.enabled && wcProduct.font_preview.styles &&
          <style>
						{this.checkProductFontStyles(wcProduct)}
          </style>
					}

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
        wcProduct(
            slug:{
                eq: $slug
            }
        ){
            name
            sub_header
            id
            tags{
                name
            }
            install_instructions
            intro_description
            font_preview{
                enabled
                styles{
                    font_family
                    type
                    font_files{
                        type
                        localFile{
                            relativePath
                            absolutePath
                            publicURL
                        }
                    }
                }
            }
            details{
                file_types
                dpi
                file_size
                programs
                reqs
            }
            description_footer{
                type
            }
            featuredImage{
                alt
                localFile{
                    childImageSharp {
                        fluid(maxWidth: 835) {
                            ...GatsbyImageSharpFluid
                        }
                        thumbnail: fluid(maxWidth: 702, maxHeight: 468) {
                            src
                        }
                    }
                }
            }
            images{
                alt
                localFile{
                    childImageSharp {
                        #						fluid(maxWidth: 1404, maxHeight: 936) {
                        fluid(maxWidth: 702, maxHeight: 470) {
                            ...GatsbyImageSharpFluid
                        }
                        thumbnail_blur: fluid(maxWidth: 45, maxHeight: 30) {
                            ...GatsbyImageSharpFluid
                        }
                        thumbnail_mobile: fluid(maxWidth: 305, maxHeight: 203) {
                            ...GatsbyImageSharpFluid
                        }
                        thumbnail: fluid(maxWidth: 702, maxHeight: 468) {
                            src
                        }
                        thumbnail_2x: fluid(maxWidth: 1404, maxHeight: 936) {
                            src
                        }
                        fullWidth: fluid(maxWidth: 1820) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            categories{
                name
            }
            product_licenses{
                item{
                    id
                    name
                    onSale
                    price
                    slug
                }
                type{
                    name
                    value
                }
            }
            features{
                description
                icon
                title
            }
            date_created_gmt
            date_modified_gmt
            price
            product_id
            regular_price
            related_products
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
