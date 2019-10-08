/**
 * Basic Sizes.
 */
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

export function getWindowSize () {
	const width = window.innerWidth

	if (width < 767) {
		return 'mobile'
	} else if (width < 1024) {
		return 'tablet'
	} else {
		return 'desktop'
	}
}
