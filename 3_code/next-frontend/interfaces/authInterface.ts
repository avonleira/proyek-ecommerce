export interface IAuthResponse {
  email: string
  first_name: string
  last_name: string
  profile_picture: string
  phone_number?: string
  gender?: "male"|"female"
  date_birth?: Date
  token: string
}

export interface IUser {
  email: string
  first_name: string
  last_name: string
  profile_picture: string
  phone_number?: string
  gender?: "male"|"female"
  date_birth?: Date
}