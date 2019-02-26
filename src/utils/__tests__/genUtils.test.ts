import { jsonldImages, matchString, socialUtils, twitterDefaultMeta } from '@utils/genUtils'
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
				content: `${process.env.TITLE}`
			},
			{
				name: `twitter:description`,
				content: `${process.env.DESCRIPTION}`
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
				}
			}
		]
		expect(jsonldImages(images)).toEqual([
			'image-url'
		])
	})
})