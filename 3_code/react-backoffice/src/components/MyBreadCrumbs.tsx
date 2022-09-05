import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface IMyBreadCrumbs {
  label: string
  path? :string
}

interface IProps {
  items: IMyBreadCrumbs[]
  separator?: React.ReactNode | null
  maxItems?: number
  sx?: any
  typographySx?: any
  color?: string | "primary" | "secondary"
}

export default function MyBreadCrumbs(props: IProps) {
  const { color = "primary" } = props;
  // const { separator = <Typography color={`text.${color}`}>/</Typography> } = props;
  const { separator = <NavigateNextIcon fontSize="small" /> } = props;
  const navigate = useNavigate()

  return (
    <Breadcrumbs maxItems={props.maxItems} separator={separator} sx={{ ...props.sx }}>
      { props.items?.map((item, idx) => {
        if (item.path) return (
          <Typography key={idx}
            sx={{
              cursor: 'pointer',
              // textDecoration: 'underline',
              "&:hover": {
                color: `${color}.main`,
              },
              ...props.typographySx
            }}
            onClick={() => navigate(item.path??"/")}
          >
            {item.label}
          </Typography>
        )
        else return (
          <Typography
            key={idx}
            sx={{
              color: `text.${color}`,
              ...props.typographySx
            }}
          >
            {item.label}
          </Typography>
        )
      }) }
    </Breadcrumbs>
  )
}
