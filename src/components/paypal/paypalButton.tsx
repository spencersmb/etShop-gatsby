import PaypalDisabledBtn from '@components/paypal/paypalDisabledBtn'
import { InputSpinner, PaypalSpinner } from '@styles/modules/checkout'
import React from 'react'

interface IProps {
	client: {
		sandbox: string,
		production: string
	}
	submitting: boolean
	createOrder: (data: any, actions: any) => void
	onApprove: (data: any, actions: any) => void
	onError: (error: any) => void
	onCancel: (data: any) => void
	PaypalCheckoutButton: any
	invalid: boolean
}

export function PaypalButton (props: IProps) {
	const { PaypalCheckoutButton, createOrder, onApprove, invalid, client, onCancel, onError, submitting } = props

	console.log('paypal button render', invalid)

	return (
		<div>

			{PaypalCheckoutButton && !invalid && !submitting && <PaypalCheckoutButton
        client={client}
        createOrder={createOrder}
        onApprove={onApprove}
        onCancel={onCancel}
        onError={onError}
        style={
					{
						color: 'blue',     // gold | blue | silver | black
						label: 'checkout',
						shape: 'pill',     // pill | rect
						size: 'responsive',    // small | medium | large | responsive
						tagline: false
					}
				}
      />}
			{invalid && <PaypalDisabledBtn/>}
		</div>
	)
}

export default PaypalButton
