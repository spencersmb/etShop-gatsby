import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import styled from 'styled-components'

export const CartItemContainer = styled.div`
	background: #fff;
	border-radius: 15px;
	${shadowStyles.shadow3};
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 25px;
	min-height: 145px;
	overflow: hidden;
	
	@media ${device.tablet} {
		background: transparent;
	}
		
`
export const CartItemHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	
	@media ${device.tablet} {
		flex: 0 1 45.5%;
		padding: 5px 25px;
		align-items: flex-start;
		justify-content: center;
		
	}
		
`
export const CartItemTitle = styled.div`
	${Sentinel.black};
	font-size: 21px;
	text-align: center;
	color: ${colors.grey.i800};
	padding-top: 20px;
	@media ${device.tablet} {
		padding: 0;	
		text-align: left;
		line-height: 24px;   
		font-size: 24px; 
		margin-bottom: 5px;
	}
		
`
export const CartItemLicense = styled.div<{ type: string }>`
	text-align: center;
	color: ${props => props.type === 'standard' ? colors.teal.i500 : colors.purple.i500};
	font-size: 14px;
	font-weight: 600;
	
	@media ${device.tablet} {
		font-size: 16px;
	}
		
`

export const CartItemDetails = styled.div`
 display: flex;
 flex-direction: column;
 width: 100%;
 border-top: 1px solid ${colors.grey.i300};
 border-bottom: 1px solid ${colors.grey.i300};
 padding: 15px;
 margin-top: 15px;
 
 @media ${device.tablet} {
		border-bottom: none;
		border-top: none;
		padding: 5px 30px;
		margin: 0;
		width: auto;
		flex: 1;
	}
 
`
export const CartItemDetail = styled.div<{ total?: boolean }>`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 5px;
	
	${props => props.total ? `
		flex: 1;
		align-items: flex-end;
	` : ''}
	
	span{
		text-transform: uppercase;
		color: ${colors.grey.i600};
		margin-right: 5px;
		font-size: 12px;
		line-height: 12px;
		font-weight: 500;
	}
	p{
		${Sentinel.semiboldItalic};
		font-size: 16px;
		line-height: 16px;
		color: ${colors.grey.i800};
		margin: 0;
	}
	.total{
		${Sentinel.semiboldItalic};
		color: ${colors.grey.i800};
		font-size: 21px;
	}
	.totalLabel{
		color: ${colors.grey.i800}; 
	}
	
		@media ${device.tablet} {
			span{
				margin-right: 20px;
			}
		}
`

export const CartItemDiscount = styled(CartItemDetail)`
	position: relative;
	.discount, .discountLabel{
		color: ${colors.red.warning};
	}
	.discountLabel{
		font-size: 13px;
	}
	.discount{
		font-size: 16px;
	}
	.discountPin{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}
`

export const RemoveItemMobile = styled.div`
	padding: 10px 15px;
	text-align: center;
	display: flex;
	justify-content: center;
	button{
		color: ${colors.red.warning};
		background: none;
		outline: none;
		border: none;
		margin: 0;
		padding: 0;
		&:focus{
			outline: none;
		}
	}
	
	@media ${device.tablet} {
		display: none;
	}
	
	@media ${device.laptop} {
		button{
		cursor: pointer;
		}
	}
		
`
export const RemoveItemDesktop = styled(RemoveItemMobile)`
	display: none;
	@media ${device.tablet} {
		display: flex;
		font-size: 14px;
		text-align: left;
		padding: 0;
		flex: 1;
		align-items: flex-end;
		
		button{
			transition: .3s;
			&:hover{
				color: ${colors.red.i500};
			}
		}
	}
`
export const VolumeDiscountPin = styled.div`
	width: 56px;
	height: 56px;
	justify-content: center;
	background: ${colors.red.warning};
	color: #fff;
	border-radius: 50%;
	text-align: center;
	font-size: 11px;
	line-height: 11px;
	font-weight: 600;
	display: flex;
	align-items: center;
`
export const CartItemContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;
	background: #fff;
	@media ${device.tablet} {
		flex-direction: row;
		flex: 1;
	}
`
export const CartItemBorder = styled.div<{ bottom?: boolean }>`
	display: none;
	width: 100%;
	background: ${props => props.bottom ? 'linear-gradient(0deg,rgb(201, 201, 201) 0%,rgb(205,205,205) 36%,rgb(193,193,193) 100%)' : 'linear-gradient(0deg,rgb(203, 203, 203) 0%,rgb(228, 228, 228) 100%)'};
	svg{
		width: 100%;
	}
	path{
		fill: #fff;
	}
	
	&.top{
		background: linear-gradient(0deg,rgb(238, 238, 238) 0%,rgb(239, 239, 239) 100%);
	}
	
	@media ${device.tablet} {
		display: flex;
	}
		
`

export const CartItemDashedBorder = styled.div`
	display: none;
	position: absolute;
	top: 0;
	width: 2px;
	height: 100%;
	overflow: hidden;
	left: 45.5%;
	svg{
		width: 100%;
		height: 187px;
	}
	
	path{
	 stroke: rgb(181, 181, 181);
	}
	
	@media ${device.tablet} {
		display: flex;
	}
`
