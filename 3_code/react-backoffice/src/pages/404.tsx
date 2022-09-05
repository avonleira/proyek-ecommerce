import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, Stack, Typography } from '@mui/material'

import { mock404 } from '../mocks/mock404'


export default function Page404() {
  const navigate = useNavigate()

  function handleBackToHome() { navigate('/') }
  // function handleGoToContactUs() { navigate('/contact-us') }

  return (
    <Box
      sx={{
        width: '100vw', height: '100vh',
        background: "linear-gradient(180deg, rgba(254, 251, 255, 0) 0%, rgba(175, 12, 233, 0.13) 73.96%, rgba(148, 99, 252, 0.23) 80.73%, rgba(204, 97, 120, 0.3) 91.15%, rgba(252, 96, 8, 0.42) 100%)",
      }}
    >
      <Container fixed sx={{ height: 'inherit', width: 'inherit'}}>
        <Stack justifyContent="center" alignItems="center" sx={{ height: '100%', width: '100%'}}>
          <Stack spacing={0} justifyContent="center" alignItems="center">
            <Typography variant="h4" fontWeight="bold" align="center">{mock404.header}</Typography>
            
            <Box sx={{ overflow: 'hidden', width: '100vw', position: 'relative', textAlign: 'center' }}>
              <Box component="img" src={mock404.img_url} sx={{ maxHeight: '48vh', maxWidth: '180vw', position: 'relative' }} />
            </Box>

            <Box sx={{ mb: 3, maxWidth: 600, px: 2 }}>
              <Typography variant="h6" fontWeight="bold" align="center">{mock404.subheader}</Typography>
            </Box>
            
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
              <Button size="small" variant="contained" onClick={handleBackToHome} >{'BACK TO HOME'}</Button>
              {/* <Button size="small" variant="outlined" onClick={handleGoToContactUs} >{'CONTACT US'}</Button> */}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
