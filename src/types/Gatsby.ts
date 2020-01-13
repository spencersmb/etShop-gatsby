import { graphql } from 'gatsby'

export interface IGatsbyConfig {
	site: {
		siteMetadata: {
			title: string,
			description: string,
			author: string,
			authorUrl: string,
			siteUrl: string,
			siteName: string,
			db: string,
			route: string,
			twitterUrl: string
			twitterDefaultImage: string
		},
	}
	featureImage?:any
}

export const gatsbyImageSharpFluid = graphql`
	fragment GatsbyImageSharpFluid on ImageSharpFluid {
		base64
		aspectRatio
		src
		srcSet
		sizes
	}
`
