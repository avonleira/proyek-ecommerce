import { Parallax } from "react-parallax";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

interface IProps {
  urlImage?: string
  parallaxProps?: {
    strength?: number
    upMdHeight?: number | string
    downMdHeight?: number | string
    sx?: object
  }
  title?: string
  subheader?: string
  children?: JSX.Element | any
}

export default function MyMainBanner(props: IProps) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const { urlImage = "/images/page/renungan2.jpg" } = props;
  const { parallaxProps } = props;
  const { title = "My Title" } = props;

  return (
    <Box>
      <Parallax
        // bgImage="/images/page/renungan.jpg"
        bgImage={urlImage}
        strength={parallaxProps?.strength??350}
      >
        <Stack
          spacing={1} alignItems="center" justifyContent={"center"}
          sx={{ 
            minHeight: upMd?parallaxProps?.upMdHeight??"70vh":parallaxProps?.downMdHeight??"40vh",
            ...parallaxProps?.sx,
          }}
        >
          <Box sx={{ pt: 3 }}>
            <Typography
              fontSize={upMd?64:36} fontFamily="Merienda" color="white" align="center"
              sx={{ textShadow: `2px 2px ${theme.palette.primary.main}` }} 
            >
              {title}
            </Typography>
          </Box>
          { Boolean(props.subheader) ? (
            <Typography color="white" fontSize={18} align="center">{props.subheader}</Typography>
          ) : null }
          {/* <Breadcrumbs>
            <Link underline="hover" color="white" href="/">{'Home'}</Link>
            <Typography color="white">{'Renungan'}</Typography>
          </Breadcrumbs> */}
          { props.children }
        </Stack>
      </Parallax>
    </Box>
  )
}
