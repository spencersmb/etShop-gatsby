import { ICouponRaw } from '@et/types/Cart'

export interface IAuthResponse {
  token: string,
  user_email: string,
  user_nicename: string,
  user_display_name: string,
  first_name: string,
  last_name: string,
  gravatar: string
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
}

export interface IUserSubmit {
  email: string,
  password: string
}

export interface IUserCreate {
  email: string,
  firstName: string,
  lastName: string,
  password: string
}

export type IUserState = IUser | null

export interface IUser {
  email: string,
  firstName: string,
  lastName: string,
  gravatar: string,
  token: string,
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
