import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Theme } from '@mui/material/styles';
import MenuDto from '../models/menu';

interface MenuTabsProps {
  theme: Theme;
  menus: MenuDto[];
  selectedMenu: string | null;
  handleMenuChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const MenuTabs: React.FC<MenuTabsProps> = ({ theme, menus, selectedMenu, handleMenuChange }) => (
  <Box sx={{ width: '100%', bgcolor: theme.palette.background.paper }}>
    <Tabs
      value={selectedMenu}
      onChange={handleMenuChange}
      centered
      sx={{ backgroundColor: theme.palette.secondary.main }}
    >
      {menus.map((menu) => (
        <Tab 
          label={menu.name} 
          value={menu.id} 
          key={menu.id} 
          sx={{ color: '#FFF', '&.Mui-selected': { color: '#FFF', fontWeight: 'bold' } }} 
        />
      ))}
    </Tabs>
  </Box>
);

export default MenuTabs;