import React from 'react'

interface IPaypalButton {
	Button: {
		react: any
	}
}

export interface CustomWindow extends Window {
	__REDUX_DEVTOOLS_EXTENSION__: any;
	Stripe?: any;
	paypal: React.ComponentType<{} & IPaypalButton>;
}
