import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import MyNextHead from "../../components/MyNextHead";
import { loginPageProps } from "../../data/pageProps";

interface IProps {
  pageProps: typeof loginPageProps
}

const LoginPage = (props: IProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const loginFormHook = useForm();
  
  const InputEmailProps = {
    placeholder: "Email", type: "email", required: true,
    // error: stringIncludeArray(FirebaseError?.code ?? "", ["email", "user"]),
    // helperText: stringIncludeArray(FirebaseError?.code ?? "", ["email", "user"]) ? FirebaseError?.message : null,
    ...loginFormHook.register("email"),
  }
  const InputPasswordProps = {
    placeholder: "Password", type: showPass?"text":"password", required: true, autoComplete: "off",
    // error: stringIncludeArray(FirebaseError?.code ?? "", ["email", "user"]),
    // helperText: stringIncludeArray(FirebaseError?.code ?? "", ["email", "user"]) ? FirebaseError?.message : null,
    ...loginFormHook.register("password"),
  }

  const loginFormSubmit = async (data: any) => {
    console.log(data)
  }

  return (
    <div className="min-h-screen w-full overflow-hidden grid grid-cols-12">
      <MyNextHead pageProps={props.pageProps} />
      <div className="col-span-12 md:col-span-4">
        <div className="p-4">
          <div className="mt-16 md:mt-32 mb-14">
            <h1 className="text-center">
              <Link href="/"><a className="brand-logo">Duta Tech</a></Link>
            </h1>
            <p className="text-center font-semibold">Silakan masuk ke akun Anda</p>
          </div>

          <form className="px-10" onSubmit={loginFormHook.handleSubmit(loginFormSubmit)}>
            <div className="w-full mb-4">
              <input className="form-input" {...InputEmailProps} />
            </div>
            <div className="w-full mb-1">
              <input className="form-input" {...InputPasswordProps} />
            </div>
            <div className="w-full mb-8">
              <input type="checkbox" id="show-password" className="form-checkbox mr-1" onChange={() => { setShowPass(!showPass) }} />
              <label htmlFor="show-password" className="text-sm">Tunjukan password</label>
            </div>
            <button type="submit" className="btn btn-primary w-full mb-3">SELANJUTNYA</button>
            <hr className="mx-2 mb-1" />
            <p className="text-center mb-8">
              Belum memiliki akun?{" "}
              <Link href="/auth/register">
                <a className="text-primary-500">Daftar</a>
              </Link>
            </p>
            <hr className="mb-2"/>
            <p
              className={`text-sm ${showHint?"text-primary-400":"text-gray-500"} text-center hover:text-primary-400 cursor-pointer`}
              onClick={() => { setShowHint(!showHint) }}
            >
              Layanan Pengaduan Konsumen
            </p>
            <div className={`${showHint?"":"hidden"} mt-2`}>
              <p className="text-xs text-gray-500 text-center px-2">
                Untuk bantuan layanan pengaduan konsumen, silahkan telepon atau Whatsapp ke (+62) 812-3462-2350 atau <Link href="/contact-us"><a className="text-primary-500">email kami</a></Link>.
              </p>
            </div>
            <hr className="mt-2" />
          </form>
        </div>
      </div>
      <div className="hidden md:block col-span-8 relative">
        <div className="fixed h-screen w-full bg-primary-400">
          {/* Tempat gambar */}
          <img src="" alt="Gambar Login Page | Duta Tech" />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      pageProps: loginPageProps
    },
  }
}

export default LoginPage;