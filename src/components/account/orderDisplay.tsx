import DefaultSpinner from '@components/spinners/defaultSpinner'
import { IOrderResponse, IReceipt } from '@et/types/WC_Order'
import { device } from '@styles/global/breakpoints'
import { ButtonSmall } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { calcItemTotal, displayCurrency } from '@utils/priceUtils'
import { renderSvg } from '@utils/styleUtils'
import React, { RefObject, useState } from 'react'
import styled from 'styled-components'

interface IProps {
	searchResult?: boolean,
	resetDownloadLinks: any,
	exp: number
	page: number
	selectedOrder: IReceipt,
	handleState: any
	handleLinkRefresh: any
	mobile?: boolean
	poseRef?: RefObject<any> | null;
}

function isExpired (timeStamp: number) {
	const today = new Date()
	const exp = new Date(timeStamp * 1000)
	// returns true if date is not expired
	return exp.getTime() >= today.getTime()
}

function OrderDisplay (props: IProps) {
	const { selectedOrder, page } = props
	const [submitting, setSubmitting] = useState(false)

	// console.log('order Props', props)

	function createCloseBtn () {
		if (props.searchResult) {
			return (
				<CloseBtn onClick={() => {
					props.handleState({
						selectedOrder: null,
						selectedSearchOrder: null,
						searchInput: ''
					})
				}}>{renderSvg(svgs.HamburgerClose)}</CloseBtn>
			)
		}
		return (
			<CloseBtn onClick={() => {
				props.handleState({
					selectedOrder: null,
					orderModalOpen: false
				})
			}}>{renderSvg(svgs.HamburgerClose)}</CloseBtn>
		)
	}

	function downloadBtn (expDate: number, download: any) {
		const expired = !isExpired(expDate)
		return (
			<>
				{
					expired ? <RefreshTitle>DOWNLOAD EXPIRED</RefreshTitle> : <MobileTitle>Download</MobileTitle>
				}

				{!expired ? <a href={download.url} target={`_blank`}>
					<RefreshBtn
						color={'#fff'}
						submitting={submitting}
						textColor={colors.db.primary}
						hoverColor={colors.db.primary}
						hoverTextColor={'#fff'}
						outline={true}>
						Download
					</RefreshBtn>
				</a> : <RefreshBtn
					color={'#fff'}
					submitting={submitting}
					textColor={colors.teal.i500}
					hoverColor={colors.teal.i500}
					hoverTextColor={'#fff'}
					outline={true}
					onClick={resetOrderLinks}>
					<span>Refresh</span>
					<DefaultSpinner submitting={submitting} color={colors.teal.i500} size={'25px;'}/>
				</RefreshBtn>
				}
			</>
		)
	}

	function displayPaymentIcon (type: string, card: string | null) {
		if (type.toLocaleLowerCase() === 'paypal') {
			return renderSvg(svgs.Paypal)
		}

		if (card) {
			switch (card.toLocaleLowerCase()) {
				case 'visa':
					return renderSvg(svgs.CCVisa)
				case 'discover':
					return renderSvg(svgs.CCDiscover)
				case 'mastercard':
					return renderSvg(svgs.CCMaster)
				case 'american express':
					return renderSvg(svgs.CCAmex)
				case 'free':
					return renderSvg(svgs.Free)
				default:
					return renderSvg(svgs.CreditCard)
			}
		}

	}

	async function resetOrderLinks () {
		setSubmitting(true)
		try {
			const result = await props.resetDownloadLinks(selectedOrder.order_id, page)

			if (result.completed) {
				setSubmitting(false)
			}
		} catch (e) {
			setSubmitting(false)
			console.error('e', e)
		}
	}

	if (!props.selectedOrder) {
		return null
	}

	return (
		<DisplayPoseRef
			mobile={!!props.mobile}
			ref={props.poseRef ? props.poseRef : null}>
			<DisplayWrapper>
				<DisplayHeader>
					<OrderNumberWrapper>
						<Title>Order Number</Title>
						<OrderNumber data-testid='display-orderId'>{selectedOrder.order_id}</OrderNumber>
					</OrderNumberWrapper>
					<OrderDetails>
						<OrderDetailItem>
							<Title>Order Date</Title>
							<Desc>{selectedOrder.date_completed}</Desc>
						</OrderDetailItem>
						<OrderDetailItem>
							<Title>Payment Type</Title>
							<Desc className={'payment_svg'}>
								<PaymentSvg>
									{displayPaymentIcon(selectedOrder.payment_type, selectedOrder.cardType)}
								</PaymentSvg>
							</Desc>
						</OrderDetailItem>

						{selectedOrder.discounts !== '0' &&
            <OrderDetailItem>
              <Title>Discount</Title>
              <Desc className={'discount'}>-{displayCurrency(selectedOrder.discounts)}</Desc>
            </OrderDetailItem>
						}
						<OrderDetailItem>
							<Title>Total</Title>
							<Desc>{displayCurrency(selectedOrder.total)}</Desc>
						</OrderDetailItem>

					</OrderDetails>
				</DisplayHeader>

				<DisplayProducts>

					{/*List Products*/}
					{selectedOrder.downloads && selectedOrder.downloads.products.length > 0 &&
          <>
            <GridHeader className='term-grid grid-header'>
              <label>Product</label>
              <label>sku</label>
              <label>qty</label>
              <label>price</label>
              <label>file</label>
            </GridHeader>
            <GridHeaderMobile>
              Products
            </GridHeaderMobile>
						{selectedOrder.downloads.products.map(download => (
							<ProductGrid className='term-grid' key={download.id}>
								<ProductName>
									<Name>{download.name}</Name>
									<SubTitle>{download.subtitle}</SubTitle>
								</ProductName>
								<ProductListItem>
									<MobileTitle>Sku</MobileTitle>
									<p className={'sku'}>
										{download.sku}
									</p>
								</ProductListItem>
								<ProductListItem>
									<MobileTitle>Qty</MobileTitle>
									<p className={'price'}>
										{download.qty}
									</p>
								</ProductListItem>
								<ProductListItem>
									<MobileTitle>Price</MobileTitle>
									<p className={'price'}>
										{calcItemTotal(download.total, download.qty.toString(10))}
									</p>
								</ProductListItem>
								<ProductListItem>

									<DownloadBtnWrapper submitting={submitting} spinnerColor={colors.db.primary}>
										{downloadBtn(selectedOrder.downloads.exp_date, download)}
									</DownloadBtnWrapper>

								</ProductListItem>
							</ProductGrid>
						))}
          </>
					}
				</DisplayProducts>

				<CloseBtnWrapper>
					{createCloseBtn()}
				</CloseBtnWrapper>

				<OrderDisplayFooter>
					{selectedOrder.coupon_used && selectedOrder.coupon_used.length > 0 &&
          <OrderDisplayCoupon>
            <span>Coupon Used</span>
						{selectedOrder.coupon_used.map(coupon => (
							<CouponItem key={coupon}>
								{coupon}
							</CouponItem>
						))}
          </OrderDisplayCoupon>
					}
					<SecureLinkInfoWrapper>
						<p>{selectedOrder.transactionId}</p>
					</SecureLinkInfoWrapper>
				</OrderDisplayFooter>

			</DisplayWrapper>
		</DisplayPoseRef>
	)
}

export default React.memo(OrderDisplay, (prev: any, next: any): boolean => {
	return !(prev.exp !== next.exp)
})

const CouponItem = styled.div`
	background: ${colors.purple.i200};
	padding: 8px 15px;
	border-radius: 25px;
	text-transform: uppercase;
	color: ${colors.purple.i700};
`
const OrderDisplayCoupon = styled.div`
 display: flex;;
 flex-direction: row;
 border-bottom: 1px solid #ddd;
 align-items: center;
 padding-bottom: 30px;
 
 @media ${device.tablet} {
 	border-bottom: none;
 	padding-bottom: 0;
 }
 	
`
const OrderDisplayFooter = styled.div`
	display: flex;
	flex-direction: column;

	margin-top: 30px;
	font-size: 14px;
	text-transform: uppercase;
	color: ${colors.primary.headline};
	
	span{
		margin-right: 15px;
	}
	
	@media ${device.tablet} {
		flex-direction: row;
		align-items: center;
	}
		
`
const SecureLinkInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	text-align: center;
	margin-top: 20px;
	p{
		font-style: italic;
		color: ${colors.grey.i800};
		font-size: 12px;
		margin: 0;
	}
	
	@media ${device.tablet} {
		text-align: right;
	}
		
`
const RefreshBtn = styled(ButtonSmall)<{ submitting: boolean }>`
	text-transform: uppercase;
	background: transparent;
	z-index: 2;
	position: relative;
	span{
		opacity: ${props => props.submitting ? 0 : 1};
	}
	
	@media ${device.tablet} {
		width: 100%;
		text-align: center;
	}

	${props => !props.submitting ? '' : `
			&:hover{
				background: #fff;
			}
	`}
`
const DownloadBtnWrapper = styled.div<{ submitting: boolean, spinnerColor: string }>`
	margin-top: 15px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	align-items: center;

	@media ${device.tablet} {
		margin-top: 0;
		justify-content: center;
  }

}
`
const RefreshTitle = styled.div`
	color: ${colors.db.primary};
	font-size: 14px;
	text-transform: uppercase;
	${Sentinel.semiboldItalic};

	@media ${device.tablet} {
		display: none;
  }
`
const DisplayProducts = styled.div`

`
const ProductName = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
	justify-self: flex-start;

	@media ${device.tablet} {
		margin: 0;
	}

`
const Name = styled.div`
	${Sentinel.semiboldItalic};
	font-size: 20px;
`
const SubTitle = styled.div`
	font-size: 14px;
`
const ProductListItem = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	position: relative;

	p{
		margin: 0;
		&.price{
			font-weight: 600;
		}
		&.sku{
			font-size: 14px;
		}
	}

	@media ${device.tablet} {
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;

	}

`
const MobileTitle = styled.div`
	font-size: 13px;
	text-transform: uppercase;
	@media ${device.tablet} {
		display: none;
  }
`
const ProductGrid = styled.div`
	grid-template-columns: 1fr;
	grid-gap: 0;
	max-width: 1000px;
  margin: auto;
  display: grid;
  color: #222;
  border-bottom: 1px solid #ddd;
  padding: 1em 0;
  grid-auto-rows: minmax(min-content, max-content);

  @media ${device.tablet} {
		grid-template-columns: 4fr 1fr .5fr .7fr minmax(98px, 1fr);
		grid-gap: 10px;
		align-items: center;
		justify-items: center;

		&:last-child{
			//border-bottom: none;
			//padding-bottom: 0;
		}
  }

`

const GridHeader = styled(ProductGrid)`
	display: none;
	label{
		font-size: 13px;
		text-transform: uppercase;
		margin-bottom: 0;
		text-align: center;

		&:first-child{
			text-align: left;
			justify-self: flex-start;
		}
	}
	@media ${device.tablet} {
		display: grid;
	}
`
const GridHeaderMobile = styled(GridHeader)`
	display: grid;
	@media ${device.tablet} {
		display: none;
	}
`
const Desc = styled.div`
	font-size: 16px;
	color: ${colors.primary.text};
	font-weight: 500;
	
	&.discount{
		color: ${colors.red.warning};
	}
`

const Title = styled.div`
 font-size: 13px;
 text-transform: uppercase;
 color: ${colors.primary.text};
`
const PaymentSvg = styled.div`
	max-width: 50px;
	svg{
		width: 100%;
	}
`
const OrderDetails = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	@media ${device.tablet} {
		flex-wrap: nowrap;
		margin-left: 35px;
		flex: 1;
		flex-flow: row-reverse;
		justify-content: flex-end;
	}
`
const OrderNumber = styled.div`
	${Sentinel.semiboldItalic};
	font-size: 28px;
	line-height: 28px;
	color: ${colors.db.primary};
`
const OrderNumberWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
	 ${Title}{
		margin-bottom: 5px;
	 }

 @media ${device.tablet} {
	margin:0;
 }

`
const OrderDetailItem = styled.div`
	flex: 1 0 50%;
	margin-bottom: 20px;
	 ${Title}{
		margin-bottom: 5px;
	 }

	@media ${device.tablet} {
		flex: 0;
		margin: 0 35px 0 0;
		&:nth-child(2){
			flex: 1;
		}
		&:nth-child(1){
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			margin: 0;
		}
	}
`
const DisplayHeader = styled.div`
	display: flex;
	flex-direction: column;

	@media ${device.tablet} {
		flex-direction: row;
		margin-bottom: 50px;
	}

`
const CloseBtnWrapper = styled.div`
	@media ${device.tablet} {
		display: none;
	}
`
const CloseBtn = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	position: absolute;
	top:15px;
	right: 15px;

	svg{
		width: 100%;
	}
	rect{
		fill: ${colors.primary.headline};
	}
`
const DisplayWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 35px 20px;

	@media ${device.tablet} {
		padding: 35px 35px;
	}

`

const DisplayPoseRef = styled.div<{ mobile: boolean }>`
	background: #FFF;

	${props => !props.mobile ? `
		border-radius: 10px;
		box-shadow: ${shadowStyles.shadow1};
		margin-bottom: 25px;
	` : `
	position: fixed;
	top: 75px;
	transform: translate3d(0, 0, 0);
	width: 100%;
	height: 100%;
	padding: 0 0 80px;
	margin: 0 0 80px;
	left:0;
	z-index: 3;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	
	@media ${device.tablet} {
		display: none;
	}`}
`
