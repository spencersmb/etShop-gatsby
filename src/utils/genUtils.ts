import { IAuthResponse } from '@et/types/User'

/**
 * matchString(str, regexPattern)
 * - matchRegex and return true or false
 *
 * @param {String} str
 * @param {String} regexPattern
 * @returns boolean
 */
export const matchString = (str: string, regexPattern: string): boolean => {
	return !!str.match(regexPattern)
}
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