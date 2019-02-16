/* tslint:disable */
import {css, ThemedCssFunction} from 'styled-components'

interface IMedia {
	desktop: number,
	laptop: number,
	phone: number,
	tablet: number,
	xLarge: number
}

const sizes: IMedia = {
	desktop: 1170,
	laptop: 992,
	phone: 376,
	tablet: 768,
	xLarge: 1400
}

interface IMediaKeys {
	desktop: ThemedCssFunction<any>,
	laptop: ThemedCssFunction<any>,
	phone: ThemedCssFunction<any>,
	tablet: ThemedCssFunction<any>,
	xLarge: ThemedCssFunction<any>
}

export const media: IMediaKeys = Object.keys(sizes).reduce((finalMedia: any, size: string) => {
	return {
		...finalMedia,
		[size]: function (...args: TemplateStringsArray[]) {
			return css`
        @media(min-width: ${sizes[size]}px) {
          ${css(Object.assign(args))}
        }
      `
		}
	}
}, {})

export const maxMedia: IMediaKeys = Object.keys(sizes).reduce((finalMedia: any, size: string) => {
	return {
		...finalMedia,
		[size]: function (...args: TemplateStringsArray[]) {
			return css`
        @media(max-width: ${sizes[size]}px) {
          ${css(Object.assign(args))}
        }
      `
		}
	}
}, {})
