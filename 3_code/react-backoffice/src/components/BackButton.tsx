import { useNavigate } from 'react-router';
import { IconButton } from '@mui/material'

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

interface IProps {
  direction?: string
  color?: "default" | "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined
}

export default function BackButton(props: IProps) {
  const navigate = useNavigate()
  const { direction, color = "primary" } = props;

  return (
    <IconButton
      color={color ?? "primary"}
      onClick={() => { 
        if (direction) navigate(direction)
        else navigate(-1)
      }}
    >
      <ArrowBackOutlinedIcon />
    </IconButton>
  )
}
