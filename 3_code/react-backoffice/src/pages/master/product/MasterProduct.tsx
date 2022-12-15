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
import { axiosBackend } from '../../../configs/apis/axiosBackend';
import { useDialog } from '../../../hooks/dialogHook';
// import { useAuth } from '../../../hooks/auth';

const B_Items: IMyBreadCrumbs[] = [
  { label: "Admin", path: "/" },
  { label: "Master" },
  { label: "Product" },
]

function MasterProduct() {
  // const { userNow } = useAuth();
  const navigate = useNavigate();
  const { pushAlert, pushConfirm } = useDialog();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchedData, setFetchedData] = useState<any[]>();
  const [fetchError, setFetchError] = useState<{ message?: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setFetchError(null)
      await axiosBackend.get("/admin/master/produk")
      .then(({data}) => {
        // console.log("Normal fetch!", data)
        setFetchedData(data.map((item: any) => ({...item, active_date: new Date(item.active_date), expired_date: new Date(item.expired_date)})))
      })
      .catch(err => { setFetchError(err); })
      .finally(() => setIsLoading(false));
    }
    
    fetchData();
  }, [])

  const handleAddFormClick = async () => {
    await axiosBackend.post("/admin/master/produk")
    .then(({data}) => {
      navigate(`/master/product/${data.id}`)
      // pushConfirm({
      //   open: true, title: "Product berhasil ditambahkan!", content: "Apakah anda ingin meninggalkan halaman ini?",
      //   onAgreeBtnClick: () => navigate(`/master/product/${data.id}`),
      // });
    })
    .catch(err => {
      pushAlert({ open: true, title: "Produk gagal dibuat!", content: `Silahkan mencoba lagi!\n${err.message}` });
    })
  }

  const fabConfig: IFabConfig = {
    fabs: [
      { children: "Tambah Baru",  onClick: handleAddFormClick },
    ]
  }

  return (
    <AdminLayout
      title={"Master Product"} isLoading={isLoading}
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
          rows={fetchedData}
          pageSize={100}
          columns={[
            {
              field: 'actions', headerName: "Aksi", type: 'actions', width: 60,
              getActions: (params: any) => [
                <GridActionsCellItem
                  color="primary" label="Detil" icon={<InfoIcon />}
                  onClick={() => { navigate(`d/${params.id}`??""); }}
                />,
              ],
            },
            { field: "id", type: "string", headerName: "ID", minWidth: 200, editable: true, hide: true },
            { field: "is_draft", type: "boolean", headerName: "Publish", width: 80, valueGetter: (params) => !params.value },
            { field: "title", type: "string", headerName: "Nama", minWidth: 240, editable: true, flex: 1, },
            { field: "product_category", type: "string", headerName: "Kategori", minWidth: 120, editable: true, valueGetter: (params) => params.value.category_name, },
            // { field: "phone", type: "string", headerName: "No. Telepon", minWidth: 140, editable: true, hide: false },
            // { field: "dob", type: "date", headerName: "Tanggal Lahir", minWidth: 120, editable: true, align: "center" },
            // { field: "created_at", type: "dateTime", headerName: "Tanggal Dibuat", minWidth: 190, editable: true, },
          ]}
        />
      </Stack>
    </AdminLayout>
  )
}

export default MasterProduct