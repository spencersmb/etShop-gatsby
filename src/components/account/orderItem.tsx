import { IReceipt } from '@et/types/WC_Order'
import { colors } from '@styles/global/colors'
import { shadowStyles } from '@styles/global/shadows'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	itemIndex: number
	selectedOrder: any
	handleClick: (item: any) => void
}

interface ISelected {
	selected: boolean
}

function formatDate (dateString: string) {
	// return dateString.replace('-', '/')
	return dateString.split('-').join('/')
}

function OrderItem (props: IProps & IReceipt) {
	const { id, date, total, handleClick, selectedOrder } = props
	// console.log('selectedOrder === id', selectedOrder)

	const orderClick = () => {
		// console.log('id', id)
		return handleClick(id)
	}

	return (
		<ItemCard
			data-testid='orderItem'
			key={1}
			selected={selectedOrder && selectedOrder.id === id}
			onClick={orderClick}>
			<ItemContent
				data-testid='orderItem-wrapper'
			>
				<Left>
					<Title data-testid='orderItem-id'>order</Title>
					<div>{id}</div>
				</Left>
				<Right>
					<Date data-testid='orderItem-date'>{formatDate(date)}</Date>
					<div data-testid='orderItem-total'>${total}</div>
				</Right>
			</ItemContent>
		</ItemCard>
	)
}

const Title = styled.div`
	font-size: 12px;
	color: ${colors.grey.i800};
	margin-bottom: 15px;
	text-transform: uppercase;
`
const Date = styled(Title)`
	font-size: 16px;
`
const Left = styled.div`
	flex: 1 0 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`
const Right = styled.div`
	flex: 1 0 50%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`
const ItemCard = styled.div<ISelected>`
	background: ${props => props.selected ? colors.db.mid : '#fff'};
	margin-bottom: 15px;
	box-shadow: ${shadowStyles.shadow1};
	border-radius: 10px;
`
const ItemContent = styled.div`
	padding: 15px 20px;
	display: flex;
	flex-direction: row;
	color: ${colors.primary.text};
`

export default OrderItem
