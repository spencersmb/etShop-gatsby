import { IReceipt } from '@et/types/WC_Order'
import React, { useState } from 'react'

interface IProps {
	// isOpen: boolean,
	itemIndex: number
	// handleClick: (item: any) => void
}

function OrderItem (props: IProps & IReceipt) {
	const { id, date, total } = props

	const [isOpen, setisOpen] = useState(false)
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

	return (
		<div key={1} style={{ marginBottom: 20 }} onClick={() => (setisOpen(!isOpen))}>
			<div>
				<div>order# {id}</div>
				<div>date: {date}</div>
				<div>total {total}</div>
			</div>
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

export default OrderItem