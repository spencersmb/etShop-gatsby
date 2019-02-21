// this is a handy function that I normally make available for all my tests
import { ICartState } from '@et/types/Cart'
import { IGatsbyConfig } from '@et/types/Gatsby'
import { IProduct } from '@et/types/Products'
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

export const singleItemQuery: IGatsbyConfig & { wcProduct: IProduct } = {
	site: {
		siteMetadata: {
			...testSiteMetaDataQuery
		}
	},
	wcProduct: {
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
}

export const testCartEmpty: ICartState = {
	couponCode: {
		code: 'string',
		discount: 'string',
		loading: false,
		product_ids: [],
		submitted: false,
		type: 'string',
		valid: false,
	},
	isOpen: false,
	items: {
	},
	loaded: true,
	paymentType: 'Stripe',
	totalItems: 0,
	totalPrice: 0
}
