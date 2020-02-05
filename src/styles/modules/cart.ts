import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { col, GridFluid } from '@styles/global/cssGrid'
import { Sentinel } from '@styles/global/fonts'
import styled from 'styled-components'

export const CartPageContainer = styled.div`
	width: 100%;
	padding: 20px;
	position: relative;
	@media ${device.tablet} {
	}
	@media ${device.laptop} {
		display: grid;
		grid-template-columns:
			minmax(0, 1fr)
			repeat(12, minmax(30px, ${col}))
			minmax(0, 1fr)
		;
		grid-gap: 30px;
		align-items: flex-start;
		padding: 20px 0 0;
	}
`
export const CartSliderTransition = {
	enter: {
		duration: 600,
		ease: [1, 0, 0, 1]
	},
	exit: {
		ease: [1, 0, 0, 1]
	}
}
export const CartHeader = styled.div`
	border-bottom: 1px solid ${colors.grey.i300};
	padding: 15px;
	grid-column: 1 / -1;
	
	.cartHeader__inner{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.closeCartBtn,
	.closeCheckoutBtn{
		width: 56px;
		height: 60px;
		display: flex;
		svg{
		max-width: 36px;
			width: 100%;
		}
		path{
			fill: ${colors.grey.i800};
		}
		
		@media ${device.tablet} {
			position: absolute;
			left: 20px;		    
		}
		
		@media ${device.laptop} {
			&:hover{
				cursor: pointer;
			}
		}
			
	}
	
	.emptyCartBtn{
		width: 56px;
	}
`
export const CartHeaderTitle = styled.div`
	
	font-weight: bold;
	text-align: center;
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	
	h2{
		${Sentinel.black};
		line-height: 28px;
		font-size: 28px;
		color: ${colors.grey.i800};
	}
	p{
		${Sentinel.reg};
		margin: 0;
		color: ${colors.secondary.text};
	}
	.total{
		font-size: 24px;
		line-height: 24px;
		color: ${colors.grey.i800};
	}
	.qty{
		display: none;
	}
	@media ${device.tablet} {
		.qty{
			display: flex;
			flex-direction: column;
		}
		.total{
			display: none;
		}
		
	}
		
`
export const EmptyCartList = styled.div`
	text-align: center;
	width: 100%;
	font-size: 18px;
	${Sentinel.semiboldItalic};
	margin-top: 25px;
	color: ${colors.grey.i800};
`
