import AuthApi from '@api/authApi'
import { Actions } from '@et/types/Actions'
import { AuthActionTypes } from '@et/types/Enums'
import { IState } from '@et/types/State'
import { IAuthResponse, ICreateAuthResponse, IFacebookUserCreate, IUserCreate } from '@et/types/User'
import { loadCouponSuccess } from '@redux/actions/couponActions'
import { clearPagination } from '@redux/actions/paginationActions'
import { statusCheck } from '@utils/apiUtils'
import { removeUserLocalStorage, saveUserLocalStorage } from '@utils/authUtils'
import { Action, Dispatch } from 'redux'

/**
 * *TESTED
 */
export const login: any = ({ signinEmail, signinPassword }: { signinEmail: string, signinPassword: string }) => async (dispatch: Dispatch<Action>): Promise<{ firstName: string }> => {

	// Add Loading Dispatch spinner
	// insert LOADING BAR ACTION ?

	const response: Response = await AuthApi.login({ signinEmail, signinPassword })

	await statusCheck(response, dispatch)

	const body: IAuthResponse = await response.json()

	dispatch(loginUserSuccess(body))
	saveUserLocalStorage(body)
	return {
		firstName: body.first_name
	}

}

/**
 * *TESTED
 */
export type ILoginAction = (user: IAuthResponse) => Actions
export const loginUserSuccess: ILoginAction = (user) => {
	return {
		payload: user,
		type: AuthActionTypes.LOGIN_USER
	}
}

/**
 * *TESTED
 */
export type ILogoutAction = () => Actions
export const logout: any = () => (dispatch: Dispatch<Action>, getState: () => IState) => {

	removeUserLocalStorage()
	dispatch(clearPagination())
	dispatch({
		type: AuthActionTypes.LOGOUT
	})
}

/**
 * *TESTED
 */
export const createUser: any = (user: IUserCreate) => async (dispatch: Dispatch<Action>): Promise<any> => {

	// Add Loading Dispatch spinner
	// insert LOADING BAR ACTION ?

	const response: Response = await AuthApi.createUser(user)

	await statusCheck(response, dispatch)

	const body: ICreateAuthResponse = await response.json()

	dispatch(loginUserSuccess(body))
	dispatch(loadCouponSuccess(body.coupon))
	saveUserLocalStorage(body)
	return {
		firstName: body.first_name
	}

}

/**
 * *TESTED
 */
export const createUserFacebook: any = (user: IFacebookUserCreate) => async (dispatch: Dispatch<Action>): Promise<any> => {

	const response: Response = await AuthApi.createFacebookUser(user)

	await statusCheck(response, dispatch)

	const body: ICreateAuthResponse = await response.json()

	body.fbProfilePic = user.picture ? user.picture.data.url : null

	dispatch(loginUserSuccess(body))
	if (body.coupon) {
		dispatch(loadCouponSuccess(body.coupon))
	}
	saveUserLocalStorage(body)
	return {
		firstName: body.first_name
	}

}

/**
 * *TESTED
 */
export const forgotPasswordSubmitComplete = (): Actions => {
	return {
		type: AuthActionTypes.FORGOTPW
	}
}

/**
 * *TESTED
 */
export type IForgotPWAction = (email: string) => (dispatch: Dispatch<Action>) => Promise<any>
export const forgotPassword: IForgotPWAction = (email: string) => async (dispatch: Dispatch<Action>): Promise<any> => {
	const response: Response = await AuthApi.forgotPasswordRequest(email)
	await statusCheck(response, dispatch)
	dispatch(forgotPasswordSubmitComplete())
}

/**
 * *TESTED
 */
interface IResetFormProps {
	email: string
	password: string
	rpKey: string
}

export const resetPassword: any = (formProps: IResetFormProps) => async (dispatch: Dispatch<Action>): Promise<any> => {
	const response: Response = await AuthApi.resetPassword(formProps)

	await statusCheck(response, dispatch)

	const body: ICreateAuthResponse = await response.json()

	dispatch(loginUserSuccess(body))
	saveUserLocalStorage(body)
	return {
		firstName: body.first_name
	}
}
