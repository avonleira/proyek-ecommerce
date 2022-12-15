import { useState } from 'react';
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

const B_Items: IMyBreadCrumbs[] = [
  { label: "Admin", path: "/" },
  { label: "Master" },
  { label: "FAQ", path: "/master/faq" },
  { label: "Tambah FAQ" },
]

function MasterFaqCreate() {
  // const { userNow } = useAuth();
  const navigate = useNavigate();
  const { pushAlert, pushConfirm } = useDialog();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addFormHook = useForm({
    defaultValues: {
      question: "", answer: "",
      // type: "",
    }
  });
  const InputIdProps: TextFieldProps = {
    label: "ID", size: "small", fullWidth: true, disabled: true,
    value: "eg: random-char-id",
    helperText: "ID akan di-generate otomatis saat di simpan.",
  }
  const InputQuestionProps: TextFieldProps = {
    label: "Question", type: "text", size: "small", fullWidth: true, required: true, multiline: true,
    ...addFormHook.register("question"),
  }
  const InputAnswerProps: TextFieldProps = {
    label: "Answer", type: "text", size: "small", fullWidth: true, required: true, multiline: true,
    ...addFormHook.register("answer"),
  }

  const addFormHandleSubmit = async (data: any) => {
    let newData = { ...data };
    setIsLoading(true);
    await axiosBackend.post("/admin/master/faq", newData)
    .then(res => {
      pushConfirm({
        open: true, title: "FAQ berhasil ditambahkan!", content: "Apakah anda ingin meninggalkan halaman ini?",
        onAgreeBtnClick: () => navigate("/master/faq"),
      });
    })
    .catch(err => {
      pushAlert({ open: true, title: "FAQ gagal ditambahkan!", content: String(err.message) });
    })
    .finally(() => { setIsLoading(false) })
  }
  const handleCancelAddClick = () => {
    pushConfirm({
      open: true, title: "Apakah anda yakin untuk membatalkan?", content: "Seluruh data tidak akan tersimpan!",
      onAgreeBtnClick: () => navigate(-1),
    });
  }

  return (
    <AdminLayout title={"Tambah FAQ"} isLoading={isLoading} >
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <BackButton />
            <MyBreadCrumbs items={B_Items} maxItems={2} />
          </Stack>
        </Stack>
        
        <Box component="form" autoComplete="off" onSubmit={addFormHook.handleSubmit(addFormHandleSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <Stack spacing={2}>
                <TextField {...InputIdProps} />
                <TextField {...InputQuestionProps} />
                <TextField {...InputAnswerProps} />
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

export default MasterFaqCreate