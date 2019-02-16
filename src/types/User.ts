export interface IAuthResponse {
  token: string,
  user_email: string,
  user_nicename: string,
  user_display_name: string,
  first_name: string,
  last_name: string
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
