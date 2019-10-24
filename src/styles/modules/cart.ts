import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import styled from 'styled-components'

export const CartHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid ${colors.grey.i300};
	padding: 20px 15px;

	.closeCartBtn{
		width: 56px;
		height: 60px;
		display: flex;
		svg{
			width: 100%;
		}
		path{
			fill: ${colors.grey.i800};
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
	}
`
