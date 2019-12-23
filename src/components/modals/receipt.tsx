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

	console.log('data', data)

	return (
		<PoseMain>
			<RightCol>
				<CardWrapper>
					<ReceiptCard {...data} handleClose={closeModal}/>
				</CardWrapper>
			</RightCol>
		</PoseMain>
	)
}

export default Receipt
const CardWrapper = styled.div`
	grid-column: 2 / 4;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 20px 0;
@media ${device.tablet} {
	padding: 40px 40px;
	grid-column: 2 / 14;
}
@media ${device.laptop} {
	padding: 40px 40px;
	grid-column: 6 / 14;
}
@media ${device.laptopL} {
	padding: 40px 40px;
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
