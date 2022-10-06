import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import MyNextHead from "../../components/MyNextHead";
import { registerPageProps, registerPasswordTerms } from "../../data/pageProps";
import registerImage from "../../public/images/Register.jpg";

interface IProps {
  pageProps: typeof registerPageProps
  passwordTerms: typeof registerPasswordTerms
}

const RegisterPage = (props: IProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [passTerms, setPassTerms] = useState<typeof registerPasswordTerms>(props.passwordTerms);
  const registerFormHook = useForm();

  const InputFirstNameProps = {
    placeholder: "Nama Depan", type: "text", required: true,
    ...registerFormHook.register("firstName"),
  }
  const InputLastNameProps = {
    placeholder: "Nama Belakang", type: "text", required: true,
    ...registerFormHook.register("lastName"),
  }
  const InputEmailProps = {
    placeholder: "Email", type: "email", required: true,
    ...registerFormHook.register("email"),
  }
  const InputPhoneProps = {
    placeholder: "No. Telepon", type: "tel", required: true,
    ...registerFormHook.register("phone"),
  }
  const InputPasswordProps = {
    placeholder: "Password", type: showPass?"text":"password", required: true, autoComplete: "off",
    ...registerFormHook.register("password"),
  }
  const InputCPasswordProps = {
    placeholder: "Konfirmasi password", type: showPass?"text":"password", required: true, autoComplete: "off",
    ...registerFormHook.register("passwordConfirmation"),
  }

  const registerFormSubmit = async (data: any) => {
    console.log(data)
  }

  useEffect(() => {
    let passNow = String(registerFormHook.watch("password"));
    let newPassTerms = [...props.passwordTerms];
    if (passNow.length > 6) newPassTerms[0].filled = true;

    setPassTerms(newPassTerms)
  }, [registerFormHook.watch("password")])

  return (
    <div className="min-h-screen w-full overflow-hidden grid grid-cols-12">
      <MyNextHead pageProps={props.pageProps} />
      <div className="col-span-12 md:col-span-4">
        <div className="p-4">
          <div className="mt-16 mb-10">
            <h1 className="text-center">
              <Link href="/"><a className="brand-logo">Duta Tech</a></Link>
            </h1>
            <p className="text-center font-semibold">Daftarkan Akun Anda</p>
          </div>

          <form className="px-8" onSubmit={registerFormHook.handleSubmit(registerFormSubmit)}>
            <div className="w-full mb-4">
              <input className="form-input" {...InputFirstNameProps} />
            </div>
            <div className="w-full mb-4">
              <input className="form-input" {...InputLastNameProps} />
            </div>
            <div className="w-full mb-4">
              <input className="form-input" {...InputEmailProps} />
            </div>
            <div className="w-full mb-4">
              <input className="form-input" {...InputPhoneProps} />
            </div>
            <div className="w-full mb-4">
              <input className="form-input" {...InputPasswordProps} />
            </div>
            <div className="w-full mb-1">
              <input className="form-input" {...InputCPasswordProps} />
            </div>
            <div className="w-full mb-4">
              <input type="checkbox" id="show-password" className="form-checkbox mr-1" onChange={() => { setShowPass(!showPass) }} />
              <label htmlFor="show-password" className="text-sm">Tunjukan password</label>
            </div>
            <div className="mb-6">
              <ul className="text-xs">
                { passTerms?.map((item) => (
                  <li key={`pass-terms-${item.id}`} className={`${item.filled?"text-primary-500":"text-gray-400"}`}>{item.label}</li>
                )) }
              </ul>
            </div>
            <p className="text-center text-sm">
              Dengan mendaftar, Anda menyetujui{" "}
              <Link href="/privacy-policy">
                <a className="text-primary-400">Syarat dan Ketentuan</a>
              </Link>
              {" "}serta{" "}
              <Link href="/terms-conditions">
                <a className="text-primary-400">Kebijakan Privasi</a>
              </Link>
            </p>
            <p className="text-center text-xs mb-2">Koneksi diamankan dengan Secure Socket Layer (SSL)</p>
            <button type="submit" className="btn btn-primary w-full mb-3">SELANJUTNYA</button>
            <hr className="mx-2 mb-1" />
            <p className="text-center mb-8 md:mb-20">
              Sudah memiliki akun?{" "}
              <Link href="/auth/login">
                <a className="text-primary-500">Masuk</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden md:block col-span-8 relative">
        <div className="fixed h-screen w-full bg-primary-400">
          {/* Tempat gambar */}
          <img src={registerImage.src} alt="Gambar Regsiter Page | Duta Tech" />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      pageProps: registerPageProps,
      passwordTerms: registerPasswordTerms
    },
  }
}

export default RegisterPage;