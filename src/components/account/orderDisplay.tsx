import { IOrderResponse, IReceipt } from '@et/types/WC_Order'
import { device } from '@styles/global/breakpoints'
import { ButtonSmall } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { displayCurrency } from '@utils/priceUtils'
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
		if (!isExpired(expDate)) {
			return (
				<>
					<RefreshTitle>DOWNLOAD EXPIRED</RefreshTitle>
					<RefreshBtn
						color={'#fff'}
						textColor={colors.db.primary}
						hoverColor={colors.db.primary}
						hoverTextColor={'#fff'}
						outline={true}
						onClick={resetOrderLinks}>Refresh</RefreshBtn>
				</>
			)
		}
		return (
			<>
				<MobileTitle>Download</MobileTitle>
				<a href={download.url}>Download</a>
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
					return 'discover'
				case 'mastercard':
					return 'mastercard'
				case 'amex':
					return 'amex'
				default:
					return 'creditcard'
			}
		}

	}

	async function resetOrderLinks () {
		console.log('reset orderId', selectedOrder.order_id)
		setSubmitting(true)
		try {
			await props.resetDownloadLinks(selectedOrder.order_id, page)
			setSubmitting(false)
		} catch (e) {
			setSubmitting(false)
			console.error('e', e)
		}
	}

	console.log('order display props', props)

	if (!props.selectedOrder) {
		return null
	}
	return (
		<DisplayPoseRef
			mobile={!!props.mobile}
			ref={props.poseRef ? props.poseRef : null}>
			<DisplayWrapper data-testid='display-orderId'>
				<DisplayHeader>
					<OrderNumberWrapper>
						<Title>Order Number</Title>
						<OrderNumber>{selectedOrder.order_id}</OrderNumber>
					</OrderNumberWrapper>
					<OrderDetails>
						<OrderDetailItem>
							<Title>Order Date</Title>
							<Desc>{selectedOrder.date_completed}</Desc>
						</OrderDetailItem>
						<OrderDetailItem>
							<Title>Payment</Title>
							<Desc className={'payment_svg'}>
								<PaymentSvg>
									{displayPaymentIcon(selectedOrder.payment_type, selectedOrder.cardType)}
								</PaymentSvg>
							</Desc>
						</OrderDetailItem>

						{selectedOrder.discounts !== '0' &&
            <OrderDetailItem>
              <Title>Discount</Title>
              <Desc>{selectedOrder.discounts}</Desc>
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
              <label>price</label>
              <label>download</label>
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
									<p>
										{download.sku}
									</p>
								</ProductListItem>
								<ProductListItem>
									<MobileTitle>Price</MobileTitle>
									<p>
										{displayCurrency(download.price, true)}
									</p>
								</ProductListItem>
								<ProductListItem>

									<DownloadBtnWrapper>
										{submitting && <div>Spinner</div>}
										{!submitting && downloadBtn(selectedOrder.downloads.exp_date, download)}
									</DownloadBtnWrapper>

								</ProductListItem>
								{/*<li key={download.name}>*/}
								{/*	{downloadBtn(selectedOrder.downloads.exp_date, download)}*/}
								{/*</li>*/}
							</ProductGrid>
						))}
          </>
					}
				</DisplayProducts>


				<CloseBtnWrapper>
					{createCloseBtn()}
				</CloseBtnWrapper>
			</DisplayWrapper>
		</DisplayPoseRef>
	)
}

export default React.memo(OrderDisplay, (prev: any, next: any): boolean => {
	return !(prev.exp !== next.exp)
})

const RefreshBtn = styled(ButtonSmall)`
text-transform: uppercase;
background: transparent;
`
const DownloadBtnWrapper = styled.div`
	margin-top: 15px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
		
	@media ${device.tablet} {
		margin-top: 0;
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

`
const ProductListItem = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	p{
		margin: 0;
		font-weight: 600;
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
		grid-template-columns: 4fr 1fr 1fr 1fr;
		grid-gap: 2em;
		align-items: center;
		justify-items: center;
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
	}
`
const OrderNumber = styled.div`
	${Sentinel.semiboldItalic};
	font-size: 28px;
	line-height: 28px;
	color: ${colors.purple.i500};
`
const OrderNumberWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
	 ${Title}{
		margin-bottom: 5px;
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
	}
`
const DisplayHeader = styled.div`
	display: flex;
	flex-direction: column;
	
	@media ${device.tablet} {
		flex-direction: row;
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
	background: ${colors.purple.i400};
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
`

const DisplayPoseRef = styled.div<{ mobile: boolean }>`
	background: #FFF;
	
	${props => !props.mobile ? `
		border-radius: 10px;
		box-shadow: ${shadowStyles.shadow1};
		margin-bottom: 25px;
	` : `
	position: fixed;
	top: 0;
	transform: translate3d(0, 0, 0);
	width: 100%;
	height: 100%;
	left:0;
	z-index: 3;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	
	@media ${device.tablet} {
		display: none;
	}`}
`
