import GatsbyImgMedium from '@components/images/gatsbyImgMedium'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import {
	SMBarContainer,
	SMIcon,
	SMContentContainer,
	SMTitle,
	SMCat,
	SMDesc,
	SMButton,
	SMImage
} from '@styles/modules/socialMedia'

interface IProps {
	type: string
	cat: string
	title: string
	description: string
	buttonText: string
	link: string
	svg: string
	svgColor: string,
	staticImagePath?: string
}

const SocialBarItem = (props: IProps) => {
	const { svg, type, svgColor, cat, title, description, buttonText, link, staticImagePath } = props
	return (
		<SMBarContainer data-testid={`item`}>
			{staticImagePath
				? <SMImage data-testid={'img'} type={type}>
					<GatsbyImgMedium
						imgName={staticImagePath}
						altTag={title}
						fade={true}/>
				</SMImage>
				: <SMIcon data-testid={'icon'} type={type} color={svgColor}>
					{renderSvg(svgs[svg])}
				</SMIcon>}
			<SMContentContainer>
				<SMCat data-testid={'cat'}>{cat}</SMCat>
				<SMTitle data-testid={'title'}>
					{title}
				</SMTitle>
				<SMDesc data-testid={'desc'}>
					{description}
				</SMDesc>
			</SMContentContainer>
			<SMButton data-testid={'btn'} href={link} target={`_blank`} rel='noreferrer'>
				{buttonText}
			</SMButton>
		</SMBarContainer>
	)
}
export default SocialBarItem
