import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { navigate } from 'gatsby'
import createStore from './src/state/store/createStore'
import { loadProducts } from './src/state/actions/productActions'
import { loginUserSuccess } from './src/state/actions/authActions'
import { loadUser, removeUserLocalStorage } from './src/utils/authUtils'

// Instantiating store in `wrapRootElement` handler ensures:
//  - there is fresh store for each SSR page
//  - it will be called only once in browser, when React mounts
export default ({ element }: {element: ReactNode}) => {
	const store = createStore()
	store.dispatch(loadProducts())

	// check localstorage for user
	// decode jwt and check if expired - if expired throw error and logout
	// if no user found do nothing
	loadUser()
		.then((user) => {
			if (user) {
				store.dispatch(loginUserSuccess(user))
			}
		})
		.catch((e) => {
			console.error('user token error', e)
			// remove user from localstorage
			removeUserLocalStorage()

			// que toaster
			const action = {
				type: '@ReduxToastr/toastr/ADD',
				payload: {
					type: 'error',
					position: 'bottom-right',
					options: {
						removeOnHover: false,
						showCloseButton: true
					},
					title: 'Invalid User',
					message: 'Please login again.'
				}
			}
			store.dispatch(action)
			// redirect
			navigate(`/page-2`)
		})

	return <Provider store={store}>{element}</Provider>
}