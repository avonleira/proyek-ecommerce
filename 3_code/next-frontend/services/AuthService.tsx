import { createContext, useContext, useState, useEffect } from 'react';
import { EncryptStorage } from "encrypt-storage";

import { axiosBackend } from '../configs/apis/axiosBackend';


const AuthContext = createContext({})

const AuthProvider = (props: any) => {
  const encryptStorage = new EncryptStorage(`${process.env.LOCAL_STORAGE_SECRET_KEY}`, {
    storageType: 'sessionStorage',
  });
  const [userNow, setuserNow] = useState<any|null>(encryptStorage.getItem("user"))
  const [userToken, setuserToken] = useState<string|null>(String(encryptStorage.getItem("token")))
  const [authError, setauthError] = useState<any|null>(null)
  const [isLoading, setisLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = () => {
      // console.warn('onauthstatechange', { userNow, userToken, authError })
      setisLoading(false)
    }

    return unsubscribe();
  }, [])

  const LoginBackend = async (username: string, password: string) => {
    await axiosBackend.post(`/login`, {
      username: username,
      password: password,
    })
    .then((res) => {
      // console.log(res.data)
      encryptStorage.setItem("token", res.data.token);
      encryptStorage.setItem("user", res.data.user);
      setuserNow(res.data.user ?? null)
      setuserToken(res.data.token ?? null)
      // return { user: res.data.user, token: res.data.token };
    })
    .catch((err) => {
      setauthError(err ?? null)
      // return { error: err.response.data }
    })
    .finally(() => {})
    // console.warn(response)
    // return { user: user, error: error }
  }
  const LogoutBackend = async () => {
    await axiosBackend.get("/logout")
    .then(res => {
      encryptStorage.clear()
      // history.push('/login');
    })
    .catch(err => { console.error(err.response) })
    setuserNow(null)
    setuserToken(null)
    setauthError(null)
  }

  const value = {
    userNow, userToken, authError,
    LoginBackend, LogoutBackend, encryptStorage,
  }

  return (
    <>
      {/* <Backdrop open={isLoading} sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <AuthContext.Provider value={value} {...props} />
    </>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth };