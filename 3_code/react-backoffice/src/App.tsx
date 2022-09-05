import { Fragment } from 'react';
import { CssBaseline } from '@mui/material';
// import { AuthProvider } from './hooks/auth';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MyRoutes from './routes/MyRoutes';

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* <AuthProvider> */}
          <MyRoutes />
        {/* </AuthProvider> */}
      </LocalizationProvider>
    </Fragment>
  );
}

export default App;
