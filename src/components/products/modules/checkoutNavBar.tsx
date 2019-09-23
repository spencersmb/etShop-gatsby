import AddToCartBtn from '@components/products/addToCartBtn'
import { IProduct } from '@et/types/Products'
import { getWindowPosition } from '@utils/windowUtils'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	inView: boolean
	title: string
	slug: string
	total: string
	selectedLicense: string,
	selectedProduct: IProduct
	numberOfLicenses: number | string,
	inCart: boolean,
	handleAddToCartState: () => void
	price: string
}

const CheckoutNavBar = (props: IProps) => {
	const { inView, price, title, total, selectedLicense, numberOfLicenses, inCart, slug, handleAddToCartState, selectedProduct } = props
	return (
		<div style={{
			position: 'fixed',
			bottom: 0,
			width: '100%',
			height: '50px',
			background: '#fff',
			zIndex: 3
		}}>
			<Container>
				<div>{title}</div>
				<div>
					NavBar visible: {(getWindowPosition() > 300 && !inView).toString()}
				</div>
				<AddToCartBtn
					handleAddToCartState={handleAddToCartState}
					isInCart={inCart}
					slug={slug}
					selectedProduct={selectedProduct}
					licenseQty={numberOfLicenses}
					price={price}
					total={total}
				/>
			</Container>
		</div>
	)
}
const Container = styled.div`
	display: flex;
	flex-direction: row;
	
	.checkoutWrapper{
		max-width: none;
	}
	
	button{
		background: red;
	}
`
export default CheckoutNavBar
