import RelatedSupportArticles from '@components/support/relatedArticles'
import SupportBreadCrumb from '@components/support/supportBreadCrumb'
import { ICategory } from '@et/types/Support'
import { device } from '@styles/global/breakpoints'
import { ButtonReg } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { Link } from 'gatsby'
import React from 'react'
import contentParser from 'gatsby-wpgraphql-inline-images'
import styled from 'styled-components'
import { SupportPageContainer } from '../../pages/support'

interface IProps {
	id: string
	content: string,
	title: string
	categories: ICategory[]
}

const SupportPageContent = (props: IProps) => {
	const pluginOptions = {
		wordPressUrl: `${process.env.GATSBY_DB}`,
		uploadsUrl: `${process.env.GATSBY_DB}/wp-content/uploads/`
	}
	console.log('question content props', props)
	const category = props.categories[0]

	const { content, title, id } = props
	return (
		<PageContainer>
			<article>
				<PageHeader>
					<SupportBreadCrumb title={title}/>
					<h1 data-testid={'title'}>{title}</h1>
				</PageHeader>
				<Content data-testid={'content'}>
					{contentParser({ content }, pluginOptions)}
				</Content>
			</article>
			<RelatedSupportArticles
				selectedId={id}
				supportQuestions={category.supportQuestions.nodes}
			/>
			<Container>
				<h3 data-testid={'contact-title'}>Not finding what you are looking for?</h3>
				<a href='https://every-tuesday.com/contact/' target='_blank'>
					<ButtonReg
						data-testid={`contactBtn`}
						color={colors.teal.i500}
						textColor={`#fff`}
						hoverColor={colors.teal.i800}
						hoverTextColor={'#fff'}
						outline={false}
					>CONTACT US</ButtonReg>
				</a>
			</Container>
		</PageContainer>
	)
}
const Container = styled.section`
 grid-column: 1 / -1;
 display: flex;
 justify-content: center;
 flex-direction: column;
 align-items: center;
 padding: 40px 0;
 
 h3{
 	${Sentinel.semiboldItalic};
 	color: ${colors.primary.headline};
 	font-size: 28px;
 	line-height: 36px;
 	font-weight: 300;
 	margin-bottom: 25px;
 	text-align: center;
 }
 
 @media ${device.tablet} {
 	padding: 60px 0;
 	h3{
 		font-size: 36px;
 		line-height: 48px;
 	}
 }
 	
`
const Content = styled.div`
	padding: 20px 0;
	display: flex;
	flex-direction: column;
	
	h2{
		font-size: 36px;
		margin: 1.72em 0 0;
	}
	h3{
		font-size: 22px;
		margin: 1.72em 0 0;
	}
	
	h2, h3, h4, h5{
		${Sentinel.reg};
		color: ${colors.primary.headline};
	}
	
	p, li{
		color: ${colors.primary.text};
	}
	
	a{
		color: ${colors.teal.i500};
	}
	
	p{
		font-size: 18px;
		line-height: 1.58;
		letter-spacing: -0.004em;
		color: ${colors.primary.text};
		margin-top: 0.86em;
		margin-bottom: 0;
	}
	
	.wp-block-image{
		margin: 2.72em 0 1.86em;
	}
	
	ul, ol{
		margin: 0;
		padding: 0;
	}
	
	ol{
		font-weight: bold;
	}
	ul{
		padding-left: 20px;
		margin-top: 0.86em;
		li{
			font-size: 18px;
		}
	}
	ol{
		padding-left: 25px;
		margin-top: 0.86em;
		li{
			margin-top: 0.43em;
			font-size: 26px;
		}
	}
`
const PageHeader = styled.div`
	text-align: left;
	padding: 30px 0 0;

	& > div{
		align-items: flex-start;
		justify-content: flex-start;
		color: rgba(0, 0, 0, 0.54);
		a{
			color: rgba(0, 0, 0, 0.54);
		}
	}
	
	h1{
		margin: 0;
		${Sentinel.reg};
		color: ${colors.primary.headline};
		font-size: 40px;
		line-height: 40px;
		font-weight: 400;
	}
	
	@media ${device.tablet} {
		padding: 50px 0 0;
		h1{
			max-width: 575px;
			font-size: 52px;
			line-height: 58px;
		}
	}
`
const PageContainer = styled(SupportPageContainer)`
	@supports(display: grid){
		grid-row-gap: 0;
	}
	
	article{
		grid-column: 2/4;
		display: flex;
		flex-direction: column;
		margin-bottom: 40px;

		
		@media ${device.tablet} {
			grid-column: 2 / 14;
			margin: 0 auto 40px;
			max-width: 680px
		}		
		
		@media ${device.laptop} {
			grid-column: 3 / 13;
			margin: 0 auto 40px;
		}
			
	}
`
export default SupportPageContent
