import SupportLink from '@components/support/supportLink'
import React from 'react'
import { graphql, Link } from 'gatsby'

const CategoryTopic = (props: any) => {
	const { data: { wpgraphql: { categories } } } = props
	// console.log('Category page props', props.data.wpgraphql.categories)

	return (
		<div>
			<div data-testid={'backBtn'}>
				<Link to={`/support`}>
					BACK TO SUPPORT TOPICS
				</Link>
			</div>
			{categories.nodes.map(((node: any) => {
				console.log('nod3e', node.name)
				console.log('nod3e', node.supportQuestions)

				return (
					<div key={node.slug} data-testid={'catItem'}>
						<h2>{node.name}({node.count})</h2>
						<div>
							{node.supportQuestions
							&& node.supportQuestions.nodes.map((item: any) => {
								return (
									<SupportLink
										key={item.slug}
										item={item}
										showExcerpt={true}
									/>
								)
							})}
						</div>
					</div>
				)
			}))}
		</div>
	)
}

export default CategoryTopic

export const pageCatQuery = graphql`
    query GET_PAGES_BY_CAT($cat: [String]!) {
        wpgraphql{
            categories(where: {name: $cat}) {
                nodes{
                    count
                    name
                    slug
                    supportQuestions {
                        nodes {
                            title
                            slug
                            excerpt
                        }
                    }
                }
            }
        }
    }
`
