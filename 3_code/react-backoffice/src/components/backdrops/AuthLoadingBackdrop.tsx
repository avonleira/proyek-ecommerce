import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack, ThemeProvider, Typography } from '@mui/material';
import { AdminMuiTheme } from '../../configs/themes/mui/_AdminTheme';

export default function AuthLoadingBackdrop() {
  return (
    <ThemeProvider theme={AdminMuiTheme}>
      <Backdrop
        sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        // onClick={handleClose}
      >
        <Stack direction="row" spacing={2}>
          <CircularProgress color="primary" />
          <Typography fontSize={28} fontWeight={600} color="primary.contrastText">{'Authorizing...'}</Typography>
        </Stack>
      </Backdrop>
    </ThemeProvider>
  )
}
