import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface FeedbackItem {
  name: string;
  comment: string;
}

interface CustomerFeedbackProps {
  theme: Theme;
}

const feedbacks: FeedbackItem[] = [
  { name: "John D.", comment: "Best noodles in town! The atmosphere is cozy and staff is friendly." },
  { name: "Sarah M.", comment: "I love the variety of dishes. The spicy chicken noodles are my favorite!" },
  { name: "Mike R.", comment: "Great place for family dinners. Kids menu is fantastic!" }
];

const CustomerFeedback: React.FC<CustomerFeedbackProps> = ({ theme }) => (
  <Container maxWidth="md" sx={{ my: 4 }}>
    <Typography variant="h4" align="center" sx={{ mb: 4, color: theme.palette.primary.main }}>
      Customer Feedback
    </Typography>
    <Grid container spacing={3}>
      {feedbacks.map((feedback, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {feedback.name}
              </Typography>
              <Typography variant="body2">
                "{feedback.comment}"
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default CustomerFeedback;