import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface HeaderProps {
  theme: Theme;
  userName: string;
  onAvatarClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, userName, onAvatarClick }) => (
  <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
        Happy Noodles
      </Typography>
      <IconButton onClick={onAvatarClick}>
        <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
          {userName.split(' ').map(name => name[0]).join('')}
        </Avatar>
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Header;