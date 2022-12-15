import { axiosBackend } from '../configs/apis/axiosBackend';
import { IAuthResponse, IUser } from '../interfaces/authInterface';

async function register(email: string, password: string, confirm_password: string, first_name: string, last_name: string, gender: "male"|"female", phone_number: string, date_birth: Date) {
  return new Promise<{user: IUser, token: string}>(async (resolve, reject) => {
    return await axiosBackend.post("/auth/register", {
      email, password, confirm_password,
      first_name, last_name,
      gender, phone_number, date_birth
    })
    .then(res => {
      let data = res.data as IAuthResponse;
      resolve({
        user: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          profile_picture: data.profile_picture,
          gender: data.gender,
          date_birth: data.date_birth,
        },
        token: data.token
      })
    })
    .catch(err => reject(err))
  })
}

async function login(email: string, password: string) {
  return new Promise<{user: IUser, token: string}>(async (resolve, reject) => {
    return await axiosBackend.post("/auth/login", {
      email, password
    })
    .then(res => {
      let data = res.data as IAuthResponse;
      resolve({
        user: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          profile_picture: data.profile_picture,
          gender: data.gender,
          date_birth: data.date_birth,
        },
        token: data.token,
      })
    })
    .catch(err => reject(err))
  })
}

async function refreshToken() {
  return new Promise<{user: IUser, token: string}>(async (resolve, reject) => {
    return await axiosBackend.post("/auth/refresh")
    .then(res => {
      let data = res.data as IAuthResponse;
      resolve({
        user: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          profile_picture: data.profile_picture,
          gender: data.gender,
          date_birth: data.date_birth,
        },
        token: data.token,
      })
    })
    .catch(err => reject(err))
  })
}

// ga ada dulu
async function logout() {
  // return new Promise<any>(async (resolve, reject) => {
  
  // })
}

const AuthService = {
  register, login, refreshToken, logout,
}
export default AuthService;