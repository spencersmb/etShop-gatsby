import { IProduct } from '@et/types/Products'
import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
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
              images{
								localFile{
									childImageSharp {
										fluid(maxWidth: 435) {
											...GatsbyImageSharpFluid
										}
									}
								}
              }
            }
          }
        },
      },
      
    `}
				render={data => (
					<>
						<div>
							<div data-testid='productList'>
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
										console.log('node', node)

										return (
											<div key={node.id}>
												<Link to={`/products/${node.slug}`}>
													{node.name}
													<Img
														alt='Every-Tuesday Digital Shop'
														fluid={node.images[0].localFile.childImageSharp.fluid}
													/>
												</Link>
											</div>
										)
									})}
							</div>
						</div>
					</>
				)}
			/>
    )
  }
}

export default ProductsListLayout