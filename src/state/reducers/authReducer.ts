import { AuthActionTypes } from '@et/types/Enums'
import { IUserState } from '@et/types/User'
import { Reducer } from 'redux'
import initialState from './initialState'
import { Actions } from '@et/types/Actions'

export const userReducer: Reducer<IUserState> = (state: IUserState = initialState.user, action: Actions): IUserState => {
	switch (action.type) {
		case AuthActionTypes.LOGIN_USER:
		// console.log('action.payload', action.payload)

			return {
				email: action.payload.user_email,
				firstName: action.payload.first_name,
				lastName: action.payload.last_name,
				gravatar: action.payload.gravatar,
				token: action.payload.token,
				fbProfilePic: action.payload.fbProfilePic
			}
		case AuthActionTypes.LOGOUT:
			return null
		default:
			return state
	}
}
