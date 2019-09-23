import { IGatsbyConfig } from '@et/types/Gatsby'
import { ISeo } from '@et/types/SEO'
import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO ({ description, lang = `en`, meta = [], keywords = [], title, children }: ISeo) {
	return (
		<StaticQuery
			query={detailsQuery}
			render={(data: IGatsbyConfig) => {
				const metaDescription =
					description || data.site.siteMetadata.description
				return (
					<Helmet
						htmlAttributes={{
							lang
						}}
						title={title}
						titleTemplate={`%s | ${data.site.siteMetadata.title}`}
						meta={[
							{
								name: 'google-site-verification',
								content: 'verification_token'
							},
							{
								name: 'googlebot',
								content: 'index,follow'
							},
							{
								name: 'robots',
								content: 'index,follow'
							},
							{
								name: 'theme-color',
								content: '#008f68'
							},
							{
								name: `description`,
								content: metaDescription
							},
							// FACEBOOK
							{
								property: `og:title`,
								content: title
							},
							{
								property: `og:description`,
								content: metaDescription
							},
							{
								property: `og:url`,
								content: `${data.site.siteMetadata.siteUrl}`
							},
							{
								property: 'og:site_name',
								content: `${data.site.siteMetadata.siteName}`
							},
							{
								property: 'og:locale',
								content: 'en_US'
							},
							// default image
							{
								property: 'og:image',
								content: 'https://example.com/image.jpg'
							},
							{
								property: 'og:image:secure_url',
								content: 'https://example.com/image.jpg'
							},
							{
								property: 'og:image:alt',
								content: 'Image alt default'
							},
							{
								property: 'og:image:type',
								content: ' image/jpeg'
							},
							{
								property: 'og:image:width',
								content: '900'
							},
							{
								property: 'og:image:height',
								content: '800'
							}
						]
							.concat(
								(keywords && keywords.length > 0)
									? {
										name: `keywords`,
										content: keywords.join(`, `)
									}
									: []
							)
							.concat((meta && meta.length > 0)
								? meta
								: [])}
					>

						{/*<link rel='dns-prefetch' href='//assets.pinterest.com'/>*/}
						{/*<link rel='dns-prefetch' href='//apis.google.com'/>*/}
						<link rel='preload'
									as='font'
									type='font/woff2'
									href={`/fonts/Sentinel-Black.woff2`}/>
						<style type='text/css'>{`
								@font-face {
									font-family: "Sentinel Black";
									font-style: normal;
									font-weight: 900;
									src: url(/fonts/Sentinel-Black.woff2) format("woff2");
									}
									@font-face {
									font-family: "Sentinel MediumItal";
									font-style: italic;
									font-weight: 500;
									src: url(/fonts/Sentinel-MediumItal.woff2) format("woff2")
									}
									@font-face {
									font-family: "Sentinel SemiboldItal";
									font-style: italic;
									font-weight: 500;
									src: url(/fonts/Sentinel-SemiboldItal.woff) format("woff"), url(/fonts/Sentinel-SemiboldItal.woff2) format("woff2")
									}
									@font-face {
									font-family: "Sentinel";
									font-style: normal;
									font-weight: 600;
									src: url(/fonts/Sentinel-Semibold.woff2) format("woff2")
									}
						`}</style>
						{children ? children : null}
					</Helmet>
				)
			}}
		/>
	)
}

export default SEO

const detailsQuery = graphql`
	query DefaultSEOQuery {
		site {
			siteMetadata {
				title
				description
				author
			}
		}
	}
`
