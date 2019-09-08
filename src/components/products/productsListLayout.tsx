import ProductListItem from '@components/products/productListItem'
import { IProduct } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { col, gutter } from '@styles/global/cssGrid'
import { graphql, StaticQuery } from 'gatsby'
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
              price
              sub_header
              categories{
              	slug
              }
              license{
              	type
              }
              featuredImage{
								alt
								localFile{
									childImageSharp {
										fluid(maxWidth: 835) {
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
									<ProductListItem key={node.id} {...node}/>
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
	padding: 50px 20px 0;
	min-height: 600px;

	
	@media ${device.tablet} {
		grid-column: 1 / -1;
		grid-template-columns: repeat(12, minmax(30px, ${col}));
		display: grid;
		padding:85px 5% 0;
		grid-gap: ${gutter}px;
	}

	@media ${device.laptop} {
		grid-column: 5 / -1;
		display: grid;
		//grid-template-columns: repeat(9, minmax(30px, ${col}));
		grid-template-columns: repeat(9,minmax(30px,1fr));
		grid-template-rows: auto minmax(10px, 431px);
		grid-gap: ${gutter}px;
		padding:85px 30px 0 0;
		align-items: stretch;
		max-width: 1600px;
	}
	
	@media ${device.laptop}{
	}
`

export default ProductsListLayout
