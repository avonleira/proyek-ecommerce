import { Box } from '@mui/material';

interface IProps {
 sx?: any
 children: any | JSX.Element
 value: number
 index: number
 other?: any
}

export default function TabPanel(props: IProps) {
  const { sx, children, value, index, ...other } = props;

  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ ...sx, pt: 2 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}