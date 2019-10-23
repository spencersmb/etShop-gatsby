import { coupons, testCartWithMultiples, testFacebookUser, testUser } from '@redux/reduxTestUtils'
import { getCartTotal } from '@utils/cartUtils'
import { getUserImage, jsonldImages, matchString, socialUtils, twitterDefaultMeta } from '@utils/genUtils'
import { cleanup } from 'react-testing-library'

afterEach(cleanup)

describe('General Utils', () => {
	it('Should return true or false matching a regex string', () => {
		const matchRegex = matchString('http://siteurl.com/v1/jwt-auth/', 'jwt-auth')
		const matchNoRegex = matchString('http://siteurl.com/v1/wp-json/', 'jwt-auth')
		expect(matchRegex).toEqual(true)
		expect(matchNoRegex).toEqual(false)
	})
	it('Should return default twitter card', () => {
		const card = twitterDefaultMeta()
		const result = [
			{
				name: `twitter:card`,
				content: `summary`
			},
			{
				name: `twitter:title`,
				content: `${process.env.GATSBY_TITLE}`
			},
			{
				name: `twitter:description`,
				content: `${process.env.GATSBY_DESCRIPTION}`
			},
			{
				name: `twitter:creator`,
				content: `${socialUtils.twitter.author}`
			},
			{
				name: `twitter:site	`,
				content: `${socialUtils.twitter.url}`
			},
			{
				name: `twitter:url`,
				content: `${socialUtils.twitter.url}`
			},
			{
				name: `twitter:image`,
				content: `${socialUtils.twitter.defaultImage}`
			}
		]
		expect(card).toEqual(result)
	})
	it('Should return default twitter card + new items', () => {
		const card = twitterDefaultMeta([
			{
				name: `twitter:card`,
				content: `summary_large_image`
			},
			{
				name: `twitter:title`,
				content: `@Spencer`
			},
			{
				name: `twitter:description`,
				content: `New Desc`
			},
			{
				name: `twitter:image`,
				content: `img url`
			}
		])
		const result = [
			{
				name: `twitter:card`,
				content: `summary_large_image`
			},
			{
				name: `twitter:title`,
				content: `@Spencer`
			},
			{
				name: `twitter:description`,
				content: `New Desc`
			},
			{
				name: `twitter:image`,
				content: `img url`
			},
			{
				name: `twitter:creator`,
				content: `${socialUtils.twitter.author}`
			},
			{
				name: `twitter:site	`,
				content: `${socialUtils.twitter.url}`
			},
			{
				name: `twitter:url`,
				content: `${socialUtils.twitter.url}`
			}
		]
		expect(card).toEqual(result)
	})
	it('Should return string array from Product Image array type', () => {
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
							src: 'image-url'
						},
						fullWidth: {
							src: 'image-url'
						}
					}
				}
			}
		]
		expect(jsonldImages(images)).toEqual([
			'image-url'
		])
	})
	it('Coupon Fixed-Cart: Should return correct total.', () => {
		const total = getCartTotal(testCartWithMultiples.items, coupons.fixedCart)
		const result = { 'discountedTotal': 13.45, 'total': 25.99 }
		expect(total).toEqual(result)
	})
	it('Coupon Percent-Cart: Should return correct total.', () => {
		const total = getCartTotal(testCartWithMultiples.items, coupons.percentCart)
		const result = { 'discountedTotal': 17.41, 'total': 25.99 }
		expect(total).toEqual(result)
	})
	it('Coupon Percent-SingleItem: Should return correct total.', () => {
		const total = getCartTotal(testCartWithMultiples.items, coupons.percentItem)
		// single item 10.72 + 9.99
		const result = { 'discountedTotal': 20.71, 'total': 25.99 }
		expect(total).toEqual(result)
	})
	it('Coupon Fixed-SingleItem: Should return correct total.', () => {
		const total = getCartTotal(testCartWithMultiples.items, coupons.fixedProduct)
		const result = { 'discountedTotal': 13.45, 'total': 25.99 }
		expect(total).toEqual(result)
	})
	it('Should return fb pic for user', () => {
		const userImg = getUserImage(testFacebookUser)
		expect(userImg.src).toEqual('fb.com')
		expect(userImg.alt).toEqual('facebook image')
	})
	it('Should return gravatar pic for user', () => {
		const userImg = getUserImage(testUser)
		expect(userImg.src).toEqual(`https://www.gravatar.com/avatar/${testUser.gravatar}`)
		expect(userImg.alt).toEqual('user image')
	})
})
