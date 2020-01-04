import React from 'react'
import { graphql } from 'gatsby'

const Tags = (props: any) => {
	const { data } = props
	console.log('props', props)

	return (
		<div>
			Cats pagew
		</div>
	)
}

export default Tags

export const pageCatQuery = graphql`
    query GET_PAGES_BY_CAT($cat: [String]!) {
        wpgraphql{
            categories(where: {name: $cat}) {
                edges {
                    node {
                        count
                        supportQuestions {
                            nodes {
                                title
                            }
                        }
                    }
                }
            }
        }
    }
`
