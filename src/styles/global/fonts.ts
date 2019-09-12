interface ISentinel {
	black: string,
	italic: string
	reg: string,
	semiboldItalic: string
}

export const Sentinel: ISentinel = {
	black: `font-family: "Sentinel Black", serif;`,
	italic: `font-family: "Sentinel MediumItal", serif; font-style: italic;`,
	semiboldItalic: `font-family: "Sentinel-SemiboldItalic", serif; font-style: italic;`,
	reg: `font-family: "Sentinel", serif;`
}

