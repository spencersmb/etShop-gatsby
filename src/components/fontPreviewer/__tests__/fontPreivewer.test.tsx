import FontPreviewer from '@components/fontPreviewer/fontPreview'
import React from 'react'
import { render } from 'react-testing-library'

const defaultProps = {
	styles: [
		{
			font_family: 'skinny',
			font_files: [
				{
					type: 'woff',
					localFile: {
						absolutePath: '/Users/spencerbigum/Documents/github/etShop-gatsby/.cache/gatsby-source-filesystem/94c7bad62f5c08a09fb087e392ba6ff6/SkinnyJeans-Script.woff',
						publicURL: '/static/SkinnyJeans-Script-39a663ddf576d43e081ab39d43ffc9ec.woff',
						relativePath: '.cache/gatsby-source-filesystem/94c7bad62f5c08a09fb087e392ba6ff6/SkinnyJeans-Script.woff'
					}
				}
			],
			type: 'Script'
		}
	]
}
describe('Font Preview', () => {
	it('Should render slider component', () => {
		const modalRender = render(<FontPreviewer {...defaultProps}/>)
		expect(modalRender.getByTestId('slider')).toBeTruthy()
	})
	it('Should have default font size', () => {
		const modalRender = render(<FontPreviewer {...defaultProps}/>)
		expect(modalRender.getByTestId('fontSize').innerHTML).toEqual('25px')
	})
	it('Should call open the features panel on click', () => {
		const modalRender = render(<FontPreviewer {...defaultProps}/>)
		const button = modalRender.getByTestId('featuresToggle')
		button.click()
		const container = modalRender.getByTestId('checkboxContainer')
		const classArray = Object.keys(container.classList).map(key => container.classList[key])
		expect(classArray.indexOf('open') > 0).toEqual(true)
	})
	it('Should have correct number of checkboxes and onClick works', () => {
		const modalRender = render(<FontPreviewer {...defaultProps}/>)
		const checkbox1 = modalRender.getByLabelText('calt')
		const checkbox2 = modalRender.getByLabelText('liga')
		const checkbox3 = modalRender.getByLabelText('dlig')
		const checkbox4 = modalRender.getByLabelText('salt')
		checkbox1.click()
		// console.log('check', modalRender.getByLabelText('calt'))
		expect(checkbox1).toHaveProperty('checked', true)
		expect(checkbox1).toBeDefined()
		expect(checkbox2).toBeDefined()
		expect(checkbox3).toBeDefined()
		expect(checkbox4).toBeDefined()
	})
	it('Should have correct number of fonts listed', () => {
		const modalRender = render(<FontPreviewer {...defaultProps}/>)
		const list = modalRender.getByTestId('fontsList')
		const item = modalRender.getByTestId('font-0')
		expect(list.children.length).toEqual(1)
		expect(item.style['font-family']).toEqual('skinny')
		expect(item.style['font-size']).toEqual('25px')
		expect(item.innerHTML).toEqual('<span>Script</span>When zombies arrive, quickly fax judge Pat')
	})

})
