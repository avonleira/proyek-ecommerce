import { forwardRef, Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, IconButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import CloseIcon from '@mui/icons-material/Close';

// const Transition = forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

interface IProps {
  open?: boolean
  setOpen?: (newValue: boolean) => void
  onClose?: () => void
  useTransition?: boolean
  TransitionComponent?: React.JSXElementConstructor<TransitionProps & { children: React.ReactElement<any, any>; }> | undefined
  maxWidth?: DialogProps['maxWidth']
  fullWidth?: boolean
  fullScreen?: boolean
  title?: string
  titleComponent?: JSX.Element
  content?: JSX.Element
  contentComponent?: JSX.Element
  actions?: JSX.Element
  actionsComponent?: JSX.Element
}

export default function MyDialog(props: IProps) {
  const { maxWidth = "sm", fullWidth = true ,fullScreen = false } = props;
  const { setOpen = (newValue: boolean): void => {} } = props;
  const handleClose = () => { setOpen(false); };

  return (
    <Dialog
      open={props.open??false}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      // TransitionComponent={props.useTransition?props.TransitionComponent?props.TransitionComponent:Transition:undefined}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      { props.titleComponent ?? (
        <DialogTitle>
          {props.title??"Dialog Title"}
          {props.onClose ? (
            <IconButton
              aria-label="close" onClick={props.onClose}
              sx={{
                position: 'absolute', right: 8, top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
      ) }
      { props.contentComponent ?? (
        <DialogContent>
          { props.content ?? (
            <DialogContentText>
              {'Example dialog content.'}
            </DialogContentText>
          ) }
        </DialogContent>
      ) }
      { props.actionsComponent ?? (
        <DialogActions>
          { props.actions ?? (
            <Fragment>
              <Button onClick={handleClose}>{'Disagree'}</Button>
              <Button onClick={handleClose}>{'Agree'}</Button>
            </Fragment>
          ) }
        </DialogActions>
      ) }
    </Dialog>
  )
}
