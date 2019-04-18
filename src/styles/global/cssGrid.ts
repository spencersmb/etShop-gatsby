/* tslint:disable */
import { device, media } from '@styles/global/breakpoints'
import styled, { css } from 'styled-components'

const gutterMobile = 20
const colMobile = (450 - (gutterMobile)) / 2
const colMobileHorizontal = `${(600 - (gutterMobile)) / 2}px`
const gutter = 30
const col = `${(1200 - (11 * gutter)) / 12}px`

const mobileGrid = `
		display: grid;
		grid-template-columns:
			minmax(0, 1fr)
			repeat(2, minmax(auto, ${colMobile}px))
			minmax(0, 1fr)
		;
		grid-gap: ${gutterMobile}px;
		padding: 0;
`
const tabletGrid = `
		grid-template-columns:
			minmax(0, 1fr)
			repeat(12, minmax(30px, 72.5px))
			minmax(0, 1fr)
    ;
      grid-gap: 30px;
`
console.log('col', col)
// const size = {
// 	small: 400,
// 	med: 960,
// 	large: 1140
// }

export const CssGrid12 = styled.div`
	padding: 0 20px;
	@supports(display: grid){
			${mobileGrid}
		  @media ${device.tablet} {
				grid-template-columns:
					minmax(0, 1fr)
					repeat(12, minmax(30px, ${col}))
					minmax(0, 1fr)
				;
				grid-gap: ${gutter}px;
			}
	}
`
