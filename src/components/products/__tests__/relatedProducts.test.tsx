import RelatedProducts from '@components/products/modules/relatedProducts'
import RelatedProduct from '@components/products/modules/relatedProductWrapper'
import React from 'react'
import { render } from 'react-testing-library'
import { StaticQuery } from 'gatsby'
import renderer from 'react-test-renderer'

const defaultProps = [
	'watercolor-texture-kit-vol-1',
	'watercolor-texture-kit-vol-2'
]

beforeEach(() => {
	// @ts-ignore
	StaticQuery.mockImplementationOnce((mock: any) =>
		mock.render({
			site: {
				siteMetadata: {
					title: `Default`
				}
			},
			allWcProduct: {
				edges: [
					{
						node: {
							name: 'Dreamy Ink Textures',
							id: '46e80e85-da3a-5a1e-9ef3-bd46e38d1dd5',
							slug: 'watercolor-texture-kit-vol-1',
							sub_header: 'Alcohol Ink Texture Pack',
							price: '15',
							featuredImage: {
								alt: 'Dreamy Ink Texture Pack',
								localFile: {
									childImageSharp: {
										fluid: {
											aspectRatio: 12,
											srcSet: 'srcSet',
											sizes: '',
											src: '/static/dreamy-textures-800x500.jpg'
										}
									}
								}
							}
						}
					},
					{
						node: {
							name: 'Dreamy Ink Textures 2',
							id: '46e80e85-da3a-5a1e-6666-bd46e38d1dd5',
							slug: 'watercolor-texture-kit-vol-2',
							sub_header: 'Alcohol Ink Texture Pack',
							price: '15',
							featuredImage: {
								alt: 'Dreamy Ink Texture Pack',
								localFile: {
									childImageSharp: {
										fluid: {
											aspectRatio: 12,
											srcSet: 'srcSet',
											sizes: '',
											src: '/static/dreamy-textures-800x500.jpg'
										}
									}
								}
							}
						}
					}
				]
			}
		})
	)
})

const data = {
	site: {
		siteMetadata: {
			title: `Default`
		}
	},
	allWcProduct: {
		edges: [
			{
				node: {
					name: 'Dreamy Ink Textures',
					id: '46e80e85-da3a-5a1e-9ef3-bd46e38d1dd5',
					slug: 'watercolor-texture-kit-vol-1',
					sub_header: 'Alcohol Ink Texture Pack',
					price: '15',
					featuredImage: {
						alt: 'Dreamy Ink Texture Pack',
						localFile: {
							childImageSharp: {
								fluid: {
									aspectRatio: 12,
									srcSet: 'srcSet',
									sizes: '',
									src: '/static/dreamy-textures-800x500.jpg'
								}
							}
						}
					}
				}
			},
			{
				node: {
					name: 'Dreamy Ink Textures 2',
					id: '46e80e85-da3a-5a1e-6666-bd46e38d1dd5',
					slug: 'watercolor-texture-kit-vol-2',
					sub_header: 'Alcohol Ink Texture Pack',
					price: '15',
					featuredImage: {
						alt: 'Dreamy Ink Texture Pack',
						localFile: {
							childImageSharp: {
								fluid: {
									aspectRatio: 12,
									srcSet: 'srcSet',
									sizes: '',
									src: '/static/dreamy-textures-800x500.jpg'
								}
							}
						}
					}
				}
			}
		]
	}
}
describe('Related Products', () => {
	it('Related Products renders correctly', () => {
		const tree = renderer
			.create(
				<RelatedProducts products={defaultProps} data={data}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Related Product renders correctly', () => {
		const tree = renderer
			.create(
				<RelatedProduct slug={defaultProps[0]} data={data}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render number of related Products', () => {
		const modalRender = render(<RelatedProducts products={defaultProps} data={data}/>)
		expect(modalRender.getByTestId('productsList').children.length).toEqual(2)
	})

	it('Should render number of related Products', () => {
		const modalRender = render(<RelatedProduct slug={defaultProps[0]} data={data}/>)
		expect(modalRender.getByTestId('listItem').children.length).toEqual(1)
	})
})
