import React from 'react'

function OrderDisplay (props) {
	return (
		<div>
			order #{props.selectedOrder.id}
		</div>
	)
}

export default OrderDisplay