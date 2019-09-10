interface ICat {
	id: number,
	name: string,
	slug: string
}

export interface Image {
	id: number,
	alt: string,
	fullSize: {
		url: string
	},
	thumbnail: {
		url: string
	},
	// Graphgql Images
	localFile: {
		name: string
		id: string
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
			fullWidth: {
				src: string
			},
			thumbnail_mobile: {
				src: string
			},
			thumbnail: {
				src: string
			},
			thumbnail_2x: {
				src: string
			}
		}
	}
}

interface Itag {
	id: number,
	name: string,
	slug: string
}

export interface IProductBullet {
	bullet_point: string
}

export interface IProductDetails {
	file_types: string[],
	file_size: string,
	dpi: string,
	programs: string[]
}

export interface IProduct {
	product_id: number,
	id: string,
	name: string,
	details: IProductDetails
	featuredImage: {
		alt: string
		localFile: {
			name: string
			id: string
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
				fullWidth: {
					src: string
				},
				thumbnail_mobile: {
					src: string
				},
				thumbnail: {
					src: string
				},
				thumbnail_2x: {
					src: string
				}
			}
		}
	}
	font_preview: boolean,
	sub_header: string,
	slug: string,
	type: string,
	intro_title: string,
	intro_description: string,
	description: string,
	short_description: string,
	price: string,
	regular_price: string;
	sale_price: string,
	licenseDiscountPrice?: string, // bulk options
	date_modified_gmt: string,
	date_created_gmt: string,
	on_sale: boolean;
	categories: ICat[],
	tags: Itag [],
	images: Image[],
	license: {
		type: string,
		// may not need this if we are testing the extendedItem itself
		hasExtendedLicense: boolean,
		standardItem: {
			slug: string,
			bullets: IProductBullet[]
		},
		extendedItem: {
			slug: string,
			bullets: IProductBullet[]
		}
	},
	features: {
		description: string,
		items: boolean | {
			icon: string,
			title: string,
			description: string
		}
	},
	pwyw: boolean,
	seo: {
		title: string,
		desc: string
	},

}

export interface IProducts {
	[id: string]: IProduct
}
