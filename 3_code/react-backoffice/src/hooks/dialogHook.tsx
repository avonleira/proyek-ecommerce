import { createContext, useContext, useState, Fragment } from 'react';
import { ButtonProps, Breakpoint } from "@mui/material"

import MyConfirmDialog from '../components/MyConfirmDialog';

interface IDHDialogProps {
  open?: boolean
  onClose?: () => void
  maxWidth?: false | Breakpoint
  fullWidth?: boolean
  allowFullScreen?: boolean
  title: string
  content: string
  agreeBtnText?: string
  cancelBtnText?: string
  onAgreeBtnClick?: () => void
  onCancelBtnClick?: () => void
  actionButtons?: ButtonProps[]
}

interface IDialogContext {
  setDialogProps: React.Dispatch<React.SetStateAction<IDHDialogProps>>
  pushAlert: (props: IDHDialogProps) => void
  pushConfirm: (props: IDHDialogProps) => void
}

const DialogContext = createContext<IDialogContext>({} as IDialogContext)

const defaultDialogProps: IDHDialogProps = {
  open: false, title: "", content: "",
}

const DialogProvider = (props: any) => {
  const children = Object.assign({}, props.children)
  // const [dialogType, setDialogType] = useState<"alert"|"confirm">("alert");
  const [dialogProps, setDialogProps] = useState<IDHDialogProps>(defaultDialogProps);

  const handleClose = () => {
    setDialogProps({...dialogProps, open: false})
  }

  const pushAlert = (alertProps: IDHDialogProps) => {
    // setDialogType("alert")
    setDialogProps({
      ...alertProps, open: true,
      onClose: () => {
        if (!!alertProps.onClose) {
          alertProps.onClose();
          handleClose()
        }
      },
      actionButtons: [
        {
          children: "OK",
          onClick: () => {
            if (!!alertProps.onAgreeBtnClick) alertProps.onAgreeBtnClick();
            if (!!alertProps.onClose) alertProps.onClose();
            handleClose()
          }
        }
      ]
    })
  }

  const pushConfirm = (confirmProps: IDHDialogProps) => {
    // setDialogType("confirm")
    setDialogProps({
      ...confirmProps, open: true,
      onClose: () => {
        if (!!confirmProps.onClose) {
          confirmProps.onClose();
          handleClose()
        }
      },
      actionButtons: confirmProps?.actionButtons ? confirmProps?.actionButtons?.map((btnProps) => ({...btnProps, onClick: () => {
        if (!!btnProps.onClick) btnProps.onClick({} as React.MouseEvent<HTMLButtonElement, MouseEvent>);
        handleClose()
      }})):undefined,
      onAgreeBtnClick: () => {
        if (!!confirmProps.onAgreeBtnClick) confirmProps.onAgreeBtnClick()
        handleClose()
      },
      onCancelBtnClick: () => {
        if (!!confirmProps.onCancelBtnClick) confirmProps.onCancelBtnClick()
        handleClose()
      },
    })
  }

  const value = {
    setDialogProps, pushAlert, pushConfirm
  }

  return (
    <DialogContext.Provider value={value} {...props}>
      {/* { !!dialogProps && dialogProps!==null ? ( */}
      <MyConfirmDialog {...dialogProps} open={dialogProps.open??false} />
      {/* ) : null } */}
      {/* <Fragment children={children} /> */}
      {children}
    </DialogContext.Provider>
  )
}

const useDialog = () => useContext(DialogContext)

export { DialogProvider, useDialog };