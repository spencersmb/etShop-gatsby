import { IAuthResponse, IJWTDecoded, IUser } from '@et/types/User'
import jwtDecode from 'jwt-decode'

/**
 * saveUserLocalStorage()
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
 * removeUserLocalStorage()
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
 * getUserLocalStorage()
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

export function isUserValid (token: string) {
	const decodedUser: IJWTDecoded = jwtDecode(token)
	const today: Date = new Date()

	// returns true if date is less than the expire time
	// return today.getDate() <= decodedUser.exp
	return today.getDate() <= decodedUser.exp
}

/**
 * loadUser()
 * - Get user from localstorage
 * - Check if the JWT date is valid
 * - If JWT is invalid throw error
 * * @returns string | false
 */
export const loadUser = async (): Promise<IAuthResponse | null> => {
	return new Promise((resolve, reject) => {
		const user: IAuthResponse | false = getUserLocalStorage()
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