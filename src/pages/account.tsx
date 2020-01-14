import PrivateRoute from '@components/account/privateRoutes'
import Layout from '@components/layout'
import Dashboard from '@components/account/dashboard'
import SEO from '@components/seo'
import { IUserState } from '@et/types/User'
import { createStandardJSONLD, facebookDefaultMeta, twitterDefaultMeta } from '@utils/socialUtils'
import { graphql } from 'gatsby'
import React from 'react'
import { Router } from '@reach/router'
import UserHoc from '@components/account/userHoc' // passes user data as prop

const Account = ({ data }: any) => {
	const { site, featureImage } = data
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
	return (
		<Layout>
			<SEO
				title='Account'
				description={`${site.siteMetadata.description}`}
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
				<link rel='canonical' href={process.env.GATSBY_DB}/>
				<script type='application/ld+json'>{JSON.stringify(createStandardJSONLD({
					siteUrl: site.siteMetadata.siteUrl,
					featureImgSrc: featureImage.childImageSharp.fluid.src
				}))}</script>
			</SEO>
			<UserHoc>
				{({ user }: { user: IUserState }) => (
					<Router>
						<PrivateRoute Component={Dashboard} path='/account' user={user}/>
						{/*<PrivateRoute Component={Profile} path='/account' user={user}/>*/}
						{/*<Profile path='/app/profile'/>*/}
					</Router>
				)}
			</UserHoc>
		</Layout>
	)
}

export default Account

export const query = graphql`
    query AccountPageQuery {
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
    }
`
