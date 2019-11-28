import { LicenseEnum } from '@et/types/Cart'

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

export interface IFontPreviewFile {
	type: string
	localFile:{
		absolutePath: string
		publicURL: string
		relativePath: string
	}
}
export interface IFontPreviewStyles {
	font_family: string,
	font_files: IFontPreviewFile[]
	type: string
}
export interface IFontPreview {
	enabled: boolean,
	styles: IFontPreviewStyles[]
}
export interface IFeatureItem {
	description: string
	icon: string
	title: string
}
export interface IProductLicenseType {
	type: string,
	// may not need this if we are testing the extendedItem itself
	hasExtendedLicense: boolean,
	standardItem: {
		slug: string,
		desc: string
	},
	extendedItem: {
		slug: string,
		desc: string
	}
}
export interface ILicenseType {
	type: {
		value: LicenseEnum,
		name: string
	},
	item: {
		id: string,
		name: string,
		slug: string,
		price: string,
		onSale: boolean
	}
}
export interface IProductFeaturedImage {
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
export interface IProduct {
	product_id: number,
	id: string,
	name: string,
	details: IProductDetails
	featuredImage: IProductFeaturedImage
	font_preview: IFontPreview,
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
	product_licenses: ILicenseType[]
	features: IFeatureItem[]
	related_products: string[] | null
	pwyw: boolean,
	seo: {
		title: string,
		desc: string
	},

}

export interface IProducts {
	[id: string]: IProduct
}
