import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface HeaderProps {
  theme: Theme;
  userName: string;
  onYourInfoClick: () => void;
  onYourOrdersClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, userName, onYourInfoClick, onYourOrdersClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Happy Noodles
        </Typography>
        <IconButton onClick={handleMenuOpen}>
          <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
            {userName.split(' ').map(name => name[0]).join('')}
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => { onYourInfoClick(); handleMenuClose(); }}>Your Info</MenuItem>
          <MenuItem onClick={() => { onYourOrdersClick(); handleMenuClose(); }}>Your Orders</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;