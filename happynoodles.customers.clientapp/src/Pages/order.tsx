// src/pages/Order.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Stepper, Step, StepLabel, Button, Paper, Grid, TextField, Tooltip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RootState } from '../store/store';
import { addToCart, removeFromCart, clearCart } from '../store/cartSlice.tsx';
import { ItemDetailsDto } from '../models/item';
import Header from '../components/header.tsx';
import Footer from '../components/footer.tsx';
import { ItemDto } from '../models/menu.tsx';

const steps = ['Review Order', 'Delivery Details', 'Confirmation'];

const theme = createTheme({
    palette: {
      primary: {
        main: '#8B4513',
      },
      secondary: {
        main: '#D2691E',
        light: '#DEB887',
      },
      background: {
        default: '#FFF8DC',
        paper: '#FAEBD7',
      },
    },
    typography: {
      fontFamily: 'Playfair Display, serif',
    },
  });
  
const Order: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user);
  const [activeStep, setActiveStep] = useState(0);
  const [orderCode, setOrderCode] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (activeStep === 2) {
      setOrderCode(Math.random().toString(36).substr(2, 9).toUpperCase());
    }
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleQuantityChange = (item: ItemDto, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(addToCart({ ...item, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleConfirmOrder = () => {
    // Here you would typically send the order to your backend
    console.log('Order confirmed', { cart, deliveryAddress, phoneNumber, orderCode });
    dispatch(clearCart());
    navigate('/');
  };

  const renderOrderSummary = () => (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Order Summary</Typography>
      {cart.items.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>{item.name} x {item.quantity}</Typography>
          <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, fontWeight: 'bold' }}>
        <Typography>Total</Typography>
        <Typography>${calculateTotal().toFixed(2)}</Typography>
      </Box>
    </Paper>
  );

  const renderDeliveryForm = () => (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Delivery Details</Typography>
      <TextField
        fullWidth
        label="Delivery Address"
        value={deliveryAddress}
        onChange={(e) => setDeliveryAddress(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        margin="normal"
      />
    </Paper>
  );

  const renderConfirmation = () => (
    <Paper elevation={3} sx={{ p: 2, mb: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>Order Confirmation</Typography>
      <Typography>Your order code is: {orderCode}</Typography>
      <Box sx={{ mt: 2, mb: 2 }}>
        <img src='myqr.png' alt='qr code for payment' height={800} width={800}></img>
      </Box>
      <Typography>Scan this QR code at the restaurant to confirm your order.</Typography>
    </Paper>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>Your Order</Typography>
          <Link to="/" style={{ color: theme.palette.primary.main }}>Back to Home</Link>
          <Stepper activeStep={activeStep} sx={{ mt: 2, mb: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {activeStep === 0 && renderOrderSummary()}
              {activeStep === 1 && renderDeliveryForm()}
              {activeStep === 2 && renderConfirmation()}
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Order Actions</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Tooltip title={activeStep === steps.length - 1 ? 'Confirm Order' : 'Next Step'}>
                    <Button
                      variant="contained"
                      onClick={activeStep === steps.length - 1 ? handleConfirmOrder : handleNext}
                      sx={{
                        backgroundColor: theme.palette.secondary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.light,
                        },
                      }}
                    >
                      {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                    </Button>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Order;