import { IReceipt } from '@et/types/WC_Order'
import React, { useState } from 'react'
import styled from 'styled-components'

interface IProps {
	// isOpen: boolean,
	itemIndex: number
	// handleClick: (item: any) => void
}

function OrderItem (props: IProps & IReceipt) {
	const { id, date, total, handleClick, selectedOrder } = props

	const [isOpen, setisOpen] = useState(false)
	console.log('selectedOrder === id', selectedOrder)

	const orderClick = () => {
		return handleClick(id)
	}
	//
	// function click () {
	// 	console.log('itemIndex', props.itemIndex)
	//
	// 	// if (isOpen) {
	// 	// 	return
	// 	// }
	// 	// handleClick({
	// 	// 	selectedOrder: id
	// 	// })
	// }
	{/*<div key={1} style={{ marginBottom: 20 }} onClick={() => (setisOpen(!isOpen))}>*/}

	return (
		<div key={1} style={{ marginBottom: 20 }} onClick={orderClick}>
			<SelectedItem selected={selectedOrder === id}>
				<div>order# {id}</div>
				<div>date: {date}</div>
				<div>total {total}</div>
			</SelectedItem>
			{isOpen &&
      <div>
        content
        convert to component that has a dispatcher and redux state
        dispatcher checks if order content is already loaded, if not fetch from api
        store content in the pagination. under page and then order
      </div>
			}
		</div>
	)
}

const SelectedItem = styled.div`
	color: ${props => props.selected ? 'red' : 'black'}
`

export default OrderItem