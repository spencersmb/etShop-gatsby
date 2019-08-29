import { css } from 'styled-components'
import { withPrefix } from 'gatsby'

const testEnv = process.env.NODE_ENV === 'test'
const customFont = testEnv ? '' : withPrefix('/fonts/Sentinel-Semibold.woff2')

const black = testEnv ? '' : withPrefix('/fonts/Sentinel-Black.woff2')

const medItal = testEnv ? '' : withPrefix('/fonts/Sentinel-MediumItal.woff2')
// export const SentinelFamily = `font-family: "Sentinel A", "Sentinel B", serif;`
export const SentinelFamily = `font-family: "Sentinel", serif;`
export const SentinelBlack = `font-family: "Sentinel Black", serif;`
export const SentinelMedItl = `font-family: "Sentinel MediumItal", "Sentinel", serif;`
export default css`
	@font-face {
    font-family: "Sentinel";
    font-style: normal;
    font-weight: 600;
		src: url(${customFont}) format("woff2")
	}
	// @font-face {
	// 	font-family: "Sentinel Black";
	// 	font-style: normal;
	// 	font-weight: 900;
	// 	src: url(${black}) format("woff2")
	// }
	@font-face {
		font-family: "Sentinel MediumItal";
		font-style: italic;
		font-weight: 500;
		src: url(${medItal}) format("woff2")
	}
`