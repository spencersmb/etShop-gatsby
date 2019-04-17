import React from 'react'

function OrderDisplay (props: any) {
	return (
		<div data-testid='display-orderId'>
			order #{props.selectedOrder.id}
		</div>
	)
}

export default OrderDisplay