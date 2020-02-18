/**
 * Basic Sizes.
 */
import { useEffect } from 'react'

let thisWidth = 640
let thisHeight = 480
if (typeof window !== `undefined`) {
	thisWidth =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth

	thisHeight =
		window.innerHeight ||
		document.documentElement.clientHeight ||
		document.body.clientHeight
}
export const Width = thisWidth
export const windowHasScrollbar = () => {
	const body = document.getElementsByTagName('body')
	if (body.length > 0) {
		// console.log('window.innerWidth', window.innerWidth)
		// console.log('body[0].clientWidth', body[0].clientWidth)
		// console.log('calc', window.innerWidth - body[0].clientWidth !== 0)

		return (window.innerWidth - body[0].clientWidth) !== 0
	} else {
		return false
	}
}

// export const checkDevice
export function getWidth (): number {
	if (typeof window !== `undefined`) {
		thisWidth =
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth
		return thisWidth
	}
	return 0
}

export function getWindowPosition () {
	if (typeof window !== `undefined`) {
		return window.top.pageYOffset
	}
	return 0
}

export function getWindowSize (): string {
	if (typeof window === `undefined`) {
		return 'desktop'
	}
	const width = window.innerWidth

	if (width < 767) {
		return 'mobile'
	} else if (width < 1024) {
		return 'tablet'
	} else {
		return 'desktop'
	}
}

export const bodyScrollBar = {
	remove: (el: HTMLElement) => {

		el.style.removeProperty('position')
		el.style.removeProperty('width')

		if (window.innerWidth > 1024) {
			el.style.removeProperty('top')
			el.style.removeProperty('bottom')
			el.style.removeProperty('padding')
		}
	},
	show: (el: HTMLElement, scrollPos: number) => {
		const hasBar = windowHasScrollbar()

		el.style.position = 'fixed'
		el.style.width = `100%`
		el.style.top = `-${scrollPos}px`
		if (window.innerWidth > 1024 && hasBar) {
			el.style.padding = '0 15px 0 0'
			// el.style.bottom = `0`
		}

	}
}

export const useScrollToElement = (elName: string) => {
	useEffect(() => {
		setTimeout(() => {
			const elmnt = document.getElementById(elName)
			if (elmnt) {
				elmnt.scrollIntoView()
				console.log('go to: ', elmnt)
			}
		}, 300)

	})
}
