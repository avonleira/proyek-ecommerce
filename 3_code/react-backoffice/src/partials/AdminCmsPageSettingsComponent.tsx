import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Alert, Box, Button, Grid, IconButton, Stack, TextField, TextFieldProps, Typography, useMediaQuery, useTheme } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// import { useAuth } from "../hooks/auth";
import { useDialog } from "../hooks/dialogHook";

interface IPageSettingsProps {
  pageUrl: string
  
  pageSettingPagePropRef: React.MutableRefObject<null>
  pageSettingPageSeoRef: React.MutableRefObject<null>
  pageSettingPageBannerPropsRef?: React.MutableRefObject<null>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AdminCmsPageSettingsComponent(props: IPageSettingsProps) {
  // const { userNow } = useAuth();
  const { pushAlert, pushConfirm } = useDialog();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageData, setPageData] = useState<any>();
  const [fetchError, setFetchError] = useState<{ message?: string } | null>(null);
  const [openUploadDialog, setOpenUploadDialog] = useState<boolean>(false);

  const pageSettingsFormHook = useForm();
  const pageSettingsFormFieldArray = useFieldArray({
    control: pageSettingsFormHook.control, 
    name: "seo.metas",
  });
  const InputPageNameProps: TextFieldProps = {
    label: "Page Name", size: "small", fullWidth: true, required: true,
    ...pageSettingsFormHook.register("name"),
  }
  const InputPagePathProps: TextFieldProps = {
    label: "Page Path", size: "small", fullWidth: true, disabled: true,
    ...pageSettingsFormHook.register("path"),
  }
  const InputPageSeoTitleProps: TextFieldProps = {
    label: "Title", size: "small", fullWidth: true, required: true,
    ...pageSettingsFormHook.register("seo.title"),
  }
  const InputPageBannerTitleProps: TextFieldProps = {
    label: "Judul", size: "small", fullWidth: true, required: true,
    ...pageSettingsFormHook.register("bannerProps.title"),
  }
  const InputPageBannerSubheaderProps: TextFieldProps = {
    label: "Sub-judul", size: "small", fullWidth: true, required: true, multiline:true,
    ...pageSettingsFormHook.register("bannerProps.subheader"),
  }
  const InputPageBannerImageurlProps: TextFieldProps = {
    label: "Link Foto Latar/Background", size: "small", fullWidth: true, required: true, disabled: true,
    ...pageSettingsFormHook.register("bannerProps.urlImage"),
  }
  const handleAddMetaTags = () => {
    if (pageSettingsFormFieldArray.fields.length < 10) pageSettingsFormFieldArray.append({ name: "", content: "" });
    else pushAlert({ title: "Perhatikan!", content: "Maksimal atribut hanya 10!" });
  }
  const pageSettingsFormSubmit = async (data: any) => {
    // setIsLoading(true);
    // let pageDataNow = new Page({...pageData, ...data, bannerProps: props.pageSettingPageBannerPropsRef ? data.bannerProps : undefined})
    // // console.log(pageDataNow)
    // await Page.authenticatedUpdate(userNow.uid, "cmsPagesLanding", String(pageData?.id), pageDataNow)
    // .then(res => {
    //   pushAlert({ title: "Berhasil!", content: "Properti halaman berhasil disimpan!" });
    // })
    // .catch(err => {
    //   pushAlert({ title: "Properti halaman gagal disimpan!", content: String(err.message) });
    // })
    // .finally(() => { setIsLoading(false) })
  }

  const handleLinkChange = (newValue: string|null) => {
    if (newValue!==null) {
      setOpenUploadDialog(false)
      pageSettingsFormHook.setValue("bannerProps.urlImage", newValue)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      // props.setIsLoading(true);
      // setIsLoading(true);
      // setFetchError(null)
      // await Page.authenticatedFindByPath(userNow.uid, props.permissionKey, props.pageUrl)
      // .then((res) => {
      //   if (res) {
      //     pageSettingsFormHook.setValue("name", res.name);
      //     pageSettingsFormHook.setValue("path", res.path);
      //     pageSettingsFormHook.setValue("seo", res.seo);
      //     pageSettingsFormHook.setValue("seo.metas", res.seo?.metas);
      //     pageSettingsFormHook.setValue("bannerProps", res?.bannerProps);
      //     setPageData(res)
      //     // console.log(res)
      //   }
      // })
      // .catch(err => { setFetchError(err); })
      // .finally(() => {
      //   props.setIsLoading(false)
      //   setIsLoading(false)
      // })
    }

    fetchData();
  }, [])

  if (isLoading) return (<Typography variant="body2" color="primary">{"Loading..."}</Typography>)
  else if (fetchError) return (<Alert severity="error">{ fetchError.message ?? "Terjadi sebuah kesalahan." }</Alert>)
  // else if (!Boolean(pageData)) return (<Typography variant="body2" color="error">{"Data not found!"}</Typography>)
  return (
    <Stack component="form" autoComplete="off" spacing={1.5} onSubmit={pageSettingsFormHook.handleSubmit(pageSettingsFormSubmit)}>
      {/* Page Props Section */}
      <Box ref={props.pageSettingPagePropRef}>
        <Typography variant="subtitle1" mb={1}>
          <Typography variant="inherit" component="span" color={"primary.light"}>{"# "}</Typography>
          {"Properti Halaman"}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField {...InputPageNameProps} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField {...InputPagePathProps} />
          </Grid>
        </Grid>
      </Box>

      {/* Page SEO Section */}
      <Box ref={props.pageSettingPageSeoRef}>
        <Typography variant="subtitle1" mb={1}>
          <Typography variant="inherit" component="span" color={"primary.light"}>{"# "}</Typography>
          {"SEO"}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <TextField {...InputPageSeoTitleProps} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body2" color="text.secondary" mb={1}>{"Meta Tags"}</Typography>
            <Stack spacing={1}>
              { pageSettingsFormFieldArray.fields?.map((field: object & { id: string }, index: number) => {
                const InputNameProps: TextFieldProps = {
                  label: "Name", size: "small", fullWidth: true, required: true,
                  placeholder: "eg: description, keywords, robots",
                  ...pageSettingsFormHook.register(`seo.metas.${index}.name`),
                }
                const InputContentProps: TextFieldProps = {
                  label: "Content", size: "small", fullWidth: true, required: true, multiline: true,
                  ...pageSettingsFormHook.register(`seo.metas.${index}.content`),
                }
                const handleRemoveMeta = () => {
                  console.log("asd")
                  pushConfirm({
                    title: "Hapus Meta", content: "Apakah anda yakin untuk menghapus?",
                    agreeBtnText: "YA, SAYA YAKIN", onAgreeBtnClick: () => pageSettingsFormFieldArray.remove(index),
                  });
                }
                return (
                  <Box key={field.id}>
                    <Grid container spacing={1}>
                      <Grid item xs={10} md={4}>
                        <TextField {...InputNameProps} />
                      </Grid>
                      { upMd ? null : (
                        <Grid item xs={2} md={1}>
                          <IconButton aria-label="settings" color="error" onClick={handleRemoveMeta}>
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      ) }
                      <Grid item xs={12} md={7}>
                        <TextField {...InputContentProps} />
                      </Grid>
                      { upMd ? (
                        <Grid item xs={2} md={1}>
                          <IconButton aria-label="settings" color="error" onClick={handleRemoveMeta}>
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      ) : null }
                    </Grid>
                  </Box>
                )
              }) }
              <Button color="success" variant="outlined" size="small" startIcon={<AddIcon />} onClick={handleAddMetaTags}>
                {"Tambah"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Page Banner Props Section */}
      { props.pageSettingPageBannerPropsRef ? (
        <Box ref={props.pageSettingPageBannerPropsRef}>
          <Typography variant="subtitle1" mb={1}>
            <Typography variant="inherit" component="span" color={"primary.light"}>{"# "}</Typography>
            {"Banner Utama"}
          </Typography>

          <Stack spacing={1}>
            <TextField {...InputPageBannerTitleProps} />
            <TextField {...InputPageBannerSubheaderProps} />
            <TextField {...InputPageBannerImageurlProps} />
            {/* <Button variant="contained" onClick={() => setOpenUploadDialog(true)}>
              {"Pilih Gambar"}
            </Button>
            <MyFirebaseFileFinder
              storagePath="images/page-banners" aspectRatio="19/12"
              open={openUploadDialog} onClose={(() => setOpenUploadDialog(false))}
              onLinkChange={handleLinkChange}
            /> */}
          </Stack>
        </Box>
      ) : null }
      <Button type="submit" variant="contained">{"Simpan Perubahan"}</Button>
    </Stack>
  )
}
