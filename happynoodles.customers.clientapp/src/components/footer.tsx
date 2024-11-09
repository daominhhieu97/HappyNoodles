import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { Theme } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => (
  <Box component="footer" sx={{ bgcolor: theme.palette.primary.main, color: '#FFF', py: 3, mt: 4 }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">
            123 Noodle Street, Foodie City<br />
            Phone: (123) 456-7890<br />
            Email: info@happynoodles.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Opening Hours
          </Typography>
          <Typography variant="body2">
            Monday - Friday: 11am - 10pm<br />
            Saturday - Sunday: 10am - 11pm
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <IconButton color="inherit" aria-label="Facebook">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Instagram">
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Twitter">
            <TwitterIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Typography variant="body2" align="center">
          © 2024 Happy Noodles. All rights reserved.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;