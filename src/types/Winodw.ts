import React from 'react'

interface IPaypalButton {
	Buttons: {
		driver: any
		react: any
	}
}
type ISwipe = new(element: HTMLDivElement) => void
export interface CustomWindow extends Window {
	__REDUX_DEVTOOLS_EXTENSION__: any;
	Stripe?: any;
	paypal:IPaypalButton;
	SwipeContent: ISwipe
}
