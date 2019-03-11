import { IUserOrderDisplay } from '@et/types/WC_Order'
import React from 'react'

interface IProps {
	isOpen: boolean,
	itemIndex: number
	handleClick: (item: any) => void
}

function OrderItem (props: IProps & IUserOrderDisplay) {
	const { isOpen, handleClick, id } = props

	function click () {
		if (isOpen) {
			return
		}
		handleClick({
			selectedOrder: id
		})
	}

	return (
		<div key={1} style={{ marginBottom: 20 }} onClick={click}>
			<div>
				<div>order# {props.id}</div>
				<div>date: {props.date}</div>
				<div>total {props.total}</div>
			</div>
			{isOpen && <div>
        content
        convert to component that has a dispatcher and redux state
        dispatcher checks if order content is already loaded, if not fetch from api
        store content in the pagination. under page and then order
      </div>}
		</div>
	)
}

export default OrderItem