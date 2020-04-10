import SupportLink from '@components/support/supportLink'
import { ISupportQuestion } from '@et/types/Support'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	supportQuestions: ISupportQuestion[]
}

const SupportCategoryList = (props: IProps) => {
	const { supportQuestions } = props
	return (
		<SupportListItems>
			<BackLink data-testid={'backBtn'}>
				<Link to={`/support`}>
					<span>{renderSvg(svgs.ChevronLeft)}</span>
					<span data-testid={`backBtnText`}>BACK TO SUPPORT TOPICS</span>
				</Link>
			</BackLink>
			{supportQuestions.map((item: any) => {
				return (
					<SupportLink
						key={item.slug}
						item={item}
						showExcerpt={true}
					/>
				)
			})}
		</SupportListItems>
	)
}
export default SupportCategoryList

const BackLink = styled.div`
	grid-column: 2 / 4;
	border-bottom: 1px solid #DADADA;
	padding: 0 0 15px;
	margin: 0 0 30px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	 svg{
	 		width: 100%;
	 		max-width: 20px;
	 		margin: 0 10px 0 0;
	 }
	 path{
	 	transition: .3s;
	 	fill: ${colors.secondary.text}
	 }
	 a{
	 	display: flex;
	 	flex-direction: row;
	 	align-items: center;
	 	color:${colors.secondary.text};
	 	transition: .3s;

	 	&:hover{
	 		color: ${colors.teal.i500};
	 		path{
	 			fill: ${colors.teal.i500};
	 		}
	 	}
	 }
	 span{
	 	display: flex;
	 	align-items: center;
	 	line-height: 16px;
	 }
	 @media ${device.tablet} {
			grid-column: 2 / 14;
	 }
`
const SupportListItems = styled.div`
	padding: 40px 0 0;
 grid-column: 2 / 4;
 @media ${device.tablet} {
		grid-column: 2 / 14;
 }
  @media ${device.laptop} {
		grid-column: 4 / 12;
 }

`
