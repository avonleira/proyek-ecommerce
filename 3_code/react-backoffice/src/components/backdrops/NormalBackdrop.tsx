import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack, Typography } from '@mui/material';

interface IProps {
  open?: boolean
  text?: string
}

export default function NormalBackdrop(props: IProps) {
  const { open, text = "" } = props
  return (
    <div>
      <Backdrop
        sx={{ color: 'secondary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open ?? true}
        // onClick={handleClose}
      >
        <Stack direction="row" spacing={2}>
          <CircularProgress color="inherit" />
          <Typography fontSize={28} fontWeight={600} color="primary.contrastText">{text}</Typography>
        </Stack>
      </Backdrop>
    </div>
  )
}
