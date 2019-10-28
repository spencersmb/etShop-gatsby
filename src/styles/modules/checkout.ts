import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import posed from 'react-pose'
import styled from 'styled-components'

export const CheckoutTabs = styled.ul`
 margin:0;
 padding: 0;
 display: flex;
 flex-direction: row;
 width: 100%;
`

export const PaymentTab = styled.li<{ selected: boolean }>`
	flex: 1;
	list-style: none;
	background: ${props => props.selected ? '#fff' : colors.grey.i400};
	transition: .3s;
	svg{
		width: 100%;
	}
	
	path{
		transition: .3s;
		fill: ${props => props.selected ? colors.teal.i500 : colors.secondary.text}
	}
		
	// CreditCard
	.stripe{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: 0;
		padding: 25px 15px;
	}
	.paypal{
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0;
		display: flex;
		padding: 25px 15px;
		height: 100%;
	}
	.cc-paypal{
		width: 63px;
		display: flex;

	}
	.cc-svg{
		width: 46px;
		display: flex;
	}
	.cc-text{
		font-size: 15px;
		font-weight: 500;
		margin-left: 8px;
		color: ${props => props.selected ? colors.teal.i500 : colors.secondary.text};
	}
`

export const OrderSummery = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 20px;
	align-items: center;
	
	h3{
		text-align: center;
		${Sentinel.black};
		font-size: 18px;
		color: ${colors.grey.i800};
	}
`

export const TotalSummery = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	
	& > span{
		text-align: center;
		color: ${colors.grey.i600};
		display: none;
	}
	
	.orderTotal{
		${Sentinel.semiboldItalic};
		font-size: 42px;
		line-height: 42px;
		color: ${colors.grey.i800};
		text-align: center;
		margin-bottom: 20px;
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
	display: flex;
	flex-direction: column;
	align-items: center;
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

`
export const CouponContainer = styled.div`
	background: ${colors.grey.i200};
	padding: 20px;
	
	.formGroup__Container{
		margin: 0;
	}
	.formInput{
		margin-bottom: 0;
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
	max-width: 250px;
	margin: 0 auto 5px;
	width: 100%;
`

export const CartLoginAd = styled.div`
	background: ${colors.teal.i500};
`
export const LoginAdLeft = styled.div`
	display: none;
`
export const LoginRight = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px 30px;
	h5, p{
		color: white;
	}
	h5{
		${Sentinel.semiboldItalic};
		font-size: 24px;
		font-weight: 300;
		line-height: 25px;
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
