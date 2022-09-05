import { Fragment, useState } from "react";
import { Box, Backdrop, Collapse, Fab, Stack, Typography } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface IFabConfig { main?: IFabConfigItem, fabs?: IFabConfigItem[], fabStackSx?: any }
export interface IFabConfigItem {
  sx?: any
  icon?: JSX.Element
  children?: JSX.Element | string
  color?: "inherit" | "primary" | "secondary" | "default" | "success" | "error" | "info" | "warning" | undefined
  size?: "small" | "large" | "medium" | undefined
  onClick?: () => void
}
interface IProps { 
  open?: boolean
  fabConfig?: IFabConfig
}

export default function MyFab(props: IProps) {
  const { fabConfig } = props;
  const [openOption, setOpenOption] = useState<boolean>(props.open ?? false)
  
  const handleBackdropClick = () => {
    setOpenOption(false)
  }
  
  return (
    <Box>
      <Backdrop open={openOption} onClick={handleBackdropClick} />
      { !openOption ? (
        <Fab
          size={fabConfig?.main?.size??"large"}
          variant={Boolean(fabConfig?.main?.children)?"extended":"circular"}
          color={fabConfig?.main?.color ?? "secondary"} onClick={() => setOpenOption(true)}
          sx={{ position: "fixed", bottom: 0, right: 0, m: 2, ...fabConfig?.main?.sx }}
        >
          { fabConfig?.main?.icon ?? <AddIcon /> }
        </Fab>
      ) : null }
      <Collapse in={openOption} timeout="auto" easing={"easeInOut"}>
        <Stack spacing={1} alignItems="end" sx={{ position: "fixed", bottom: 0, right: 0, p: 2, ...fabConfig?.fabStackSx }}>
          { Boolean(fabConfig?.fabs) ? fabConfig?.fabs?.map((fab, idx) => (
            <Fab
              key={idx} size={fab.size??"medium"}
              variant={Boolean(fab.children)?"extended":"circular"}
              color={fab.color??"primary"} onClick={fab.onClick} sx={{ ...fab.sx }}
            >
              { fab.icon ?? <AddIcon /> }
              { Boolean(typeof fab.children === "string") ? <Typography>{fab.children}</Typography> : fab.children }
            </Fab>
          )) : (
            <Fragment>
              <Fab variant="extended" color="primary">
                <AddIcon />
                {'Add New'}
              </Fab>
            </Fragment>
          ) }
          <Fab
            size={fabConfig?.main?.size??"large"}
            variant={Boolean(fabConfig?.main?.children)?"extended":"circular"}
            color={fabConfig?.main?.color ?? "secondary"}
            onClick={() => setOpenOption(false)}
            sx={{ ...fabConfig?.main?.sx }}
          >
            <KeyboardArrowDownIcon />
          </Fab>
        </Stack>
      </Collapse>
    </Box>
  )
}
