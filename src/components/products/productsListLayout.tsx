import { IProduct } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { col, gutter } from '@styles/global/cssGrid'
import { SentinelFamily } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
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
              price
              sub_header
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
											<ListItemInner>
												<ListItemTop className='ListItemTop'>
													{node.images.length > 0 && <Img
                            alt='Every-Tuesday Digital Shop'
                            fluid={node.images[0].localFile.childImageSharp.fluid}
                          />}
													<ListItemTitle>
														<h2>
															{node.name}
														</h2>
														{node.sub_header && <p>{node.sub_header}</p>}
													</ListItemTitle>
												</ListItemTop>
												<ListItemFooter className='ListItemFooter'>
													<span/>
													<p>
														${node.price}
													</p>
													{renderSvg(svgs.CardSmall)}
												</ListItemFooter>
											</ListItemInner>
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
	padding: 50px 20px 0;
	
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
		grid-gap: ${gutter}px;
		padding:85px 30px 0 0;
		align-items: stretch;
		max-width: 1600px;
	}
	
	@media ${device.laptop}{
	}
`
const ListItem = styled.div`
	grid-column: 2 / 4;
	border-radius: 15px 15px 0 0;
	box-shadow: 0 3px 4px rgba(161, 161, 161, 0.0);
	transition: .3s;
	display: flex;
	flex-direction: column;
	margin-bottom: 45px;
	
	@media ${device.tablet}{
		grid-column: span 4;
		margin-bottom: 0;
	}
	
	@media ${device.laptop}{
		grid-column: span 3;
			&:hover{
				box-shadow: ${shadowStyles.shadow4};
				transform: translateY(-10px);
				svg{
					filter: drop-shadow(0px 0 0 rgba(0, 0, 0, 0));
				}
				.ListItemTop{
					box-shadow: 0 0 0 rgba(161, 161, 161, 0.0);
				}
				.ListItemFooter{
					background: #e2e2e2;
				}
			}
	}
	
	a{
		display: flex;
		flex: 1;
	}
`
const ListItemInner = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
`
const ListItemTitle = styled.div`
	background: white;
	text-align: center;
	padding: 20px 20px 10px;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	h2{
		font-size: 21px;
		${SentinelFamily};
		font-weight: bold;
		line-height: 24px;
		color: ${colors.grey.i800}
	}
	p{
		font-size: 14px;
		${SentinelFamily};
		font-weight: 500;
		font-style: italic;
		color: ${colors.secondary.text};
		margin: 0;
	}
`
const ListItemTop = styled.div`
	overflow: hidden;
	transition: .3s;
	box-shadow: ${shadowStyles.shadow1};
	border-radius: 15px 15px 0 0;
	display: flex;
	flex-direction: column;
	height: 100%;
	align-items: stretch;
`
const ListItemFooter = styled.div`
		background: transparent;
		display: flex;
		transition: .3s;
		position: relative;
		align-items: flex-end;
		p{
			position: absolute;
			z-index: 2;
			left: 50%;
			top: 50%;
			transform: translateY(-50%) translateX(-50%);
			font-size: 18px;
			font-family: Sentinel, serif;
			font-weight: bold;
			color: ${colors.grey.i800}
		}
		span{
			background: white;
			height: 5px;
			width: 100%;
			position: absolute;
			top: -5px;
			left: 0;
			z-index: 1;
		}
		svg{
			transition: .3s;
			width: 100%;
			filter: drop-shadow(${shadowStyles.shadow1});
		}
`
export default ProductsListLayout