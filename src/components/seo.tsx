import { IGatsbyConfig } from '@et/types/Gatsby'
import { ISeo } from '@et/types/SEO'
import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO ({ lang = `en`, meta = [], keywords = [], title, children }: ISeo) {
	return (
		<StaticQuery
			query={detailsQuery}
			render={(data: IGatsbyConfig) => {
				return (
					<Helmet
						htmlAttributes={{
							lang
						}}
						title={title}
						titleTemplate={`%s | ${data.site.siteMetadata.title}`}
						meta={[
							{
								name: 'viewport',
								content: 'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no'
							},
							{
								name: 'description',
								content: `${data.site.siteMetadata.description}`
							},
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
								property: 'og:locale',
								content: 'en_US'
							}

						]
							.concat(
								keywords.length > 0
									? {
										name: `keywords`,
										content: keywords.join(`, `)
									}
									: []
							)
							.concat(meta)}
					>

						{/*<link rel='dns-prefetch' href='//assets.pinterest.com'/>*/}
						{/*<link rel='dns-prefetch' href='//apis.google.com'/>*/}
						{/*<link rel='preload'*/}
						{/*			as='font'*/}
						{/*			type='font/woff2'*/}
						{/*			href={`/fonts/Sentinel-SemiboldItal.woff2`}/>*/}
						<style type='text/css'>{`
								@font-face {
									font-family: "Sentinel Black";
									font-style: normal;
									font-weight: 900;
									src: url(/fonts/Sentinel-Black.woff2) format("woff2");
									font-display: swap;
									}
									@font-face {
									font-family: "Sentinel MediumItal";
									font-style: italic;
									font-weight: 500;
									src: url(/fonts/Sentinel-MediumItal.woff2) format("woff2");
									font-display: swap;
									}
									@font-face {
									font-family: "Sentinel SemiboldItal";
									font-style: italic;
									font-weight: 500;
									src: url(/fonts/Sentinel-SemiboldItal.woff) format("woff"), url(/fonts/Sentinel-SemiboldItal.woff2) format("woff2");
									font-display: swap;
									}
									@font-face {
									font-family: "Sentinel";
									font-style: normal;
									font-weight: 600;
									src: url(/fonts/Sentinel-Semibold.woff2) format("woff2");
									font-display: swap;
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
