import { matchString } from '@utils/genUtils'
import { toastr } from 'react-redux-toastr'

/**
 * statusCheck(res, dispatch)
 * - Redux Middleware apiIntercepter status check
 * - Used to upload files/photos
 *
 * @param {Object} response
 * @param {Function} dispatch
 * @returns {Function} actionType dispatch( logUserOut )
 * @returns {Error}
 */
export const statusCheck = async (response: any, dispatch: any) => {
	// console.log('response.status', response)
	// console.log('errors?', await response.json())

	// reset errors
	toastr.removeByType('error')

	// check for JWT AUTH ERRORS
	// WordPress returns html so we convert them manually
	if (response.status === 403 && matchString(response.url, 'jwt-auth')) {

		const newError: { code: string, data?: { status: string } } = await response.json()

		if (newError.code === '[jwt_auth] incorrect_password') {
			toastr.error('Error:', 'The password you entered is incorrect.', toastrOptions.noHover)
		} else if (newError.code === '[jwt_auth] invalid_email') {
			toastr.error('Error:', 'The email and password you entered is incorrect.', toastrOptions.noHover)
		} else {
			toastr.error('Error:', 'Auth Error', toastrOptions.noHover)
		}
		throw newError
	}

	// Check if order is 400 and if it needs to be deleted
	if (response.status === 400) {
		// const newError: { message: string, data?: { order_id: string } } = await response.json()
		// if (newError.data && newError.data.order_id) {
		// 	await dispatch(removeOrder(newError.data.order_id))
		//
		// 	if (!newError.message) {
		// 		toastr.error('Error:', 'Server Order Error 400')
		// 	} else {
		// 		toastr.error('Error:', newError.message)
		// 	}
		// }
		// toastr.error('Error:', newError.message, toastrOptions.noHover)
		// throw newError
	}

	if (response.status === 404) {
		const newError: { data?: { order_id: string } } = await response.json()
		console.error('Error: no route')
		toastr.error('Error:', 'Server Error', toastrOptions.noHover)
		throw newError
	}

	// // Catch all for anything the didn't meet above requirements
	// // IE 500 status
	if (response.status !== 200) {
		const newError = await response.json()

		if (newError.message) {
			toastr.error('Error:', newError.message, toastrOptions.noHover)
			throw newError
		}
		if (newError.error) {
			toastr.error('Error:', newError.error, toastrOptions.noHover)
			throw newError
		}
	}
}

export const toastrOptions = {
	noHover: {
		closeOnToastrClick: true, // false by default, this will close the toastr when user clicks on it
		preventDuplicates: true,
		removeOnHover: false,
		showCloseButton: true, // true by default
		timeOut: 0 // by setting to 0 it will prevent the auto close
		// onShowComplete: () => console.log('SHOW: animation is done'),
		// onHideComplete: () => console.log('HIDE: animation is done'),
		// onCloseButtonClick: () => console.log('Close button was clicked'),
		// onToastrClick: () => console.log('Toastr was clicked'),
	},
	standard: {
		closeOnToastrClick: true, // false by default, this will close the toastr when user clicks on it
		preventDuplicates: true,
		removeOnHover: false,
		showCloseButton: true, // true by default
		timeOut: 3000 // by setting to 0 it will prevent the auto close
	}
}