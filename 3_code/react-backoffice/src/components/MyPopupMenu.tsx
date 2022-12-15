import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export interface IMyPopupMenuItem {
  type: 'divider' | 'avatar' | 'menu'
  avatar?: any | JSX.Element
  label?: string
  icon?: any | JSX.Element
  textColor?: string
  onClick?: any
}

const defaultMenu: IMyPopupMenuItem[] = [{ type: 'avatar', label: 'There are no menu inserted yet', onClick: () => {} }];

const generateMenuItem = (item: IMyPopupMenuItem, idx: number) => {
  if (item.type === 'divider') return <Divider key={idx} />
  else if (item.type === 'avatar') {
    return (
      <MenuItem key={idx} onClick={item.onClick ?? null}>
        {item.avatar ?? <Avatar />}
        <Typography noWrap>{item.label ?? ''}</Typography>
      </MenuItem>
    )
  }
  else if (item.type === 'menu') {
    return (
      <MenuItem key={idx} onClick={item.onClick ?? null}>
        { item.icon ? (
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
        ) : null }
        <Typography noWrap color={item.textColor}>{item.label ?? ''}</Typography>
      </MenuItem>
    )
  }
  return null;
}

interface IProps {
  anchorEl: Element | ((element: Element) => Element) | null | undefined
  handleClose?: any
  menuItems?: IMyPopupMenuItem[]
  sx?: any
}

export default function MyPopupMenu(props: IProps) {
  const { anchorEl, handleClose, menuItems = defaultMenu } = props;
  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
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
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      sx={{ ...props.sx }}
    >
      { menuItems.map((item, idx) => (generateMenuItem(item, idx))) }
    </Menu>
  )
}
