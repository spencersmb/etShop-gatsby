import { ICouponRaw } from '@et/types/Cart'

export interface IAuthResponse {
	token: string,
	user_email: string,
	user_nicename: string,
	user_display_name: string,
	first_name: string,
	last_name: string,
	gravatar: string,
	fbProfilePic: string | null
}

export interface ICreateAuthResponse {
	token: string,
	user_email: string,
	user_nicename: string,
	user_display_name: string,
	first_name: string,
	last_name: string,
	gravatar: string,
	coupon: ICouponRaw
	fbProfilePic: string | null
}

export interface IUserSubmit {
	signinEmail: string,
	signinPassword: string
}

export interface IUserCreate {
	signupEmail: string,
	signupFirstName: string,
	signupLastName: string,
	password: string
}

export interface IFacebookUserCreate {
	accessToken: string
	data_access_expiration_time: number
	email: string
	expiresIn: number
	id: number
	first_name: string
	name: string
	last_name: string
	picture: {
		data: {
			height: number
			is_silhouette: boolean
			url: string
			width: number
		}
	}
	signedRequest: string
	userID: string
}

export type IUserState = IUser | null

export interface IUser {
	email: string,
	firstName: string,
	lastName: string,
	gravatar: string,
	token: string,
	fbProfilePic: string | null
}

export interface IJWTDecoded {
	iss: string, // server
	iat: number, // issued at
	nbf: number, // not valid before
	exp: number, // Expires
	data: {
		user: {
			id: string
		}
	}
}
