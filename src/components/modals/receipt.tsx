import { IModal, Merge } from '@et/types/Modal'
import { IOrderDownload } from '@et/types/WC_Order'
import { displayCurrency } from '@utils/priceUtils'
import React from 'react'
import posed from 'react-pose'
import styled from 'styled-components'

// https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file

type IReceiptProps = Merge<IModal, {
	options: {
		data: {
			type: string,
			total: string,
			orderId: string,
			date: string,
			email: string,
			downloads: IOrderDownload
		}
	}
}>

export function Receipt (props: IReceiptProps) {
	const { options: { data }, closeModal } = props

	return (
		<Main>
			<LeftColPose animateOnMount={true}>
				Left
			</LeftColPose>
			<RightColPose>
				<div>
					<button onClick={closeModal}>Close</button>
					<h1>Order Complete</h1>
					<p>Thank you for your order from Every-Tuesday.com</p>
					<span data-testid='emailCopy'>Copy sent to {data.email}</span>
				</div>
				<div>
					<div data-testid='receiptTotal'>
						total: {displayCurrency(data.total)}
					</div>
					<div>
						<div data-testid='receiptOrderId'>
							order #{data.orderId}
						</div>
						<div data-testid='receiptDate'>
							date: {data.date}
						</div>
						<div>
							logo
						</div>
					</div>
				</div>
				<div>
					<ul data-testid='orderDownloads'>
						{data.downloads.products && data.downloads.products.map(product =>
							<li key={product.id} data-testid={`download-${product.id}`}>
								<a href={product.url} target='_blank'>
									{product.name}
								</a>
							</li>)}
					</ul>
				</div>
				<div>
					Questions reguarding your purchase? Email us!
				</div>
			</RightColPose>
		</Main>
	)
}

export default Receipt

const startPos = `100%`
const Main = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: row;
	overflow: hidden;
	z-index: 7;
`
const LeftCol = styled.div`
	width: 50%;
	height: 100%;
	background: #008800;
	left: ${startPos};
	position: relative;
`
const LeftColPose = posed(LeftCol)({
	exit: {
		transition: {
			default: { duration: 150 },
			left: { ease: 'easeOut' }
		},
		left: `-100%`
	},
	enter: {
		transition: {
			left: { ease: 'easeOut', duration: 300, delay: 100 }
		},
		left: `0%`
	}
})
const RightCol = styled.div`
	width: 50%;
	height: 100%;
	background: #dbc343;
	right: ${startPos};
	position: relative;
`
const RightColPose = posed(RightCol)({
	exit: {
		transition: {
			default: { duration: 150 },
			right: { ease: 'easeOut' }
		},
		right: `-100%`
	},
	enter: {
		transition: {
			right: { ease: 'easeOut', duration: 300, delay: 100 }
		},
		right: `0%`
	}
})
