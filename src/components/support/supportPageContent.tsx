import { SocialMediaWrapper } from '@components/products/productLayout'
import SocialMediaBars from '@components/socialMedia/socialBars'
import RelatedSupportArticles from '@components/support/relatedArticles'
import SupportBreadCrumb from '@components/support/supportBreadCrumb'
import { IBarType } from '@et/types/Products'
import { ICategory } from '@et/types/Support'
import { device } from '@styles/global/breakpoints'
import { ButtonReg } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import React from 'react'
import contentParser from 'gatsby-wpgraphql-inline-images'
import styled from 'styled-components'
import { SupportPageContainer } from '../../pages/support'

interface IProps {
	id: string
	content: string,
	title: string
	categories: ICategory[],
	socialMedia: IBarType[] | null
}

const SupportPageContent = (props: IProps) => {
	const pluginOptions = {
		wordPressUrl: `${process.env.GATSBY_DB}`,
		uploadsUrl: `${process.env.GATSBY_DB}/wp-content/uploads/`
	}
	const category = props.categories[0]
	const { content, title, id, socialMedia } = props

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
			{socialMedia && socialMedia.length > 0 &&
      <SocialMediaContainer className={`supportPage`}>
        <SocialMediaBars bars={socialMedia}/>
      </SocialMediaContainer>
			}
			<RelatedSupportArticles
				selectedId={id}
				supportQuestions={category.supportQuestions.nodes}
			/>
			<Container>
				<h3 data-testid={'contact-title'}>Not finding what you are looking for?</h3>
				<a
					href='https://every-tuesday.com/contact/'
					target='_blank' rel='noreferrer'>
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
const SocialMediaContainer = styled(SocialMediaWrapper)`
	grid-row: auto;
	padding-top: 0;	
	@media ${device.tablet}{
		grid-column: 2 / 14;
		max-width: 680px;
		margin: 0 auto;
	}
		
	@media ${device.laptop} {
		grid-row: auto;
		padding: 0;
	}
		
`
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
		color: ${colors.db.primary};
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

	h1{
		${Sentinel.reg};
		color: ${colors.primary.headline};
		font-size: 40px;
		line-height: 40px;
		font-weight: 400;
		text-align: center;
    margin: 0 auto;
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

		@media ${device.tablet} {
			grid-column: 2 / 14;
			margin: 0 auto;
			max-width: 680px
		}		
		
		@media ${device.laptop} {
			grid-column: 3 / 13;
			margin: 0 auto;
		}
			
	}
`
export default SupportPageContent
