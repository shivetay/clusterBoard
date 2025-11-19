'use client';
import Logout from '@mui/icons-material/Logout';
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { UserAvatar } from './navbar.styled';

export function UserBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton onClick={handleOpenMenu}>
          <UserAvatar />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={!!anchorEl}
        onClose={handleCloseMenu}
        onClick={() => {}}
        slotProps={{
          paper: {
            sx: {
              background:
                theme.palette.background.transparent ||
                'rgba(255, 255, 255, 0.25)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(1.2px)',
              WebkitBackdropFilter: 'blur(1.2px)',
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {}}>
          <UserAvatar /> Profile
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserBar;
