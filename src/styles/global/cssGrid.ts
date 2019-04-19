/* tslint:disable */
import { device, media } from '@styles/global/breakpoints'
import styled from 'styled-components'

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
export const GridBoxed = styled.div`
	display: flex;
  max-width: 1200px;
  margin: 0 auto;
`

export const FlexRow = styled.div`
	display: flex;
	
	@media ${device.laptop} {
	    flex-direction: row;
	}
`