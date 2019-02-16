import AuthApi from '@api/authApi'
import { Actions } from '@et/types/Actions'
import { AuthActionTypes } from '@et/types/Enums'
import { IAuthResponse } from '@et/types/User'
import { statusCheck } from '@utils/apiUtils'
import { removeUserLocalStorage, saveUserLocalStorage } from '@utils/genUtils'
import {Action, Dispatch} from 'redux'

export const login: any = ({email, password}: { email: string, password: string }) => async (dispatch: Dispatch<Action>): Promise<{firstName: string}> => {

  // Add Loading Dispatch spinner
  // insert LOADING BAR ACTION ?

  const response: Response = await AuthApi.login({email, password})

  await statusCheck(response, dispatch)

  const body: IAuthResponse = await response.json()

  dispatch(loginUserSuccess(body))
  saveUserLocalStorage(body)
  return {
    firstName: body.first_name
  }

}

const loginUserSuccess = (data: IAuthResponse) => {
  return {
    payload: data,
    type: AuthActionTypes.LOGIN_USER
  }
}

export type ILogoutAction = () => Actions
export const logout:ILogoutAction = () => {
  removeUserLocalStorage()
  return {
    type: AuthActionTypes.LOGOUT
  }
}