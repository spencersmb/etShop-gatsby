import { IState } from '@et/types/State'
import {Action, Dispatch} from 'redux'

export const login: any = ({email, password}: { email: string, password: string }) => async (dispatch: Dispatch<Action>): Promise<any> => {

  // Add Loading Dispatch spinner
  // insert LOADING BAR ACTION ?

  // const response: Response = await AuthApi.login({email, password})
  //
  // await statusCheck(response, dispatch)
  //
  // const body: IAuthResponse = await response.json()
  // dispatch(loginUserSuccess(body))
  // saveUserLocalStorage(body)
  // return {
  //   firstName: body.first_name
  // }

}