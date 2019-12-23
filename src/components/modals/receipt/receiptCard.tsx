import { IReceipt } from '@et/types/WC_Order'
import { device } from '@styles/global/breakpoints'
import { ButtonSmall } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { calcItemTotal, displayCurrency } from '@utils/priceUtils'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import styled from 'styled-components'

interface IClose {
	handleClose: any
}

const ReceiptCard = (props: IReceipt & IClose) => {
	const { email, total, order_id, date_completed, downloads, coupon_used, discounts, subtotal, handleClose } = props

	return (
		<CardWrapper>
			<CloseBtn onClick={handleClose}>
				{renderSvg(svgs.HamburgerClose)}
			</CloseBtn>
			<EmailTo>
				Copy sent to {email}
			</EmailTo>
			<h1>Order Complete</h1>
			<OrderHeader>
				<div data-testid='receiptOrderId' className='orderNumber'>
					Order #{order_id}
				</div>
				<div data-testid='receiptDate' className='orderDate'>{date_completed}</div>
			</OrderHeader>
			<ProductsHeader>
				Products
			</ProductsHeader>
			<div data-testid='orderDownloads'>
				{downloads.products && downloads.products.map(product =>
					<Product key={product.id} data-testid={`download-${product.id}`}>
						<Name className={'name'}>
							{product.name}
							<span>
								{product.subtitle}
							</span>
						</Name>
						<Details>
							<DetailItem>
								<div className={'label'}>Qty</div>
								<div className={'item'}>{product.qty}</div>
							</DetailItem>
							<DetailItem>
								<div className={'label'}>Price</div>
								<div className={'item'}>{calcItemTotal(product.total, product.qty.toString(10))}</div>
							</DetailItem>
						</Details>
						<DownloadBtnWrapper>
							<a href={product.url}>
								<DownloadBtn
									color={'#fff'}
									submitting={false}
									textColor={colors.db.primary}
									hoverColor={colors.db.primary}
									hoverTextColor={'#fff'}
									outline={true}>
									Download
								</DownloadBtn>
							</a>
						</DownloadBtnWrapper>
					</Product>)
				}
			</div>

			<TotalWrapper data-testid='receiptTotal'>
				{coupon_used.length > 0 &&
        <CouponWrapper>
          <TotalLabel>Coupon Used</TotalLabel>
					{
						coupon_used.map(coupon => (
							<CouponItem key={coupon}>
								{coupon}
							</CouponItem>
						))
					}
        </CouponWrapper>
				}
				<TotalNumbers>
					{coupon_used.length > 0 &&
          <>
            <SubTotal>
              <TotalLabel>Subtotal</TotalLabel>
              <TotalNumber>{displayCurrency(subtotal)}</TotalNumber>
            </SubTotal>
            <SubTotal>
              <TotalLabel>Discount</TotalLabel>
              <TotalNumber>-{displayCurrency(discounts)}</TotalNumber>
            </SubTotal>
          </>
					}
					<Total>
						<TotalLabel>
							Total
						</TotalLabel>
						<FinalTotal>
							{displayCurrency(total)}
						</FinalTotal>
					</Total>
				</TotalNumbers>
			</TotalWrapper>

		</CardWrapper>
	)
}
export default ReceiptCard
const CloseBtn = styled.div`
	position: absolute;
	top: 20px;
	color: #000;
	right: 20px;
	width: 50px;
	height: 50px;
	
	svg{
		width: 100%;
	}
	
	path{
		fill: ${colors.primary.text};
	}

	@media ${device.laptopL} {
		top: 20px;
		right: 20px;
	}
`

const TotalNumbers = styled.div`
	flex:1;
	align-items: flex-end;
	display: flex;
	flex-direction: column;	
	text-align: right; 
`
const TotalNumber = styled.div`
 font-size: 16px;
 font-weight: 500;
`
const TotalLabel = styled.div`
 font-size: 14px;
 font-weight: 500;
`
const SubTotal = styled.div`
	padding-bottom: 5px;
`
const FinalTotal = styled.div`
 font-size: 21px;
 font-weight: 500;
`
const Total = styled.div`
	color: ${colors.primary.text};
`
const TotalWrapper = styled.div`
	display: flex;
	flex-direction: column;
	color: ${colors.secondary.text};
	align-items: flex-end;
	
	@media ${device.tablet} {
		align-items: flex-start;
		flex-direction: row;
	}
		
`

const CouponItem = styled.div`
	background: ${colors.purple.i200};
	padding: 8px 15px;
	border-radius: 25px;
	text-transform: uppercase;
	color: ${colors.purple.i700};
	align-self: flex-end;
`

const CouponWrapper = styled.div`
	display: flex;
	flex-direction: column;
	color: ${colors.primary.text};
	border-bottom: 1px solid #ddd;
	width: 100%;
	padding-bottom: 20px;
	margin-bottom: 20px;
	text-align: right;
	${TotalLabel}{
		padding: 0 0 10px;
	}
	@media ${device.tablet} {
	border-bottom: none;
		justify-content: flex-start;
		text-align: left;
		flex-direction: row;
		align-items: center;
		${TotalLabel}{
			padding: 0 10px 0 0;
		}
	}
`
const DownloadBtn = styled(ButtonSmall)<{ submitting: boolean }>`
	text-transform: uppercase;
	background: transparent;
	z-index: 2;
	position: relative;
			text-align: center;

	span{
		opacity: ${props => props.submitting ? 0 : 1};
	}
	
	@media ${device.tablet} {
		width: 100%;
	}

	${props => !props.submitting ? '' : `
			&:hover{
				background: #fff;
			}
	`}
`
const DownloadBtnWrapper = styled.div`

`
const DetailItem = styled.div`
	display: flex;
	flex-direction: row;
	color: ${colors.primary.text};
	font-size: 14px;
	padding: 0 0 2px;

	.label{
		padding: 0 10px 0 0;
		color: ${colors.secondary.text};
	}
	.item{
	
	}
`
const Details = styled.div`
	display: flex;
	flex-direction: column;
	padding: 15px 15px 20px 0;
	
	@media ${device.tablet} {
		padding: 0 25px 0 0;
		flex: 1;
	}
`

const Name = styled.div`
	font-size: 16px;
	color: ${colors.primary.text};
	font-weight: 500;
	
	span{
		font-weight: 300;
		font-size: 14px;
		display: block;
		color: ${colors.secondary.text};
	}
	
	@media ${device.tablet} {
		font-size: 18px;
		padding-right: 25px;
	}
		
`
const Product = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px 0 20px;
	border-bottom: 1px solid #ddd;
	margin-bottom: 20px;
	
	@media ${device.tablet} {
		align-items: center;
		flex-direction: row;
	}
		
`
const ProductsHeader = styled.div`
	font-size: 16px;
	padding-bottom: 5px;
	border-bottom: 1px solid #ddd;
	color: ${colors.grey.i800};
`
const OrderHeader = styled.div`
	display: flex;
	flex-direction: column;
	color: ${colors.primary.text};
	justify-content: space-between;
	margin-bottom: 15px;
	
	.orderNumber{
		font-size: 21px;
	}
	
	.orderDate{
		font-size: 14px;
	}
	
	@media ${device.tablet} {
		flex-direction: row;
	}
		
`
const EmailTo = styled.div`
	font-size: 14px;
	color: ${colors.db.primary};
	${Sentinel.semiboldItalic};
	padding: 30px 0 0;
	
	@media ${device.tablet} {
		padding: 0;
	}
		
`
const CardWrapper = styled.div`
	background: #fff;
	box-shadow: ${shadowStyles.shadow2};
	border-radius: 15px;
	width: 100%;
	padding: 30px;
	display: flex;
	flex-direction: column;
	position: relative;
	
	h1{
		${Sentinel.semiboldItalic};
		font-weight: 400;
		font-size: 38px;
		color: ${colors.db.primary};
		margin-bottom: 20px;
	}
	
	@media ${device.tablet} {
		padding: 60px;
		h1{
			font-size: 48px;
		}
	}
		
`
