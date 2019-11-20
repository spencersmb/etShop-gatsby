import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { Sentinel } from '@styles/global/fonts'
import styled from 'styled-components'

export const CartPageContainer = styled(GridFluid)`
	width: 100%;
	padding: 20px 0 0;
	position: relative;
	@media ${device.tablet} {
	}
	@media ${device.laptop} {
	align-items: flex-start;
		
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
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid ${colors.grey.i300};
	padding: 15px;

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
`
export const EmptyCartList = styled.div`
	text-align: center;
	width: 100%;
	font-size: 18px;
	${Sentinel.semiboldItalic};
	margin-top: 25px;
	color: ${colors.grey.i800};
`
