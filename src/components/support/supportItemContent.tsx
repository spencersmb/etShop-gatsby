import React from 'react'
import contentParser from 'gatsby-wpgraphql-inline-images'

const SupportContent = (props: any) => {
	const pluginOptions = {
		wordPressUrl: `${process.env.GATSBY_DB}`,
		uploadsUrl: `${process.env.GATSBY_DB}/wp-content/uploads/`
	}
	const content = props.content
	return contentParser({ content }, pluginOptions)
}

export default SupportContent
