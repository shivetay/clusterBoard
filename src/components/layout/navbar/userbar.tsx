'use client';
import Logout from '@mui/icons-material/Logout';
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { logoutUser } from '@/lib/api/user/login';
import { useUser } from '@/stores';
import { UserAvatar } from './navbar.styled';

export function UserBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const { userInfo } = useUser();
  const { status } = useSession();
  const router = useRouter();

  if (status !== 'authenticated') {
    return null;
  }

  const initials =
    userInfo?.name
      ?.split(' ')
      .map((chunk) => chunk.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('') ?? 'CB';

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logoutUser();
    handleCloseMenu();
    router.replace('/login');
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton onClick={handleOpenMenu}>
          <UserAvatar>{initials}</UserAvatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={!!anchorEl}
        onClose={handleCloseMenu}
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
        <MenuItem onClick={handleCloseMenu}>
          <Box display="flex" flexDirection="column">
            <Typography fontWeight={600}>{userInfo?.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {userInfo?.email}
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
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
