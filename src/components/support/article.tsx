import { ISupportQuestion } from '@et/types/Support'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const RelatedArticle = (props: ISupportQuestion) => {
	const { title, acfSupportQuestions: { subtitle }, slug } = props
	return (
		<Container data-testid={'articleItem'}>
			<Link to={`/support/${slug}`}>
				<h4 className='title' data-testid={'title'}>{title}</h4>
				<p className='excerpt' data-testid={'subtitle'}>{subtitle}</p>
			</Link>
		</Container>
	)
}
const Container = styled.div`
	margin-bottom: 20px;
	padding: 0 15px;
	
	.title{
		${Sentinel.reg};
		color: ${colors.primary.headline};
		font-size: 27px;
		line-height: 32px;
		transition: .3s;
	}
	
	.excerpt{
		margin-top: .86em;
		font-size: 18px;
		color: ${colors.secondary.text};
		line-height: 1.58;
		letter-spacing: -0.004em;
	}
	
	@media ${device.tablet} {
		margin-bottom: 0;
	}
	
	@media ${device.laptop} {
		&:hover{
			.title{
				color: ${colors.teal.i500};
			}
		}
	}
		
`
export default RelatedArticle
