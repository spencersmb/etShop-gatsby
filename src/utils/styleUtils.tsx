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
