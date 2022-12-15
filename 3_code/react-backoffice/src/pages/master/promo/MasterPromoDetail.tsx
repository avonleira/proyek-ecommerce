import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/lab';

import MyBreadCrumbs, { IMyBreadCrumbs } from '../../../components/MyBreadCrumbs'
import AdminLayout from '../../../layouts/AdminLayout'
import BackButton from '../../../components/BackButton';
// import { useAuth } from '../../../hooks/auth';
import { IInputSelectProps } from '../../../interfaces/componentsInterface';
import { useDialog } from '../../../hooks/dialogHook';
import { axiosBackend } from '../../../configs/apis/axiosBackend';
import { DateTimePicker } from '@mui/x-date-pickers';

const B_Items: IMyBreadCrumbs[] = [
  { label: "Admin", path: "/" },
  { label: "Master" },
  { label: "Promo", path: "/master/promo" },
  { label: "Detail" },
]

function MasterPromoDetail() {
  const { id_promo } = useParams();
  // const { userNow } = useAuth();
  const navigate = useNavigate();
  const { pushAlert, pushConfirm } = useDialog();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currData, setCurrData] = useState<any>();
  const [notFound, setNotFound] = useState<boolean>(false);

  const editFormHook = useForm({
    defaultValues: {
      title: "", description: "", amount: "",
      active_date: new Date(),
      expired_date: new Date(),
    }
  });
  const InputIdProps: TextFieldProps = {
    label: "ID", size: "small", fullWidth: true, disabled: true,
    value: String(id_promo),
    helperText: "ID akan di-generate otomatis saat di simpan.",
  }
  const InputTitleProps: TextFieldProps = {
    label: "Judul", type: "text", size: "small", fullWidth: true, required: true,
    ...editFormHook.register("title"),
  }
  const InputDescriptionProps: TextFieldProps = {
    label: "Deskripsi", type: "text", size: "small", fullWidth: true, required: true, multiline: true, minRows: 3,
    ...editFormHook.register("description"),
  }
  const InputAmountProps: TextFieldProps = {
    label: "Jumlah", type: "text", size: "small", fullWidth: true, required: true,
    ...editFormHook.register("amount"),
  }
  const InputActiveDateProps = {
    controllerProps: { control: editFormHook.control, name: "active_date" as "active_date" },
    datePickerProps: {
      label: "Waktu Mulai",
      renderInput: (params: any) => <TextField {...params} size="small" required fullWidth />,
    },
  }
  const InputExpiredDateProps = {
    controllerProps: { control: editFormHook.control, name: "expired_date" as "expired_date" },
    datePickerProps: {
      label: "Waktu Berakhir",
      renderInput: (params: any) => <TextField {...params} size="small" required fullWidth />,
    },
  }

  const editFormHandleSubmit = async (data: any) => {
    let newData = { ...data };
    setIsLoading(true);
    await axiosBackend.put(`/admin/master/promo/${id_promo}`, newData)
    .then(res => {
      pushConfirm({
        open: true, title: "Promo berhasil disimpan!", content: "Apakah anda ingin meninggalkan halaman ini?",
        onAgreeBtnClick: () => navigate("/master/promo"),
      });
    })
    .catch(err => {
      pushAlert({ open: true, title: "Promo gagal disimpan!", content: String(err.message) });
    })
    .finally(() => { setIsLoading(false) })
  }
  const handleCancelAddClick = () => {
    pushConfirm({
      open: true, title: "Apakah anda yakin untuk membatalkan?", content: "Seluruh data tidak akan tersimpan!",
      onAgreeBtnClick: () => navigate(-1),
    });
  }

  useEffect(() => {
    let currStart = new Date(editFormHook.watch("active_date"));
    let currEnd = new Date(editFormHook.watch("expired_date"));
    if (currEnd.getTime()<currStart.getTime()) {
      editFormHook.setValue("expired_date", currStart);
      // console.log("smaller d")
    }
  }, [editFormHook.watch("active_date")])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await axiosBackend.get(`/admin/master/promo/${id_promo}`)
      .then(({data}) => {
        // console.log(res);
        editFormHook.setValue("title", data.title);
        editFormHook.setValue("description", data.description);
        editFormHook.setValue("amount", data.amount);
        editFormHook.setValue("active_date", data.active_date?new Date(data.active_date):new Date());
        editFormHook.setValue("expired_date", data.expired_date?new Date(data.expired_date):new Date());
        setCurrData(data);
      })
      .catch(err => { setNotFound(true); })
      .finally(() => { setIsLoading(false) })
    }
    
    fetchData();
  }, [id_promo, editFormHook])

  if (notFound) return <Navigate to="/404" />
  return (
    <AdminLayout title={"Detail Promo"} isLoading={isLoading} >
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <BackButton />
            <MyBreadCrumbs items={B_Items} maxItems={2} />
          </Stack>
        </Stack>
        
        { isLoading ? null : (
          <Box component="form" autoComplete="off" onSubmit={editFormHook.handleSubmit(editFormHandleSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Stack spacing={2}>
                  <TextField {...InputIdProps} />
                  <TextField {...InputTitleProps} />
                  <TextField {...InputDescriptionProps} />
                  <TextField {...InputAmountProps} />
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={2}>
                  <Controller
                    {...InputActiveDateProps.controllerProps}
                    render={({field}) => (
                      <DateTimePicker {...InputActiveDateProps.datePickerProps} value={field.value} onChange={field.onChange} />
                    )}
                  />
                  <Controller
                    {...InputExpiredDateProps.controllerProps}
                    render={({field}) => (
                      <DateTimePicker {...InputExpiredDateProps.datePickerProps} value={field.value} onChange={field.onChange} />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button variant="contained" type="submit">
                      {'Simpan'}
                    </Button>
                    <Button color="secondary" onClick={handleCancelAddClick}>
                      {'Batalkan'}
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        ) }
      </Stack>
    </AdminLayout>
  )
}

export default MasterPromoDetail