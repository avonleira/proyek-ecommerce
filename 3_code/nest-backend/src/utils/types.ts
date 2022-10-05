export type CreateUserParams = {
  email: string;
  password: string;
  name: string;
  gender: string;
  phone_number: string;
  date_birth: Date;
}

export type UpdateUserParams = {
  password: string;
  name: string;
  gender: string;
  phone_number: string;
  date_birth: Date;
}