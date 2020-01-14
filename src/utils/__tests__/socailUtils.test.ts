import { testFacebookUser, testUser } from '@redux/reduxTestUtils'
import { getUserImage } from '@utils/genUtils'
import { jsonldImages, socialConfig, twitterDefaultMeta } from '@utils/socialUtils'
import { cleanup } from 'react-testing-library'

afterEach(cleanup)

describe('General Utils', () => {

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
				content: `${socialConfig.twitter.author}`
			},
			{
				name: `twitter:site	`,
				content: `${socialConfig.twitter.url}`
			},
			{
				name: `twitter:url`,
				content: `${socialConfig.twitter.url}`
			},
			{
				name: `twitter:image`,
				content: `${socialConfig.twitter.defaultImage}`
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
				content: `${socialConfig.twitter.author}`
			},
			{
				name: `twitter:site	`,
				content: `${socialConfig.twitter.url}`
			},
			{
				name: `twitter:url`,
				content: `${socialConfig.twitter.url}`
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
