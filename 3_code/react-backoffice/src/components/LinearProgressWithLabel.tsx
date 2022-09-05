import { Box, LinearProgress, Typography } from '@mui/material';

interface IProps {
  value?: number
  variant?: "determinate" | "indeterminate" | "buffer" | "query" | undefined
}

export default function LinearProgressWithLabel(props: IProps) {
  const { value = 100, variant = "determinate" } = props;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress {...props} variant={variant} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(value,)}%`}
        </Typography>
      </Box>
    </Box>
  );
}