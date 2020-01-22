import { IProduct, IProductFeaturedImage } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	id: string
	slug: string
	name: string
	sub_header: string
	price: string
	featuredImage: IProductFeaturedImage
}

function ProductListItem (props: IProps) {
	const { id, slug, name, sub_header, price, featuredImage } = props
	return (
		<ListItem key={id} data-testid={'listItem'}>
			<Link to={`/products/${slug}`}>
				<ListItemInner>
					<ListItemTop className='ListItemTop'>
						<Img
							alt={featuredImage.alt}
							fluid={featuredImage.localFile.childImageSharp.fluid}
						/>
						<ListItemTitle>
							<h2>
								{name}
							</h2>
							{sub_header && <p>{sub_header}</p>}
						</ListItemTitle>
					</ListItemTop>
					<ListItemFooter className='ListItemFooter'>
						<span/>
						<p>
							${price}
						</p>
						{renderSvg(svgs.CardSmall)}
					</ListItemFooter>
				</ListItemInner>
			</Link>
		</ListItem>
	)
}

const ListItem = styled.div`
	grid-column: 2 / 4;
	border-radius: 15px 15px 0 0;
	box-shadow: 0 3px 4px rgba(161, 161, 161, 0.0);
	transition: .3s;
	display: flex;
	flex-direction: column;
	margin-bottom: 45px;
	
	@media ${device.tablet}{
		grid-column: span 6;
		margin-bottom: 0;
	}
	@media ${device.laptop}{
		grid-column: span 4;
	}
	
	@media ${device.laptopL}{
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
		${Sentinel.reg};
		font-size: 23px;
		font-weight: bold;
		line-height: 24px;
		color: ${colors.grey.i800}
	}
	p{
		${Sentinel.reg};
		font-size: 16px;
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
			font-size: 21px;
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
export default ProductListItem
