import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import posed from 'react-pose'
import styled from 'styled-components'

export const CartInner = styled.div`
 margin:0;
 padding: 0;
 display: flex;
 flex-direction: column;
 width: 100%;
 grid-column: 1 / -1;
 background: #fff;
 position: relative;
 z-index: 2;
 
 @media ${device.tablet} {
	flex: 1;
	align-self: stretch;
 }
 
 
 @media ${device.laptop} {
	max-width: 658px;
	margin: 25px auto 0;
	width: 100%;
	box-shadow: ${shadowStyles.shadow2};
	border-radius: 15px;
	overflow: hidden;
	grid-row: 2;
	grid-column: 2 / 10;
 }
 
 	// @media ${device.laptopL} {
   //  grid-column: 4 /11;
   //  margin-left: 30px;
 	// }
`
export const CheckoutTabs = styled.ul`
	margin:0;
	padding: 0 20px;
	display: flex;
	flex-direction: column;

 	.inner{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		align-items: center;
		max-width: 400px;
		
		@media ${device.laptop} {
		}
			
 	}
`

export const PaymentTab = styled.li<{ selected: boolean }>`
	flex: 1;
	list-style: none;
	// background: ${props => props.selected ? '#fff' : colors.grey.i400};
	transition: .3s;
	
	svg{
		width: 100%;
	}
	
	path{
		transition: .3s;
		fill: ${props => props.selected ? colors.teal.i500 : colors.secondary.text}
	}
	
	p{
		padding: 0 0 15px;
	}
		
	// CreditCard
	.stripe{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0;
	}
	.paypal{
		flex-direction: column;
		margin: 0;
		display: flex;
		height: 100%;
		padding-left: 15px;
		justify-content: center;
		
		svg{
			max-width: 80px;
		}
	}
	.cc-paypal{
		width: 63px;
		display: flex;
		align-items: center;
	}
	.cc-svg{
		width: 46px;
		display: flex;
		align-items: center;
	}
	.cc-text{
		font-size: 15px;
		font-weight: 500;
		margin-left: 8px;
		color: ${props => props.selected ? colors.teal.i500 : colors.secondary.text};
	}
	
	@media ${device.laptop} {
		&:hover{
			cursor:  ${props => props.selected ? 'default' : 'pointer'};			
		}
	}
	
	label{
		display: flex;
    flex-direction: row;
    align-items: center;
    margin:0;
    max-height: 29px;
	}
		
`

export const OrderSummery = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 20px;
	padding: 0 20px;
	position: relative;
	
	h3{
		text-align: left;
		${Sentinel.black};
		font-size: 24px;
		color: ${colors.grey.i800};
		margin-bottom: 0;
	}
	
	@media ${device.tablet} {
		margin: 30px 0 0;
		h3{
			margin-bottom: 10px;
		}
	}
		
`

export const TotalSummery = styled.div<{hasDiscount: boolean}>`
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;
	align-items: left;
	
	.orderTotal{
		&__wrapper{
			display: flex;
			flex-direction: column;
		}
		&__name{
			text-align: center;
			padding-top: 10px;
			font-size: 16px;
			line-height: 16px;
			padding-right: 15px;
			text-transform: uppercase;
			font-style: normal;
			font-weight: 400;
			font-family: 'Fira Sans',sans-serif;
			justify-self: flex-start;
		}
		&__numbers{
			${Sentinel.semiboldItalic};
			font-size: 52px;
			line-height: 52px;
			color: ${colors.grey.i800};
			text-align: left;
			margin-bottom: 0;
			position: relative;
			display: flex;
			flex-direction: row;
		}
	}
	
	@media ${device.tablet} {
		flex-direction: ${props => props.hasDiscount ? 'row-reverse' : 'row'};
		.orderTotal{
				&__wrapper{
					position: relative;
					margin-right: 20px;
				}
				&__name{
					
				}
				&__numbers{
					
				}
		}
	}
		
	
`
const CouponBtnPosed = posed.div({
	show: {
		height: 'auto',
		transition: {
			height: { duration: 200, ease: 'easeOut' }
		}
	},
	hide: {
		height: 0,
		transition: {
			height: { duration: 200, ease: 'easeOut' }
		}
	}
})
export const CouponButtonWrapper = styled(CouponBtnPosed)`
	overflow: hidden;
	display: none;
	flex-direction: column;
	align-items: center;
	
	@media ${device.tablet} {
		display: flex;
		position: absolute;
		top:0;
		right: 40px;  
	}
		
		
`
export const CouponButton = styled.div`
	display:flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
	span{
		&:nth-child(1){
			width: 40px;
			display: flex;
			margin-right: 8px;
			align-items: center;
		}
		&:nth-child(2){
			${Sentinel.semiboldItalic};
			font-size: 14px;
			color: ${colors.primary.pink};
		}
	}
	svg{
		width: 100%;
	}
	
	@media ${device.laptop} {
		cursor: pointer;		
	}
		
`

const CouponContainerPosed = posed.div({
	show: {
		height: 'auto',
		transition: {
			height: { duration: 200 }
		}
	},
	hide: {
		height: 0,
		transition: {
			height: { duration: 200 }
		}
	}
})
export const CouponWrapper = styled(CouponContainerPosed)`
	overflow: hidden;
	position: relative;
	width: 100%;
	
	@media (max-width: 767px){
		height: auto !important;
	}

	
`
export const CouponContainer = styled.div`
	//background: ${colors.grey.i200};
	padding: 0 20px 10px;
	
	.formGroup__Container{
		margin: 0;
	}
	.formInput{
		margin-bottom: 0;
	}
	
	.formGroup .renderLabel{
		color: ${colors.grey.i800};
	}
`

export const InputSpinner = styled.div<{ submitting: boolean, spinnerColor: string }>`
	opacity: ${props => props.submitting ? 1 : 0};
	width: 25px;
	height: 25px;
	position: absolute;
	top: 4px;
	right: 5px;
	
	.spinner {
		animation: rotate 2s linear infinite;
		z-index: 2;
		width: 100%;
  
  & .path {
    stroke: ${props => props.spinnerColor};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
`

export const DiscountSummary = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 240px;
	margin: .5rem auto .5rem 0;
	
	@media ${device.tablet} {
		min-width: 0;
	}
		
`

export const CartLoginAd = styled.div`
	background: #46d0d1;
	display: flex;
	flex-direction: row;
	position: relative;
	z-index: 1;
	grid-column: 1 / -1;
	
	@media ${device.laptop} {
		grid-row: 2;
		grid-column: 9 /14;
		border-radius: 15px;
		flex-direction: column;
		box-shadow: ${shadowStyles.shadow2};
		max-width: 343px;
		margin: 25px auto 0 0;
		overflow: hidden;
 	}
 	
 	@media ${device.laptop} {
		grid-column: 10 /14;
 	} 	
 	// @media ${device.laptopL} {
		// grid-column: 11 /14;
		// margin-right: -30px;
 	// }
`
export const LoginAdLeft = styled.div`
	display: none;
	position: relative;
	
	@media ${device.tablet} {
		display: flex;
		flex: 1 0 50%;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		span{
			color: ${colors.teal.i600};
			font-size: 28px;
			line-height: 28px;
			${Sentinel.semiboldItalic};
			z-index: 5;
		}		
		.percent{
			z-index: 5;
			${Sentinel.semiboldItalic};
			color: #168392;
			font-size: 76px;
			line-height: 76px;
		}
		.circle{
			background: #fff;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			
			&.large{
				width: 400px;
				height: 400px;
				z-index: 1;
				opacity: .2;
			}			
			
			&.med{
				width: 240px;
				height: 240px;
				z-index: 1;
				opacity: .2;
			}
			&.outline{
				opacity: .5;
				background: none;
				border: 6px solid #fff;
			}
			&.med-lrg{
				width: 300px;
				height: 300px;
				z-index: 2;
				opacity: .2;
			}
		}
	}
	
	@media ${device.laptop} {
		span{
		 &:nth-child(1){
		 	margin-top: 15px;
		 }
		}
	}
		
`
export const LoginRight = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 10px 30px 15px;
	h5, p{
		color: white;
	}
	h5{
		${Sentinel.semiboldItalic};
		font-size: 24px;
		font-weight: 300;
		line-height: 25px;
	}
	
	@media ${device.tablet} {
		flex: 1 0 50%;		
	}
	
	@media ${device.laptop} {
		margin-top: 80px;
	}
`

export const LoginAdButtons = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	button{
		flex: 1;
		&:nth-child(1){
			margin-right: 5px;
		}
		&:nth-child(2){
			margin-left: 5px;
			padding:9px 24px;
		}
	}
`

export const GuestBillingContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 20px;
	flex:1;
`

export const CheckoutFormLabel = styled.div`
	font-size: 13px;
	text-transform: uppercase;
	color: ${colors.grey.i800};
	padding: 30px 0 20px;
	font-weight: bold;
`

export const StripeCardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 20px;
	margin-bottom: 20px;
	height: 100%;
	justify-content: flex-start;
`

export const CreditCardFormWrapper = styled.div`
 margin-bottom: 30px;
`
export const PaypalFormContainer = styled.div`
	padding-bottom: 20px;
	height: 100%;
	display: flex;
	flex-direction: column;
`
export const PaypalSpinner = styled.div`
	position:relative;
	height: 52px;
	margin-top: 20px;
	
	${InputSpinner}{
		height: 52px;
		width: 52px;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
	}
`

export const PaypalButtonPoseWrapper = posed.div({
	show: {
		marginTop: 20,
		padding: '0px 20px',
		height: 'auto',
		overflow: 'hidden'
	},
	hide: {
		marginTop: 0,
		padding: '0px 20px',
		height: 0,
		overflow: 'hidden'
	}
})
