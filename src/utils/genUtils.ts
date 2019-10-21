import { Image } from '@et/types/Products'
import { IMeta, IOGType } from '@et/types/SEO'
import { IUser } from '@et/types/User'
import React, { ReactChild } from 'react'
import _ from 'lodash'

export const socialUtils = {
	twitter: {
		author: '@Teelac',
		url: 'https://twitter.com/teelacunningham',
		defaultImage: 'https://twitter.com/teelacunningham'
	},
	facebook:{
		url: `http://facebook.com/everytues`
	},
	youtube:{
		url: `http://youtube.com/everytues`
	},
	instagram:{
		url: `http://instagram.com/everytuesday`
	},
	pinterest:{
		url: `https://www.pinterest.com/teelac/`
	}
}


/**
 * * Tested
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
			content: `${process.env.GATSBY_TITLE}`,
		},
		{
			property: `og:description`,
			content: `${process.env.GATSBY_DESCRIPTION}`,
		},
		{
			property: 'og:site_name',
			content: `Every-Tuesday Shop`,
		},
		{
			property: `og:url`,
			content: `${process.env.GATSBY_DB}`,
		},
	]
	return _.unionBy(additionalProps, facebook, 'property')
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
			content: `${socialUtils.twitter.author}`
		},
		{
			name: `twitter:site	`,
			content: `${socialUtils.twitter.url}`
		},
		{
			name: `twitter:url`,
			content: `${socialUtils.twitter.url}`
		},
		{
			name: `twitter:image`,
			content: `${socialUtils.twitter.defaultImage}`
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

export function reduceChildrenByDataType (type: string, children: ReactChild, dataType: string): string {
	const items: any[] = React.Children.toArray(children)
	return items.reduce((prev: any, curr: any) => {
		if (type === curr.props[dataType]) { return curr.props[dataType] } else { return prev.props[dataType] }
	})
}

export function getCurrentPage (path: string) {
	const split = path
		.split(/(=)/)
		.splice(2, 2)
		.reduce((a, b) => {
			return parseInt(b, 10)
		}, 0)
	console.log('split', split)

	if (split !== 0) {
		return split
	}
	return 1
}

export function getUserImage (currentUser: IUser): {src: string, alt: string} {
	if (currentUser.fbProfilePic) {
		return {
			src:currentUser.fbProfilePic,
			alt:'facebook image'
		}
	}else{
		return{
			src:`https://www.gravatar.com/avatar/${currentUser.gravatar}`,
			alt:'user image'
		}
	}
}


