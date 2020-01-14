import { ISupportQuestion } from '@et/types/Support'
import { IUser } from '@et/types/User'
import React, { ReactChild } from 'react'

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

export function getUserImage (currentUser: IUser): { src: string, alt: string } {
	if (currentUser.fbProfilePic) {
		return {
			src: currentUser.fbProfilePic,
			alt: 'facebook image'
		}
	} else {
		return {
			src: `https://www.gravatar.com/avatar/${currentUser.gravatar}`,
			alt: 'user image'
		}
	}
}

export function reArrangeItems (items: any[]) {
	const initialValue: any = []
	return items.reduce((total: any, item: any) => {
		// first run through put getting started at top
		if (item.slug === 'getting-started') {
			total.unshift(item)
		} else if (item.slug === 'fonts') {
			total.splice(1, 0, item)
		} else if (item.slug === 'procreate') {
			total.splice(2, 0, item)
		} else if (item.slug === 'uncategorized') {
			return total
		} else {
			total.push(item)
		}
		return total

	}, initialValue)
}

export function orderByPopularity (items: ISupportQuestion[]) {
	return items.sort((a, b) => (a.acfSupportQuestions.popularity < b.acfSupportQuestions.popularity) ? 1 : -1)
}


