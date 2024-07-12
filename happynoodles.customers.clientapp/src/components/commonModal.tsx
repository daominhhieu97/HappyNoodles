import React, { useState } from 'react';
import { Modal, Box, Typography, Button, ModalProps } from '@mui/material';

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
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Box sx={{ mt: 2 }}>
            {children}
          </Box>
          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    );
  };
  
  export default CommonModal;