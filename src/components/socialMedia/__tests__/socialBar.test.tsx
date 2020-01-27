import FeatureItem from '@components/products/modules/features/featureItem'
import SocialBarItem from '@components/socialMedia/socialBarItem'
import { StaticQuery } from 'gatsby'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const propsDefault = {
	type: 'youtube-tuts',
	cat: 'youtube',
	title: 'Looking for free tutorials?',
	description: 'You can also find me every Tuesday sharing a new design, Procreate or lettering tutorial on YouTube',
	svg: 'Youtube',
	buttonText: 'watch',
	link: 'https://youtube.com/everytues',
	svgColor: '#fff'
}
const propsImage = {
	type: 'procreateBeg-course',
	cat: 'Free Course',
	title: 'Procreate for Beginners',
	description: 'If you’re new to Procreate, check out my free course, Procreate for Beginners!',
	svg: 'Youtube',
	buttonText: 'Enroll',
	link: 'https://every-tuesday.com/procreate-for-beginners',
	svgColor: '#fff',
	staticImagePath: 'procreateLogo.png'
}
describe('Feature Item Test', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(
				<SocialBarItem {...propsDefault}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render correct title', () => {
		const modalRender = render(<SocialBarItem {...propsDefault}/>)
		expect(modalRender.getByTestId('title').innerHTML).toEqual(propsDefault.title)
	})
	it('Should render correct description', () => {
		const modalRender = render(<SocialBarItem {...propsDefault}/>)
		expect(modalRender.getByTestId('desc').innerHTML).toEqual(propsDefault.description)
	})
	it('Should render correct cat', () => {
		const modalRender = render(<SocialBarItem {...propsDefault}/>)
		expect(modalRender.getByTestId('cat').innerHTML).toEqual(propsDefault.cat)
	})
	it('Should render correct icon', () => {
		const modalRender = render(<SocialBarItem {...propsDefault}/>)
		expect(modalRender.queryAllByTestId('icon').length).toEqual(1)
	})
	it('Should render correct btn', () => {
		const modalRender = render(<SocialBarItem {...propsDefault}/>)
		const btn = modalRender.getByTestId('btn')
		expect(btn.innerHTML).toEqual(propsDefault.buttonText)
		expect(btn.getAttribute('href')).toEqual(propsDefault.link)
	})
	it('Should render an Image', () => {
		// @ts-ignore
		StaticQuery.mockImplementationOnce((mock: any) =>
			mock.render({
				allFile: {
					edges: [
						{
							node: {
								name: 'Dreamy Ink Textures',
								id: '46e80e85-da3a-5a1e-9ef3-bd46e38d1dd5',
								relativePath: 'procreateLogo.png',
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
					]
				}
			})
		)
		const modalRender = render(<SocialBarItem {...propsImage}/>)
		expect(modalRender.queryAllByTestId('img').length).toEqual(1)
	})
})
