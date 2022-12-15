import { useEffect, useState, ChangeEvent } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Autocomplete, Box, Button, FormControl, FormControlLabel, FormControlLabelProps, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, Switch, SwitchProps, TextField, TextFieldProps, Typography } from '@mui/material';
import { DatePicker } from '@mui/lab';

import MyBreadCrumbs, { IMyBreadCrumbs } from '../../../components/MyBreadCrumbs'
import AdminLayout from '../../../layouts/AdminLayout'
import BackButton from '../../../components/BackButton';
// import { useAuth } from '../../../hooks/auth';
import { IInputSelectProps } from '../../../interfaces/componentsInterface';
import { useDialog } from '../../../hooks/dialogHook';
import { axiosBackend } from '../../../configs/apis/axiosBackend';
import { DateTimePicker } from '@mui/x-date-pickers';
import { generateFormData } from '../../../utils/formHelper';

const B_Items: IMyBreadCrumbs[] = [
  { label: "Admin", path: "/" },
  { label: "Master" },
  { label: "Product", path: "/master/product" },
  { label: "Detail" },
]

function MasterProductDetail() {
  const { id_product } = useParams();
  // const { userNow } = useAuth();
  const navigate = useNavigate();
  const { pushAlert, pushConfirm } = useDialog();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoriesOption, setCategoriesOption] = useState<any[]>([]);
  const [currData, setCurrData] = useState<any>();
  const [notFound, setNotFound] = useState<boolean>(false);

  const editFormHook = useForm({
    defaultValues: {
      title: "", description: "", slug: "", weight: "0",
      product_category: null,
      publish: false,
    }
  });
  const InputIdProps: TextFieldProps = {
    label: "ID", size: "small", fullWidth: true, disabled: true,
    value: String(id_product),
    helperText: "ID akan di-generate otomatis saat di simpan.",
  }
  const InputTitleProps: TextFieldProps = {
    label: "Judul", type: "text", size: "small", fullWidth: true, required: true,
    ...editFormHook.register("title"),
  }
  const InputSlugProps: TextFieldProps = {
    label: "Slug", type: "text", size: "small", fullWidth: true, required: true,
    InputProps: {
      startAdornment: <InputAdornment position="start">{"duta-tech.vercel.app/"}</InputAdornment>,
    },
    ...editFormHook.register("slug"),
  }
  const InputWeightProps: TextFieldProps = {
    label: "Berat Barang", type: "number", size: "small", fullWidth: true, required: true,
    InputProps: {
      endAdornment: <InputAdornment position="end">{"(g)"}</InputAdornment>,
    },
    helperText: "Berat barang akan disimpan dalaam satuan gram (g).",
    ...editFormHook.register("weight"),
  }
  const InputDescriptionProps: TextFieldProps = {
    label: "Deskripsi", type: "text", size: "small", fullWidth: true, required: true, multiline: true, minRows: 3,
    ...editFormHook.register("description"),
  }
  const InputCategoryProps = {
    controllerProps: { control: editFormHook.control, name: "product_category" as "product_category" },
    autocompleteProps: {
      id: "input-roles",
      options: categoriesOption,
      isOptionEqualToValue: (option: any, value: any) => option.id === value.id,
      getOptionLabel: (option: any) => option.category_name,
    },
    inputProps: {
      label: "Kategori Produk", size: "small", placeholder: "Pilih...", required: true,
    } as TextFieldProps,
  }
  const InputPublishProps = {
    controllerProps: { control: editFormHook.control, name: "publish" as "publish" },
    formControlLabelProps: { label: "Publish", labelPlacement: "end" } as FormControlLabelProps,
    switchProps: { size: "medium" } as SwitchProps,
  }

  const editFormHandleSubmit = async (data: any) => {
    let newData = {
      title: data.title, description: data.description, slug: data.slug,
      weight: data.weight, productCategoryId: data.product_category.id,
      is_draft: !data.publish, product_options: [],
    };
    setIsLoading(true);
    await axiosBackend.put(`/admin/master/produk/${id_product}`, newData)
    .then(res => {
      pushConfirm({
        open: true, title: "Product berhasil disimpan!", content: "Apakah anda ingin meninggalkan halaman ini?",
        onAgreeBtnClick: () => navigate("/master/product"),
        onCancelBtnClick: () => { navigate(0) },
      });
    })
    .catch(err => {
      // console.log(err)
      pushAlert({ open: true, title: "Product gagal disimpan!", content: String(err.message) });
    })
    .finally(() => { setIsLoading(false) })
  }
  const handleCancelAddClick = () => {
    pushConfirm({
      open: true, title: "Apakah anda yakin untuk membatalkan?", content: "Seluruh data tidak akan tersimpan!",
      onAgreeBtnClick: () => navigate(-1),
    });
  }

  const fetchCategories = async () => {
    await axiosBackend.get("/admin/master/kategori")
    .then(({data}) => {
      setCategoriesOption(data)
    })
    .catch(err => {})
  }

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!!e.target?.files && e.target?.files.length) {
      let newFile: File = e.target?.files[0];
      // console.log(newFile)
      let formData = generateFormData({
        product_image: newFile
      })
      await axiosBackend.post(`/admin/master/produk/${id_product}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        pushAlert({ open: true, title: "Berhasil!", content: "Foto berhasil ditambahkan!" });
      })
      .catch(err => {
        console.log(err)
        pushAlert({ open: true, title: "Foto gagal ditambahkan!", content: String(err.message) });
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await axiosBackend.get(`/admin/master/produk/${id_product}`)
      .then(({data}) => {
        console.log(data);
        editFormHook.setValue("title", data.title);
        editFormHook.setValue("slug", data.slug);
        editFormHook.setValue("weight", data.weight);
        editFormHook.setValue("description", data.description);
        editFormHook.setValue("publish", !data.is_draft);
        editFormHook.setValue("product_category", data.product_category);
        setCurrData(data);
        fetchCategories();
      })
      .catch(err => { setNotFound(true); })
      .finally(() => { setIsLoading(false) })
    }
    
    fetchData();
  }, [id_product, editFormHook])

  if (notFound) return <Navigate to="/404" />
  return (
    <AdminLayout title={"Detail Product"} isLoading={isLoading} >
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
              <Grid item xs={12} md={9}>
                <Stack spacing={2}>
                  <TextField {...InputIdProps} />
                  <TextField {...InputTitleProps} />
                  <TextField {...InputSlugProps} />
                  <TextField {...InputWeightProps} />
                  <TextField {...InputDescriptionProps} />
                  <Controller
                    {...InputCategoryProps.controllerProps}
                    render={({field}) => (
                      <Autocomplete
                        {...field} onChange={(e: any, newValue: any) => field.onChange(newValue)}
                        {...InputCategoryProps.autocompleteProps}
                        renderInput={(params) => ( <TextField {...params} {...InputCategoryProps.inputProps} /> )}
                      />
                    )}
                  />
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography>{"Gambar Barang"}</Typography>
                    <Button component="label" size="small" variant="contained">
                      {"Upload Gambar"}
                      <Box component="input" type="file" accept="image/*" hidden onChange={handleUploadImage} />
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack spacing={3}>
                  <Controller
                    {...InputPublishProps.controllerProps}
                    render={({field}) => (
                      <FormControlLabel
                        {...InputPublishProps.formControlLabelProps}
                        control={<Switch {...InputPublishProps.switchProps} {...field} checked={field.value} />}
                      />
                    )}
                  />
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

export default MasterProductDetail