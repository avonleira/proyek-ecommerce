import { forwardRef, Fragment } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

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
        <DialogTitle>{props.title??"Dialog Title"}</DialogTitle>
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
