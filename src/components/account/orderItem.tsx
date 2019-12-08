import { IReceipt } from '@et/types/WC_Order'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	itemIndex: number
	selectedOrder: any
	handleClick: (item: any) => void
}

function OrderItem (props: IProps & IReceipt) {
	const { id, date, total, handleClick, selectedOrder } = props
	// console.log('selectedOrder === id', selectedOrder)

	const orderClick = () => {
		// console.log('id', id)
		return handleClick(id)
	}

	return (
		<div
			data-testid='orderItem'
			key={1}
			style={{ marginBottom: 20 }}
			onClick={orderClick}>
			<SelectedItem
				data-testid='orderItem-wrapper'
				selected={selectedOrder && selectedOrder.id === id}>
				<div data-testid='orderItem-id'>order# {id}</div>
				<div data-testid='orderItem-date'>date: {date}</div>
				<div data-testid='orderItem-total'>total {total}</div>
			</SelectedItem>
		</div>
	)
}

interface ISelected {
	selected: boolean
}

const SelectedItem = styled.div<ISelected>`
	color: ${props => props.selected ? 'red' : 'black'}
`

export default OrderItem
