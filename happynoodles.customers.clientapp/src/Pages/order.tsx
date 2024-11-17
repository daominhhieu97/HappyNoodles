import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const OrderPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Orders
        </Typography>
        <Typography variant="body1">
          You don't have any orders yet.
        </Typography>
      </Box>
    </Container>
  );
};

export default OrderPage;