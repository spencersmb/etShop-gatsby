import { ICouponRaw, ICouponState } from '@et/types/Cart'

export interface IAuthResponse {
  token: string,
  user_email: string,
  user_nicename: string,
  user_display_name: string,
  first_name: string,
  last_name: string,
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
  token: string,
}

export interface IJWTDecoded {
  iss: string, // server
  iat: 1550335086, // issued at
  nbf: 1550335086, // not valid before
  exp: 1550939886, // Expires
  data: {
    user: {
      id: string
    }
  }
}
