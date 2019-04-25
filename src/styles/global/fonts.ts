import { css } from 'styled-components'
import { withPrefix } from 'gatsby'

const testEnv = process.env.NODE_ENV === 'test'
const customFont = testEnv ? '' : withPrefix('/fonts/Sentinel-Semibold.woff2')
export const SentinelFamily = `font-family: "Sentinel A", "Sentinel B", serif;`
export default css`
	@font-face {
    font-family: "Sentinel";
    font-style: normal;
    font-weight: 600;
		src: url(${customFont}) format("woff2")
	}
`