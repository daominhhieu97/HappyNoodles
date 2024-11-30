// src/components/SpecialStickyButtons.tsx
import React from 'react';
import { Fab, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SpecialStickyButtonsProps {
  buttons: Array<{
    icon: React.ReactNode;
    label: string;
    path: string;
  }>;
}

const SpecialStickyButtons: React.FC<SpecialStickyButtonsProps> = ({ buttons }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 2,
      }}
    >
      {buttons.map((button, index) => (
        <Fab
          key={index}
          color="primary"
          aria-label={button.label}
          onClick={() => {
            navigate(button.path);}}
        >
          {button.icon}
        </Fab>
      ))}
    </Box>
  );
};

export default SpecialStickyButtons;