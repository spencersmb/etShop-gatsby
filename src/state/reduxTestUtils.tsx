// this is a handy function that I normally make available for all my tests
import { ICartState } from '@et/types/Cart'
import { IGatsbyConfig } from '@et/types/Gatsby'
import { IProduct, IProducts } from '@et/types/Products'
import { IUser } from '@et/types/User'
import { IGuestFormData } from '@et/types/WC_Order'
import React from 'react'
import initialState from '@redux/reducers/initialState'
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
		extended: false,
		id: 222,
		name: 'Watercolor texture kit Vol. 1',
		price: '16',
		qty: 1,
		slug: 'watercolor-texture-kit-vol-1'
	}
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
	description: 'description',
	short_description: 'short desc',
	on_sale: false,
	features: {
		description: 'feature desc',
		items: {
			description: 'item desc',
			icon: 'icon',
			title: 'singleItemQuery title'
		}
	},
	categories: [
		{ id: 1, slug: 'fonts', name: 'Fonts' },
		{ id: 2, slug: 'Watercolor', name: 'Watercolor' }
	],
	images: [
		{
			id: 123414,
			alt: 'alt',
			fullSize: {
				url: 'fullsize-url'
			},
			thumbnail: {
				url: 'image-url'
			}
		}
	],
	license: {
		hasExtendedLicense: true,
		type: 'standard',
		extendedItem: {
			slug: 'watercolor-texture-kit-vol-1-ext'
		}
	},
	seo: {
		desc: 'Add serious vibrant color and detail with this kit packed with 32 unique watercolor textures, 12 seamless, repeatable watercolor texture patterns and 2 bonus watercolor paper patterns.',
		title: 'Watercolor texture kit Vol. 1'
	},
	tags: [
		{ id: 1, name: 'Texture Kit', slug: 'texture-kit' },
		{ id: 2, name: 'Waterbrush', slug: 'waterbrush' }
	],
	localFile: {
		name: 'file name',
		id: '1234',
		childImageSharp: {
			fluid: {
				src: 'src'
			},
			fixed: {
				width: '400',
				height: '400',
				src: 'src'
			}
		}
	}
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
		description: 'description',
		short_description: 'short desc',
		on_sale: false,
		features: {
			description: 'feature desc',
			items: {
				description: 'item desc',
				icon: 'icon',
				title: 'singleItemQuery title'
			}
		},
		categories: [
			{ id: 1, slug: 'fonts', name: 'Fonts' },
			{ id: 2, slug: 'Watercolor', name: 'Watercolor' }
		],
		images: [
			{
				id: 123414,
				alt: 'alt',
				fullSize: {
					url: 'fullsize-url'
				},
				thumbnail: {
					url: 'image-url'
				}
			}
		],
		license: {
			hasExtendedLicense: true,
			type: 'standard',
			extendedItem: {
				slug: 'watercolor-texture-kit-vol-1-ext'
			}
		},
		seo: {
			desc: 'Add serious vibrant color and detail with this kit packed with 32 unique watercolor textures, 12 seamless, repeatable watercolor texture patterns and 2 bonus watercolor paper patterns.',
			title: 'Watercolor texture kit Vol. 1'
		},
		tags: [
			{ id: 1, name: 'Texture Kit', slug: 'texture-kit' },
			{ id: 2, name: 'Waterbrush', slug: 'waterbrush' }
		],
		localFile: {
			name: 'file name',
			id: '1234',
			childImageSharp: {
				fluid: {
					src: 'src'
				},
				fixed: {
					width: '400',
					height: '400',
					src: 'src'
				}
			}
		}
	},
	[ProductKey.WatercolorExt]: {
		type: 'simple',
		date_created_gmt: '2018-09-25T20:35:51',
		date_modified_gmt: '2019-02-18T21:44:25',
		id: '202eca74-fc90-56e7-8269-b59f18a19194',
		name: 'Watercolor texture kit Vol. 1',
		price: '20',
		product_id: 40,
		pwyw: false,
		regular_price: '20',
		sale_price: '',
		slug: 'watercolor-texture-kit-vol-1-ext',
		description: 'description',
		short_description: 'short desc',
		on_sale: false,
		features: {
			description: 'feature desc',
			items: {
				description: 'item desc',
				icon: 'icon',
				title: 'singleItemQuery title'
			}
		},
		categories: [
			{ id: 1, slug: 'fonts', name: 'Fonts' },
			{ id: 2, slug: 'Watercolor', name: 'Watercolor' }
		],
		images: [
			{
				id: 123414,
				alt: 'alt',
				fullSize: {
					url: 'fullsize-url'
				},
				thumbnail: {
					url: 'image-url'
				}
			}
		],
		license: {
			hasExtendedLicense: true,
			type: 'extended',
			standardItem: {
				slug: 'watercolor-texture-kit-vol-1'
			}
		},
		seo: {
			desc: 'Add serious vibrant color and detail with this kit packed with 32 unique watercolor textures, 12 seamless, repeatable watercolor texture patterns and 2 bonus watercolor paper patterns.',
			title: 'Watercolor texture kit Vol. 1 Ext'
		},
		tags: [
			{ id: 1, name: 'Texture Kit', slug: 'texture-kit' },
			{ id: 2, name: 'Waterbrush', slug: 'waterbrush' }
		],
		localFile: {
			name: 'file name',
			id: '1234',
			childImageSharp: {
				fluid: {
					src: 'src'
				},
				fixed: {
					width: '400',
					height: '400',
					src: 'src'
				}
			}
		}
	},
	[ProductKey.Honeymoon]: {
		type: 'simple',
		date_created_gmt: '2018-09-25T20:35:51',
		date_modified_gmt: '2019-02-18T21:44:25',
		id: '202eca74-fc90-56e7-8269-b59f18a19194',
		name: 'Honeymoon',
		price: '0',
		product_id: 352,
		pwyw: true,
		regular_price: '0',
		sale_price: '',
		slug: 'honeymoon',
		description: 'description',
		short_description: 'short desc',
		on_sale: false,
		features: {
			description: 'feature desc',
			items: {
				description: 'item desc',
				icon: 'icon',
				title: 'singleItemQuery title'
			}
		},
		categories: [
			{ id: 1, slug: 'fonts', name: 'Fonts' }
		],
		images: [
			{
				id: 123414,
				alt: 'alt',
				fullSize: {
					url: 'fullsize-url'
				},
				thumbnail: {
					url: 'image-url'
				}
			}
		],
		license: {
			hasExtendedLicense: false,
			type: 'standard'
		},
		seo: {
			desc: 'Add serious vibrant color and detail with this kit packed with 32 unique watercolor textures, 12 seamless, repeatable watercolor texture patterns and 2 bonus watercolor paper patterns.',
			title: 'Honeymoon seo title'
		},
		tags: [],
		localFile: {
			name: 'file name',
			id: '1234',
			childImageSharp: {
				fluid: {
					src: 'src'
				},
				fixed: {
					width: '400',
					height: '400',
					src: 'src'
				}
			}
		}
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
		description: 'description',
		short_description: 'short desc',
		on_sale: true,
		features: {
			description: 'feature desc',
			items: {
				description: 'item desc',
				icon: 'icon',
				title: 'singleItemQuery title'
			}
		},
		categories: [
			{ id: 1, slug: 'fonts', name: 'Fonts' }
		],
		images: [
			{
				id: 123414,
				alt: 'alt',
				fullSize: {
					url: 'fullsize-url'
				},
				thumbnail: {
					url: 'image-url'
				}
			}
		],
		license: {
			hasExtendedLicense: false,
			type: 'standard'
		},
		seo: {
			desc: 'Add serious vibrant color and detail with this kit packed with 32 unique watercolor textures, 12 seamless, repeatable watercolor texture patterns and 2 bonus watercolor paper patterns.',
			title: 'Skinny Jeans seo title'
		},
		tags: [],
		localFile: {
			name: 'file name',
			id: '1234',
			childImageSharp: {
				fluid: {
					src: 'src'
				},
				fixed: {
					width: '400',
					height: '400',
					src: 'src'
				}
			}
		}
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
			extended: false,
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
			extended: false,
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
			extended: false,
			id: testProducts[ProductKey.WatercolorStd].product_id,
			name: testProducts[ProductKey.WatercolorStd].name,
			price: testProducts[ProductKey.WatercolorStd].price,
			qty: 1,
			slug: testProducts[ProductKey.WatercolorStd].slug
		},
		[ProductKey.Skinnyjeans]: {
			extended: false,
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
			extended: false,
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
			extended: false,
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
	wcProduct: {
		...singleProduct
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
	token: '123456789'
}

export const testGuest: IGuestFormData = {
	email: 'guest@gmail.com',
	firstName: 'guest',
	lastName: 'user'
}