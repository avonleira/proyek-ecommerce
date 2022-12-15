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
// import { useAuth } from '../../../hooks/auth';

const B_Items: IMyBreadCrumbs[] = [
  { label: "Admin", path: "/" },
  { label: "Master" },
  { label: "Promo" },
]

function MasterPromo() {
  // const { userNow } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchedData, setFetchedData] = useState<any[]>();
  const [fetchError, setFetchError] = useState<{ message?: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setFetchError(null)
      await axiosBackend.get("/admin/master/promo")
      .then(({data}) => {
        // console.log("Normal fetch!", data)
        setFetchedData(data.map((item: any) => ({...item, active_date: new Date(item.active_date), expired_date: new Date(item.expired_date)})))
      })
      .catch(err => { setFetchError(err); })
      .finally(() => setIsLoading(false));
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
      title={"Master Promo"} isLoading={isLoading}
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
            { field: "title", type: "string", headerName: "Judul", minWidth: 180, editable: true, flex: 1, },
            { field: "description", type: "string", headerName: "Deskripsi", minWidth: 180, editable: true, flex: 1, },
            { field: "amount", type: "string", headerName: "Jumlah", minWidth: 120, editable: true, hide: false },
            { field: "active_date", type: "dateTime", headerName: "Tanggal Mulai", minWidth: 160, editable: true, align: "center" },
            { field: "expired_date", type: "dateTime", headerName: "Tanggal Berakhir", minWidth: 160, editable: true, align: "center" },
            // { field: "created_at", type: "dateTime", headerName: "Tanggal Dibuat", minWidth: 190, editable: true, },
          ]}
        />
      </Stack>
    </AdminLayout>
  )
}

export default MasterPromo