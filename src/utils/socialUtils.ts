import { Image } from '@et/types/Products'
import { IMeta, IOGType } from '@et/types/SEO'
import _ from 'lodash'

export const socialConfig = {
	twitter: {
		author: '@Teelac',
		url: 'https://twitter.com/teelacunningham',
		defaultImage: 'https://twitter.com/teelacunningham'
	},
	facebook: {
		url: `http://facebook.com/everytues`
	},
	youtube: {
		url: `http://youtube.com/everytues`
	},
	instagram: {
		url: `http://instagram.com/everytuesday`
	},
	pinterest: {
		url: `https://www.pinterest.com/teelac/`
	}
}

/**
 * * Tested
 * Twitter Card default
 * - Add-on and override default twitter props
 *
 * @param {IMeta} additionalProps
 * @returns Array
 */
export const twitterDefaultMeta = (additionalProps: IMeta[] = []): IMeta[] => {
	const og = [
		{
			name: `twitter:card`,
			content: `summary`
		},
		{
			name: `twitter:title`,
			content: `${process.env.GATSBY_TITLE}`
		},
		{
			name: `twitter:description`,
			content: `${process.env.GATSBY_DESCRIPTION}`
		},
		{
			name: `twitter:creator`,
			content: `${socialConfig.twitter.author}`
		},
		{
			name: `twitter:site	`,
			content: `${socialConfig.twitter.url}`
		},
		{
			name: `twitter:url`,
			content: `${socialConfig.twitter.url}`
		},
		{
			name: `twitter:image`,
			content: `${socialConfig.twitter.defaultImage}`
		}
	]
	return _.unionBy(additionalProps, og, 'name')
}

/**
 * * Tested
 * JSONLD Image array
 * - return image thumbnail urls into an array
 *
 * @param {Image} imageArray
 * @returns Array
 */
export const jsonldImages = (imageArray: Image[]): string[] => {
	return imageArray.map(item => item.localFile.childImageSharp.thumbnail.src)
}

/**
 * * Tested
 * Facebook Card default
 * - Add-on and override default props
 *
 * @param {IMeta} additionalProps
 * @returns Array
 */
export const facebookDefaultMeta = (additionalProps: IOGType[] = []): IOGType[] => {
	const facebook: any = [
		{
			property: `og:title`,
			content: `${process.env.GATSBY_TITLE}`
		},
		{
			property: `og:description`,
			content: `${process.env.GATSBY_DESCRIPTION}`
		},
		{
			property: 'og:site_name',
			content: `Every-Tuesday Shop`
		},
		{
			property: `og:url`,
			content: `${process.env.GATSBY_FRONTEND_URL}`
		}
	]
	return _.unionBy(additionalProps, facebook, 'property')
}

export const createStandardJSONLD = ({siteUrl, featureImgSrc}: {siteUrl: string, featureImgSrc: string}) => {
	return {
		['@context']: 'http://schema.org',
		['@type']: 'Organization',
		['name']: 'Every Tuesday',
		['logo']: `${siteUrl}/${featureImgSrc}`,
		['url']: 'https://shop.every-tuesday.com',
		'sameAs': [
			`${socialConfig.twitter.url}`,
			`${socialConfig.facebook.url}`,
			`${socialConfig.youtube.url}`,
			`${socialConfig.instagram.url}`,
			`${socialConfig.pinterest.url}`
		]
	}
}
