import { CustomWindow } from '@et/types/Winodw'
import { StripeProvider, Elements } from 'react-stripe-elements'
import React, { useEffect, useRef, useState } from 'react'

interface IStripeProviderProps {
	stripe: any | null
}

interface IState extends IStripeProviderProps {
	show: boolean,
}

declare let window: CustomWindow

export function StripeProviderWrapper (props: any) {

	const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY || ''
	const [stripe, setStripe] = useState(null)
	const stripeScriptTag = useRef<Element | null>(null)

	useEffect(() => {
		if (window.Stripe) {
			// console.log('has Stripe already')
			setStripe(window.Stripe(stripeSecretKey))
			console.log('stripe already loaded')

		} else {
			stripeScriptTag.current = document.querySelector('#stripe-js')
			if (stripeScriptTag.current) {
				stripeScriptTag.current.addEventListener('load', loadStripe)
			}
		}
	}, [])

	function loadStripe () {
		setStripe(window.Stripe(stripeSecretKey))
		console.log('stripe loaded')
	}

	return (
		<StripeProvider stripe={stripe}>
			<Elements>
				<>
					{props.children}
					{!stripe && <div>Unable to load stripe checkout</div>}
				</>
			</Elements>
		</StripeProvider>
	)
}

export default StripeProviderWrapper