export interface IFeaturedImage {
	childImageSharp: {
		fluid: {
			src: string
			aspectRatio: number
			base64: string
			sizes: string
			srcSet: string
		},
		fixed: {
			width: string
			height: string
			src: string
		},
	}
}
