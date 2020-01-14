import React from 'react'
import contentParser from 'gatsby-wpgraphql-inline-images'

interface IProps {
	content: string,
	title: string
}
const SupportPageContent = (props: IProps) => {
	const pluginOptions = {
		wordPressUrl: `${process.env.GATSBY_DB}`,
		uploadsUrl: `${process.env.GATSBY_DB}/wp-content/uploads/`
	}
	const {content, title} = props
	return (
		<>
			<h1 data-testid={'title'}>{title}</h1>
			<div data-testid={'content'}>
				{contentParser({ content }, pluginOptions)}
			</div>
		</>
	)
}

export default SupportPageContent
