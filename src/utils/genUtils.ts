import { Image } from '@et/types/Products'
import { IMeta } from '@et/types/SEO'
import React from 'react'
import { ReactChild } from 'react'
import config from '../../gatsby-config'
import _ from 'lodash'

/**
 * matchString(str, regexPattern)
 * - matchRegex and return true or false
 *
 * @param {String} str
 * @param {String} regexPattern
 * @returns boolean
 */
export const matchString = (str: string, regexPattern: string): boolean => {
	return !!str.match(regexPattern)
}

/**
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
			content: `${config.siteMetadata.title}`
		},
		{
			name: `twitter:description`,
			content: `${config.siteMetadata.description}`
		},
		{
			name: `twitter:creator`,
			content: `${config.siteMetadata.author}`
		},
		{
			name: `twitter:site	`,
			content: `${config.siteMetadata.author}`
		},
		{
			name: `twitter:url`,
			content: `${config.siteMetadata.twitterUrl}`
		},
		{
			name: `twitter:image`,
			content: `${config.siteMetadata.siteUrl}`
		}
	]
	return _.unionBy(additionalProps, og, 'name')
}

/**
 * JSONLD Image array
 * - return image thumbnail urls into an array
 *
 * @param {Image} imageArray
 * @returns Array
 */
export const jsonldImages = (imageArray: Image[]): string[] => {
	return imageArray.map(item => item.thumbnail.url)
}

export function reduceChildrenByDataType (type: string, children: ReactChild, dataType: string): string {
	const items: any[] = React.Children.toArray(children)
	return items.reduce((prev: any, curr: any) => {
		switch (type) {
			case curr.props[dataType]:
				return curr.props[dataType]
			default:
				return prev.props[dataType]
		}
	})
}
