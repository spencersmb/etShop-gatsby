import { ISupportQuestion } from '@et/types/Support'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

interface IProps {
	item: ISupportQuestion
	showExcerpt?: boolean
}

const SupportLink = (props: IProps) => {
	const { item, showExcerpt = false } = props
	return (
		<SupportLinkContainer data-testid={'supportItem'} excerpt={showExcerpt}>
			<Link to={`/support/${item.slug}`}>
				<h4 data-testid={'title'}>{item.title}</h4>
				{showExcerpt &&
        <p data-testid={'excerpt'} dangerouslySetInnerHTML={{ __html: item.excerpt }}/>}
			</Link>
		</SupportLinkContainer>
	)
}
const SupportLinkContainer = styled.div<{ excerpt: boolean }>`
	padding: 0 0 10px;
	h4{
		font-size: 16px;
		color: ${colors.secondary.text};
		font-weight: 400;
		margin: 0;
	}
	
	p{
		color: ${colors.secondary.text};
	}
	
	@media ${device.laptop} {
	    padding: 0 0 20px;
			h4{
				transition: color .3s;
				font-size: 18px;
			}
	    a{
				&:hover{
					h4{
						color: ${colors.teal.i500};
					}
				}
	    }
	}
	
	${props => !props.excerpt ? '' : `
		h4{
			${Sentinel.semiboldItalic};
			font-size: 24px;
			color: ${colors.primary.headline};
		}
		border-bottom: 1px solid #DADADA;
		margin-bottom: 30px;
		padding-bottom: 30px;
		p{
			margin: 0;
		}
			@media ${device.laptop} {
					padding-bottom: 30px;
			}
	`}
		
`
export default SupportLink
