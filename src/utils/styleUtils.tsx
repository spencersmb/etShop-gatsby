import { LicenseEnum } from '@et/types/Cart'
import { colors } from '@styles/global/colors'
import React, { ReactNode } from 'react'

/**
 * renderSvg(svg)
 * - Component Helper to render and svg item
 *
 * @param {Object} Svg - from importing an svg into react
 */

export const renderSvg = (Svg: string): ReactNode=> {
	if(!Svg){
		return (<div>No SVG found</div>)
	}
	return <Svg />
}

export const getLicenseColor = (type: LicenseEnum) => {
	switch (type) {
		case LicenseEnum.extended:
			return colors.primary.pink
		case LicenseEnum.server:
			return colors.purple.i500
		default:
			return colors.teal.i500
	}
}
