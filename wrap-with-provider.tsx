import React, { ReactNode } from 'react'
import Helmet from 'react-helmet'
import { Provider } from 'react-redux'
import createStore from './src/state/store/createStore'
import { loadProducts } from './src/state/actions/productActions'
import { loginUserSuccess } from './src/state/actions/authActions'
import { loadUser, removeUserLocalStorage } from './src/utils/authUtils'

// Instantiating store in `wrapRootElement` handler ensures:
//  - there is fresh store for each SSR page
//  - it will be called only once in browser, when React mounts
export default ({ element }: { element: ReactNode }) => {
	const store = createStore()
	store.dispatch(loadProducts())
	const PaypalKey = process.env.NODE_ENV === 'production'
		? process.env.GATSBY_PAYPAL_KEY
		: process.env.GATSBY_PAYPAL_TEST_KEY

	const PaypalMerchantId = process.env.NODE_ENV === 'production'
		? '39L6VSTBV6WFG'
		: '6Q52LNH4ART22'
	// USER CHECK
	// check localstorage for user
	// decode jwt and check if expired - if expired throw error and logout
	// if no user found do nothing
	loadUser()
		.then((user) => {
			// console.log('user', user)

			if (user) {
				store.dispatch(loginUserSuccess(user))
			}
		})
		.catch((e) => {
			// console.error('user token error', e)
			// remove user from localstorage
			removeUserLocalStorage()

			// // que toaster
			// const action = {
			// 	type: '@ReduxToastr/toastr/ADD',
			// 	payload: {
			// 		type: 'error',
			// 		position: 'bottom-right',
			// 		options: {
			// 			removeOnHover: false,
			// 			showCloseButton: true
			// 		},
			// 		title: 'Invalid User',
			// 		message: 'Please login again.'
			// 	}
			// }
			// store.dispatch(action)
			// // redirect
			// navigate(`/page-2`)
		})
	// TODO: merchant ID for ET PAypal shop not test shop

	console.log('PaypalMerchantId', PaypalMerchantId)
	// &merchant_id=${PaypalMerchantId}
	return <Provider store={store}>
		<Helmet>
			<script id='paypal-js'
							src={`https://www.paypal.com/sdk/js?client-id=${PaypalKey}&disable-funding=credit,card&commit=true&merchant-id=${PaypalMerchantId}&locale=en_US&integration-date=2019-11-07`}/>
		</Helmet>
		{element}
	</Provider>
}
