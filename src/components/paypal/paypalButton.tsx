import React from 'react'

interface IProps {
	client: {
		sandbox: string,
		production: string
	};
	createOrder: (data: any, actions: any) => void;
	onApprove: (data: any, actions: any) => void;
	onError: (error: any) => void;
	onCancel: (data: any) => void;
	PaypalCheckoutButton: any,
	invalid: boolean
}

export function PaypalButton (props: IProps) {
	const { PaypalCheckoutButton, createOrder, onApprove, invalid, client, onCancel, onError } = props

	console.log('paypal button render', PaypalCheckoutButton)

	return (
		<div style={{ maxWidth: '150px' }}>
			{PaypalCheckoutButton && !invalid && <PaypalCheckoutButton
				client={client}
				createOrder={createOrder}
				onApprove={onApprove}
				onCancel={onCancel}
				onError={onError}
				style={
					{
						color: 'silver',     // gold | blue | silver | black
						label: 'checkout',
						shape: 'pill',     // pill | rect
						size: 'responsive',    // small | medium | large | responsive
						tagline: false
					}
				}
			/>}
			{invalid && <div>Fake checkout btn</div>}
		</div>
	)
}

export default PaypalButton
