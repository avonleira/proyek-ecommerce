import { Fragment } from 'react';
import { Alert } from '@mui/material';

interface IProps {
  children?: JSX.Element
}

export default function EditableInfoAlert(props: IProps) {
  const { children } = props;
  return (
    <Alert severity="info">
      { children ?? (
        <Fragment>
          {"You can edit data on it's own cell here by double-click at the cell."}
          <br/>
          {"Save actions works per row!"}
        </Fragment>
      ) }
    </Alert>
  )
}
