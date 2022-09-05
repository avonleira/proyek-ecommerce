import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { Autoplay, EffectFade, Pagination } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Button, FormControl, FormControlProps, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, InputLabelProps, OutlinedInput, OutlinedInputProps, Stack, TextField, TextFieldProps, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import GoogleIcon from '@mui/icons-material/Google';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { MuiTheme } from "../../configs/themes/mui/_Theme";
// import { useAuth } from "../../hooks/auth";
import { authErrorTranslater, IFirebaseAuthErrorState } from "../../utils/firebaseErrorHelper";
import { stringIncludeArray } from "../../utils/formHelper";

const mockLogo = {
  path: "/logo512.png",
  alt: "Logo e-Commerce Project",
}

export default function LoginPage() {
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  // const { LoginEmail, LoginGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginPageData, setLoginPageData] = useState<any>({
    // page: {name: "Login Page", path: "/auth/login"} as Page,
    logo: mockLogo,
  });
  const [FirebaseError, setFirebaseError] = useState<IFirebaseAuthErrorState | null>(null);

  const loginFormHook = useForm();
  const InputEmailProps: TextFieldProps = {
    label: "Email", color: "secondary", size: "medium", type: "email", fullWidth: true, required: true,
    error: stringIncludeArray(FirebaseError?.code ?? "", ["email", "user"]),
    helperText: stringIncludeArray(FirebaseError?.code ?? "", ["email", "user"]) ? FirebaseError?.message : null,
    ...loginFormHook.register("email"),
  }
  const [InputPasswordType, setInputPasswordType] = useState<string>("password");
  const InputPasswordProps = {
    formControlProps: {
      fullWidth: true, required: true, variant: "outlined", color: "secondary",
      error: stringIncludeArray(FirebaseError?.code ?? "", ["password"]),
    } as FormControlProps,
    inputLabelProps: { htmlFor: "input-password" } as InputLabelProps,
    inputProps: {
      id: "input-password", type: InputPasswordType, label: "Password", required: true,
      ...loginFormHook.register("password"),
    } as OutlinedInputProps,
  }
  // const InputCheckboxProps = {
  //   formControlLabelProps: { label: "Ingat saya", labelPlacement: "end" } as FormControlLabelProps,
  //   checkboxProps: {
  //     size: "small", color: "secondary",
  //     ...loginFormHook.register("staySignedIn"),
  //   } as CheckboxProps,
  // }
  const oneEmpty = (): boolean => {
    return !Boolean(loginFormHook.watch("email")) || !Boolean(loginFormHook.watch("password"))
  }
  const loginFormSubmit = async (data: any) => {
    setIsLoading(true);
    setFirebaseError(null);
    // const { error } = await LoginEmail(data.email, data.password);
    // if (error?.code) setFirebaseError(authErrorTranslater(error.code));
    setIsLoading(false);
  }

  const handleLoginClick = async () => {
    // LoginGoogle();
  }

  useEffect(() => {
    const fetchData = async () => {
      // console.warn("Data Fetched!")
      // setIsLoading(true)
      // await PageController.getLoginPageData()
      //   .then(res => {
      //     // console.log(res)
      //     setLoginPageData(res)
      //   })
      //   .catch(err => console.log(err))
      //   .finally(() => setIsLoading(false))
    }

    fetchData()
  }, [])

  return (
    <ThemeProvider theme={MuiTheme}>
      <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden", bgcolor: "secondary.main" }}>
        <Grid container sx={{ width: "100%", height: "100%" }}>
          <Grid item xs={12} sm={7} md={5} lg={4} xl={3}>
            <Stack justifyContent="space-between" alignItems="center" sx={{ height: "100%", width: "100%" }}>
              <Stack alignItems="center" sx={{ align: "center", p: 4 }}>
                <Box
                  component="img" alt={loginPageData.logo.alt}
                  src={loginPageData.logo.path}
                  sx={{ width: "calc(24% + 8vh)", cursor: "pointer" }}
                  onClick={() => navigate("/")}
                />
              </Stack>
              <Box sx={{ width: "100%", height: "100%", bgcolor: "white", p: 4 }}>
                <Stack
                  component="form" autoComplete="off" onSubmit={loginFormHook.handleSubmit(loginFormSubmit)}
                  justifyContent="space-between" alignItems="center" spacing={4} sx={{ height: "100%" }}
                >
                  <Stack spacing={2} sx={{ width: "100%", px: 2 }}>
                    <Typography variant="h4" fontWeight="bold" align="center" color="secondary">{"Masuk"}</Typography>
                    <TextField {...InputEmailProps} />
                    <FormControl {...InputPasswordProps.formControlProps}>
                      <InputLabel {...InputPasswordProps.inputLabelProps}>{InputPasswordProps.inputProps.label}</InputLabel>
                      <OutlinedInput
                        {...InputPasswordProps.inputProps}
                        endAdornment={
                          <InputAdornment position="end" sx={{ mr: 1 }}>
                            <IconButton edge="end"
                              onClick={() => setInputPasswordType(Boolean(InputPasswordType === "text") ? "password" : "text")}
                            >
                              {Boolean(InputPasswordType === "password") ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText>
                        {stringIncludeArray(FirebaseError?.code ?? "", ["password"]) ? FirebaseError?.message : null}
                      </FormHelperText>
                    </FormControl>
                    <Button color="secondary" variant="contained" startIcon={<GoogleIcon />} tabIndex={-10} onClick={handleLoginClick}>
                      {"Masuk dengan Google"}
                    </Button>
                    {/* <FormControlLabel {...InputCheckboxProps.formControlLabelProps} control={<Checkbox {...InputCheckboxProps.checkboxProps} />} /> */}
                  </Stack>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="center">
                      <LoadingButton
                        type="submit" size="large"
                        loading={isLoading} disabled={oneEmpty()}
                        color={oneEmpty()?"primary":"secondary"}
                        variant={"outlined"}
                        sx={{ height: 60, width: 60 }}
                      >
                        <ArrowForwardIcon />
                      </LoadingButton>
                    </Stack>
                    <Stack spacing={0} alignItems="center">
                      <Typography
                        variant="body2"
                        // onClick={() => navigate("/auth/help")}
                        sx={{ cursor: "pointer", "&:hover": { color: "secondary.main", transform: "scale(1.05)" } }}
                      >
                        {"Tidak dapat masuk?"}
                      </Typography>
                      <Typography
                        variant="body2" onClick={() => navigate("/auth/register")}
                        sx={{ cursor: "pointer", "&:hover": { color: "secondary.main", transform: "scale(1.05)" } }}
                      >
                        {"Daftar Akun"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
              {/* <Box sx={{ width: "100%", minHeight: upSm?0:"20%", bgcolor: "primary.light", p: 4 }}>
                
              </Box> */}
            </Stack>
          </Grid>
          { upSm ? (
            <Grid item xs={12} sm={5} md={7} lg={8} xl={9}>
              Anggap saja kosong
              {/* <Swiper className="mySwiper secondarySwiper"
                loop={true} effect={"fade"}
                pagination={{ clickable: true }}
                modules={[EffectFade, Autoplay, Pagination]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
              >
                { loginPageData.carousel?.map((banner, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      component="img" loading="lazy"
                      alt={banner.alt} src={banner.path}
                      sx={{ height: "100vh", width: "100%", objectFit: "cover" }}
                    />
                  </SwiperSlide>
                )) }
              </Swiper> */}
            </Grid>
          ) : null }
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
