import { Fragment } from "react";
import { Button, ButtonProps, Breakpoint, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, useMediaQuery, useTheme } from "@mui/material";

interface IMyConfirmDialogProps {
  open: boolean
  onClose?: () => void
  maxWidth?: false | Breakpoint
  fullWidth?: boolean
  allowFullScreen?: boolean
  title?: string
  content?: string
  agreeBtnText?: string
  cancelBtnText?: string
  onAgreeBtnClick?: () => void
  onCancelBtnClick?: () => void
  actionButtons?: ButtonProps[]
  // setOpenDialog: () => void
  // setFinalLink: React.Dispatch<React.SetStateAction<string|null>>
  // onLinkChange: (newValue: string|null) => void
}

export default function MyConfirmDialog(props: IMyConfirmDialogProps) {
  const { open, onClose, fullWidth = true, maxWidth = "xs", allowFullScreen } = props;
  const { title = "Judul", content = "Isi" } = props;
  const { agreeBtnText = "OK", cancelBtnText = "BATAL", actionButtons } = props;
  const { onAgreeBtnClick, onCancelBtnClick = onClose } = props;
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Dialog
      open={open} fullWidth={fullWidth} maxWidth={maxWidth} fullScreen={allowFullScreen?!upMd:false} keepMounted={false}
      onClose={onClose}
      aria-describedby="my-confirm-dialog"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: "pre-wrap" }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        { !!actionButtons && actionButtons.length ? (
          <Fragment>
            { actionButtons?.map((btnProps, index) => (
              <Button key={`my-confirm-dialog-action-button-item-${index}`} {...btnProps}/>
            )) }
          </Fragment>
        ) : (
          <Fragment>
            <Button onClick={onAgreeBtnClick} autoFocus>
              {agreeBtnText}
            </Button>
            <Button color="error" onClick={onCancelBtnClick}>{cancelBtnText}</Button>
          </Fragment>
        ) }
      </DialogActions>
    </Dialog>
  )
}