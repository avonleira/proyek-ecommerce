// import { Fragment } from "react";
import { Button, ButtonProps, Breakpoint, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material";

interface IMyReportDialogProps {
  open: boolean
  onClose?: () => void
  maxWidth?: false | Breakpoint
  fullWidth?: boolean
  allowFullScreen?: boolean
  title?: string
  children?: JSX.Element | any
  actionButtons?: ButtonProps[]
  // submitBtnText?: string
  // cancelBtnText?: string
  // onSubmitBtnClick?: () => void
  // onCancelBtnClick?: () => void
}

export default function MyReportDialog(props: IMyReportDialogProps) {
  const { open, onClose, fullWidth = true, maxWidth = "xs", allowFullScreen } = props;
  const { title = "Laporkan", children, actionButtons = [] } = props;
  // const { submitBtnText = "LAPORKAN", cancelBtnText = "BATALKAN" } = props;
  // const { onSubmitBtnClick, onCancelBtnClick = onClose } = props;
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Dialog
      open={open} fullWidth={fullWidth} maxWidth={maxWidth} fullScreen={allowFullScreen?!upMd:false} keepMounted={false}
      onClose={onClose} scroll="body"
      aria-describedby="my-report-dialog"
    >
      <DialogTitle color="error.main">{title}</DialogTitle>
      <DialogContent>
        {children}
        {/* <DialogContentText>
          {"Laporkan"}
        </DialogContentText> */}
      </DialogContent>
      { !!actionButtons && actionButtons.length ? (
        <DialogActions>
          { actionButtons?.map((btnProps, index) => (
            <Button key={`my-report-dialog-action-button-item-${index}`} {...btnProps}/>
          )) }
        </DialogActions>
      ) : null }
    </Dialog>
  )
}