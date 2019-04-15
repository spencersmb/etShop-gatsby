import React from 'react'

function OrderDisplay (props: any) {
	return (
		<div>
			order #{props.selectedOrder.id}
		</div>
	)
}

export default OrderDisplay