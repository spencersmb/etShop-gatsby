// Utility function
interface Utils {
	addClass: (el: HTMLElement | Element, className: string) => void
	removeClass: (el: HTMLElement | Element, className: string) => void
	toggleClass: (el: HTMLElement | Element, className: string, bool: boolean) => void
	hasClass: (el: HTMLElement | Element, className: string) => boolean
	getIndexInArray: (array: any, el: HTMLElement | Element) => number
	moveFocus: (element: HTMLElement) => void
	setAttributes: (el: HTMLElement | Element, attrs: {
		[key: string]: string
	}) => void
	cssSupports: (property: string, value?: string) => boolean

}

export const CodyUtils: Utils = {
	cssSupports: (property: string, value: string = '') => {
		if ('CSS' in window) {
			return CSS.supports(property, value)
		} else {
			const jsProperty = property.replace(/-([a-z])/g, (g) => (g[1].toUpperCase()))
			return jsProperty in document.body.style
		}
	},
	addClass: (el, className) => {
		const classList = className.split(' ')

		if (el.classList) { el.classList.add(classList[0]) } else if (!CodyUtils.hasClass(el, classList[0])) { el.className += ' ' + classList[0] }
		if (classList.length > 1) { CodyUtils.addClass(el, classList.slice(1).join(' ')) }
	},
	hasClass: (el, className) => {
		if (!el) {
			return false
		}
		if (el.classList) { return el.classList.contains(className) } else { return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')) }
	},
	getIndexInArray: (array, el) => {
		return Array.prototype.indexOf.call(array, el)
	},
	removeClass: (el, className) => {
		const classList = className.split(' ')
		if (el.classList) { el.classList.remove(classList[0]) } else if (CodyUtils.hasClass(el, classList[0])) {
			const reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)')
			el.className = el.className.replace(reg, ' ')
		}
		if (classList.length > 1) { CodyUtils.removeClass(el, classList.slice(1).join(' ')) }
	},
	toggleClass: (el, className, bool) => {
		if (bool) { CodyUtils.addClass(el, className) } else { CodyUtils.removeClass(el, className) }
	},
	setAttributes: (el, attrs) => {
		// tslint:disable-next-line:forin
		for (const key in attrs) {
			el.setAttribute(key, attrs[key])
		}
	},
	moveFocus: (element) => {
		if (!element) { element = document.getElementsByTagName('body')[0] }
		element.focus()
		if (document.activeElement !== element) {
			element.setAttribute('tabindex', '-1')
			element.focus()
		}
	}

}
