import { createContext, useContext, useState, useEffect, Fragment } from 'react';

import AuthService from '../services/AuthService';
import { useRouter } from 'next/router';
import { IUser } from '../interfaces/authInterface';

interface IAuthContext {
  userNow: IUser|null
  userToken: string|null
  authError: any|null
  LoginBackend: (email: string, password: string) => Promise<unknown | undefined>
  RegisterBackend: (email: string, password: string, confirm_password: string, first_name: string, last_name: string, gender: "male"|"female"|null, phone_number: string, date_birth: Date|null) => Promise<unknown | undefined>
  LogoutBackend: () => Promise<unknown | undefined>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider = (props: any) => {
  const router = useRouter()
  const [userNow, setUserNow] = useState<IUser|null>(null)
  const [userToken, setuserToken] = useState<string|null>(null)
  const [authError, setauthError] = useState<any|null>(null)
  const [isLoading, setisLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!!window) {
      let ss_token: string|null = window.sessionStorage.getItem("token");
      // console.log("token", ss_token)
      if (!!ss_token) {
        const refresh = async () => {
          console.warn('onRefresh')
          setisLoading(true)
          await AuthService.refreshToken()
          .then(res => {
            // console.log(res)
            window.sessionStorage.setItem("token", res.token)
            setuserToken(res.token)
            // window.sessionStorage.setItem("user", JSON.stringify(res.user))
            setUserNow(res.user)
            // let ss_user: IUser|null = !!window.sessionStorage.getItem("user")?JSON.parse(window.sessionStorage.getItem("user")!):null; // Temporary
            // setUserNow(ss_user); // Temporary
          })
          .catch(err => {
            // console.error(err)
            window.sessionStorage.removeItem("token")
            setuserToken(null)
            // window.sessionStorage.removeItem("user")
            setUserNow(null)
          })
          .finally(() => setisLoading(false))
        }
    
        refresh();
      }
      else {
        // Logout
        window.sessionStorage.removeItem("token")
        setuserToken(null)
        setUserNow(null)
        setisLoading(false)
      }
    }
  }, [router])

  const LoginBackend = async (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
      await AuthService.login(email, password)
      .then(({user, token}) => {
        window.sessionStorage.setItem("token", token);
        setuserToken(token)
        // window.sessionStorage.setItem("user", JSON.stringify(user)); // Temporary
        setUserNow(user)
        // setuserToken(token ?? null)
        return resolve({ message: "success" })
      })
      .catch((err) => {
        window.sessionStorage.removeItem("token");
        setuserToken(null)
        setUserNow(null)
        setauthError(err ?? null)
        return reject({ error: err, message: "error" })
      })
      .finally(() => {})
      // console.warn(response)
      // return { user: user, error: error }
    })
  }

  const RegisterBackend = async (email: string, password: string, confirm_password: string, first_name: string, last_name: string, gender: "male"|"female"|null, phone_number: string, date_birth: Date|null) => {
    return new Promise(async (resolve, reject) => {
      await AuthService.register(email, password, confirm_password, first_name, last_name, gender, phone_number, date_birth)
      .then(({user, token}) => {
        window.sessionStorage.setItem("token", token);
        setuserToken(token)
        setUserNow(user)
        return resolve({ message: "success" })
      })
      .catch(err => {
        window.sessionStorage.removeItem("token");
        setuserToken(null)
        setUserNow(null)
        setauthError(err ?? null)
        return reject({ error: err, message: "error" })
      })
    })
  }

  const LogoutBackend = async () => {
    window.sessionStorage.removeItem("token")
    setuserToken(null)
    setUserNow(null)
  }

  const value = {
    userNow, userToken, authError,
    LoginBackend, RegisterBackend, LogoutBackend,
  }

  return (
    <Fragment>
      {/* <Backdrop open={isLoading} sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      { isLoading ? (
        <div className="w-screen h-screen fixed z-50 bg-primary-50 flex items-center justify-center">
          <span className="animate-bounce">
            <span className="h-24 w-24 block rounded-full border-8 border-t-primary-500 animate-spin"></span>
          </span>
        </div>
      ) : (
        <AuthContext.Provider value={value} {...props} />
      ) }
    </Fragment>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth };