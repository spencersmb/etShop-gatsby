import SupportLink from '@components/support/supportLink'
import { ICategory } from '@et/types/Support'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { orderByPopularity } from '@utils/genUtils'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const SupportCategory = (props: ICategory) => {
	const { name, supportQuestions, slug, count } = props
	// const orderedByPopularity = supportQuestions.nodes.sort(orderByPopularity)

	return (
		<CategoryContainer>
			{/*HEADER*/}
			<h2 data-testid={`title`}>
				{name}
			</h2>

			{/*ITEMS*/}
			<SupportLinksContainer>
				{supportQuestions.nodes.filter((item, index) => index <= 2).map((item) => (
					<SupportLink key={item.slug} item={item} showExcerpt={false}/>))}
			</SupportLinksContainer>

			{/*VIEW MORE*/}
			{count > 3 &&
      <ViewAllBtn data-testid={`viewAll`}>
        <Link to={`/support/category/${slug}/page/1`}>
          View All
        </Link>
      </ViewAllBtn>
			}
		</CategoryContainer>
	)
}
const ViewAllBtn = styled.div`
	a{
		text-transform: uppercase;
		font-size: 14px;
		color: ${colors.pink.i600};
		font-weight: 500;
		&:hover{
			color: ${colors.pink.i700};
		}
	}
`
const SupportLinksContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`
const CategoryContainer = styled.div`
	margin-bottom: 20px;	
	h2{
		color: ${colors.primary.headline};
		font-size: 28px;
		${Sentinel.semiboldItalic};
		font-weight: 400;
	}
	
	@media ${device.tablet} {
		grid-column: span 6;
		padding: 0 15px;
		margin-bottom: 40px;	
		h2{
			margin-bottom: 20px;
		}
	}
	@media ${device.laptop} {
		grid-column: span 4;
		h2{
			font-size: 42px;
			line-height: 48px;
			margin-bottom: 25px;
		}
	}
		
`
export default SupportCategory
