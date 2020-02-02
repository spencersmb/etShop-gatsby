import ReceiptCard from '@components/modals/receipt/receiptCard'
import { IModal, Merge } from '@et/types/Modal'
import { IOrderDownload, IReceipt } from '@et/types/WC_Order'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { CartSliderTransition } from '@styles/modules/cart'
import { svgs } from '@svg'
import { displayCurrency } from '@utils/priceUtils'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

// https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file

type IReceiptProps = Merge<IModal, {
	options: {
		data: IReceipt
	}
}>

export function Receipt (props: IReceiptProps) {
	const { options: { data }, closeModal } = props
	return (
		<PoseMain>
			<RightCol>
				<ThankyouWrapper>
					{renderSvg(svgs.Thankyou)}
				</ThankyouWrapper>
				<CardWrapper>
					<ReceiptCard {...data} handleClose={closeModal}/>
				</CardWrapper>
			</RightCol>
		</PoseMain>
	)
}

export default Receipt
const ThankyouWrapper = styled.div`
	display: none;
	position: relative;
	z-index: 1;
	
	svg{
		height: 100%;
		width: 100%;
	}
	path{
		fill: ${colors.purple.i500};
	}
	@media ${device.laptop} {
		grid-column: 2/9;
		margin-left: -160px;
		margin-top: -280px;
	}
	@media ${device.laptopL} {
		display: flex;
		grid-row: 1;
		grid-column: 2/11;
		margin-left: -360px;
		margin-top: -280px;
		left: -70px;
	}
		
`
const CardWrapper = styled.div`
	grid-column: 2 / 4;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 20px 0;
	z-index: 2;
	position: relative;
	grid-row: 1;
@media ${device.tablet} {
	padding: 0;
	grid-column: 2 / 14;
}
@media ${device.laptop} {
	grid-column: 3 / 13;
}
@media ${device.laptopL} {
	grid-column: 6 / 14;
}
`
const startPos = `100%`
const Main = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: ${startPos};
	display: flex;
	background: ${colors.grey.i200};
	flex-direction: row;
	overflow-x: hidden;
	overflow-y: scroll;
	z-index: 7;
`
const RightCol = styled(GridFluid)`
	width: 100%;
	height: 100%;
	padding: 0;
	// left: ${startPos};
	position: relative;
	align-items: center;
`
const PoseMain = posed(Main)({
	exit: {
		transition: CartSliderTransition.exit,
		left: `-100%`
	},
	enter: {
		transition: CartSliderTransition.enter,
		left: `0%`
	}
})
