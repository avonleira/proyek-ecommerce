import { useState, useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { LinearProgress, Stack, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import AdminDrawerList from './AdminDrawerList'
import AdminAppbarToolbar from './AdminAppbarToolbar';
import { AdminMuiTheme } from '../configs/themes/mui/_AdminTheme';
import MyFab, { IFabConfig } from "../components/MyFab"

const drawerWidth = 270;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  // padding: theme.spacing(useMediaQuery(theme.breakpoints.up('md'))?3:2),
  // paddingBottom: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: useMediaQuery(theme.breakpoints.up('md'))?`-${drawerWidth}px`:0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && useMediaQuery(theme.breakpoints.up('md')) && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


interface IProps {
  sx?: any
  title?: string
  isLoading?: boolean
  openBackdrop?: boolean
  handleBackdropClick?: () => void
  children: JSX.Element | any
  fabConfig?: IFabConfig
}

export default function AdminLayout(props: IProps) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const { sx, children } = props;
  const { isLoading, openBackdrop } = props;
  const { title = 'e-Commerce Backoffice' } = props;

  const [open, setOpen] = useState<boolean>(true);
  useEffect(() => { setOpen(upMd) }, [upMd])
  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };

  return (
    <ThemeProvider theme={AdminMuiTheme}>
      <Box sx={{ ...sx, display: 'flex' }}>
        <AppBar position="fixed" open={open} color="primary">
          <AdminAppbarToolbar title={title} open={open} handleDrawerOpen={handleDrawerOpen}/>
          { isLoading ? (
            <LinearProgress color="secondary" />
          ) : null }
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant={upMd?"persistent":"temporary"}
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          // onMouseLeave={() => setOpen(false)}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Stack direction="row" justifyContent="center"alignItems="center" sx={{ p: 3 }}>
            <Box
              component="img" loading="lazy"
              alt={"Logo e-Commerce Project"} title={"Logo e-Commerce Project"}
              src={"/logo512.png"}
              width={"50%"}
            />
          </Stack>
          <Divider />

          <AdminDrawerList setOpenDrawer={setOpen} />

        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Box children={children} sx={{ minHeight: "92vh", p: upMd?3:2, }}/>
          <Stack sx={{ bgcolor: "divider", p: upMd?3:2, }}>
            <Typography variant="body2" fontStyle="italic" fontFamily="Arial">
              {"Coustry to "}
              <Typography variant="inherit" component="a" target="_blank" href={"https://github.com/avonleira"} color="primary.main" fontWeight="bold">{"avonleira"}</Typography>
              {" & "}
              <Typography variant="inherit" component="a" target="_blank" href={"https://github.com/julindk-alt"} color="primary.main" fontWeight="bold">{"julindk-alt"}</Typography>
            </Typography>
          </Stack>
        </Main>
      </Box>
      { Boolean(props.fabConfig) ? (<MyFab fabConfig={props.fabConfig} />) : null }
    </ThemeProvider>
  )
}
