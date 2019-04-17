import { IProduct } from '@et/types/Products'
import { graphql, Link, StaticQuery } from 'gatsby'
import React, { Component } from 'react'

interface IProps {
	filter: string
}

interface ICat {
	id: number,
	name: string,
	slug: string
}

class ProductsListLayout extends Component<IProps> {

  render () {
		console.log('this.props.filter', this.props.filter)
    return (
			<StaticQuery
				query={graphql`
      query ListProductsQuery {
        allWcProduct{
          edges{
            node{
              id
              name
              slug
              categories{
              	slug
              }
              license{
              	type
              }
            }
          }
        }
      }
    `}
				render={data => (
					<>
						<div>
							<ul data-testid='productList'>
								{data.allWcProduct.edges
									.filter(({ node }: { node: IProduct }) => node.license.type === 'standard')
									.filter(({ node }: { node: IProduct }) => {
										if (this.props.filter === '') {
											return node
										}
										return node.categories.filter((cat: ICat) => {
											console.log('cat.slug', cat.slug === this.props.filter)
											return cat.slug === this.props.filter
										}).length > 0
									})
									.map(({ node }: { node: IProduct }) => {
										return (
											<li key={node.id}>
												<Link to={`/products/${node.slug}`}>
													{node.name}
												</Link>
											</li>
										)
									})}
							</ul>
						</div>
					</>
				)}
			/>
    )
  }
}

export default ProductsListLayout