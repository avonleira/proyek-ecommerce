import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

import MainLayout from "../../../layouts/main/MainLayout";
import { accountSettingsProfilePageProps, PagePropsInterface } from "../../../data/pageProps";
import AccountBodyLayout from "../../../layouts/account/AccountBodyLayout";
import { useAuth } from "../../../hooks/authHook";
import AuthMiddleware from "../../../components/middlewares/AuthMiddleware";
import AccountBodySettingsLayout from "../../../layouts/account/AccountBodySettingsLayout";
import { MyFormater } from "../../../utils/dateFormater";

interface IProps {
  pageProps: PagePropsInterface
}

function AccountSettingsProfilePage(props: IProps) {
  const { pageProps } = props;
  const { userNow } = useAuth();
  const inputPhotoRef = useRef<HTMLInputElement>(null);
  // console.log(userNow)

  const formHook = useForm({
    defaultValues: {
      first_name: userNow?.first_name,
      last_name: userNow?.last_name,
      gender: userNow?.gender,
      email: userNow?.email,
      phone_number: userNow?.phone_number,
      // date_birth: userNow?.date_birth,
      date_birth: MyFormater(userNow?.date_birth, "yyyy-MM-dd"),
    }
  });
  const formSubmit = async (data: any) => {
    console.log(data)
  }
  const handleUploadPhoto = async () => {
    console.log(inputPhotoRef.current?.files)
  }

  // if (!userNow) return <UnauthorizedPage />
  return (
    <AuthMiddleware>
      <MainLayout pageProps={pageProps}>
        <AccountBodyLayout bodyType="settings-profile">
          <AccountBodySettingsLayout activeMenuIndex={0}>
            <div className="p-2 grid grid-cols-10 gap-8">
              <div className="col-span-3 shadow rounded-md p-3 flex flex-col items-center gap-4">
                <img src={userNow?.profile_picture} alt="..." className="w-full h-auto aspect-square object-cover" />
                <label className="btn btn-primary-outline btn-sm w-full">
                  {"Pilih Foto"}
                  <input ref={inputPhotoRef} type="file" accept="image/*" hidden onChange={handleUploadPhoto} />
                </label>
                <p className="text-xs text-neutral-400">{'Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG'}</p>
              </div>

              <form className="col-span-7 flex flex-col justify-between" onSubmit={formHook.handleSubmit(formSubmit)}>
                <div className="">
                  <div className="mb-4">
                    <p className="text-neutral-500 text-lg font-semibold mb-2">Ubah Data Diri</p>
                    <div className="text-sm text-neutral-500">
                      <div className="flex flex-row gap-2 mb-3">
                        <div className="w-36">Nama Depan</div>
                        <input type="text" className="w-72" {...formHook.register("first_name")} />
                        {/* <div className="">{userNow?.first_name}</div> */}
                      </div>
                      <div className="flex flex-row gap-2 mb-3">
                        <div className="w-36">Nama Belakang</div>
                        <input type="text" className="w-72" {...formHook.register("last_name")} />
                      </div>
                      <div className="flex flex-row gap-2 mb-3">
                        <div className="w-36">Tanggal Lahir</div>
                        <Controller
                          name="date_birth" control={formHook.control}
                          render={({field}) => (
                            <input type="date" className="w-72" {...field} />
                          )}
                        />
                        {/* { !!userNow?.date_birth ? (
                          <div className="">{MyFormater(userNow?.date_birth, "dd MMMM yyyy")}</div>
                        ) : null } */}
                      </div>
                      <div className="flex flex-row gap-2 mb-3">
                        <div className="w-36">Jenis Kelamin</div>
                        <Controller
                          name="gender" control={formHook.control}
                          render={({field}) => (
                            <select className="w-72" {...field}>
                              <option value="male">Pria</option>
                              <option value="female">Wanita</option>
                            </select>
                          )}
                        />
                        {/* <div className="">{userNow?.gender?userNow?.gender==="male"?"Pria":userNow?.gender==="female"?"Wanita":"Tidak Diketahui":"Tidak Diketahui"}</div> */}
                      </div>
                    </div>
                  </div>
                  
                  <div className="">
                    <p className="text-neutral-500 text-lg font-semibold mb-2">Ubah Kontak</p>
                    <div className="text-sm text-neutral-500">
                      <div className="flex flex-row gap-2 mb-3">
                        <div className="w-36">Email</div>
                        <input type="email" className="w-72" {...formHook.register("email")} />
                      </div>
                      <div className="flex flex-row gap-2 mb-3">
                        <div className="w-36">Nomor Telepon</div>
                        <input type="tel" className="w-72" {...formHook.register("phone_number")} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-end">
                  <button type="submit" className="btn btn-sm btn-primary">Simpan Perubahan</button>
                </div>
              </form>
            </div>
          </AccountBodySettingsLayout>
        </AccountBodyLayout>
      </MainLayout>
    </AuthMiddleware>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      pageProps: accountSettingsProfilePageProps,
    },
  }
}

export default AccountSettingsProfilePage;