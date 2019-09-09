import FontPreviewBtn from '@components/products/modules/fontPreviewBtn'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import React, { useEffect } from 'react'
import styled from 'styled-components'

interface IProps {
	intro_title: string
	intro_description: string
}

const ProductDescription = (props: IProps) => {
	const { intro_description, intro_title } = props

	function createDesc () { return { __html: intro_description.toString() } }

	useEffect(() => {
		setTimeout(() => {
			const elmnt = document.getElementById('desc')
			if (elmnt) {
				elmnt.scrollIntoView()
			}
		}, 300)

	})
	return (
		<>
			<SubTitle>Description</SubTitle>
			<Title>{intro_title}</Title>
			<Desc dangerouslySetInnerHTML={createDesc()}/>
			<FontPreviewBtn/>
		</>
	)
}

const SubTitle = styled.span`
	grid-column: 2 / 4;
	font-size: 12px;
	font-weight: 500;
	color: ${colors.primary.text};
	text-transform: uppercase;
	text-align: center;
`
const Title = styled.h3`
	color: ${colors.primary.headline};
	${Sentinel.italic};
	font-size: 38px;
	line-height: 52px;
	font-weight: 500;
	text-align: center;
	grid-column: 2 / 4;
`
const Desc = styled.div`
	grid-column: 2 / 4;
	p{
		color: ${colors.primary.headline};
		&:first-child{
			font-size: 21px;
		}
	}

`
export default ProductDescription
