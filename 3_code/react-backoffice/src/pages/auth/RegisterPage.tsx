import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { Autoplay, EffectFade, Pagination } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
import { Box, FormControl, FormControlProps, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, InputLabelProps, OutlinedInput, OutlinedInputProps, Stack, TextField, TextFieldProps, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { MuiTheme } from "../../configs/themes/mui/_Theme";
// import { mockBanners } from "../../mocks/mockBanners";
// import { useAuth } from "../../hooks/auth";
import { authErrorTranslater, IFirebaseAuthErrorState } from "../../utils/firebaseErrorHelper";
import { stringIncludeArray } from "../../utils/formHelper";

const mockLogo = {
  path: "/logo512.png",
  alt: "Logo e-Commerce Project",
}

export default function RegisterPage() {
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  // const { RegisterEmail } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerPageData, setRegisterPageData] = useState<any>({
    // page: {name: "Register Page", path: "/auth/register"} as Page,
    logo: mockLogo,
    // carousel: mockBanners as Carousel[],
  });
  const [FirebaseError, setFirebaseError] = useState<IFirebaseAuthErrorState | null>(null);

  const registerFormHook = useForm();
  const InputEmailProps: TextFieldProps = {
    label: "Email", color: "secondary", size: "medium", type: "email", fullWidth: true, required: true,
    error: stringIncludeArray(FirebaseError?.code ?? "", ["email", "user"]),
    helperText: stringIncludeArray(FirebaseError?.code ?? "", ["email", "user"]) ? FirebaseError?.message : null,
    ...registerFormHook.register("email"),
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
      ...registerFormHook.register("password"),
    } as OutlinedInputProps,
  }
  const oneEmpty = (): boolean => {
    return !Boolean(registerFormHook.watch("email")) || !Boolean(registerFormHook.watch("password"))
  }
  const registerFormSubmit = async (data: any) => {
    setIsLoading(true);
    setFirebaseError(null);
    // const { error } = await RegisterEmail(data.email, data.password);
    // if (error?.code) setFirebaseError(authErrorTranslater(error.code));
    setIsLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      // console.warn("Data Fetched!")
      // setIsLoading(true)
      // await PageController.getRegisterPageData()
      //   .then(res => {
      //     // console.log(res)
      //     setRegisterPageData(res)
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
                  component="img" alt={registerPageData.logo.alt}
                  src={registerPageData.logo.path}
                  sx={{ width: "calc(24% + 8vh)", cursor: "pointer" }}
                  onClick={() => navigate("/")}
                />
              </Stack>
              <Box sx={{ width: "100%", height: "100%", bgcolor: "white", p: 4 }}>
                <Stack
                  component="form" autoComplete="off" onSubmit={registerFormHook.handleSubmit(registerFormSubmit)}
                  justifyContent="space-between" alignItems="center" spacing={4} sx={{ height: "100%" }}
                >
                  <Stack spacing={2} sx={{ width: "100%", px: 2 }}>
                    <Typography variant="h4" fontWeight="bold" align="center" color="secondary">{"Daftar"}</Typography>
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
                        {"Tidak dapat mendaftar?"}
                      </Typography>
                      <Typography
                        variant="body2" onClick={() => navigate("/auth/login")}
                        sx={{ cursor: "pointer", "&:hover": { color: "secondary.main", transform: "scale(1.05)" } }}
                      >
                        {"Sudah mendaftar"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
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
                { registerPageData.carousel?.map((banner, index) => (
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
