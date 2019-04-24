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
			}
		}
	}
}

interface Itag {
	id: number,
	name: string,
	slug: string
}

export interface IProduct {
	product_id: number,
	id: string,
	name: string,
	sub_header: string,
	slug: string,
	type: string,
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
		standardItem?: {
			slug: string
		},
		extendedItem?: {
			slug: string
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