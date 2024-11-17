import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Oops! You've taken a wrong turn
        </Typography>
        <Typography variant="body1" paragraph>
          We're sorry, but the page you're looking for seems to have wandered off.
          Don't worry, even the best explorers get lost sometimes!
        </Typography>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
            mb: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Here are some helpful directions:
          </Typography>
          <ul>
            <li>Double-check the URL for any typos</li>
            <li>Use the navigation menu to find what you're looking for</li>
            <li>Head back to our homepage to start fresh</li>
          </ul>
        </Box>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;