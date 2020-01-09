import React from 'react'
import { ISupportQuestion } from '../../pages/support'
import { Link } from 'gatsby'

interface IProps {
	item: ISupportQuestion
	showExcerpt?: boolean
}

const SupportLink = (props: IProps) => {
	const { item, showExcerpt } = props
	return (
		<div data-testid={'supportItem'}>
			<Link to={`/support/${item.slug}`}>
				<h4 data-testid={'title'}>{item.title}</h4>
				{showExcerpt && <p data-testid={'excerpt'} dangerouslySetInnerHTML={{ __html: item.excerpt }}/>}
			</Link>
		</div>
	)
}
export default SupportLink
