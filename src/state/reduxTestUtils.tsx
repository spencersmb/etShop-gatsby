// this is a handy function that I normally make available for all my tests
import { ICartState, LicenseEnum } from '@et/types/Cart'
import { IGatsbyConfig } from '@et/types/Gatsby'
import { IPaginateState } from '@et/types/Pagination'
import { IProduct, IProducts } from '@et/types/Products'
import { ISupportCategory, ISupportCatQuery, ISupportQuestion, ISupportQuestionQuery } from '@et/types/Support'
import { IUser } from '@et/types/User'
import { IGuestFormData, IReceipt } from '@et/types/WC_Order'
import initialState from '@redux/reducers/initialState'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-testing-library'
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
import { createStore } from 'redux'

export function renderWithRedux (
	ui: any,
	reducer: any,
	{ state, store = createStore(reducer, state) }: any = initialState
) {
	return {
		...render(<Provider store={store}>{ui}</Provider>),
		// adding `store` to the returned utilities to allow us
		// to reference it in our tests (just try to avoid using
		// this to test implementation details).
		store
	}
}

const testSiteMetaDataQuery = {
	title: `Every-Tuesday Digital Products Shop`,
	description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
	author: `@Teelac`,
	authorUrl: 'https://every-tuesday.com/about/#teela',
	siteUrl: `https://shop.every-tuesday.com`,
	siteName: `Every-Tuesday Shop`,
	db: 'http://shopeverytuesday.local',
	route: 'et-shop',
	twitterUrl: 'https://twitter.com/teelacunningham',
	twitterDefaultImage: 'url'
}

export const testCartEmpty: ICartState = {
	coupon: {
		code: 'string',
		discount: 'string',
		loading: false,
		product_ids: [],
		submitted: false,
		type: 'string',
		valid: false
	},
	isOpen: false,
	items: {},
	loaded: true,
	paymentType: 'Stripe',
	totalItems: 0,
	totalPrice: 0,
	originalPrice: 0
}

export const standardItemAddToCart = {
	['watercolor-texture-kit-vol-1']: {
		licenseType: LicenseEnum.standard,
		bulkDiscount: false,
		id: 222,
		name: 'Watercolor texture kit Vol. 1',
		price: '16',
		qty: 1,
		slug: 'watercolor-texture-kit-vol-1'
	}
}
const images = [
	{
		id: 123414,
		alt: 'alt',
		fullSize: {
			url: 'fullsize-url'
		},
		thumbnail: {
			url: 'image-url'
		},
		localFile: {
			id: '12',
			name: 'localfile',
			childImageSharp: {
				fixed: {
					src: 'src',
					height: 'height',
					width: 'width'
				},
				fluid: {
					src: 'src',
					aspectRatio: 12345,
					base64: 'base64',
					sizes: 'sizes',
					srcSet: 'srcSet'
				},
				thumbnail_2x: {
					src: ''
				},
				thumbnail_mobile: {
					src: ''
				},
				thumbnail: {
					src: ''
				},
				fullWidth: {
					src: ''
				}
			}
		}
	}
]
const featuredImage = {
	alt: 'alt',
	localFile: {
		id: '231',
		name: 'localFile',
		childImageSharp: {
			fixed: {
				src: 'src',
				height: 'height',
				width: 'width'
			},
			fluid: {
				src: 'src',
				aspectRatio: 12345,
				base64: 'base64',
				sizes: 'sizes',
				srcSet: 'srcSet'
			},
			thumbnail_2x: {
				src: ''
			},
			thumbnail_mobile: {
				src: ''
			},
			thumbnail: {
				src: ''
			},
			fullWidth: {
				src: ''
			}
		}
	}
}
const fontPreview = {
	styles: [],
	enabled: false
}
export const singleProduct: IProduct = {
	type: 'simple',
	date_created_gmt: '2018-09-25T20:35:51',
	date_modified_gmt: '2019-02-18T21:44:25',
	id: '202eca74-fc90-56e7-8269-b59f18a19194',
	name: 'Watercolor texture kit Vol. 1',
	price: '16',
	product_id: 222,
	pwyw: false,
	regular_price: '16',
	sale_price: '',
	slug: 'watercolor-texture-kit-vol-1',
	sub_header: 'sub header',
	description: 'description',
	short_description: 'short desc',
	on_sale: false,
	features: [
		{
			description: 'item desc',
			icon: 'icon',
			title: 'singleItemQuery title'
		}
	],
	featuredImage: { ...featuredImage },
	font_preview: { ...fontPreview },
	categories: [
		{ id: 1, slug: 'fonts', name: 'Fonts' },
		{ id: 2, slug: 'Watercolor', name: 'Watercolor' }
	],
	images: [...images],
	product_licenses: [
		{
			type: {
				value: LicenseEnum.standard,
				name: 'Standard'
			},
			item: {
				id: '797',
				name: 'Watercolor texture kit Vol. 1',
				onSale: false,
				price: '16',
				slug: 'watercolor-texture-kit-vol-1'
			}
		}
	],
	seo: {
		desc: 'Add serious vibrant color and detail with this kit packed with 32 unique watercolor textures, 12 seamless, repeatable watercolor texture patterns and 2 bonus watercolor paper patterns.',
		title: 'Watercolor texture kit Vol. 1'
	},
	tags: [
		{ id: 1, name: 'Texture Kit', slug: 'texture-kit' },
		{ id: 2, name: 'Waterbrush', slug: 'waterbrush' }
	],
	related_products: [],
	details: {
		programs: [],
		file_size: '1.2gb',
		file_types: ['otf'],
		dpi: '600'
	},
	intro_description: 'intro desc',
	intro_title: 'intro-title',
	licenseDiscountPrice: ''
}

export enum ProductKey {
	WatercolorStd = 'watercolor-texture-kit-vol-1',
	WatercolorExt = 'watercolor-texture-kit-vol-1-ext',
	Honeymoon = 'honeymoon',
	Skinnyjeans = 'skinny-jeans'
}

export const testProducts: IProducts = {
	[ProductKey.WatercolorStd]: {
		type: 'simple',
		date_created_gmt: '2018-09-25T20:35:51',
		date_modified_gmt: '2019-02-18T21:44:25',
		id: '202eca74-fc90-56e7-8269-b59f18a19194',
		name: 'Watercolor texture kit Vol. 1',
		price: '16',
		product_id: 222,
		pwyw: false,
		regular_price: '16',
		sale_price: '',
		slug: 'watercolor-texture-kit-vol-1',
		sub_header: 'sub header',
		description: 'description',
		short_description: 'short desc',
		on_sale: false,
		features: [
			{
				description: 'item desc',
				icon: 'icon',
				title: 'singleItemQuery title'
			}
		],
		categories: [
			{ id: 2, slug: 'Watercolor', name: 'Watercolor' }
		],
		featuredImage: { ...featuredImage },
		images: [...images],
		font_preview: { ...fontPreview },
		product_licenses: [
			{
				type: {
					value: LicenseEnum.standard,
					name: 'Standard'
				},
				item: {
					id: '797',
					name: 'Watercolor texture kit Vol. 1',
					onSale: false,
					price: '16',
					slug: 'watercolor-texture-kit-vol-1'
				}
			},
			{
				type: {
					value: LicenseEnum.extended,
					name: 'Extended'
				},
				item: {
					id: '979',
					name: 'Watercolor texture kit Vol. 1 EXT',
					onSale: false,
					price: '20',
					slug: 'watercolor-texture-kit-vol-1-ext'
				}
			}
		],
		seo: {
			desc: 'Add serious vibrant color and detail with this kit packed with 32 unique watercolor textures, 12 seamless, repeatable watercolor texture patterns and 2 bonus watercolor paper patterns.',
			title: 'Watercolor texture kit Vol. 1'
		},
		tags: [
			{ id: 1, name: 'Texture Kit', slug: 'texture-kit' },
			{ id: 2, name: 'Waterbrush', slug: 'waterbrush' }
		],
		details: {
			programs: [],
			file_size: '1.2gb',
			file_types: ['otf'],
			dpi: '600'
		},
		intro_description: 'intro desc',
		intro_title: 'intro-title',
		licenseDiscountPrice: '',
		related_products: []
	},
	[ProductKey.WatercolorExt]: {
		type: 'simple',
		date_created_gmt: '2018-09-25T20:35:51',
		date_modified_gmt: '2019-02-18T21:44:25',
		id: '202eca74-fc90-56e7-8269-b59f18a19194-ext',
		name: 'Watercolor texture kit Vol. 1 EXT',
		price: '20',
		product_id: 40,
		pwyw: false,
		regular_price: '20',
		sale_price: '',
		slug: 'watercolor-texture-kit-vol-1-ext',
		sub_header: 'sub header',
		description: 'description',
		short_description: 'short desc',
		on_sale: false,
		features: [{
			description: 'item desc',
			icon: 'icon',
			title: 'singleItemQuery title'
		}],
		categories: [
			{ id: 2, slug: 'Watercolor', name: 'Watercolor' }
		],
		featuredImage: { ...featuredImage },
		images: [...images],
		font_preview: { ...fontPreview },
		product_licenses: [],
		seo: {
			desc: 'Add serious vibrant color and detail with this kit packed with 32 unique watercolor textures, 12 seamless, repeatable watercolor texture patterns and 2 bonus watercolor paper patterns.',
			title: 'Watercolor texture kit Vol. 1 Ext'
		},
		tags: [
			{ id: 1, name: 'Texture Kit', slug: 'texture-kit' },
			{ id: 2, name: 'Waterbrush', slug: 'waterbrush' }
		],
		details: {
			programs: [],
			file_size: '1.2gb',
			file_types: ['otf'],
			dpi: '600'
		},
		intro_description: 'intro desc',
		intro_title: 'intro-title',
		licenseDiscountPrice: '',
		related_products: []

	},
	[ProductKey.Honeymoon]: {
		type: 'simple',
		date_created_gmt: '2018-09-25T20:35:51',
		date_modified_gmt: '2019-02-18T21:44:25',
		id: '202eca74-fc90-56e7-8269-b59f18a19194-honeymoon',
		name: 'Honeymoon',
		price: '0',
		product_id: 352,
		pwyw: true,
		regular_price: '0',
		sale_price: '',
		slug: 'honeymoon',
		sub_header: 'sub header',
		description: 'description',
		short_description: 'short desc',
		on_sale: false,
		features: [{
			description: 'item desc',
			icon: 'icon',
			title: 'singleItemQuery title'
		}],
		categories: [
			{ id: 1, slug: 'fonts', name: 'Fonts' }
		],
		featuredImage: { ...featuredImage },
		images: [...images],
		font_preview: { ...fontPreview },
		product_licenses: [
			{
				type: {
					value: LicenseEnum.standard,
					name: 'Standard'
				},
				item: {
					id: '352',
					name: 'Honeymoon',
					onSale: false,
					price: '0',
					slug: 'honeymoon'
				}
			}
		],
		seo: {
			desc: 'Add serious vibrant color and detail with this kit packed with 32 unique watercolor textures, 12 seamless, repeatable watercolor texture patterns and 2 bonus watercolor paper patterns.',
			title: 'Honeymoon seo title'
		},
		tags: [],
		details: {
			programs: [],
			file_size: '1.2gb',
			file_types: ['otf'],
			dpi: '600'
		},
		intro_description: 'intro desc',
		intro_title: 'intro-title',
		licenseDiscountPrice: '',
		related_products: []

	},
	[ProductKey.Skinnyjeans]: {
		type: 'simple',
		date_created_gmt: '2018-09-25T20:35:51',
		date_modified_gmt: '2019-02-18T21:44:25',
		id: '202eca74-fc90-56e7-8269-b59f18a19194',
		name: 'Skinny Jeans',
		price: '9.99',
		product_id: 30,
		pwyw: false,
		regular_price: '13',
		sale_price: '9.99',
		slug: 'skinny-jeans',
		sub_header: 'sub header',
		description: 'description',
		short_description: 'short desc',
		on_sale: true,
		features: [{
			description: 'item desc',
			icon: 'icon',
			title: 'singleItemQuery title'
		}],
		categories: [
			{ id: 1, slug: 'fonts', name: 'Fonts' }
		],
		featuredImage: { ...featuredImage },
		images: [...images],
		font_preview: { ...fontPreview },
		product_licenses: [
			{
				type: {
					value: LicenseEnum.standard,
					name: 'Standard'
				},
				item: {
					id: '30',
					name: 'Skinny Jeans',
					onSale: true,
					price: '9.99',
					slug: 'skinny-jeans'
				}
			}
		],
		seo: {
			desc: 'Add serious vibrant color and detail with this kit packed with 32 unique watercolor textures, 12 seamless, repeatable watercolor texture patterns and 2 bonus watercolor paper patterns.',
			title: 'Skinny Jeans seo title'
		},
		tags: [],
		details: {
			programs: [],
			file_size: '1.2gb',
			file_types: ['otf'],
			dpi: '600'
		},
		intro_description: 'intro desc',
		intro_title: 'intro-title',
		licenseDiscountPrice: '',
		related_products: []
	}
}

export const testCartWithItem: ICartState = {
	coupon: {
		code: '',
		discount: '',
		loading: false,
		product_ids: [],
		submitted: false,
		type: '',
		valid: false
	},
	isOpen: false,
	items: {
		[ProductKey.WatercolorStd]: {
			licenseType: LicenseEnum.standard,
			bulkDiscount: false,
			id: testProducts[ProductKey.WatercolorStd].product_id,
			name: testProducts[ProductKey.WatercolorStd].name,
			price: testProducts[ProductKey.WatercolorStd].price,
			qty: 1,
			slug: testProducts[ProductKey.WatercolorStd].slug
		}
	},
	loaded: true,
	paymentType: 'Stripe',
	totalItems: 1,
	totalPrice: 12,
	originalPrice: 12
}

// Todo: add coupon code
export const testCartWithItemAndCoupon: ICartState = {
	coupon: {
		code: 'test',
		discount: '',
		loading: false,
		product_ids: [
			222
		],
		submitted: true,
		type: '',
		valid: true
	},
	isOpen: false,
	items: {
		[ProductKey.WatercolorStd]: {
			bulkDiscount: false,
			licenseType: LicenseEnum.standard,
			id: testProducts[ProductKey.WatercolorStd].product_id,
			name: testProducts[ProductKey.WatercolorStd].name,
			price: testProducts[ProductKey.WatercolorStd].price,
			qty: 1,
			slug: testProducts[ProductKey.WatercolorStd].slug
		}
	},
	loaded: true,
	paymentType: 'Stripe',
	totalItems: 1,
	totalPrice: 12,
	originalPrice: 12
}
export const testCartWithMultiples: ICartState = {
	coupon: {
		code: '',
		discount: '',
		loading: false,
		product_ids: [],
		submitted: false,
		type: '',
		valid: false
	},
	isOpen: false,
	items: {
		[ProductKey.WatercolorStd]: {
			licenseType: LicenseEnum.standard,
			bulkDiscount: false,
			id: testProducts[ProductKey.WatercolorStd].product_id,
			name: testProducts[ProductKey.WatercolorStd].name,
			price: testProducts[ProductKey.WatercolorStd].price,
			qty: 1,
			slug: testProducts[ProductKey.WatercolorStd].slug
		},
		[ProductKey.Skinnyjeans]: {
			licenseType: LicenseEnum.standard,
			bulkDiscount: false,
			id: testProducts[ProductKey.Skinnyjeans].product_id,
			name: testProducts[ProductKey.Skinnyjeans].name,
			price: testProducts[ProductKey.Skinnyjeans].price,
			qty: 1,
			slug: testProducts[ProductKey.Skinnyjeans].slug
		}
	},
	loaded: true,
	paymentType: 'Stripe',
	totalItems: 2,
	totalPrice: 25.99,
	originalPrice: 25.99
}
export const testCartWithMultiplesFixedCartCoupon: ICartState = {
	coupon: {
		code: 'fixed_cart',
		discount: '12.54',
		loading: false,
		product_ids: [],
		submitted: true,
		type: 'fixed_cart',
		valid: true
	},
	isOpen: false,
	items: {
		...testCartWithMultiples.items
	},
	loaded: true,
	paymentType: 'Stripe',
	totalItems: 2,
	totalPrice: 25.99,
	originalPrice: 25.99
}
export const testCartWithMultiplesFixedCartCouponWithFREEITEM: ICartState = {
	coupon: {
		code: 'fixed_cart',
		discount: '12.54',
		loading: false,
		product_ids: [],
		submitted: true,
		type: 'fixed_cart',
		valid: true
	},
	isOpen: false,
	items: {
		...testCartWithMultiples.items,
		[ProductKey.Honeymoon]: {
			licenseType: LicenseEnum.standard,
			bulkDiscount: false,
			id: testProducts[ProductKey.Honeymoon].product_id,
			name: testProducts[ProductKey.Honeymoon].name,
			price: testProducts[ProductKey.Honeymoon].price,
			qty: 1,
			slug: testProducts[ProductKey.Honeymoon].slug
		}
	},
	loaded: true,
	paymentType: 'Stripe',
	totalItems: 3,
	totalPrice: 25.99,
	originalPrice: 25.99
}
export const testCartWithMultiplesPercentCartCoupon: ICartState = {
	coupon: {
		code: 'percent_cart',
		discount: '33',
		loading: false,
		product_ids: [],
		submitted: true,
		type: 'percent',
		valid: true
	},
	isOpen: false,
	items: {
		...testCartWithMultiples.items
	},
	loaded: true,
	paymentType: 'Stripe',
	totalItems: 2,
	totalPrice: 25.99,
	originalPrice: 25.99
}
export const testCartWithMultiplesFixedSingleItemCoupon: ICartState = {
	coupon: {
		code: 'fixed-item',
		discount: '12.54',
		loading: false,
		product_ids: [222],
		submitted: true,
		type: 'fixed_product',
		valid: true
	},
	isOpen: false,
	items: {
		...testCartWithMultiples.items
	},
	loaded: true,
	paymentType: 'Stripe',
	totalItems: 2,
	totalPrice: 25.99,
	originalPrice: 25.99
}
export const testCartWithMultiplesPercentageSingleItemCoupon: ICartState = {
	coupon: {
		code: 'percent-item',
		discount: '33',
		loading: false,
		product_ids: [222],
		submitted: true,
		type: 'percent',
		valid: true
	},
	isOpen: false,
	items: {
		...testCartWithMultiples.items
	},
	loaded: true,
	paymentType: 'Stripe',
	totalItems: 2,
	totalPrice: 25.99,
	originalPrice: 25.99
}
export const testCartWithFreeItem: ICartState = {
	coupon: {
		code: '',
		discount: '',
		loading: false,
		product_ids: [],
		submitted: false,
		type: '',
		valid: false
	},
	isOpen: false,
	items: {
		[ProductKey.Honeymoon]: {
			licenseType: LicenseEnum.standard,
			bulkDiscount: false,
			id: testProducts[ProductKey.Honeymoon].product_id,
			name: testProducts[ProductKey.Honeymoon].name,
			price: testProducts[ProductKey.Honeymoon].price,
			qty: 1,
			slug: testProducts[ProductKey.Honeymoon].slug
		}
	},
	loaded: true,
	paymentType: 'Stripe',
	totalItems: 2,
	totalPrice: 0,
	originalPrice: 0
}

export const singleItemQuery: IGatsbyConfig & { wcProduct: IProduct } = {
	site: {
		siteMetadata: {
			...testSiteMetaDataQuery
		}
	},
	featureImage: {
		...featuredImage.localFile
	},
	wcProduct: {
		...singleProduct
	}
}
export const supportQuestionsTesting = [
	{
		slug: 'question-1',
		title: 'Question 1',
		excerpt: '<p>This is the excerpt</p>',
		content: '<p>This is the content</p>',
		acfSupportQuestions: {
			popularity: 1
		}
	},
	{
		slug: 'question-2',
		title: 'Question 2',
		excerpt: '<p>This is the excerpt</p>',
		content: '<p>This is the content</p>',
		acfSupportQuestions: {
			popularity: 2
		}
	},
	{
		slug: 'question-3',
		title: 'Question 3',
		excerpt: '<p>This is the excerpt</p>',
		content: '<p>This is the content</p>',
		acfSupportQuestions: {
			popularity: 7
		}
	}
]

export const CatPageQuery: IGatsbyConfig & ISupportCatQuery = {
	site: {
		siteMetadata: {
			...testSiteMetaDataQuery
		}
	},
	featureImage: {
		...featuredImage.localFile
	},
	wpgraphql: {
		categories: {
			nodes: [
				{
					count: 3,
					name: 'Getting Started',
					slug: 'getting-started',
					supportQuestions: {
						nodes: supportQuestionsTesting
					}
				}
			]
		}
	}
}

export const SupportQuestionOne = {
	slug: 'question-1',
	title: 'Question 1',
	excerpt: '<p>This is the excerpt</p>',
	content: '<p>This is the content</p>',
	acfSupportQuestions: {
		popularity: 1
	}
}
export const SupportQuestionPageQuery: IGatsbyConfig & ISupportQuestionQuery = {
	site: {
		siteMetadata: {
			...testSiteMetaDataQuery
		}
	},
	featureImage: {
		...featuredImage.localFile
	},
	pageContext: {
		content: SupportQuestionOne.content
	},
	wpgraphql: {
		supportQuestion: {
			...SupportQuestionOne
		}
	}
}

export const coupons = {
	rawValidFixedCart: {
		code: 200,
		data: {
			coupon: {
				id: 24,
				code: 'free-test',
				amount: '12.54',
				discount_type: 'fixed_cart',
				product_ids: [],
				excluded_product_ids: [],
				product_id: 24,
				isExpired: false
			}
		}
	},
	fixedCart: {
		code: 'free-test',
		discount: '12.54',
		loading: false,
		product_ids: [],
		submitted: true,
		type: 'fixed_cart',
		valid: true
	},
	fixedProduct: {
		code: 'fixed-item-test',
		discount: '12.54',
		loading: false,
		product_ids: [222],
		submitted: true,
		type: 'fixed_product',
		valid: true
	},
	percentCart: {
		code: 'percent-cart',
		discount: '33',
		loading: false,
		product_ids: [],
		submitted: true,
		type: 'percent',
		valid: true
	},
	percentItem: {
		code: 'percent-test',
		discount: '33',
		loading: false,
		product_ids: [222],
		submitted: true,
		type: 'percent',
		valid: true
	}
}

export const testUser: IUser = {
	email: 'spencer@gmail.com',
	firstName: 'spencer',
	lastName: 'bigum',
	token: '123456789',
	gravatar: '1123131313213',
	fbProfilePic: null
}
export const testFacebookUser: IUser = {
	email: 'spencer@gmail.com',
	firstName: 'spencer',
	lastName: 'bigum',
	token: '123456789',
	gravatar: '1123131313213',
	fbProfilePic: 'fb.com'
}

export const testGuest: IGuestFormData = {
	email: 'guest@gmail.com',
	firstName: 'guest',
	lastName: 'user'
}

export const testReceipt: IReceipt = {
	id: 667,
	total: '16',
	date: '02-12-22',
	status: 'completed',
	transactionId: 'abc123',
	payment_type: 'stripe',
	order_id: '667',
	email: 'spencer.bigum@gmail.com',
	date_completed: '02-12-22',
	totals: '16',
	subtotal: '16',
	cardType: 'Visa',
	discounts: '0', // 0 if no discount
	discount_reverse: 0, // 0 if no discount
	coupon_used: [], // will have one item if used
	downloads: {
		exp_date: 15252525,
		products: [
			{
				url: 'http://google.com',
				total: '16',
				sku: '01230',
				subtitle: 'Version 2.0',
				qty: 1,
				id: 222,
				name: 'Watercolor kit',
				filename: 'watercolor.zip'
			}
		]
	},
	refund: null
}

export const testPaginationEmpty: IPaginateState = {
	loading: false,
	pages: {},
	totalOrders: '0',
	totalPages: 0
}

export const testPaginationFull: IPaginateState = {
	loading: false,
	pages: {
		1: {
			667: {
				...testReceipt
			},
			668: {
				...testReceipt,
				id: 668,
				total: '56.00',
				date: '12-12-22'
			}
		}
	},
	totalOrders: '1',
	totalPages: 1
}
