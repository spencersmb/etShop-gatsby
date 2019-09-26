import RelatedProduct from '@components/products/modules/relatedProductWrapper'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { Sentinel } from '@styles/global/fonts'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	products: string[] // array of slugs
	testData?: any
}

const RelatedProducts = (props: IProps) => {

	const { products } = props
	return (
		<Wrapper>

			{/*Header*/}
			<TitleContainer>
				<h5>Related Products</h5>
				<div>
					<Link to={`/`}>
						View all products
					</Link>
				</div>
			</TitleContainer>

			{/*Products*/}
			<Container data-testid={`productsList`}>
				{products.map((productSlug: string) => <RelatedProduct data={props.testData} key={productSlug}
																															 slug={productSlug}/>)}
			</Container>
		</Wrapper>
	)
}
const TitleContainer = styled.div`
	grid-column: 2/4;
	text-align: center;
	margin-bottom: 25px;
	display: flex;
	flex-direction: column;
	h5{
		${Sentinel.semiboldItalic};
		font-style: italic;
		font-weight: 500;
		color: ${colors.primary.headline};
		font-size: 28px;
	}
	a{
		color: ${colors.teal.i500};
		font-weight: 600;
	}
	
	@media ${device.tablet} {
		grid-column: 2 / 14;
		h5{
			font-size: 34px;
		}
	}

`
const Wrapper = styled(GridFluid)`
	margin: 60px auto 0;
	padding: 0;
`
const Container = styled.div`
	display: flex;
	flex-direction: column;
	grid-column: 2 / 4;
	justify-content: center;
	margin-bottom: 20px;
	@media ${device.tablet} {
		grid-column: 2 / 14;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		
		& > div {
			flex: 0 1 45%;
			margin: 0 15px 30px;
		}
	}
	
	@media ${device.laptop} {
		grid-column: 2 / 14;
		justify-content: center;
		& > div {
				flex: 0 1 21%;
			}
	}
		@media ${device.laptopL} {
			grid-column: 2 / 14;
			margin: 0 -30px;

			& > div {
				flex: 0 1 22%;
			}
	}
		
		
`
export default React.memo(RelatedProducts)
