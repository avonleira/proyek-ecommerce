import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { MAIN_ROUTES, IRoute } from '../routes/AllRoutes';

interface IProps {
  setOpenDrawer?: any
}

export default function AdminDrawerList(props: IProps) {
  const navigate = useNavigate()
  const activeListRef = useRef<HTMLElement>(null)
  // const { setOpenDrawer } = props;

  useEffect(() => {
    // console.log(activeListRef)
    if (activeListRef.current)
      activeListRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeListRef])

  const changePage = (path: string) => {
    // setOpenDrawer(false)
    navigate(path)
  }

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      { MAIN_ROUTES[0]?.children?.map((route, idx) => (
        <AdminDrawerListLi key={idx} data={route} changePage={changePage} refference={activeListRef} />
      )) }
    </List>
  )
}

interface IListProps {
  data: IRoute
  changePage?: any
  OpenChild?: boolean
  parentSetChildOpen?: () => void;
  padding?: number
  refference?: React.RefObject<HTMLElement> | any
}

function AdminDrawerListLi(props: IListProps) {
  const location = useLocation();
  const { data } = props;
  const { changePage, OpenChild, padding = 0 } = props
  const { refference } = props

  const [Open, setOpen] = useState<boolean>(OpenChild??false)

  const parentSetChildOpen = () => {
    setOpen(true);
    if (props.parentSetChildOpen) props.parentSetChildOpen();
  }

  useEffect(() => {
    if (location.pathname === data.path) {
      setOpen(true)
      parentSetChildOpen()
    }
  }, [location.pathname, data.path])

  if (data.hideInNav) return null;
  return (
    <Fragment>
      {/* <ListItemButton sx={{ pl: padding + 2, color: 'primary.contrastText', bgcolor: 'primary.main' }} */}
      <ListItemButton sx={{ pl: padding + 2, }}
        selected={location.pathname === data.path}
        onClick={() => {
          if (data.path) changePage(data.path)
          else setOpen(!Open)
        }}
        ref={location.pathname === data.path?refference:null}
      >

        { data.icon ? (
          <ListItemIcon>{data.icon}</ListItemIcon>
        ) : null }

        { data.children ? (
          <ListItemText primary={<Typography fontWeight="bold">{data.label}</Typography>} />
          ) : (
          <ListItemText primary={data.label} />
        ) }

        { data.children ? (
          <>
            {Open ? <ExpandLess /> : <ExpandMore />}
          </>
        ) : null}

      </ListItemButton>
      { data.children ? (
        <Collapse in={Open} timeout="auto">
          { data.children?.map((chd, idx) => (
            <AdminDrawerListLi key={idx} data={chd} changePage={changePage} padding={padding+2} refference={refference} parentSetChildOpen={parentSetChildOpen} />
          )) }
        </Collapse>
      ) : null }
    </Fragment>
  )
}
