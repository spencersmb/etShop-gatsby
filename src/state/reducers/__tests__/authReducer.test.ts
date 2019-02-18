import { AuthActionTypes } from '@et/types/Enums'
import { IAuthResponse, IUser } from '@et/types/User'
import { userReducer } from '@redux/reducers/authReducer'
import initialState from '@redux/reducers/initialState'

describe('Auth Reducer', () => {

	it('should reduce an action with the type LOGIN_USER', () => {

		const serverResponse: IAuthResponse = {
			token: '1231313213',
			user_email: 'test@gmail.com',
			user_nicename: 'test@gmail.com',
			user_display_name: 'test@gmail.com',
			first_name: 'Ted',
			last_name: 'Bundy'
		}
		const reducer = userReducer(initialState.user, {
			type: AuthActionTypes.LOGIN_USER,
			payload: {
				...serverResponse
			}
		})

		const result: IUser = {
			token: '1231313213',
			email: 'test@gmail.com',
			firstName: 'Ted',
			lastName: 'Bundy'
		}
		expect(reducer).toEqual(result)
	})

	it('should reduce an action with the type LOGOUT', () => {

		const reducer = userReducer(initialState.user, {
			type: AuthActionTypes.LOGOUT
		})
		
		expect(reducer).toEqual(null)
	})

})
