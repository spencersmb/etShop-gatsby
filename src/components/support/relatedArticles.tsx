import RelatedArticle from '@components/support/article'
import { ISupportQuestion } from '@et/types/Support'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { orderByPopularity } from '@utils/genUtils'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	selectedId: string
	supportQuestions: ISupportQuestion[]
}

const RelatedSupportArticles = (props: IProps) => {
	const { supportQuestions, selectedId } = props
	const filterOutDuplicateCourse = supportQuestions
		.filter(question => (question.id !== selectedId))
		.sort(orderByPopularity)
		.slice(0, 3)

	return (
		<Container>
			<RelatedItemsList>
				<h2 data-testid={'header'}>Related Articles</h2>
				{filterOutDuplicateCourse.map(question =>
					<RelatedArticle key={question.id} {...question}/>
				)}
			</RelatedItemsList>
		</Container>
	)
}
const RelatedItemsList = styled.div`
	margin: 0 auto;
	max-width: 1300px;
	padding: 50px 5% 30px;
	display: flex;
	flex-direction: column;
	position: relative;
	
	h2{
		position: absolute;
		top: -26px;
		${Sentinel.semiboldItalic};
		color: ${colors.db.tertiary};
		left: 20px;
		font-weight: 400;
		font-size: 32px;
	}
		
	@media ${device.tablet} {
		flex-direction: row;
		margin: 0 -15px;
		padding: 50px 5% 50px;
		
		h2{
			left: 40px;
		}
	}
	
	@media ${device.laptop} {
		margin: 0 auto;
		padding: 80px 2% 60px;
				
		h2{
			top: -38px;
			left: 45px;
			font-size: 46px;
		}
	}
		
`
const Container = styled.div`
	background: #F8F6FE;
	grid-column: 1/ -1;
	position: relative;
	margin-top: 40px;
	
	@media ${device.tablet} {
		margin-top: 80px;
	    
	}
		
`
export default RelatedSupportArticles
