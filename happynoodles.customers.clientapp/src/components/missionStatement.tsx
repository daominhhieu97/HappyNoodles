import React from 'react';
import { Container, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface MissionStatementProps {
  theme: Theme;
}

const MissionStatement: React.FC<MissionStatementProps> = ({ theme }) => (
  <Container maxWidth="md" sx={{ mb: 4 }}>
    <Typography variant="h4" align="center" sx={{ mb: 2, color: theme.palette.primary.main }}>
      Our Mission
    </Typography>
    <Typography variant="body1" align="center" sx={{ mb: 4 }}>
      At Happy Noodles, we strive to bring joy and comfort through our delicious noodle dishes,
      crafted with love and the finest ingredients. Our goal is to create a warm, welcoming
      atmosphere where every customer feels at home and experiences the rich flavors of our
      authentic recipes.
    </Typography>
  </Container>
);

export default MissionStatement;