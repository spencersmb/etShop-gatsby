import { IProduct } from '@et/types/Products'
import { graphql, Link, StaticQuery } from 'gatsby'
import React, { Component } from 'react'

class ProductsListLayout extends Component {
  render () {
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