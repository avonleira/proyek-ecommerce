import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Stack, useMediaQuery, useTheme } from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

import MyBreadCrumbs, { IMyBreadCrumbs } from '../../../components/MyBreadCrumbs'
import AdminLayout from '../../../layouts/AdminLayout'
import { IFabConfig } from '../../../components/MyFab'
import MyDataGrid from '../../../components/MyDataGrid';
import { MyFormater } from '../../../utils/dateFormater';
// import { useAuth } from '../../../hooks/auth';

const B_Items: IMyBreadCrumbs[] = [
  { label: "Admin", path: "/" },
  { label: "Master" },
  { label: "Category" },
]

function MasterCategory() {
  // const { userNow } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchData, setFetchData] = useState<any[]>();
  const [fetchError, setFetchError] = useState<{ message?: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true)
      // setFetchError(null)
      // await User.authenticatedAll(userNow.uid, { decryptPhone: true })
      // .then((users) => {
      //   setUsersData(users)
      //   // console.log("Normal fetch!", users)
      // })
      // .catch(err => { setFetchError(err); })
      // .finally(() => setIsLoading(false));
    }
    
    fetchData();
  }, [])

  const handleAddFormClick = () => {
    navigate("c")
  }

  const fabConfig: IFabConfig = {
    fabs: [
      { children: "Tambah Baru",  onClick: handleAddFormClick },
    ]
  }

  return (
    <AdminLayout
      title={"Master Category"} isLoading={isLoading}
      fabConfig={upMd?undefined:fabConfig}
    >
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <MyBreadCrumbs items={B_Items} maxItems={2} />
          { upMd ? (
            <Button
              variant="contained" color="primary" startIcon={<AddIcon />}
              size={upMd?"medium":"small"}
              onClick={handleAddFormClick}
            >
              {"Tambah Baru"}
            </Button>
          ) : null }
        </Stack>

        { fetchError ? (
          <Alert severity="error">{ fetchError.message ?? "Terjadi sebuah kesalahan." }</Alert>
        ) : null }
        
        <MyDataGrid
          rows={fetchData}
          pageSize={100}
          // columns={[
          //   {
          //     field: 'actions', headerName: "Aksi", type: 'actions', width: 60,
          //     getActions: (params: any) => [
          //       <GridActionsCellItem
          //         color="primary" label="Detil" icon={<InfoIcon />}
          //         onClick={() => { navigate(`d/${params.id}`??""); }}
          //       />,
          //       // <GridActionsCellItem
          //       //   color="error" label="Hapus"
          //       //   icon={<DeleteIcon />}
          //       //   // onClick={handleDelete(params.row)}
          //       // />,
          //     ],
          //   },
          //   { field: "id", type: "string", headerName: "ID", minWidth: 200, editable: true, hide: true },
          //   { field: "allowAdmin", type: "boolean", headerName: "Admin", width: 60 },
          //   { field: "name", type: "string", headerName: "Nama", minWidth: 240, editable: true, flex: 1, },
          //   {
          //     field: "type", type: "singleSelect", headerName: "Tipe Jemaat", minWidth: 140, editable: false, hide: false,
          //     valueOptions: ["Umum", "Pemuda & Remaja", "Sekolah Minggu", "Hamba Tuhan", "Keperluan Digital"],
          //     valueGetter: (params) => params.value==="umum"?"Umum":params.value==="pemrem"?"Pemuda & Remaja":params.value==="sm"?"Sekolah Minggu":params.value==="hamtu"?"Hamba Tuhan":"Keperluan Digital",
          //   },
          //   { field: "email", type: "string", headerName: "Email", minWidth: 180, editable: true, hide: false },
          //   { field: "phone", type: "string", headerName: "No. Telepon", minWidth: 140, editable: true, hide: false },
          //   { field: "dob", type: "date", headerName: "Tanggal Lahir", minWidth: 120, editable: true, align: "center" },
          //   { field: "created_at", type: "dateTime", headerName: "Tanggal Dibuat", minWidth: 190, editable: true, },
          // ]}
        />
      </Stack>
    </AdminLayout>
  )
}

export default MasterCategory