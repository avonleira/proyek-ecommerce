import { useNavigate } from 'react-router';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'

import { Logout as LogoutIcon } from '@mui/icons-material'
import HomeIcon from '@mui/icons-material/Home';

// import { useAuth } from '../../hooks/auth';


const PaperStyle = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}

interface IProps {
  anchorEl: any
  handleClose: any
}

export default function AdminAccountMenu(props: IProps) {
  // const { Logout, userNow } = useAuth();
  const userNow = {
    displayName: "Admin", email: "admin@admin.com"
  }
  const navigate = useNavigate();
  const { anchorEl, handleClose } = props
  const open = Boolean(anchorEl);

  const MENUS = [
    // { label: 'Profile', icon: <AccountBoxIcon fontSize="small" />, onClick: () => {navigate('/account/profile')} },
    // { label: 'History', icon: <HistoryIcon fontSize="small" />, onClick: () => {navigate('/account/history')} },
    // { label: 'Wishlist', icon: <BookmarkIcon fontSize="small" />, onClick: () => {navigate('/account/wishlist')} },
    { label: 'Home', icon: <HomeIcon fontSize="small" />, onClick: () => {navigate('/')} },
    { label: 'Logout', icon: <LogoutIcon fontSize="small" />, onClick: () => { /* Logout(); */ } },
  ]

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={PaperStyle}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => { handleClose() }} sx={{ width: 300 }}>
        {/* <Avatar alt={userNow?.email??"Admin"} src={userNow?.photoURL??""} /> */}
        <Typography noWrap>{userNow?.displayName ?? userNow?.email}</Typography>
      </MenuItem>
      <Divider />
      { MENUS?.map((menu, idx) => (
        <MenuItem key={idx} onClick={menu.onClick}>
          <ListItemIcon>{menu.icon}</ListItemIcon> {menu.label}
        </MenuItem>
      )) }
    </Menu>
  )
}
