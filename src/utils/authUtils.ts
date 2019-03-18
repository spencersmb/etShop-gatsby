import { IAuthResponse, IJWTDecoded, IUser } from '@et/types/User'
import jwtDecode from 'jwt-decode'

/**
 * * saveUserLocalStorage()
 * - Adds User to localstorage
 *
 */
export const saveUserLocalStorage = (user: IAuthResponse) => {
	if (typeof window === 'undefined') {
		return
	}
	window.localStorage.setItem('et-shop-user', JSON.stringify(user))
}

/**
 * * removeUserLocalStorage()
 * - Remove user from localstorage
 *
 */
export const removeUserLocalStorage = () => {
	if (typeof window === 'undefined') {
		return
	}
	window.localStorage.removeItem('et-shop-user')
}

/**
 * * getUserLocalStorage()
 * - Get user from localstorage
 * * @returns IUser | false
 */
export const getUserLocalStorage = (): IAuthResponse | false => {
	if (typeof window === 'undefined') {
		return false
	}

	const userString = window.localStorage.getItem('et-shop-user')
	if (!userString) {
		return false
	}

	return JSON.parse(userString)
}

/**
 * * isUserValid()
 * - Get user from JWT and compare dates
 * @param {String} token
 * @returns boolean
 */
export function isUserValid (token: string) {
	const decodedUser: IJWTDecoded = jwtDecode(token)
	const today = new Date()
	const exp = new Date(decodedUser.exp * 1000)
	// console.log('return isUserValid', exp.getTime() > today.getTime())
	console.log('return isUserValid reverse', exp.getTime() >= today.getTime())
	console.log('today', today.getTime()) // Sunday, March 17, 2019 7:58:52.039 PM
	console.log('exp', exp.getTime()) // Sunday, March 17, 2019 7:53:53 PM

	// console.log('todays date', today.getTime()) // Sunday, March 17, 2019 4:35:41.540 PM
	// console.log('exp date', decodedUser.exp) // Sunday, March 17, 2019 4:36:08 PM

	// returns true if date is less than the expire time
	return exp.getTime() >= today.getTime()
}

/**
 * * loadUser()
 * - Get user from localstorage
 * - Check if the JWT date is valid
 * - If JWT is invalid throw error
 * @returns Promise
 */
export const loadUser = async (): Promise<IAuthResponse | null> => {
	return new Promise((resolve, reject) => {
		const user: IAuthResponse | false = getUserLocalStorage()
		// const isValid = isUserValid(user.token)
		// console.log('isUserValid(user.token)', isValid)

		if (user && isUserValid(user.token)) {
			return resolve(user)
		} else if (user && !isUserValid(user.token)) {
			reject({
				message: 'User is invalid, please login again'
			})
		} else {
			return resolve(null)
		}
	})
}