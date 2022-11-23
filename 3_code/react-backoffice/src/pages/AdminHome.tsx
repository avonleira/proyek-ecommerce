import { useState } from 'react'
import { Icon, Stack, Typography } from '@mui/material'

import MyBreadCrumbs, { IMyBreadCrumbs } from '../components/MyBreadCrumbs'
import AdminLayout from '../layouts/AdminLayout'
// import { useSearchParams } from 'react-router-dom'
// import { useAuth } from '../../hooks/auth'

const B_Items: IMyBreadCrumbs[] = [
  { label: "Admin", path: "/admin" },
  { label: "Dashboard" },
]

export default function AdminHome() {
  // const [queryParams] = useSearchParams();
  // const { userNow } = useAuth();
  const userNow = {
    displayName: "Admin", email: "admin@admin.com"
  }
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <AdminLayout title={"Admin Dashboard"} isLoading={isLoading}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <MyBreadCrumbs items={B_Items} maxItems={2} />
        {/* <Button
          variant="contained" startIcon={<AddOutlinedIcon />}
          onClick={() => setOpenAddForm(!OpenAddForm)}
        >
          {"Add"}
        </Button> */}
      </Stack>

      <Typography variant="h5">
        <Typography variant="inherit" component="span" color={"primary"}>{"# "}</Typography>
        {`Welcome, ${userNow?.displayName ?? userNow?.email}!`}
      </Typography>
      <Typography variant="subtitle1">
        {"Fitur untuk dashboard akan menyusul di patch berikutnya. asd"}<Icon children="google" />
      </Typography>
    </AdminLayout>
  )
}
