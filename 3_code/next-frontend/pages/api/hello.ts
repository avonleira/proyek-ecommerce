// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { axiosBackend } from '../../configs/apis/axiosBackend'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  let token = {};
  await axiosBackend.post("/auth/login", { email: "asd1@gmail.com", password: "asdasd123" }, {
    withCredentials: true
  })
  .then(res => { token = res.data })
  .catch(err => console.log(err))
  res.status(200).json(token)
}
