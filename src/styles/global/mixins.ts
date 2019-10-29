export function placeholderColor (color: string): string {
	return `
		&::-webkit-input-placeholder {
			color: ${color};
		}
		&::-moz-placeholder { /* Firefox 19+ */
			color: ${color};
		}
		&:-ms-input-placeholder { /* IE 10+ */
			color: ${color};
		}
		&:-moz-placeholder { /* Firefox 18- */
			color: ${color};
		}
	`
}

export function svgFlex () {
	return `
		display:flex;
		align-items: center;
	`
}
