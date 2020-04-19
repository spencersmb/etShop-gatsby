/* tslint:disable */
import { css, ThemedCssFunction } from 'styled-components'

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

export const mediaOld: IMediaKeys = Object.keys(sizes).reduce((finalMedia: any, size: string) => {
	return {
		...finalMedia,
		[size]: function(...args: TemplateStringsArray[]) {
			return css`
        @media(min-width: ${sizes[size]}px) {
          ${css(Object.assign(args))}
        }
      `
		}
	}
}, {})

export const media: IMediaKeys = Object.keys(sizes).reduce((acc: any, label: string) => {
	acc[label] = (...args: any) => {
		return css`
			@media (min-width: ${sizes[label]}px) {
				// @ts-ignore
				${css(...args)}
			}
		`
	}
	return acc
}, {})

export const maxMedia: IMediaKeys = Object.keys(sizes).reduce((finalMedia: any, size: string) => {
	return {
		...finalMedia,
		[size]: function(...args: TemplateStringsArray[]) {
			return css`
        @media(max-width: ${sizes[size]}px) {
          ${css(Object.assign(args))}
        }
      `
		}
	}
}, {})

const size: { [id: string]: string } = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '414px',
	mobileX: '812px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '2560px',
	xs: '32rem', // ~512px
	sm: '48rem', // ~768px
	md: '64rem', // ~1024px
	lg: '80rem', // ~1280px
	xl: '90rem'  // ~1440px
}

interface IDeviceKeys {
	mobileS: string,
	mobileM: string,
	mobileL: string,
	mobileX: string,
	tablet: string,
	laptop: string,
	laptopL: string,
	desktop: string,
	desktopL: string,
	xs: string,
	sm: string,
	md: string,
	lg: string,
	xl: string
}

export const device: IDeviceKeys = {
	mobileS: `(min-width: ${size.mobileS})`, // 320 iphone5
	mobileM: `(min-width: ${size.mobileM})`, // 375 iphone 6
	mobileL: `(min-width: ${size.mobileL})`, // 414 iphoone 678 +
	mobileX: `only screen and (min-device-width: 375px) and (max-device-height: 896px)`, // 414 iphoone 678 +
	tablet: `(min-width: ${size.tablet})`,
	laptop: `(min-width: ${size.laptop})`,
	laptopL: `(min-width: ${size.laptopL})`,
	desktop: `(min-width: ${size.desktop})`,
	desktopL: `(min-width: ${size.desktop})`,
	xs: `(min-width: ${size.xs})`, // ~512px
	sm: `(min-width: ${size.sm})`, // ~768px
	md: `(min-width: ${size.md})`, // ~1024px
	lg: `(min-width: ${size.lg})`, // ~1280px
	xl: `(min-width: ${size.xl})`  // ~1440px
}
