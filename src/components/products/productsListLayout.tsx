import ProductListItem from '@components/products/productListItem'
import { IProduct } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
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
	grid-row: 2;
	padding: 30px 20px 0;
	min-height: 370px;
	border-top: 1px solid ${colors.grey.i600};
	

	
	@media ${device.tablet} {
		grid-column: 1 / -1;
		grid-template-columns:
					repeat(12, minmax(30px, ${col}));
		display: grid;
		padding:30px 5% 0;
		grid-gap: ${gutter}px;
	}

	@media ${device.laptop} {
		grid-column: 2 / 14;
		display: grid;
		grid-gap: ${gutter}px;
		padding:50px 0 0;
		align-items: stretch;
	}
	
	@media ${device.laptop}{
	}
`

export default ProductsListLayout
