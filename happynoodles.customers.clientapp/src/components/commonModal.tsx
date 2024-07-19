import React, { useState } from 'react';
import { Modal, Box, Typography, Button, ModalProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CommonModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  handleClose: () => void; // Define handleClose as a function that returns void
  children: React.ReactNode;
  customStyle?: React.CSSProperties; // Optional custom style
}
const CommonModal: React.FC<CommonModalProps> = ({ open, handleClose, title, children, customStyle, ...rest }) => {
  return (
    <Modal open={open} onClose={handleClose} {...rest}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        ...customStyle, // Apply custom styles if provided
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default CommonModal;