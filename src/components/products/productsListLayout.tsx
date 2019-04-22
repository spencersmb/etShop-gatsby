import { IProduct } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { col, gutter } from '@styles/global/cssGrid'
import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React, { Component } from 'react'
import styled from 'styled-components'

interface IProps {
	filter?: string
}

interface ICat {
	id: number,
	name: string,
	slug: string
}

class ProductsListLayout extends Component<IProps> {

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
					<ListContainer data-testid='productList'>
						{data.allWcProduct.edges
							.filter(({ node }: { node: IProduct }) => node.license.type === 'standard')
							.filter(({ node }: { node: IProduct }) => {
								if (this.props.filter === '' || !this.props.filter) {
									return node
								}
								return node.categories.filter((cat: ICat) => {
									return cat.slug === this.props.filter
								}).length > 0
							})
							.map(({ node }: { node: IProduct }) => {

								return (
									<ListItem key={node.id}>
										<Link to={`/products/${node.slug}`}>
											{node.name}
											<Img
												alt='Every-Tuesday Digital Shop'
												fluid={node.images[0].localFile.childImageSharp.fluid}
											/>
										</Link>
									</ListItem>
								)
							})}
					</ListContainer>
				)}
			/>
    )
  }
}

const ListContainer = styled.div`
	grid-column: 1 / -1;
	position: relative;
	z-index: 1;
	grid-row: 1;
	padding: 0 20px;

	@media ${device.tablet} {
		grid-column: 5 / 14;
		display: grid;
		grid-template-columns: repeat(9, minmax(30px, ${col}));
		grid-gap: ${gutter}px;
		padding-top: 85px;
	}
`
const ListItem = styled.div`
	grid-column: span 3;
`
export default ProductsListLayout