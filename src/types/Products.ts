import { LicenseEnum } from '@et/types/Cart'

interface ICat {
	id: number,
	name: string,
	slug: string
}
export interface ILocalFile {
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
			aspectRatio: number
			base64: string
			sizes: string
			srcSet: string
		},
		thumbnail_mobile: {
			src: string
			aspectRatio: number
			base64: string
			sizes: string
			srcSet: string
		},
		thumbnail: {
			src: string
		},
		thumbnail_2x: {
			src: string
		}
	}
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
	localFile: ILocalFile
}

interface Itag {
	id: number,
	name: string,
	slug: string
}

export interface IProductDetails {
	file_types: string[],
	file_size: string,
	dpi: string,
	programs: string[]
	reqs: boolean
}

export interface IFontPreviewFile {
	type: string
	localFile: {
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

export interface IYoutubeItem {
	video_id: string
	gallery_position: string
	video_thumbnail:{
		url: string
		alt: string
		localFile: Image
	}
}

export interface IGalleryItem {
	video? : {
		id: string
	},
	alt: string,
	localFile: ILocalFile
}

export interface IProduct {
	product_id: number,
	id: string,
	name: string,
	details: IProductDetails
	featuredImage: IProductFeaturedImage
	images: Image[],
	youtube_gallery_items: IYoutubeItem[]
	font_preview: IFontPreview,
	sub_header: string,
	slug: string,
	sku: string,
	type: string,
	intro_description: string,
	install_instructions: string,
	description: string,
	description_footer: IBarType[],
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
	product_licenses: ILicenseType[]
	features: IFeatureItem[]
	related_products: string[] | null
	pwyw: boolean,
	seo: {
		title: string,
		desc: string
	},

}
export interface IBarType {
	type: string
}
export interface IProducts {
	[id: string]: IProduct
}
