import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  { label: "Tambah Promo" },
]

function MasterPromoCreate() {
  // const { userNow } = useAuth();
  const navigate = useNavigate();
  const { pushAlert, pushConfirm } = useDialog();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addFormHook = useForm({
    defaultValues: {
      title: "", description: "", amount: "",
      active_date: new Date(),
      expired_date: new Date(),
    }
  });
  const InputIdProps: TextFieldProps = {
    label: "ID", size: "small", fullWidth: true, disabled: true,
    value: "eg: random-char-id",
    helperText: "ID akan di-generate otomatis saat di simpan.",
  }
  const InputTitleProps: TextFieldProps = {
    label: "Judul", type: "text", size: "small", fullWidth: true, required: true,
    ...addFormHook.register("title"),
  }
  const InputDescriptionProps: TextFieldProps = {
    label: "Deskripsi", type: "text", size: "small", fullWidth: true, required: true, multiline: true, minRows: 3,
    ...addFormHook.register("description"),
  }
  const InputAmountProps: TextFieldProps = {
    label: "Jumlah", type: "text", size: "small", fullWidth: true, required: true,
    ...addFormHook.register("amount"),
  }
  const InputActiveDateProps = {
    controllerProps: { control: addFormHook.control, name: "active_date" as "active_date" },
    datePickerProps: {
      label: "Waktu Mulai",
      renderInput: (params: any) => <TextField {...params} size="small" required fullWidth />,
    },
  }
  const InputExpiredDateProps = {
    controllerProps: { control: addFormHook.control, name: "expired_date" as "expired_date" },
    datePickerProps: {
      label: "Waktu Berakhir",
      renderInput: (params: any) => <TextField {...params} size="small" required fullWidth />,
    },
  }

  const addFormHandleSubmit = async (data: any) => {
    let newData = { ...data };
    setIsLoading(true);
    await axiosBackend.post("/admin/master/promo", newData)
    .then(res => {
      pushConfirm({
        open: true, title: "Promo berhasil ditambahkan!", content: "Apakah anda ingin meninggalkan halaman ini?",
        onAgreeBtnClick: () => navigate("/master/promo"),
      });
    })
    .catch(err => {
      pushAlert({ open: true, title: "Promo gagal ditambahkan!", content: String(err.message) });
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
    let currStart = new Date(addFormHook.watch("active_date"));
    let currEnd = new Date(addFormHook.watch("expired_date"));
    if (currEnd.getTime()<currStart.getTime()) {
      addFormHook.setValue("expired_date", currStart);
      // console.log("smaller d")
    }
  }, [addFormHook.watch("active_date")])

  return (
    <AdminLayout title={"Tambah Promo"} isLoading={isLoading} >
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <BackButton />
            <MyBreadCrumbs items={B_Items} maxItems={2} />
          </Stack>
        </Stack>
        
        <Box component="form" autoComplete="off" onSubmit={addFormHook.handleSubmit(addFormHandleSubmit)}>
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
      </Stack>
    </AdminLayout>
  )
}

export default MasterPromoCreate